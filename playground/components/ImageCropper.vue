<template>
  <div>
    <div class="header">
      <button @click="$emit('close')">&times;</button>
    </div>
    <cropper ref="cropperRef" class="checkerboard-bg" :src="src" :stencil-props="{ aspectRatio: 1 }"/>
    <div>
      <div class="zoom-container">
        <label class="zoom-label">Zoom</label>
        <div class="zoom-controls">
          <button @click="decreaseZoom" class="zoom-btn">−</button>
          <input type="range" :min="minZoom" :max="maxZoom" step="0.1" v-model="zoomLevel" @input="applyZoom"
                 class="zoom-slider"/>
          <button @click="increaseZoom" class="zoom-btn">+</button>
        </div>
      </div>
      <div>
        <button @click="showDeleteConfirm = true" class="btn-change">Delete Image</button>
        <button @click="emitCrop" class="btn-add">Add Image</button>
      </div>
    </div>
  </div>
  <teleport to="body">
    <div v-if="showDeleteConfirm" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white p-6 rounded-xl shadow-lg w-full max-w-[400px] text-left">
        <h3 class="text-lg font-semibold mb-4">Excluir Imagem</h3>
        <p class="mb-8">Deseja excluir a imagem selecionada?
          Você precisará selecionar outra imagem
          caso confirme esta ação.</p>
        <div class="flex justify-around gap-2 mt-7">
          <v-btn @click="showDeleteConfirm = false" variant="outlined" class="btn-change">Cancelar</v-btn>
          <v-btn @click="confirmDelete" color="primary" class="btn-add">Excluir Imagem</v-btn>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import {ref, watch} from 'vue'
import {Cropper} from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'

const props = defineProps({
  src: String,
})
const showDeleteConfirm = ref(false)
const emit = defineEmits(['cropped', 'close'])

const cropperRef = ref(null)
const zoomLevel = ref(1)
const minZoom = 0
const maxZoom = 1
let previousZoom = 1

const applyZoom = () => {
  const cropper = cropperRef.value
  if (cropper) {
    const direction = zoomLevel.value > previousZoom ? 'in' : 'out'
    cropper.zoom(zoomLevel.value / previousZoom)
    previousZoom = zoomLevel.value
  }
}

const confirmDelete = () => {
  showDeleteConfirm.value = false
  emit('cropped', null)
  emit('close')
}

const emitCrop = () => {
  if (!cropperRef.value) return
  const result = cropperRef.value.getResult()
  if (!result || !result.canvas) return

  result.canvas.toBlob((blob) => {
    if (!blob) return

    const reader = new FileReader()
    reader.onloadend = () => {
      const base64 = reader.result
      const uniqueName = `logo-${Date.now()}.png`
      const file = new File([blob], uniqueName, {type: 'image/png'})

      file.preview = base64

      emit('cropped', file)
    }
    reader.readAsDataURL(blob)
  }, 'image/png')
}


watch(zoomLevel, (newZoom) => {
  applyZoom()
})
</script>

<style scoped>
.header{
  margin-bottom: 16px !important;
}
.btn-change {
  color: hsla(338, 81%, 48%, 1);
  width: 140px;
  font-size: 12px;
}

.btn-add {
  width: 140px;
  font-size: 12px;
}

.zoom-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
}

.zoom-label {
  font-weight: 600;
  font-size: 16px;
  margin-bottom: -10px;
  color: #2d2d2d;
}

.zoom-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
}

.zoom-slider {
  -webkit-appearance: none;
  appearance: none;
  height: 8px;
  width: 100%;
  flex: 1;
  border-radius: 4px;
  background: #d1d1d1;
  outline: none;
  cursor: pointer;
}

.zoom-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 0 8px;
  color: #2d2d2d;
}

.zoom-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 16px;
  width: 16px;
  background: hsla(338, 81%, 48%, 1);;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
}

.zoom-slider::-moz-range-thumb {
  height: 16px;
  width: 16px;
  background: hsla(338, 81%, 48%, 1);;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
}

:deep(.vue-advanced-cropper__image-wrapper),
:deep(.vue-advanced-cropper__background) {
  background-image: url('assets/images/checkerboard.jpg');
  background-size: 800px 534px;
  background-repeat: repeat;
  background-position: center;
}
</style>