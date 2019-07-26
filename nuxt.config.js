import contentful from './.contentful.json';

export default {
    mode: 'spa',
    /*
    ** Headers of the page
    */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat&display=swap'},
        ]
    },
    /*
    ** Customize the progress-bar color
    */
    loading: { color: '#fff' },
    /*
    ** Global CSS
    */
    css: [
        '~/assets/main.css',
        '@fortawesome/fontawesome-free-webfonts',
        '@fortawesome/fontawesome-free-webfonts/css/fa-brands.css',
        // '@fortawesome/fontawesome-free-webfonts/css/fa-regular.css',
        '@fortawesome/fontawesome-free-webfonts/css/fa-solid.css',
    ],
    env: {
        ...contentful
    },
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        '~/plugins/vue-lazysizes.client.js'
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        'nuxt-buefy', // https://buefy.github.io/#/documentation
        // 'nuxt-fontawesome', // https://www.npmjs.com/package/nuxt-fontawesome
        '@nuxtjs/axios', // https://axios.nuxtjs.org/usage
        '@nuxtjs/pwa',
        '@bazzite/nuxt-optimized-images', // https://github.com/bazzite/nuxt-optimized-images
    ],
    fontawesome: {
        component: 'fa',
        imports: [
            {
                set: '@fortawesome/free-solid-svg-icons',
                icons: ['fas']
            }
        ]
    },
    buefy: {
        materialDesignIcons: false,
        css: false
    },
    optimizedImages: {
        inlineImageLimit: -1,
        handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif'],
        optimizeImages: true,
        optimizeImagesInDev: false,
        mozjpeg: {
            quality: 85
        },
        optipng: false,
        pngquant: {
            speed: 7,
            quality: [0.65, 0.8]
        },
        svgo: {
            plugins: [
                // {removeViewBox: false}
            ]
        },
        webp: {
            quality: 85
        },
        responsive: {
            placeholder: true,
            sizes: [300, 600, 1200, 2000],
            adapter: require('responsive-loader/sharp')
        },
        defaultImageLoader: 'responsive-loader',
    },
    /*
    ** Axios module configuration
    ** See https://axios.nuxtjs.org/options
    */
    axios: {},
    /*
    ** Build configuration
    */
    build: {
        extend (config, { isDev, isClient, loaders: { vue } }) {
            if (isClient) {
                vue.transformAssetUrls.img = ['data-src', 'src'];
                vue.transformAssetUrls.source = ['data-srcset', 'srcset'];
            }
        }
    }
}