export default defineNuxtConfig({
    // devServer: {
    //     port: 3000, // default: 3000
    //     host: '0.0.0.0' // меняем на 0.0.0.0 если нужно открыть с мобилы
    // },
    devtools: {enabled: false},
    modules: ['@nuxt/image', '@nuxt/ui', 'shadcn-nuxt', ['@nuxtjs/google-fonts', {
        families: {
            Lato: {
                wght: [300, 400, 700],
                ital: [300],
            },
        },
    },], 'nuxt-icon', '@pinia/nuxt',
        [
            '@vee-validate/nuxt',
            {
                autoImports: true,
            },
        ],

    ],
    shadcn: {prefix: 'Ui', componentDir: './components/ui',},
    pinia: {storesDirs: ['./store/**']},

})
