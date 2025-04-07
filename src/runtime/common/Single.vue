<script setup lang="ts">
import {defineEmits, defineProps, ref, Comment, Text} from "vue";
import type {PropType, Slot, VNode} from 'vue';
import {backgroundImage} from "../utils";

const props = defineProps({
  data: {
    type: [String, Object, Array] as PropType<string | File | any>,
    required: true
  },
});

const emit = defineEmits<{
  (event: "update:clear", value: any): void;
}>();

const overlay = ref<boolean>(false);

const dropzoneClear = () => {
  emit('update:clear', '');
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
      <slot name="componentIcon"></slot>
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