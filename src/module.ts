import { createResolver, defineNuxtModule, addComponent } from '@nuxt/kit';

interface ModuleOptions {}

const PACKAGE_NAME: string = 'Six-dropzone';

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: PACKAGE_NAME,
        configKey: 'SixDropzone',
        compatibility: {
            nuxt: '^3.0.0',
        },
    },
    setup(_: ModuleOptions, nuxt) {
        const { resolve } = createResolver(import.meta.url);

        addComponent({
            name: 'six-dropzone',
            filePath: resolve('./runtime/newDropzone.vue'),
            pascalName: 'SixDropzone',
            global: true,
            mode: 'all',
        });
    },
});
