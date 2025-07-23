<script setup>
const photoFile = ref()
const url = ref('https://i.imgur.com/PcRn7hB.jpeg')


const photoFileMultiple = ref()
const urlsMultiple = ref([
  "https://i.imgur.com/PcRn7hB.jpeg",
  "https://i.imgur.com/HkulqHb.jpeg",
  "https://i.imgur.com/cJNCe4F.jpeg",
  "https://i.imgur.com/osJyAlk.jpeg",
  "https://i.imgur.com/AVU0Q0z.jpeg"
])


const drop = (e) => {
  // console.log(e.dataTransfer.files[0], 'drop')
}
const selectedFile = (e) => {
  // console.log(e, 'change')
};
const modelValueFile = (e) => {
  // console.log(e, 'model-value')
}


// MULTIPLE

const dropMultiple = (e) => {
  // console.log(e.dataTransfer.files[0], 'drop')
}
const selectedFileMultiple = (e) => {
  // console.log(e, 'change')
};
const modelValueFileMultiple = (e) => {
  // console.log(e, 'model-value')
}


const photoFileCropper = ref()
const cropperModal = ref(false)
const imageToCrop = ref(null)

const openCropper = (files) => {
  if (files !== null) {
    cropperModal.value = true
    const reader = new FileReader()
    reader.onload = (e) => {
      imageToCrop.value = e.target.result
    }

    reader.readAsDataURL(files)
  }
}

const applyCropped = (file) => {
  photoFileCropper.value = file
  cropperModal.value = false
}


const photoFileCropperMultiple = ref()
const cropperModalMultiple = ref([false])
const imageToCropMultiple = ref([])

const openCropperMultiple = (files) => {
  files.map((file, i) => {

    cropperModalMultiple.value[i] = true

    const reader = new FileReader()
    reader.onload = (e) => {
      imageToCropMultiple.value[i] = e.target.result
    }

    reader.readAsDataURL(file)
  })
}
const applyCroppedMultiple = (file, index) => {
  photoFileCropperMultiple.value[index] = file;
  cropperModalMultiple.value = cropperModalMultiple.value.map(el => false)

}
</script>

<template>
  <div style="display: flex; gap: 4rem; flex-direction: column; padding: 8rem">
    <SixDropzone
        id="drop"
        v-model="photoFile"
        @drop.prevent="drop"
        @change="selectedFile"
        @update:model-value="modelValueFile"
        :accept="['image/png', 'image/jpeg']"
        :drop-mounted="url"
    >
      <template v-slot:icon>
        <div style="color:white">X</div>
      </template>
    </SixDropzone>
    <div>
      <SixDropzone
          ref="eltMultiple"
          id="dropMultiple"
          v-model="photoFileMultiple"
          @drop.prevent="dropMultiple"
          @change="selectedFileMultiple"
          @update:model-value="modelValueFileMultiple"
          :drop-mounted="urlsMultiple"
          multiple
      >
      </SixDropzone>
      <button @click="$refs.eltMultiple.addFile()">Add File</button>
      <button @click="$refs.eltMultiple.clearFile()">clear File</button>
    </div>


    <div>
      <SixDropzone
          id="dropCropper"
          v-model="photoFileCropper"
          @update:modelValue="(files) => openCropper(files)"
          :accept="['image/png', 'image/jpeg']"
      >
      </SixDropzone>
      <div v-if="cropperModal" class="--overlay">
        <div class="--modal">
          <ImageCropper :src="imageToCrop" @cropped="applyCropped" @close="cropperModal = false"/>
        </div>
      </div>
    </div>
    <div>
      <SixDropzone
          ref="eltMultipleCropper"
          id="dropCropperMultiple"
          v-model="photoFileCropperMultiple"
          @update:modelValue="(files) => openCropperMultiple(files)"
          :accept="['image/png', 'image/jpeg']"
          multiple
      >
      </SixDropzone>
      <template v-for="(item, index) in photoFileCropperMultiple">
        <div v-if="cropperModalMultiple[index]" class="--overlay">
          <div class="--modal">
            <ImageCropper
                :src="imageToCropMultiple[index]"
                @cropped="(value) => applyCroppedMultiple(value, index)"
                @close="cropperModalMultiple[index] = false"
            />
          </div>
        </div>
      </template>


      <button @click="$refs.eltMultipleCropper.addFile()">Add File</button>
    </div>

  </div>
</template>
<style>
.--overlay {
  position: fixed;
  inset: 0px;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(0 0 0 / 0.5);
  padding: 1rem;

  .--modal {
    width: 100%;
    max-width: 700px;
    border-radius: 0.75rem;
    background-color: white;
    padding: 1.5rem;
  }
}


</style>