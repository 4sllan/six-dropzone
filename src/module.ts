import { createResolver, defineNuxtModule, addComponent } from '@nuxt/kit';
import type { Nuxt } from '@nuxt/schema';

type ModuleOptions = Record<string, never>;

const PACKAGE_NAME = 'Six-dropzone';

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: PACKAGE_NAME,
    configKey: 'SixDropzone',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  setup(_: ModuleOptions, nuxt: Nuxt) {
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
