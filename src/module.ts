import {
    useLogger,
    createResolver,
    defineNuxtModule,
    addServerHandler,
    addPlugin,
    addRouteMiddleware
} from '@nuxt/kit'
import type {
    ModuleOptions,
} from './runtime/types'


const PACKAGE_NAME:string = 'nuxt-simple-auth'
export default defineNuxtModule<ModuleOptions>({

    meta: {
        name: PACKAGE_NAME,
        configKey: 'auth'
    },

    async setup(options, nuxt) {
        const logger = useLogger(PACKAGE_NAME)

        const {resolve} = createResolver(import.meta.url)

        nuxt.options.runtimeConfig[PACKAGE_NAME] = options;

        if (options.cookie && options.cookie.prefix) {
            nuxt.options.runtimeConfig.public.prefix = options.cookie.prefix;
        }

        if (options['2fa']) {
            //add middleware 2fa
            addRouteMiddleware({
                name: '_2fa',
                path: resolve('./runtime/core/2fa'),
            })
            //add server-plugin 2fa
            addServerHandler({
                route: '/api/2fa',
                handler: resolve('./runtime/api/2fa')
            })
        }

        // Add middleware template
        addRouteMiddleware({
            name: 'auth',
            path: resolve('./runtime/core/auth'),
        })

        // Add plugin template
        addPlugin({
            src: resolve('./runtime/plugin'),
            mode: 'all',
        })

        // Add server-plugin auth
        addServerHandler({
            route: '/api/auth',
            handler: resolve('./runtime/api/auth')
        })
        // Add server-plugin profile
        addServerHandler({
            route: '/api/profile',
            handler: resolve('./runtime/api/profile')
        })
        // Add server-plugin logout
        addServerHandler({
            route: '/api/logout',
            handler: resolve('./runtime/api/logout')
        })


        logger.success('`nuxt-simple-auth` setup done')
    }
})