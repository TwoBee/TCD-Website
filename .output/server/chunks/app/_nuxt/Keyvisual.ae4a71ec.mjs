import { resolveDirective, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from '../server.mjs';
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
//# sourceMappingURL=Keyvisual.ae4a71ec.mjs.map
