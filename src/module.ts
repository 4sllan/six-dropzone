import {
    useLogger,
    createResolver,
    defineNuxtModule,
    addServerHandler,
    addPlugin,
    addRouteMiddleware
} from '@nuxt/kit'

interface ModuleOptions {

}


const PACKAGE_NAME: string = 'nuxt-dropzone'
export default defineNuxtModule<ModuleOptions>({

    meta: {
        name: PACKAGE_NAME,
        configKey: 'nuxtDropzone',
        // Compatibility constraints
        compatibility: {
            // Semver version of supported nuxt versions
            nuxt: '^3.0.0'
        }
    },

    setup(moduleOptions, nuxt) {
        const logger = useLogger(PACKAGE_NAME)

        const {resolve} = createResolver(import.meta.url)
    }
})