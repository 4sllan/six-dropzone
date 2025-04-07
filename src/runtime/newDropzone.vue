<script setup lang="ts">
import {ref, onMounted, defineProps, defineEmits, type Slot} from 'vue';
import type {PropType} from 'vue';
import {imageUrlToBase64, dataURLtoFile} from "./utils"
import Sets from "./common/Sets.vue"
import Single from "./common/Single.vue"

const props = defineProps({
  id: {
    type: String,
    default: 'sixDrop',
    required: true
  },
  modelValue: {
    type: [String, Object, Array] as PropType<string | File | File[]>,
    required: false
  },
  dropMounted: {
    type: [String, Array] as PropType<string | string[]>,
    default: ''
  },
  label: {
    type: String,
    default: 'Select File'
  },
  multiple: {
    type: Boolean,
    default: false
  },
  errorMessages: {
    type: String,
    default: ''
  }
});

const emit = defineEmits<{
  (event: "update:modelValue", value: string | File | File[] | null): void;
  (event: "change", value: string | File | File[] | null): void;
}>();


let dropzoneFile = ref<File | File[] | null>(null);
const dropzoneRef = ref<HTMLInputElement | null>(null);
const overlay = ref<boolean | boolean[]>([]);
const active = ref<boolean>(false);

const toggleActive = (e: DragEvent) => {
  if (!e.dataTransfer) return;

  if (props.multiple) {
    dropzoneFile.value = Array.from(e.dataTransfer.files);
    overlay.value = [];
  } else {
    dropzoneFile.value = e.dataTransfer.files[0];
  }
  active.value = !active.value;
  emit('change', dropzoneFile.value);
  emit('update:modelValue', dropzoneFile.value);
};
const selectedFile = () => {
  if (!dropzoneRef.value || !dropzoneRef.value.files) return;

  if (props.multiple) {
    dropzoneFile.value = Array.from(dropzoneRef.value.files);
    overlay.value = [];
  } else {
    dropzoneFile.value = dropzoneRef.value.files[0];
  }
  emit('change', dropzoneFile.value);
  emit('update:modelValue', dropzoneFile.value);
};

onMounted(() => {
  setTimeout(async () => {
    if (props.multiple && Array.isArray(props.dropMounted)) {
      dropzoneFile.value = [];
      overlay.value = [];

      try {
        const files = await Promise.all(
            props.dropMounted.map(async (value, key) => {
              const response = await imageUrlToBase64(value);
              return dataURLtoFile(response, `photo_${key}`);
            })
        );
        dropzoneFile.value = files;
        emit('update:modelValue', dropzoneFile.value);
      } catch (err) {
        console.error(err);
      }
      return;
    }

    if (typeof props.dropMounted === 'string' && props.dropMounted) {
      try {
        const response = await imageUrlToBase64(props.dropMounted);
        dropzoneFile.value = dataURLtoFile(response, 'photo');
        emit('update:modelValue', dropzoneFile.value);
      } catch (err) {
        console.error(err);
      }
    }
  }, 500);
});

</script>

<template>
  <div
      @dragenter.prevent="toggleActive"
      @dragleave.prevent="toggleActive"
      @dragover.prevent
      @drop.prevent="toggleActive"
      :class="{ 'active-dropzone': active}"
      class="dropzone"
  >
    <div v-if="!dropzoneFile" class="dropzone_content">
      <slot name="default"></slot>
      <label :for="id">{{ label }}</label>
    </div>
    <template v-else-if="!props.multiple">
      <Single :data="dropzoneFile">
        <template #componentIcon>
          <slot name="icon">
            <svg fill="none" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
          </slot>
        </template>
      </Single>
    </template>
    <template v-else>
      <Sets :data="dropzoneFile">
        <template #componentIcon>
          <slot name="icon">
            <svg fill="none" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
          </slot>
        </template>
      </Sets>
    </template>
    <input
        type="file"
        :id="id"
        class="dropzoneFile"
        @change="selectedFile"
        :multiple="multiple"
        ref="dropzoneRef"
    />
    <div class="input__details" v-if="props.errorMessages">
      <div class="messages" role="alert" aria-live="polite">
        <div class="messages__message">{{ props.errorMessages }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dropzone {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 550px;
  min-height: 200px;
  max-height: 550px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f7f8fa;
  transition: 0.3s ease all;
  padding: 1rem;


  label {
    padding: 8px 12px;
    color: #fff;
    background-color: #9C9FB9;
    transition: 0.3s ease all;
  }

  input {
    display: none;
  }

  .dropzone_content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 16px;
  }
}

.active-dropzone {
  color: #fff;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  background-color: #fff;
}

svg {
  stroke: white;
  width: 60px;
  height: 60px;
}
</style>
