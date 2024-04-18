<script setup>
import SixDropzone from '../../src/runtime/dropzone.vue'

const photoFile = ref()
const url = ref('http://localhost/storage/projeto/28/1x4mtlbeTM.png')


const photoFileMultiple = ref()
const urlsMultiple = ref([
  {
    "id": 22,
    "projeto_id": 28,
    "path": "http://localhost/storage/projeto/28/1x4mtlbeTM.png",
    "created_at": "2024-03-28T13:24:43.000000Z",
    "updated_at": "2024-03-28T13:24:43.000000Z"
  },
  {
    "id": 23,
    "projeto_id": 28,
    "path": "http://localhost/storage/projeto/28/DXrnpLYQaJ.png",
    "created_at": "2024-03-28T13:24:43.000000Z",
    "updated_at": "2024-03-28T13:24:43.000000Z"
  },
  {
    "id": 24,
    "projeto_id": 28,
    "path": "http://localhost/storage/projeto/28/N1sH7LMLaM.png",
    "created_at": "2024-03-28T13:24:43.000000Z",
    "updated_at": "2024-03-28T13:24:43.000000Z"
  },
  {
    "id": 25,
    "projeto_id": 28,
    "path": "http://localhost/storage/projeto/28/NwcWJgBYdL.png",
    "created_at": "2024-03-28T13:24:43.000000Z",
    "updated_at": "2024-03-28T13:24:43.000000Z"
  },
  {
    "id": 26,
    "projeto_id": 28,
    "path": "http://localhost/storage/projeto/28/1F5DDuln4o.png",
    "created_at": "2024-03-28T13:24:43.000000Z",
    "updated_at": "2024-03-28T13:24:43.000000Z"
  },
  {
    "id": 27,
    "projeto_id": 28,
    "path": "http://localhost/storage/projeto/28/Jtf0JFQFxI.png",
    "created_at": "2024-03-28T13:24:43.000000Z",
    "updated_at": "2024-03-28T13:24:43.000000Z"
  }
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
