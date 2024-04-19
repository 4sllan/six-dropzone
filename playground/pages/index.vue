<script setup>
import SixDropzone from '../../src/runtime/dropzone.vue'

const photoFile = ref()
const url = ref('https://ciclovivo.com.br/wp-content/uploads/2018/10/iStock-536613027-1024x683.jpg')


const photoFileMultiple = ref()
const urlsMultiple = ref([
  {
    path: "https://ciclovivo.com.br/wp-content/uploads/2018/10/iStock-536613027-1024x683.jpg"
  },
  {
    path: "https://img.freepik.com/fotos-gratis/respingo-colorido-abstrato-3d-background-generativo-ai-background_60438-2509.jpg",
  },
  {
    path: "https://img.freepik.com/fotos-gratis/uma-pintura-de-um-lago-de-montanha-com-uma-montanha-ao-fundo_188544-9126.jpg",
  },
  {
    path: "https://t.ctcdn.com.br/JlHwiRHyv0mTD7GfRkIlgO6eQX8=/640x360/smart/i257652.jpeg",
  },
  {
    path: "https://services.meteored.com/img/article/inteligencia-artificial-aprende-a-reconstruir-imagens-vistas-por-pessoas-ciencia-fotos-1679175318563_1280.jpg",
  },
])


const drop = (e) => {
  // console.log(e.dataTransfer.files[0], 'drop')
}
const selectedFile = (e) => {
  // console.log(e, 'change')
};
const modelValueFile = (e) => {
  // console.log(e, 'model-value')
}


// MULTIPLE

const dropMultiple = (e) => {
  // console.log(e.dataTransfer.files[0], 'drop')
}
const selectedFileMultiple = (e) => {
  // console.log(e, 'change')
};
const modelValueFileMultiple = (e) => {
  // console.log(e, 'model-value')
}
</script>

<template>
  <div>
    <SixDropzone
        id="drop"
        v-model="photoFile"
        @drop.prevent="drop"
        @change="selectedFile"
        @update:model-value="modelValueFile"
        :drop-mounted="url"
    >
    </SixDropzone>
    <SixDropzone
        id="dropMultiple"
        v-model="photoFileMultiple"
        @drop.prevent="dropMultiple"
        @change="selectedFileMultiple"
        @update:model-value="modelValueFileMultiple"
        :drop-mounted="urlsMultiple"
        multiple
    >
    </SixDropzone>
  </div>
</template>
