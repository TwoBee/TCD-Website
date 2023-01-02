import { ComputedRef, Ref } from 'vue'
export type LayoutKey = string
declare module "/Users/tobi/Desktop/tobiaszimmer.dev/Kunden/002_tc-dueppenweiler/TCD-Website/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}