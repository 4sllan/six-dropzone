<script setup lang="ts">
import {defineEmits, defineProps, ref} from "vue";
import type {PropType} from 'vue';
import {backgroundImage} from "../utils";

const props = defineProps({
  data: {
    type: [String, Object, Array] as PropType<string | File | any>,
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