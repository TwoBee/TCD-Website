import { resolveComponent, resolveDirective, mergeProps, useSSRContext, ref, computed, unref } from 'vue';
import { ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { _ as _export_sfc } from '../server.mjs';
import { useWindowSize } from '@vueuse/core';
import 'ohmyfetch';
import 'hookable';
import 'unctx';
import 'ufo';
import 'h3';
import 'defu';
import '@vueuse/shared';
import 'vue-router';
import 'axios';
import '@fortawesome/fontawesome-svg-core';
import '@fortawesome/vue-fontawesome';
import '@fortawesome/free-solid-svg-icons';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'destr';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'ohash';
import 'unstorage';
import 'radix3';
import 'fs';
import 'pathe';
import 'url';

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
