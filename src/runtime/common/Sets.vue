<script setup lang="ts">
import {ref} from "vue";
import type {PropType} from 'vue';
import {backgroundImage} from "../utils";

const props = defineProps({
  data: {
    type: [String, Object, Array] as PropType<string | File[]>,
    required: true
  },
});

const emit = defineEmits<{
  (event: "update:clear", value: string | File | File[] | null): void;
}>();


const overlay = ref<boolean[]>([]);
const setDpzRef = ref<HTMLElement[]>([]);

const dropzoneClearMultiple = (item: File, index: number, ref: HTMLElement[]) => {
  if (Array.isArray(props.data)) {
    props.data.splice(index, 1);
    setTimeout(() => {
      let i = 0;
      ref.forEach(elt => {
        backgroundImage(props.data?.[i] || null, {el: elt});
        i++;
      });
      emit('update:clear', props.data);
    }, 5);
    if (!props.data.length) {
      emit('update:clear', null);
    }
  }
};
</script>

<template>
  <div class="__dpzSets">
    <template v-for="(item, index) in props.data">
      <div
          @vue:mounted="(event: any) => {backgroundImage(item, event)}"
          class="__dpz"
          ref="setDpzRef"
          @mouseover="overlay[index] = true"
          @mouseleave="overlay[index] = false"
          :class="{'_overlay' : overlay[index]}"
      >
        <div class="content" @click.prevent="dropzoneClearMultiple(item, index, setDpzRef)">
          <slot name="componentIcon"></slot>
        </div>
      </div>
    </template>
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

.__dpzSets {
  display: grid;
  gap: 1rem;
  grid-template-columns: auto auto auto auto;

  .__dpz {
    width: 180px;
    height: 120px;
    background-size: cover;
    position: relative;
  }
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