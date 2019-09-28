import * as contentful from 'contentful';
import contentfulConfig from './.contentful.json';


const generateRoutes = async () => {
    const client = contentful.createClient({
        space:  contentfulConfig.CTF_SPACE_ID,
        accessToken: contentfulConfig.CTF_CDA_ACCESS_TOKEN
    });

    const posts = await client.getEntries({
        content_type: contentfulConfig.CTF_BLOG_POST_TYPE_ID
    });


    return posts.items.map(post => {
        return {
            route: '/blog/' + post.fields.slug,
            payload: post
        };
    });
};


export default {
    mode: 'spa',
    /*
    ** Headers of the page
    */
    head: {
        title: 'Aldert Vaandering\'s portfolio',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {
                hid: 'description',
                name: 'description',
                content: 'If you\'re looking for Aldert\'s website, this is the right place.' +
                    'Web development, photography and more.'
            }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat|Open+Sans&display=swap' },
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
        '~/assets/css/main.css',
        '@fortawesome/fontawesome-free-webfonts',
        '@fortawesome/fontawesome-free-webfonts/css/fa-brands.css',
        '@fortawesome/fontawesome-free-webfonts/css/fa-regular.css',
        '@fortawesome/fontawesome-free-webfonts/css/fa-solid.css',
    ],
    env: {
        ...contentfulConfig
    },
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        '~/plugins/vuera.js',
        '~/plugins/vue-lazysizes.client.js',
        './plugins/hammer.js'
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        // 'nuxt-fontawesome', // https://www.npmjs.com/package/nuxt-fontawesome
        'nuxt-buefy',
        '@nuxtjs/axios', // https://axios.nuxtjs.org/usage
        '@nuxtjs/pwa',
        '@bazzite/nuxt-optimized-images', // https://github.com/bazzite/nuxt-optimized-images,
    ],
    fontawesome: {
        component: 'fa',
        imports: [
            {
                set: '@fortawesome/free-solid-svg-icons',
                icons: ['fas', 'far']
            }
        ]
    },
    buefy :{
        css: false,
        materialDesignIcons: false
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
            adapter: require('responsive-loader/sharp'),
            placeholder: true,
            sizes: [300, 600, 1200, 2000]
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
    generate: {
        routes: generateRoutes
    },
    build: {
        cache: true,
        // hardSource: true,
        parallel: true,
        extend(config, { isDev, isClient, loaders: { vue } }) {
            if (isDev) {
                if (isClient) {
                    config.devtool = 'eval-source-map';
                } else {
                    config.devtool = 'inline-source-map';
                }
            }

            if (isClient) {
                vue.transformAssetUrls.img = ['data-src', 'src'];
                vue.transformAssetUrls.source = ['data-srcset', 'srcset'];
            }
        }
    }
}
