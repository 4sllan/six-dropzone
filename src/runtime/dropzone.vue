<script setup>
import {ref, onMounted} from 'vue'

const props = defineProps({
  addImages: {
    type: String,
    default: ""
  },
  label: {
    type: String,
    default: "Select File"
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

const emit = defineEmits(['update:modelValue'])

const overlay = ref(false)
const active = ref(false)
const dropzoneImg = ref()
const dropzoneInput = ref()
let dropzoneFile = ref()


const toggleActive = (e) => {
  console.log(e.dataTransfer.files)

  dropzoneFile.value = e.dataTransfer.files[0];
  active.value = !active.value;

  let reader = new FileReader();

  reader.onloadend = function () {
    dropzoneImg.value.style.backgroundImage = `url(${reader.result})`;
  }

  if (dropzoneFile.value) {
    reader.readAsDataURL(dropzoneFile.value);
  } else {
    dropzoneImg.value.style.backgroundImage = "url('')";
  }

};

const selectedFile = () => {
  if (props.multiple) {
    let arr = []
    arr.push(...dropzoneInput.value.files);
    dropzoneFile.value = arr
    overlay.value = new Array()

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
    return
  }

  dropzoneFile.value = dropzoneInput.value.files[0];

  let reader = new FileReader();

  reader.onloadend = function () {
    dropzoneImg.value.style.backgroundImage = `url(${reader.result})`;
  }

  if (dropzoneFile.value) {
    reader.readAsDataURL(dropzoneFile.value);
  } else {
    dropzoneImg.value.style.backgroundImage = "url('')";
  }
}

const dropzoneClear = () => {
  dropzoneFile.value = ""
  emit('update:modelValue', "")
}

const dropzoneClearMultiple = (item, index) => {
  delete dropzoneFile.value[index];
  dropzoneImg.value[index].remove()

  emit('update:modelValue', "")

  if (!dropzoneFile.value.length) {
    dropzoneFile.value = null
    dropzoneImg.value = null
  }
}

const imageUrlToBase64 = async (url) => {
  if (!props.addImages) {
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

onMounted(() => {
  setTimeout(() => {
    imageUrlToBase64(props.addImages)
        .then((response) => {
          if (!response) {
            return;
          }
          const file = new File([response], 'foto')
          dropzoneFile.value = file;
          setTimeout(() => {
            dropzoneImg.value.style.backgroundImage = `url(${props.addImages})`;
            emit('update:modelValue', file)
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
      <label for="dropzoneFile">{{ label }}</label>
    </div>
    <div
        v-else-if="!props.multiple"
        class="dropzoneImg"
        ref="dropzoneImg"
        id="dropzoneImg"
        @mouseover="overlay = true"
        @mouseleave="overlay = false"
        :class="{'_overlay' : overlay}"
    >
      <div class="content" @click.prevent="dropzoneClear">
        <i>
          <svg fill="none" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
        </i>
      </div>
    </div>
    <div
        class="dropzoneImgMultiple"
        :style="`grid-template-columns: repeat(${dropzoneFile.length / 2}, minmax(0, 1fr));`"
        v-else
    >
      <template v-for="(item, index) in dropzoneFile">
        <div
            class="dropzoneImg"
            ref=dropzoneImg
            :id="`dropzoneImg${index}`"
            @mouseover="overlay[index] = true"
            @mouseleave="overlay[index] = false"
            :class="{'_overlay' : overlay[index]}"
        >
          <div class="content" @click.prevent="dropzoneClearMultiple(item, index)">
            <i>
              <svg fill="none" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
            </i>
          </div>
        </div>
      </template>
    </div>
    <input
        type="file"
        id="dropzoneFile"
        class="dropzoneFile"
        @change="selectedFile"
        :multiple="multiple"
        ref="dropzoneInput"
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
  grid-template-columns: repeat(2, minmax(0, 1fr));

  .dropzoneImg {
    width: 200px;
    height: 200px;
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