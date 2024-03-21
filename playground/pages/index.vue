<script setup>
import SixDropzone from '../../src/runtime/dropzone.vue'

const photo = ref()
const drop = (e) => {
  console.log(e)
  photo.value = e.dataTransfer.files;
};
</script>

<template>
  <SixDropzone
      @drop.prevent="drop"
      :multiple="true"
  >
  </SixDropzone>
</template>
