<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue';
import type { PropType } from 'vue';
import { backgroundImage } from '../utils';

const props = defineProps({
  data: {
    type: Array as PropType<File[]>,
    required: true,
  },
});

const emit = defineEmits<{
  (event: 'update:clear', value: File[] | null): void;
}>();

const overlay = ref<boolean[]>([]);
const elRef = ref<HTMLElement[]>([]);

const updatePreviews = async () => {
  await nextTick();
  props.data.forEach((item, i) => {
    const el = elRef.value[i];
    if (el) {
      backgroundImage(item, el);
    }
  });
};

const dropzoneClearMultiple = (index: number) => {
  if (Array.isArray(props.data)) {
    const newData = [...props.data];
    newData.splice(index, 1);
    emit('update:clear', newData.length ? newData : null);
  }
};

watch(
  () => props.data,
  () => {
    updatePreviews();
  },
  { deep: true }
);

onMounted(() => {
  updatePreviews();
});
</script>

<template>
  <div class="__dpzSets">
    <template v-for="(item, index) in props.data" :key="index">
      <div
        class="__dpz"
        ref="elRef"
        @mouseover="overlay[index] = true"
        @mouseleave="overlay[index] = false"
        :class="{ _overlay: overlay[index] }"
      >
        <div class="content" @click.prevent="dropzoneClearMultiple(index)">
          <slot name="componentIcon" />
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
  content: '';
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
