import { resolveComponent, resolveDirective, mergeProps, useSSRContext, ref, computed, unref } from 'file:///Users/tobi/Desktop/tobiaszimmer.dev/Kunden/002_tc-dueppenweiler/TCD-Website/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderClass } from 'file:///Users/tobi/Desktop/tobiaszimmer.dev/Kunden/002_tc-dueppenweiler/TCD-Website/node_modules/vue/server-renderer/index.mjs';
import { _ as _export_sfc } from '../server.mjs';
import { useWindowSize } from 'file:///Users/tobi/Desktop/tobiaszimmer.dev/Kunden/002_tc-dueppenweiler/TCD-Website/node_modules/@vueuse/core/index.mjs';
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

const _sfc_main$4 = {
  props: {
    "data": Array,
    "color-primary": {
      type: String,
      required: false,
      default: "#fff"
    },
    "color-secondary": {
      type: String,
      required: false,
      default: "#000"
    }
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/base-footer.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _imports_0 = "" + globalThis.__buildAssetsURL("logo.781f9663.png");
const _sfc_main$2 = {
  __name: "base-nav",
  __ssrInlineRender: true,
  props: { "data": Array },
  setup(__props) {
    const mobileNav = ref(null);
    const { width, height } = useWindowSize();
    const mobileMenu = computed(() => {
      return width.value <= 750 ? true : false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      if (unref(mobileMenu)) {
        _push(`<nav class="mobile" data-v-9248e1b3><img${ssrRenderAttr("src", _imports_0)} alt="" data-v-9248e1b3><div class="${ssrRenderClass([{ active: mobileNav.value }, "topbottombar"])}" data-v-9248e1b3><div class="middlebar" data-v-9248e1b3></div></div></nav>`);
      } else {
        _push(`<!---->`);
      }
      if (mobileNav.value) {
        _push(`<div class="burgermenu_itemlist" data-v-9248e1b3><ul data-v-9248e1b3><li data-v-9248e1b3>Test 1</li><li data-v-9248e1b3>Test 2</li><li data-v-9248e1b3>Test 3</li></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/base-nav.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const BaseNav = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-9248e1b3"]]);
const _sfc_main$1 = {
  props: ["data"],
  components: { BaseNav },
  data() {
    return {
      navList: [
        {
          display: "Verein",
          slug: "/club"
        },
        {
          display: "Events",
          slug: "/events"
        },
        {
          display: "Mitmachen",
          slug: "/join-us"
        }
      ]
    };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_BaseNav = resolveComponent("BaseNav");
  _push(ssrRenderComponent(_component_BaseNav, mergeProps({ data: $data.navList }, _attrs), null, _parent));
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/nav.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Nav = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "Page",
  __ssrInlineRender: true,
  props: { blok: Object },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_StoryblokComponent = resolveComponent("StoryblokComponent");
      const _directive_editable = resolveDirective("editable");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs, ssrGetDirectiveProps(_ctx, _directive_editable, __props.blok)))}>`);
      _push(ssrRenderComponent(Nav, null, null, _parent));
      _push(`<!--[-->`);
      ssrRenderList(__props.blok.body, (blok) => {
        _push(ssrRenderComponent(_component_StoryblokComponent, {
          key: blok._uid,
          blok
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("storyblok/Page.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Page.341a21a0.mjs.map
