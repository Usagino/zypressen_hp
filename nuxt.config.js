export default {
  mode: 'universal',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'style',
        href:
          'https://cdn.jsdelivr.net/npm/yakuhanjp@3.3.1/dist/css/yakuhanjp.min.css'
      }
    ]
  },
  loading: { color: '#fff' },

  css: [
    { src: '~/assets/stylesheets/reset.css', lang: 'css' },
    { src: '@/assets/stylesheets/style.scss', lang: 'scss' }
  ],

  plugins: ['~plugins/components.js', { src: '~/plugins/axios', ssr: false }],

  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module'
  ],

  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    'nuxt-webfontloader',
    'nuxt-user-agent'
  ],
  styleResources: {
    scss: ['~/assets/stylesheets/style.scss']
  },
  webfontloader: {
    google: {
      families: ['Teko']
    }
  },

  axios: {},
  build: {
    extend(config, ctx) {},
    transpile: ['three']
  }
  // build: {
  //   transpile: ['three']
  // }
}
