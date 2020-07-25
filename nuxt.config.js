const metaData = require('./assets/json/meta.json') // eslint-disable-line
require('dotenv').config()
export default {
  mode: 'universal',
  target: 'static',
  head: {
    title: 'ZYPRESSEN',
    meta: [
      ...metaData,
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
      },
      {
        rel: 'stylesheet',
        // type: 'text/css',
        href: 'https://cloud.typenetwork.com/projects/3724/fontface.css/'
      }
    ]
  },
  loading: { color: '#fff' },
  css: [
    { src: '~/assets/stylesheets/reset.css', lang: 'css' },
    { src: '@/assets/stylesheets/style.scss', lang: 'scss' }
  ],
  plugins: [
    '@/plugins/day.js',
    '@/plugins/globalMethods.js',
    { src: '@/plugins/components', ssr: false },
    { src: '@/plugins/axios', ssr: false }
  ],
  buildModules: [
    '@nuxt/components',
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module'
  ],
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
    'nuxt-webfontloader',
    'nuxt-user-agent',
    '@bazzite/nuxt-optimized-images'
  ],
  manifest: {
    name: 'ZYPRESSEN',
    lang: 'ja'
  },
  styleResources: {
    scss: ['~/assets/stylesheets/style.scss']
  },
  webfontloader: {
    google: {
      families: ['Noto+Sans+JP:400;500', 'Roboto:400,700']
    }
  },
  axios: {},
  optimizedImages: {
    optimizeImages: true
  },
  env: { CMSKEY: process.env.CMSKEY },
  build: {
    extend(config, ctx) {
      if (config.module) {
        config.module.rules.push({
          test: /\.(vert|frag)$/i,
          use: ['raw-loader']
        })
      }
    },
    transpile: ['three', 'gsap']
  },
  components: ['~/components'],
  generate: {
    exclude: ['/works/undefined']
  }
}
