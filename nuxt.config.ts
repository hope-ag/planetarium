import { securityConfig } from "./security.config";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    MONGO_URI: process.env.MONGO_URI,
    CLOUDINARY_URL: process.env.CLOUDINARY_URL,
    public: {
      TEST: process.env.TEST
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'nuxt-icon',
    'nuxt-lodash',
    '@nuxt/image-edge',
    'nuxt-security'
  ],
  security: securityConfig,
  image: {
    cloudinary: {
        baseURL: 'https://res.cloudinary.com/demg8x4gj/image/upload/v1665832528/planetarium'
    }
  },
  css: ['~/assets/styles/main.scss'],
  tailwindcss: {
    cssPath: '~/assets/styles/tailwind.css',
    configPath: 'tailwind.config.cjs',
    exposeConfig: false,
    injectPosition: 'first',
    viewer: true,
  },
  googleFonts: {
    families: {
      Lato: [200, 400, 600, 700, 800]
    }
  },
  lodash: {
    prefix: '_',
    prefixSkip: ['is'],
    exclude: ['map'],
    alias: [
      ['camelCase', 'stringToCamelCase'], // => useStringToCamelCase
      ['kebabCase', 'stringToKebabCase'], // => useStringToKebabCase
    ]
  },

  nitro: {
		plugins: ["@/server/db/index.ts"],
	},
  build: {
		transpile: ["@headlessui/vue", "vue-toastification", "@headlessui/tailwindcss"],
  }
})
