<script setup lang="ts">
import {defineEmits, defineProps, ref} from "vue";
import type {PropType} from 'vue';
import {backgroundImage} from "../utils";

const props = defineProps({
  data: {
    type: [String, Object, Array] as PropType<string | File>,
    required: true
  },
});

const emit = defineEmits<{
  (event: "update:modelValue", value: string | File | File[] | null): void;
}>();

const overlay = ref<boolean>(false);


const dropzoneClear = () => {
  props.data = null;
  emit('update:modelValue', '');
};
</script>

<template>
  <div
      @vue:mounted="(event: any) => {backgroundImage(props.data, event)}"
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
</template>

<style scoped>

</style>