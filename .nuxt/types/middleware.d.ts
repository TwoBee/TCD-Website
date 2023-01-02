import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "/Users/tobi/Desktop/tobiaszimmer.dev/Kunden/002_tc-dueppenweiler/TCD-Website/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}