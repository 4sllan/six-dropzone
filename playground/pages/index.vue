<script setup>
import SixDropzone from '../../src/runtime/dropzone.vue'

const photoFile = ref()
const url = ref('https://i.imgur.com/PcRn7hB.jpeg')


const photoFileMultiple = ref()
const urlsMultiple = ref([
  {
    path: "https://i.imgur.com/PcRn7hB.jpeg"
  },
  {
    path: "https://i.imgur.com/HkulqHb.jpeg",
  },
  {
    path: "https://i.imgur.com/cJNCe4F.jpeg",
  },
  {
    path: "https://i.imgur.com/osJyAlk.jpeg",
  },
  {
    path: "https://i.imgur.com/AVU0Q0z.jpeg",
  },
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
</script>

<template>
  <div>
    <SixDropzone
        id="drop"
        v-model="photoFile"
        @drop.prevent="drop"
        @change="selectedFile"
        @update:model-value="modelValueFile"
        :drop-mounted="url"
    >
    </SixDropzone>
    <SixDropzone
        id="dropMultiple"
        v-model="photoFileMultiple"
        @drop.prevent="dropMultiple"
        @change="selectedFileMultiple"
        @update:model-value="modelValueFileMultiple"
        :drop-mounted="urlsMultiple"
        multiple
    >
    </SixDropzone>
  </div>
</template>
