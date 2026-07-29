import { createResolver, defineNuxtModule, addComponent } from '@nuxt/kit';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ModuleOptions {}

const PACKAGE_NAME: string = 'Six-dropzone';

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: PACKAGE_NAME,
        configKey: 'SixDropzone',
        compatibility: {
            nuxt: '^4.0.0',
        },
    },
    setup(_: ModuleOptions, nuxt) {
        const { resolve } = createResolver(import.meta.url);

        addComponent({
            name: 'six-dropzone',
            filePath: resolve('./runtime/Dropzone.vue'),
            pascalName: 'SixDropzone',
            global: true,
            mode: 'all',
        });
    },
});
