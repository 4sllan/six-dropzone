import {
    useLogger,
    createResolver,
    defineNuxtModule,
    addServerHandler,
    addPlugin,
    addRouteMiddleware
} from '@nuxt/kit'



const PACKAGE_NAME:string = 'nuxt-dropzone'
export default defineNuxtModule<ModuleOptions>({

    meta: {
        name: PACKAGE_NAME,
    },
})