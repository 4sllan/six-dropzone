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
 * todo verificado
 */
const toggleActive = (e) => {
  if (props.multiple) {
    dropzoneFile.value = new Array(...e.dataTransfer.files)
    active.value = !active.value;
    overlay.value = []

    if (dropzoneFile.value) {
      for (let i in dropzoneFile.value) {
        let reader = new FileReader();

        reader.readAsDataURL(dropzoneFile.value[i]);

        reader.onloadend = function () {
          dropzoneImg.value[i].style.backgroundImage = `url(${reader.result})`;
        }
      }

      emit('change', dropzoneFile.value)
      emit('update:modelValue', dropzoneFile.value)
    }
    return
  }

  dropzoneFile.value = e.dataTransfer.files[0];
  active.value = !active.value;

  let reader = new FileReader();

  reader.onloadend = function () {
    dropzoneImg.value.style.backgroundImage = `url(${reader.result})`;
  }

  if (dropzoneFile.value) {
    reader.readAsDataURL(dropzoneFile.value);
    emit('change', dropzoneFile.value)
    emit('update:modelValue', dropzoneFile.value)
  }
};
/**
 * selectedFile
 */
const selectedFile = () => {
  if (props.multiple) {
    dropzoneFile.value = new Array(...dropzoneRef.value.files)
    overlay.value = []

    if (dropzoneFile.value) {
      for (let i in dropzoneFile.value) {
        let reader = new FileReader();

        reader.readAsDataURL(dropzoneFile.value[i]);

        reader.onloadend = function () {
          dropzoneImg.value[i].style.backgroundImage = `url(${reader.result})`;
        }
      }
    } else {
      dropzoneImg.value.style.backgroundImage = "url('')";
    }

    emit('change', dropzoneFile.value)
    emit('update:modelValue', dropzoneFile.value)
    return
  }

  dropzoneFile.value = dropzoneRef.value.files[0];

  let reader = new FileReader();

  reader.onloadend = function () {
    dropzoneImg.value.style.backgroundImage = `url(${reader.result})`;
  }

  if (dropzoneFile.value) {
    reader.readAsDataURL(dropzoneFile.value);
  } else {
    dropzoneImg.value.style.backgroundImage = "url('')";
  }

  emit('change', dropzoneFile.value)
  emit('update:modelValue', dropzoneFile.value)
}
const dropzoneClear = () => {
  dropzoneFile.value = ""
  emit('update:modelValue', "")
}
const dropzoneClearMultiple = (item, index) => {
  dropzoneFile.value.splice(index, 1)

  emit('update:modelValue', dropzoneFile.value)

  if (!dropzoneFile.value.length) {
    dropzoneFile.value = null
    dropzoneImg.value = null
  }
}

const imageUrlToBase64 = async (url) => {
  if (!props.dropMounted) {
    return;
  }
  const data = await fetch(url, {mode: 'no-cors'});
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

const gridMultiple = (elt) => {
  //console.log(elt.el)
}

onMounted(() => {
  setTimeout(() => {
    if (props.multiple && Array.isArray(props.dropMounted)) {
      dropzoneFile.value = [];
      overlay.value = []

      props.dropMounted.forEach((value, key) => {
        imageUrlToBase64(value.path)
            .then(response => {
              if (!response) {
                return;
              }
              dropzoneFile.value.push(new File([response], `photo_${key}`));
            })
            .then(res => {
              setTimeout(() => {
                dropzoneImg.value[key].style.backgroundImage = `url(${value.path})`;
              }, 500)
            })
      })
      // emit('update:modelValue', dropzoneFile.value)
      return;
    }
    imageUrlToBase64(props.dropMounted)
        .then(response => {
          if (!response) {
            return;
          }
          dropzoneFile.value = new File([response], 'photo');
          setTimeout(() => {
            dropzoneImg.value.style.backgroundImage = `url(${props.dropMounted})`;
            //emit('update:modelValue', dropzoneFile.value)
          }, 500)
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
        class="dropzoneImg"
        ref="dropzoneImg"
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
    <div class="dropzoneImgMultiple" v-else >
      <template v-for="(item, index) in dropzoneFile">
        <div
            @vue:mounted="gridMultiple"
            class="dropzoneImg"
            ref=dropzoneImg
            :id="`dropzoneImg${index}`"
            @mouseover="overlay[index] = true"
            @mouseleave="overlay[index] = false"
            :class="{'_overlay' : overlay[index]}"
        >
          <div class="content" @click.prevent="dropzoneClearMultiple(item, index)">
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
  left: 0;
  position: absolute;
  background-color: #000;
  opacity: 0.25;
  width: 100%;
  height: 100%;
  transition: 0.3s ease all;
}
</style>