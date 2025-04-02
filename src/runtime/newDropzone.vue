<script setup lang="ts">
import {ref, onMounted} from 'vue';
import type {PropType} from 'vue';

// Definição de propriedades do componente
const props = defineProps({
  id: {
    type: String,
    default: 'sixDrop'
  },
  modelValue: {
    type: [String, Object, Array] as PropType<string | File | File[]>,
    default: ""
  },
  dropMounted: {
    type: [String, Array] as PropType<string | string[]>,
    default: ""
  },
  label: {
    type: String,
    default: "Select File"
  },
  multiple: {
    type: Boolean,
    default: false
  },
  errorMessages: {
    type: String,
    default: ""
  }
});

const emit = defineEmits<{
  (event: "update:modelValue", value: string | File | File[] | null): void;
  (event: "change", value: string | File | File[] | null): void;
}>();

// Estados do componente
const dropzoneFile = ref<File | File[] | null>(null);
const dropzoneRef = ref<HTMLInputElement | null>(null);
const overlay = ref<boolean>(false);
const active = ref<boolean>(false);

/**
 * Alterna o estado do dropzone quando um arquivo é arrastado.
 */
const toggleActive = (e: DragEvent) => {
  e.preventDefault();
  if (!e.dataTransfer?.files) return;

  dropzoneFile.value = props.multiple
      ? Array.from(e.dataTransfer.files)
      : e.dataTransfer.files[0];

  active.value = !active.value;
  overlay.value = false;

  emit("change", dropzoneFile.value);
  emit("update:modelValue", dropzoneFile.value);
};

/**
 * Atualiza o estado do componente quando um arquivo é selecionado pelo input.
 */
const selectedFile = () => {
  if (!dropzoneRef.value?.files) return;

  dropzoneFile.value = props.multiple
      ? Array.from(dropzoneRef.value.files)
      : dropzoneRef.value.files[0];

  emit("change", dropzoneFile.value);
  emit("update:modelValue", dropzoneFile.value);
};

/**
 * Limpa o arquivo(s) selecionado(s).
 */
const dropzoneClear = () => {
  dropzoneFile.value = null;
  emit("update:modelValue", null);
};

/**
 * Converte uma URL de imagem para base64.
 */
const imageUrlToBase64 = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Erro ao converter URL para Base64", error);
    return null;
  }
};

/**
 * Converte uma string Base64 para um objeto File.
 */
const dataURLtoFile = (dataurl: string, filename: string): File => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || '';
  const bstr = atob(arr[arr.length - 1]);
  const u8arr = new Uint8Array(bstr.length);
  for (let i = 0; i < bstr.length; i++) {
    u8arr[i] = bstr.charCodeAt(i);
  }
  return new File([u8arr], filename, {type: mime});
};

// Inicializa imagens pré-carregadas
onMounted(async () => {
  if (!props.dropMounted) return;

  if (props.multiple && Array.isArray(props.dropMounted)) {
    dropzoneFile.value = [];
    for (let i = 0; i < props.dropMounted.length; i++) {
      const base64 = await imageUrlToBase64(props.dropMounted[i]);
      if (base64) {
        (dropzoneFile.value as File[]).push(dataURLtoFile(base64, `photo_${i}`));
      }
    }
    emit("update:modelValue", dropzoneFile.value);
  } else if (typeof props.dropMounted === "string") {
    const base64 = await imageUrlToBase64(props.dropMounted);
    if (base64) {
      dropzoneFile.value = dataURLtoFile(base64, "photo");
      emit("update:modelValue", dropzoneFile.value);
    }
  }
});
</script>

<template>
  <div
      @dragenter.prevent="toggleActive"
      @dragleave.prevent="toggleActive"
      @dragover.prevent
      @drop.prevent="toggleActive"
      :class="{ 'active-dropzone': active }"
      class="dropzone"
  >
    <div v-if="!dropzoneFile" class="dropzone_content">
      <slot name="default"></slot>
      <label :for="id">{{ label }}</label>
    </div>
    <input type="file" :id="id" class="dropzoneFile" @change="selectedFile" :multiple="multiple" ref="dropzoneRef"/>
    <div v-if="errorMessages" class="input__details">
      <div class="messages" role="alert" aria-live="polite">
        <div class="messages__message">{{ errorMessages }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dropzone {
  position: relative;
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f7f8fa;
  padding: 1rem;
  border: 2px dashed #ccc;
  transition: 0.3s ease;
}

.active-dropzone {
  border-color: #007bff;
  background-color: #e0f3ff;
}

.dropzoneFile {
  display: none;
}
</style>
