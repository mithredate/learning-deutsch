import tailwindcss from '@tailwindcss/vite'

// Served from https://mithredate.com/learning-deutsch/ — a GitHub Pages *project*
// site under the user site that already carries the CNAME. Every URL the app emits
// has to carry that prefix, which is what app.baseURL does.
const BASE = '/learning-deutsch/'

export default defineNuxtConfig({
  compatibilityDate: '2026-08-14',
  ssr: true,
  devtools: { enabled: false },

  app: {
    baseURL: BASE,
    head: {
      htmlAttrs: { lang: 'de' },
      title: 'Tageskarte B1',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'description', content: 'Täglicher Lernplan für die telc-B1-Prüfung am 25.09.2026.' },
        // Keep it out of search results. Deliberately NOT a robots.txt Disallow:
        // a project site's robots.txt is ignored (only the domain root counts),
        // and blocking the crawl would stop it ever reading this tag — a blocked
        // URL can still be indexed from an inbound link, just without a snippet.
        { name: 'robots', content: 'noindex, nofollow' },
        { name: 'googlebot', content: 'noindex, nofollow' },
        // Two colours so the iOS status bar matches whichever theme is active.
        { name: 'theme-color', content: '#F6F7FA', media: '(prefers-color-scheme: light)' },
        { name: 'theme-color', content: '#0E1016', media: '(prefers-color-scheme: dark)' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-title', content: 'Deutsch' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
      link: [
        { rel: 'apple-touch-icon', href: `${BASE}icons/apple-touch-icon.png` },
        { rel: 'icon', type: 'image/png', href: `${BASE}icons/icon-192.png` },
      ],
    },
  },

  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },

  modules: ['@vite-pwa/nuxt'],

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      id: BASE,
      start_url: BASE,
      scope: BASE,
      name: 'Tageskarte B1 — telc Deutsch',
      short_name: 'Deutsch',
      description: 'Was heute dran ist: Hören, Wortschatz, Grammatik, Schreiben.',
      lang: 'de',
      display: 'standalone',
      orientation: 'portrait',
      background_color: '#0E1016',
      theme_color: '#1E2A6B',
      icons: [
        { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
        { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
    },
    workbox: {
      // The shell is small; precache all of it so a dead-zone gym still opens the app.
      globPatterns: ['**/*.{js,css,html,png,svg,ico,webmanifest}'],
      navigateFallback: BASE,
      cleanupOutdatedCaches: true,
      // Audio is large and immutable — cache on first play, never revalidate.
      runtimeCaching: [
        {
          urlPattern: ({ url }) => url.pathname.startsWith(`${BASE}audio/`),
          handler: 'CacheFirst',
          options: {
            cacheName: 'hoerverstehen-audio',
            rangeRequests: true,
            expiration: { maxEntries: 40, maxAgeSeconds: 60 * 60 * 24 * 365 },
            cacheableResponse: { statuses: [0, 200] },
          },
        },
      ],
    },
    client: { installPrompt: true },
    devOptions: { enabled: false },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      // Dynamic /hoeren/[id] routes are listed explicitly so a broken link in the
      // index page can never silently drop an exercise from the build.
      routes: [
        '/',
        '/kalender',
        '/sprechen',
        '/hoeren',
        '/hoeren/eigen-01-teil1',
        '/hoeren/eigen-01-teil2',
        '/hoeren/eigen-01-teil3',
      ],
      failOnError: false,
    },
  },
})
