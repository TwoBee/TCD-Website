import { useSSRContext, resolveComponent, mergeProps, withCtx, createTextVNode, toDisplayString, ref, computed, resolveDirective } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderStyle, ssrGetDirectiveProps } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
import { useWindowSize } from "@vueuse/core";
import "ohmyfetch";
import "#internal/nitro";
import "hookable";
import "unctx";
import "destr";
import "ufo";
import "h3";
import "defu";
import "@vueuse/shared";
import "vue-router";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/vue-fontawesome";
import "@fortawesome/free-solid-svg-icons";
const baseFooter_vue_vue_type_style_index_0_scoped_384e63bc_lang = "";
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
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  _push(`<section${ssrRenderAttrs(mergeProps({ id: "footer" }, _attrs))} data-v-384e63bc><nav data-v-384e63bc><div data-v-384e63bc><span data-v-384e63bc>Copyright 2022</span></div><div data-v-384e63bc><!--[-->`);
  ssrRenderList($props.data, (item) => {
    _push(ssrRenderComponent(_component_router_link, {
      to: item.slug,
      key: item
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`${ssrInterpolate(item.display)}`);
        } else {
          return [
            createTextVNode(toDisplayString(item.display), 1)
          ];
        }
      }),
      _: 2
    }, _parent));
  });
  _push(`<!--]--></div><div data-v-384e63bc><!--[-->`);
  ssrRenderList($props.data, (item) => {
    _push(ssrRenderComponent(_component_router_link, {
      to: item.slug,
      key: item
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`${ssrInterpolate(item.display)}`);
        } else {
          return [
            createTextVNode(toDisplayString(item.display), 1)
          ];
        }
      }),
      _: 2
    }, _parent));
  });
  _push(`<!--]--></div></nav></section>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/base-footer.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const BaseFooter = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-384e63bc"]]);
const _sfc_main$3 = {
  props: ["data"],
  components: { BaseFooter },
  data() {
    return {
      navList: {
        item1: {
          display: "Verein",
          slug: "club"
        },
        item2: {
          display: "Events",
          slug: "events"
        },
        item3: {
          display: "Mitmachen",
          slug: "join-us"
        }
      }
    };
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_BaseFooter = resolveComponent("BaseFooter");
  _push(ssrRenderComponent(_component_BaseFooter, mergeProps({ data: $data.navList }, _attrs), null, _parent));
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/footer.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const Footer = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$1]]);
const _imports_0 = "" + globalThis.__buildAssetsURL("logo.781f9663.png");
const baseNav_vue_vue_type_style_index_0_scoped_2ab7380d_lang = "";
const _sfc_main$2 = {
  __name: "base-nav",
  __ssrInlineRender: true,
  props: { "data": Array },
  setup(__props) {
    const mobileNav = ref(null);
    const { width, height } = useWindowSize();
    function toggleMobile() {
      mobileNav.value = !mobileNav.value;
    }
    computed(() => {
      console.log(width.value);
      return width.value <= 750 ? true : false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      _push(`<header${ssrRenderAttrs(_attrs)} data-v-2ab7380d><nav data-v-2ab7380d><div class="logo" data-v-2ab7380d><img${ssrRenderAttr("src", _imports_0)} alt="" data-v-2ab7380d></div><div class="navigation" data-v-2ab7380d><div class="navbar" data-v-2ab7380d></div>`);
      _push(ssrRenderComponent(_component_font_awesome_icon, {
        icon: "fa-solid fa-bars",
        onClick: toggleMobile
      }, null, _parent));
      _push(`<div class="burgermenu" style="${ssrRenderStyle(mobileNav.value ? null : { display: "none" })}" data-v-2ab7380d><div style="${ssrRenderStyle(mobileNav.value ? null : { display: "none" })}" class="burgermenu_itemlist" data-v-2ab7380d><ul data-v-2ab7380d><li data-v-2ab7380d>Test 1</li><li data-v-2ab7380d>Test 2</li><li data-v-2ab7380d>Test 3</li></ul></div></div></div></nav></header>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/base-nav.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const BaseNav = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-2ab7380d"]]);
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
      _push(`<!--]-->`);
      _push(ssrRenderComponent(Footer, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("storyblok/Page.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=Page.b79db836.js.map
