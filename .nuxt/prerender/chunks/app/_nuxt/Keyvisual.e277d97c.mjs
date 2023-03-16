import { resolveDirective, mergeProps, useSSRContext } from 'file:///Users/tobi/Desktop/tobiaszimmer.dev/Kunden/002_tc-dueppenweiler/TCD-Website/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderAttr, ssrInterpolate } from 'file:///Users/tobi/Desktop/tobiaszimmer.dev/Kunden/002_tc-dueppenweiler/TCD-Website/node_modules/vue/server-renderer/index.mjs';
import { _ as _export_sfc } from '../server.mjs';
import 'file:///Users/tobi/Desktop/tobiaszimmer.dev/Kunden/002_tc-dueppenweiler/TCD-Website/node_modules/ohmyfetch/dist/node.mjs';
import 'file:///Users/tobi/Desktop/tobiaszimmer.dev/Kunden/002_tc-dueppenweiler/TCD-Website/node_modules/hookable/dist/index.mjs';
import 'file:///Users/tobi/Desktop/tobiaszimmer.dev/Kunden/002_tc-dueppenweiler/TCD-Website/node_modules/unctx/dist/index.mjs';
import 'file:///Users/tobi/Desktop/tobiaszimmer.dev/Kunden/002_tc-dueppenweiler/TCD-Website/node_modules/ufo/dist/index.mjs';
import 'file:///Users/tobi/Desktop/tobiaszimmer.dev/Kunden/002_tc-dueppenweiler/TCD-Website/node_modules/h3/dist/index.mjs';
import 'file:///Users/tobi/Desktop/tobiaszimmer.dev/Kunden/002_tc-dueppenweiler/TCD-Website/node_modules/defu/dist/defu.mjs';
import 'file:///Users/tobi/Desktop/tobiaszimmer.dev/Kunden/002_tc-dueppenweiler/TCD-Website/node_modules/@vueuse/shared/index.mjs';
import 'file:///Users/tobi/Desktop/tobiaszimmer.dev/Kunden/002_tc-dueppenweiler/TCD-Website/node_modules/vue-router/dist/vue-router.node.mjs';
import 'file:///Users/tobi/Desktop/tobiaszimmer.dev/Kunden/002_tc-dueppenweiler/TCD-Website/node_modules/axios/index.js';
import 'file:///Users/tobi/Desktop/tobiaszimmer.dev/Kunden/002_tc-dueppenweiler/TCD-Website/node_modules/@fortawesome/fontawesome-svg-core/index.mjs';
import 'file:///Users/tobi/Desktop/tobiaszimmer.dev/Kunden/002_tc-dueppenweiler/TCD-Website/node_modules/@fortawesome/vue-fontawesome/index.js';
import 'file:///Users/tobi/Desktop/tobiaszimmer.dev/Kunden/002_tc-dueppenweiler/TCD-Website/node_modules/@fortawesome/free-solid-svg-icons/index.mjs';
import '../../nitro/nitro-prerenderer.mjs';
import 'file:///Users/tobi/Desktop/tobiaszimmer.dev/Kunden/002_tc-dueppenweiler/TCD-Website/node_modules/node-fetch-native/dist/polyfill.mjs';
import 'file:///Users/tobi/Desktop/tobiaszimmer.dev/Kunden/002_tc-dueppenweiler/TCD-Website/node_modules/destr/dist/index.mjs';
import 'file:///Users/tobi/Desktop/tobiaszimmer.dev/Kunden/002_tc-dueppenweiler/TCD-Website/node_modules/unenv/runtime/fetch/index.mjs';
import 'file:///Users/tobi/Desktop/tobiaszimmer.dev/Kunden/002_tc-dueppenweiler/TCD-Website/node_modules/scule/dist/index.mjs';
import 'file:///Users/tobi/Desktop/tobiaszimmer.dev/Kunden/002_tc-dueppenweiler/TCD-Website/node_modules/ohash/dist/index.mjs';
import 'file:///Users/tobi/Desktop/tobiaszimmer.dev/Kunden/002_tc-dueppenweiler/TCD-Website/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/tobi/Desktop/tobiaszimmer.dev/Kunden/002_tc-dueppenweiler/TCD-Website/node_modules/unstorage/dist/drivers/fs.mjs';
import 'file:///Users/tobi/Desktop/tobiaszimmer.dev/Kunden/002_tc-dueppenweiler/TCD-Website/node_modules/radix3/dist/index.mjs';

const _sfc_main = {
  __name: "Keyvisual",
  __ssrInlineRender: true,
  props: { blok: Object },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_editable = resolveDirective("editable");
      _push(`<section${ssrRenderAttrs(mergeProps(_attrs, ssrGetDirectiveProps(_ctx, _directive_editable, __props.blok)))} data-v-c7b159da><img${ssrRenderAttr("src", __props.blok.image.filename)} data-v-c7b159da><h2 data-v-c7b159da>${ssrInterpolate(__props.blok.headline)}</h2><h3 data-v-c7b159da>${ssrInterpolate(__props.blok.subline)}</h3></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("storyblok/Keyvisual.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Keyvisual = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c7b159da"]]);

export { Keyvisual as default };
//# sourceMappingURL=Keyvisual.e277d97c.mjs.map
