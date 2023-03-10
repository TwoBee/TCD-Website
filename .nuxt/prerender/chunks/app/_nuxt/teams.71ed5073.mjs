import { u as useAsyncStoryblok } from './useAsyncStoryblok.4aa5c835.mjs';
import { withAsyncContext, resolveComponent, unref, mergeProps, useSSRContext } from 'file:///Users/tobi/Desktop/tobiaszimmer.dev/Kunden/002_tc-dueppenweiler/TCD-Website/node_modules/vue/index.mjs';
import { ssrRenderComponent } from 'file:///Users/tobi/Desktop/tobiaszimmer.dev/Kunden/002_tc-dueppenweiler/TCD-Website/node_modules/vue/server-renderer/index.mjs';
import '../server.mjs';
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
  __name: "teams",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const story = ([__temp, __restore] = withAsyncContext(() => useAsyncStoryblok("sub1/teams", { version: "draft" })), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_StoryblokComponent = resolveComponent("StoryblokComponent");
      if (unref(story)) {
        _push(ssrRenderComponent(_component_StoryblokComponent, mergeProps({
          blok: unref(story).content
        }, _attrs), null, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/sub1/teams.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=teams.71ed5073.mjs.map
