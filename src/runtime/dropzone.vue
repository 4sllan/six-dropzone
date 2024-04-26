<script setup>
import {ref, onMounted, getCurrentInstance} from 'vue'

const instance = getCurrentInstance();

const props = defineProps({
  id: {
    type: String,
    default: 'sixDrop',
    required: true
  },
  modelValue: {
    type: [String, Boolean, Array, File],
    default: "",
    required: false
  },
  dropMounted: {
    type: [String, Array],
    default: "",
    required: false
  },
  label: {
    type: String,
    default: "Select File",
    required: false
  },
  multiple: {
    type: Boolean,
    default: false,
    required: false
  },
  errorMessages: {
    type: String,
    default: "",
    required: false
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

let dropzoneFile = ref()
const dropzoneImg = ref()
const dropzoneRef = ref()
const overlay = ref(false)
const active = ref(false)

/**
 * toggleActive
 * @param e
 */
const toggleActive = (e) => {
  if (props.multiple) {
    dropzoneFile.value = new Array(...e.dataTransfer.files)
    active.value = !active.value;
    overlay.value = []
    emit('change', dropzoneFile.value)
    emit('update:modelValue', dropzoneFile.value)
    return
  }

  dropzoneFile.value = e.dataTransfer.files[0];
  active.value = !active.value;
  emit('change', dropzoneFile.value)
  emit('update:modelValue', dropzoneFile.value)
};
/**
 * selectedFile
 */
const selectedFile = () => {
  if (props.multiple) {
    dropzoneFile.value = new Array(...dropzoneRef.value.files)
    overlay.value = []
    emit('change', dropzoneFile.value)
    emit('update:modelValue', dropzoneFile.value)
    return
  }

  dropzoneFile.value = dropzoneRef.value.files[0];
  emit('change', dropzoneFile.value)
  emit('update:modelValue', dropzoneFile.value)
}
/**
 * dropzoneClear
 */
const dropzoneClear = () => {
  dropzoneFile.value = ""
  emit('update:modelValue', "")
}

const dropzoneClearMultiple = (item, index, ref) => {
  dropzoneFile.value.splice(index, 1)
  setTimeout(() => {
    let i = 0;
    ref.map(elt => {
      backgroundImage(dropzoneFile.value[i], {el: elt})
      i++
    })
    emit('update:modelValue', dropzoneFile.value)
  }, 5)
  if (!dropzoneFile.value.length) {
    dropzoneFile.value = null
  }
}
/**
 * imageUrlToBase64
 * @param url
 * @returns {Promise<unknown>}
 */
const imageUrlToBase64 = async (url) => {
  if (!props.dropMounted) {
    return;
  }
  // {mode: 'no-cors'}
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data);
    };
    reader.onerror = reject;
  });
};
/**
 * backgroundImage
 * @param file
 * @param evt
 * @returns {Promise<void>}
 */
const backgroundImage = async (file, evt) => {
  const reader = new FileReader();
  reader.onloadend = () => {
    const base64data = reader.result;
    evt.el.style.backgroundImage = `url(${base64data})`
  };
  reader.readAsDataURL(file);
}
/**
 * dataURLtoFile
 * @param dataurl
 * @param filename
 * @returns {module:buffer.File | File}
 */
const dataURLtoFile = (dataurl, filename) => {
  let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type: mime});
}

onMounted(() => {
  setTimeout(() => {
    if (props.multiple && Array.isArray(props.dropMounted)) {
      dropzoneFile.value = [];
      overlay.value = []

      const promise = new Promise((resolve, reject) => {
        props.dropMounted.forEach((value, key) => {
          imageUrlToBase64(value.path)
              .then(response => {
                dropzoneFile.value.push(dataURLtoFile(response, `photo_${key}`));
                resolve()
              })
              .catch(err => {
                reject(err)
              })
        })
      })

      promise.then(() => {
        emit('update:modelValue', dropzoneFile.value)
      }).catch(err => {
        console.error(err)
      })
      return;
    }
    imageUrlToBase64(props.dropMounted)
        .then(response => {
          dropzoneFile.value = (dataURLtoFile(response, `photo`));
          emit('update:modelValue', dropzoneFile.value)
        })
        .catch(err => {
          console.error(err)
        })
  }, 500)
})
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
    <div
        v-else-if="!props.multiple"
        @vue:mounted="(event) => {backgroundImage(dropzoneFile, event)}"
        class="dropzoneImg"
        @mouseover="overlay = true"
        @mouseleave="overlay = false"
        :class="{'_overlay' : overlay}"
    >
      <div class="content" @click.prevent="dropzoneClear">
        <svg fill="none" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10"/>
          <line x1="15" y1="9" x2="9" y2="15"/>
          <line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
      </div>
    </div>
    <div class="dropzoneImgMultiple" v-else>
      <template v-for="(item, index) in dropzoneFile">
        <div
            @vue:mounted="(event) => {backgroundImage(item, event)}"
            class="dropzoneImg"
            ref="dropzoneImg"
            @mouseover="overlay[index] = true"
            @mouseleave="overlay[index] = false"
            :class="{'_overlay' : overlay[index]}"
        >
          <div class="content" @click.prevent="dropzoneClearMultiple(item, index, dropzoneImg)">
            <svg fill="none" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
          </div>
        </div>
      </template>
    </div>
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

.dropzoneImg {
  width: 100%;
  height: inherit;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

  .content {
    display: none;
    position: absolute;
    cursor: pointer;
    left: 50%;
    top: 50%;
    justify-content: center;
    align-items: center;
    transform: translate(-50%, -50%);

    svg {
      stroke: white;
      width: 60px;
      height: 60px;
    }
  }
}

.dropzoneImg._overlay .content {
  display: flex;
  transition: 0.3s ease all;
}

.dropzoneImgMultiple {
  display: grid;
  gap: 1rem;
  grid-template-columns: auto auto auto auto;

  .dropzoneImg {
    width: 180px;
    height: 120px;
    background-size: cover;
    position: relative;
  }
}

._overlay::before {
  content: "";
  top: 0;
  left: 0;
  position: absolute;
  background-color: #000;
  opacity: 0.25;
  width: 100%;
  height: 100%;
  transition: 0.3s ease all;
}
</style>