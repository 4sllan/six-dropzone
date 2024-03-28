<script setup>
import SixDropzone from '../../src/runtime/dropzone.vue'

const photo = ref()
const response = ref([
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
  photo.value = e.dataTransfer.files;
};
</script>

<template>
  <SixDropzone
      @drop.prevent="drop"
      :add-images="response"
      :multiple="true"
  >
  </SixDropzone>
</template>
