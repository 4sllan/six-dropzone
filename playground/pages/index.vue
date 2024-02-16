<script setup>
import SixDropzone from '../../src/runtime/dropzone.vue'
const photo = ref()
const drop = (e) => {
  photo.value.foto = e.dataTransfer.files[0];
};
</script>

<template>
  <SixDropzone
      @drop.prevent="drop"
  >
  </SixDropzone>
</template>
