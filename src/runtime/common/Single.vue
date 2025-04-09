<script setup lang="ts">
import {ref, watch, nextTick} from "vue";
import type {PropType} from 'vue';
import {backgroundImage} from "../utils";

const props = defineProps({
  data: {
    type: [String, Object, Array] as PropType<string | File>,
    required: true
  },
});

const emit = defineEmits<{
  (event: "update:clear", value: string | null): void;
}>();

const overlay = ref<boolean>(false);

const dropzoneClear = () => {
  emit('update:clear', null);
};

const init = (el: any) => backgroundImage(props.data, el)

</script>

<template>
  <div
      @vue:mounted="init"
      class="__dpz"
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
.__dpz {
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

.__dpz._overlay .content {
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