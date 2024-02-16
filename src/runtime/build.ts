import {h, ref, onMounted} from 'vue'

interface DefineProps {
    addImages: string,
    label: string
}

export default {
    props: {
        addImages: {
            type: String,
            default: ""
        },
        label: {
            type: String,
            default: "Select File"
        }
    },

    setup(props: DefineProps, {slots}) {

        const emit = defineEmits(['update:modelValue'])
        const overlay: boolean = ref(false)
        const active: boolean = ref(false)
        const dropzoneImg: any = ref()
        const dropzoneInput: any = ref()
        let dropzoneFile: any = ref("")

        const toggleActive = (e) => {
            dropzoneFile.value = e.dataTransfer.files[0];
            active.value = !active.value;

            let reader = new FileReader();

            reader.onloadend = function () {
                dropzoneImg.value.style.backgroundImage = `url(${reader.result})`;
            }

            if (dropzoneFile.value) {
                reader.readAsDataURL(dropzoneFile.value);
            } else {
                dropzoneImg.value.style.backgroundImage = "url('')";
            }

        };

        const selectedFile = () => {

            dropzoneFile.value = dropzoneInput.value.files[0];

            let reader = new FileReader();

            reader.onloadend = function () {
                dropzoneImg.value.style.backgroundImage = `url(${reader.result})`;
            }

            if (dropzoneFile.value) {
                reader.readAsDataURL(dropzoneFile.value);
            } else {
                dropzoneImg.value.style.backgroundImage = "url('')";
            }
        }

        const dropzoneClear = () => {
            dropzoneFile.value = ""
            emit('update:modelValue', "")
        }

        const imageUrlToBase64 = async (url) => {
            if (!props.addImages) {
                return;
            }
            const data = await fetch(url, {mode: 'no-cors'});
            const blob = await data.blob();
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                    const base64data = reader.result;
                    resolve(base64data);
                };
                reader.onerror = reject;
            });
        };

        onMounted(() => {
            setTimeout(() => {
                imageUrlToBase64(props.addImages)
                    .then((response) => {
                        if (!response) {
                            return;
                        }
                        const file = new File([response], 'foto')
                        dropzoneFile.value = file;
                        setTimeout(() => {
                            dropzoneImg.value.style.backgroundImage = `url(${props.addImages})`;
                            emit('update:modelValue', file)
                        }, 500)
                    })
            }, 500)
        })

        const template = `
             <div
                      @dragenter.prevent="toggleActive"
                      @dragleave.prevent="toggleActive"
                      @dragover.prevent
                      @drop.prevent="toggleActive"
                      :class="{ 'active-dropzone': active}"
                      class="dropzone"
                  >
                    <div v-if="!dropzoneFile" class="dropzone_content">
                      <slot name="default"></slot>
                      <label for="dropzoneFile">{{label}}</label>
                    </div>
                    <div
                        v-else
                        class="dropzoneImg"
                        ref="dropzoneImg"
                        id="dropzoneImg"
                        @mouseover="overlay = true"
                        @mouseleave="overlay = false"
                        :class="{'_overlay' : overlay}"
                    >
                      <div class="content" @click.prevent="dropzoneClear">
                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                      </div>
                    </div>
                    <input type="file" id="dropzoneFile" class="dropzoneFile" @change="selectedFile" ref="dropzoneInput"/>
                  </div>
            `

        return () => [
            h('template', {}, template)
        ]
    }
}
