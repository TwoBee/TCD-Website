import { getCurrentInstance, reactive, toRef, isRef, inject, defineComponent, computed, ref, h as h$1, resolveComponent, defineAsyncComponent, version, unref, nextTick, watchEffect, openBlock, createBlock, resolveDynamicComponent, normalizeProps, guardReactiveProps, shallowRef, provide, onErrorCaptured, useSSRContext, Transition, Suspense, withCtx, createVNode, createApp } from "vue";
import { $fetch } from "ohmyfetch";
import { useRuntimeConfig as useRuntimeConfig$1 } from "#internal/nitro";
import { createHooks } from "hookable";
import { getContext, executeAsync } from "unctx";
import "destr";
import { hasProtocol, parseURL, joinURL, isEqual } from "ufo";
import { createError as createError$1, sendRedirect } from "h3";
import { defuFn } from "defu";
import { resolveUnref } from "@vueuse/shared";
import { createMemoryHistory, createRouter, useRoute as useRoute$1, RouterView } from "vue-router";
import { ssrRenderSuspense, ssrRenderComponent } from "vue/server-renderer";
import q from "axios";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
const appConfig = useRuntimeConfig$1().app;
const baseURL = () => appConfig.baseURL;
const nuxtAppCtx = getContext("nuxt-app");
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    provide: void 0,
    globalName: "nuxt",
    payload: reactive({
      data: {},
      state: {},
      _errors: {},
      ...{ serverRendered: true }
    }),
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: {},
    ...options
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.payload.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  const compatibilityConfig = new Proxy(runtimeConfig, {
    get(target, prop) {
      var _a;
      if (prop === "public") {
        return target.public;
      }
      return (_a = target[prop]) != null ? _a : target.public[prop];
    },
    set(target, prop, value) {
      {
        return false;
      }
    }
  });
  nuxtApp.provide("config", compatibilityConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin) {
  if (typeof plugin !== "function") {
    return;
  }
  const { provide: provide2 } = await callWithNuxt(nuxtApp, plugin, [nuxtApp]) || {};
  if (provide2 && typeof provide2 === "object") {
    for (const key in provide2) {
      nuxtApp.provide(key, provide2[key]);
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  for (const plugin of plugins2) {
    await applyPlugin(nuxtApp, plugin);
  }
}
function normalizePlugins(_plugins2) {
  const plugins2 = _plugins2.map((plugin) => {
    if (typeof plugin !== "function") {
      return null;
    }
    if (plugin.length > 1) {
      return (nuxtApp) => plugin(nuxtApp, nuxtApp.provide);
    }
    return plugin;
  }).filter(Boolean);
  return plugins2;
}
function defineNuxtPlugin(plugin) {
  plugin[NuxtPluginIndicator] = true;
  return plugin;
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    return nuxtAppCtx.callAsync(nuxt, fn);
  }
}
function useNuxtApp() {
  const nuxtAppInstance = nuxtAppCtx.tryUse();
  if (!nuxtAppInstance) {
    const vm = getCurrentInstance();
    if (!vm) {
      throw new Error("nuxt instance unavailable");
    }
    return vm.appContext.app.$nuxt;
  }
  return nuxtAppInstance;
}
function useRuntimeConfig() {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (_err) => {
  const err = createError(_err);
  try {
    const nuxtApp = useNuxtApp();
    nuxtApp.callHook("app:error", err);
    const error = useError();
    error.value = error.value || err;
  } catch {
    throw err;
  }
  return err;
};
const createError = (err) => {
  const _err = createError$1(err);
  _err.__nuxt_error = true;
  return _err;
};
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = "$s" + _key;
  const nuxt = useNuxtApp();
  const state = toRef(nuxt.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxt.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const useRouter = () => {
  var _a;
  return (_a = useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (getCurrentInstance()) {
    return inject("_route", useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
const defineNuxtRouteMiddleware = (middleware) => middleware;
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : to.path || "/";
  const isExternal = hasProtocol(toPath, true);
  if (isExternal && !(options == null ? void 0 : options.external)) {
    throw new Error("Navigating to external URL is not allowed by default. Use `nagivateTo (url, { external: true })`.");
  }
  if (isExternal && parseURL(toPath).protocol === "script:") {
    throw new Error("Cannot navigate to an URL with script protocol.");
  }
  const router = useRouter();
  {
    const nuxtApp = useNuxtApp();
    if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
      const redirectLocation = isExternal ? toPath : joinURL(useRuntimeConfig().app.baseURL, router.resolve(to).fullPath || "/");
      return nuxtApp.callHook("app:redirected").then(() => sendRedirect(nuxtApp.ssrContext.event, redirectLocation, (options == null ? void 0 : options.redirectCode) || 302));
    }
  }
  if (isExternal) {
    if (options == null ? void 0 : options.replace) {
      location.replace(toPath);
    } else {
      location.href = toPath;
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
const DEFAULT_EXTERNAL_REL_ATTRIBUTE = "noopener noreferrer";
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  return defineComponent({
    name: componentName,
    props: {
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      prefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      noPrefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      prefetchedClass: {
        type: String,
        default: void 0,
        required: false
      },
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      }
    },
    setup(props, { slots }) {
      const router = useRouter();
      const to = computed(() => {
        return props.to || props.href || "";
      });
      const isExternal = computed(() => {
        if (props.external) {
          return true;
        }
        if (props.target && props.target !== "_self") {
          return true;
        }
        if (typeof to.value === "object") {
          return false;
        }
        return to.value === "" || hasProtocol(to.value, true);
      });
      const prefetched = ref(false);
      const el = void 0;
      return () => {
        var _a, _b, _c;
        if (!isExternal.value) {
          return h$1(
            resolveComponent("RouterLink"),
            {
              ref: void 0,
              to: to.value,
              ...prefetched.value && !props.custom ? { class: props.prefetchedClass || options.prefetchedClass } : {},
              activeClass: props.activeClass || options.activeClass,
              exactActiveClass: props.exactActiveClass || options.exactActiveClass,
              replace: props.replace,
              ariaCurrentValue: props.ariaCurrentValue,
              custom: props.custom
            },
            slots.default
          );
        }
        const href = typeof to.value === "object" ? (_b = (_a = router.resolve(to.value)) == null ? void 0 : _a.href) != null ? _b : null : to.value || null;
        const target = props.target || null;
        const rel = props.noRel ? null : firstNonUndefined(props.rel, options.externalRelAttribute, href ? DEFAULT_EXTERNAL_REL_ATTRIBUTE : "") || null;
        const navigate = () => navigateTo(href, { replace: props.replace });
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          return slots.default({
            href,
            navigate,
            route: router.resolve(href),
            rel,
            target,
            isActive: false,
            isExactActive: false
          });
        }
        return h$1("a", { ref: el, href, rel, target }, (_c = slots.default) == null ? void 0 : _c.call(slots));
      };
    }
  });
}
const __nuxt_component_0$1 = defineNuxtLink({ componentName: "NuxtLink" });
const inlineConfig = {};
defuFn(inlineConfig);
function useHead(meta2) {
  useNuxtApp()._useHead(meta2);
}
const tailwind = "";
const styles = "";
const components = {
  Feature: defineAsyncComponent(() => import("./_nuxt/Feature.23de5287.js").then((c) => c.default || c)),
  Grid: defineAsyncComponent(() => import("./_nuxt/Grid.e1e05654.js").then((c) => c.default || c)),
  Keyvisual: defineAsyncComponent(() => import("./_nuxt/Keyvisual.ae4a71ec.js").then((c) => c.default || c)),
  Page: defineAsyncComponent(() => import("./_nuxt/Page.b79db836.js").then((c) => c.default || c)),
  Teaser: defineAsyncComponent(() => import("./_nuxt/Teaser.6f8a07b3.js").then((c) => c.default || c))
};
const _nuxt_components_plugin_mjs_KR1HBZs4kY = defineNuxtPlugin((nuxtApp) => {
  for (const name in components) {
    nuxtApp.vueApp.component(name, components[name]);
    nuxtApp.vueApp.component("Lazy" + name, components[name]);
  }
});
var PROVIDE_KEY = "usehead";
var HEAD_COUNT_KEY = "head:count";
var HEAD_ATTRS_KEY = "data-head-attrs";
var SELF_CLOSING_TAGS = ["meta", "link", "base"];
var BODY_TAG_ATTR_NAME = "data-meta-body";
var propsToString = (props) => {
  const handledAttributes = [];
  for (const [key, value] of Object.entries(props)) {
    if (value === false || value == null)
      continue;
    let attribute = key;
    if (value !== true)
      attribute += `="${String(value).replace(/"/g, "&quot;")}"`;
    handledAttributes.push(attribute);
  }
  return handledAttributes.length > 0 ? ` ${handledAttributes.join(" ")}` : "";
};
var tagToString = (tag) => {
  const attrs = propsToString(tag.props);
  const openTag = `<${tag.tag}${attrs}>`;
  return SELF_CLOSING_TAGS.includes(tag.tag) ? openTag : `${openTag}${tag.children || ""}</${tag.tag}>`;
};
var resolveHeadEntries = (entries, force) => {
  return entries.map((e) => {
    if (e.input && (force || !e.resolved))
      e.input = resolveUnrefHeadInput(e.input);
    return e;
  });
};
var renderHeadToString = async (head) => {
  var _a, _b;
  const headHtml = [];
  const bodyHtml = [];
  let titleHtml = "";
  const attrs = { htmlAttrs: {}, bodyAttrs: {} };
  const resolvedEntries = resolveHeadEntries(head.headEntries);
  for (const h2 in head.hooks["resolved:entries"])
    await head.hooks["resolved:entries"][h2](resolvedEntries);
  const headTags = resolveHeadEntriesToTags(resolvedEntries);
  for (const h2 in head.hooks["resolved:tags"])
    await head.hooks["resolved:tags"][h2](headTags);
  for (const tag of headTags) {
    if ((_a = tag.options) == null ? void 0 : _a.beforeTagRender)
      tag.options.beforeTagRender(tag);
    if (tag.tag === "title")
      titleHtml = tagToString(tag);
    else if (tag.tag === "htmlAttrs" || tag.tag === "bodyAttrs")
      attrs[tag.tag] = { ...attrs[tag.tag], ...tag.props };
    else if ((_b = tag.options) == null ? void 0 : _b.body)
      bodyHtml.push(tagToString(tag));
    else
      headHtml.push(tagToString(tag));
  }
  headHtml.push(`<meta name="${HEAD_COUNT_KEY}" content="${headHtml.length}">`);
  return {
    get headTags() {
      return titleHtml + headHtml.join("");
    },
    get htmlAttrs() {
      return propsToString({
        ...attrs.htmlAttrs,
        [HEAD_ATTRS_KEY]: Object.keys(attrs.htmlAttrs).join(",")
      });
    },
    get bodyAttrs() {
      return propsToString({
        ...attrs.bodyAttrs,
        [HEAD_ATTRS_KEY]: Object.keys(attrs.bodyAttrs).join(",")
      });
    },
    get bodyTags() {
      return bodyHtml.join("");
    }
  };
};
var sortTags = (aTag, bTag) => {
  const tagWeight = (tag) => {
    var _a;
    if ((_a = tag.options) == null ? void 0 : _a.renderPriority)
      return tag.options.renderPriority;
    switch (tag.tag) {
      case "base":
        return -1;
      case "meta":
        if (tag.props.charset)
          return -2;
        if (tag.props["http-equiv"] === "content-security-policy")
          return 0;
        return 10;
      default:
        return 10;
    }
  };
  return tagWeight(aTag) - tagWeight(bTag);
};
var tagDedupeKey = (tag) => {
  const { props, tag: tagName, options } = tag;
  if (["base", "title", "titleTemplate", "bodyAttrs", "htmlAttrs"].includes(tagName))
    return tagName;
  if (tagName === "link" && props.rel === "canonical")
    return "canonical";
  if (props.charset)
    return "charset";
  if (options == null ? void 0 : options.key)
    return `${tagName}:${options.key}`;
  const name = ["id"];
  if (tagName === "meta")
    name.push(...["name", "property", "http-equiv"]);
  for (const n of name) {
    if (typeof props[n] !== "undefined") {
      return `${tagName}:${n}:${props[n]}`;
    }
  }
  return tag.runtime.position;
};
function resolveUnrefHeadInput(ref2) {
  const root = resolveUnref(ref2);
  if (!ref2 || !root) {
    return root;
  }
  if (Array.isArray(root)) {
    return root.map(resolveUnrefHeadInput);
  }
  if (typeof root === "object") {
    return Object.fromEntries(
      Object.entries(root).map(([key, value]) => {
        if (key === "titleTemplate")
          return [key, unref(value)];
        return [
          key,
          resolveUnrefHeadInput(value)
        ];
      })
    );
  }
  return root;
}
var resolveTag = (name, input, e) => {
  var _a;
  input = { ...input };
  const tag = {
    tag: name,
    props: {},
    runtime: {
      entryId: e.id
    },
    options: {
      ...e.options
    }
  };
  ["hid", "vmid", "key"].forEach((key) => {
    if (input[key]) {
      tag.options.key = input[key];
      delete input[key];
    }
  });
  ["children", "innerHTML", "textContent"].forEach((key) => {
    if (typeof input[key] !== "undefined") {
      tag.children = input[key];
      delete input[key];
    }
  });
  ["body", "renderPriority"].forEach((key) => {
    if (typeof input[key] !== "undefined") {
      tag.options[key] = input[key];
      delete input[key];
    }
  });
  if ((_a = tag.options) == null ? void 0 : _a.body)
    input[BODY_TAG_ATTR_NAME] = true;
  tag.props = input;
  return tag;
};
var headInputToTags = (e) => {
  return Object.entries(e.input).filter(([, v2]) => typeof v2 !== "undefined").map(([key, value]) => {
    return (Array.isArray(value) ? value : [value]).map((props) => {
      switch (key) {
        case "title":
        case "titleTemplate":
          return {
            tag: key,
            children: props,
            props: {},
            runtime: { entryId: e.id },
            options: e.options
          };
        case "base":
        case "meta":
        case "link":
        case "style":
        case "script":
        case "noscript":
        case "htmlAttrs":
        case "bodyAttrs":
          return resolveTag(key, props, e);
        default:
          return false;
      }
    });
  }).flat().filter((v2) => !!v2);
};
var renderTitleTemplate = (template, title) => {
  if (template == null)
    return title || null;
  if (typeof template === "function")
    return template(title);
  return template.replace("%s", title != null ? title : "");
};
var resolveHeadEntriesToTags = (entries) => {
  const deduping = {};
  const resolvedEntries = resolveHeadEntries(entries);
  resolvedEntries.forEach((entry2, entryIndex) => {
    const tags = headInputToTags(entry2);
    tags.forEach((tag, tagIdx) => {
      tag.runtime = tag.runtime || {};
      tag.runtime.position = entryIndex * 1e4 + tagIdx;
      deduping[tagDedupeKey(tag)] = tag;
    });
  });
  let resolvedTags = Object.values(deduping).sort((a, b2) => a.runtime.position - b2.runtime.position).sort(sortTags);
  const titleTemplateIdx = resolvedTags.findIndex((i) => i.tag === "titleTemplate");
  const titleIdx = resolvedTags.findIndex((i) => i.tag === "title");
  if (titleIdx !== -1 && titleTemplateIdx !== -1) {
    const newTitle = renderTitleTemplate(
      resolvedTags[titleTemplateIdx].children,
      resolvedTags[titleIdx].children
    );
    if (newTitle !== null) {
      resolvedTags[titleIdx].children = newTitle || resolvedTags[titleIdx].children;
    } else {
      resolvedTags = resolvedTags.filter((_, i) => i !== titleIdx);
    }
    resolvedTags = resolvedTags.filter((_, i) => i !== titleTemplateIdx);
  } else if (titleTemplateIdx !== -1) {
    const newTitle = renderTitleTemplate(
      resolvedTags[titleTemplateIdx].children
    );
    if (newTitle !== null) {
      resolvedTags[titleTemplateIdx].children = newTitle;
      resolvedTags[titleTemplateIdx].tag = "title";
    } else {
      resolvedTags = resolvedTags.filter((_, i) => i !== titleTemplateIdx);
    }
  }
  return resolvedTags;
};
function isEqualNode(oldTag, newTag) {
  if (oldTag instanceof HTMLElement && newTag instanceof HTMLElement) {
    const nonce = newTag.getAttribute("nonce");
    if (nonce && !oldTag.getAttribute("nonce")) {
      const cloneTag = newTag.cloneNode(true);
      cloneTag.setAttribute("nonce", "");
      cloneTag.nonce = nonce;
      return nonce === oldTag.nonce && oldTag.isEqualNode(cloneTag);
    }
  }
  return oldTag.isEqualNode(newTag);
}
var setAttrs = (el, attrs) => {
  const existingAttrs = el.getAttribute(HEAD_ATTRS_KEY);
  if (existingAttrs) {
    for (const key of existingAttrs.split(",")) {
      if (!(key in attrs))
        el.removeAttribute(key);
    }
  }
  const keys = [];
  for (const key in attrs) {
    const value = attrs[key];
    if (value == null)
      continue;
    if (value === false)
      el.removeAttribute(key);
    else
      el.setAttribute(key, value);
    keys.push(key);
  }
  if (keys.length)
    el.setAttribute(HEAD_ATTRS_KEY, keys.join(","));
  else
    el.removeAttribute(HEAD_ATTRS_KEY);
};
var createElement = (tag, document) => {
  var _a;
  const $el = document.createElement(tag.tag);
  Object.entries(tag.props).forEach(([k2, v2]) => {
    if (v2 !== false) {
      $el.setAttribute(k2, v2 === true ? "" : String(v2));
    }
  });
  if (tag.children) {
    if ((_a = tag.options) == null ? void 0 : _a.safe) {
      if (tag.tag !== "script")
        $el.textContent = tag.children;
    } else {
      $el.innerHTML = tag.children;
    }
  }
  return $el;
};
var updateElements = (document = window.document, type, tags) => {
  var _a, _b;
  const head = document.head;
  const body = document.body;
  let headCountEl = head.querySelector(`meta[name="${HEAD_COUNT_KEY}"]`);
  const bodyMetaElements = body.querySelectorAll(`[${BODY_TAG_ATTR_NAME}]`);
  const headCount = headCountEl ? Number(headCountEl.getAttribute("content")) : 0;
  const oldHeadElements = [];
  const oldBodyElements = [];
  if (bodyMetaElements) {
    for (let i = 0; i < bodyMetaElements.length; i++) {
      if (bodyMetaElements[i] && ((_a = bodyMetaElements[i].tagName) == null ? void 0 : _a.toLowerCase()) === type)
        oldBodyElements.push(bodyMetaElements[i]);
    }
  }
  if (headCountEl) {
    for (let i = 0, j = headCountEl.previousElementSibling; i < headCount; i++, j = (j == null ? void 0 : j.previousElementSibling) || null) {
      if (((_b = j == null ? void 0 : j.tagName) == null ? void 0 : _b.toLowerCase()) === type)
        oldHeadElements.push(j);
    }
  } else {
    headCountEl = document.createElement("meta");
    headCountEl.setAttribute("name", HEAD_COUNT_KEY);
    headCountEl.setAttribute("content", "0");
    head.append(headCountEl);
  }
  let newElements = tags.map((tag) => {
    var _a3;
    var _a2;
    return {
      element: createElement(tag, document),
      body: (_a3 = (_a2 = tag.options) == null ? void 0 : _a2.body) != null ? _a3 : false
    };
  });
  newElements = newElements.filter((newEl) => {
    for (let i = 0; i < oldHeadElements.length; i++) {
      const oldEl = oldHeadElements[i];
      if (isEqualNode(oldEl, newEl.element)) {
        oldHeadElements.splice(i, 1);
        return false;
      }
    }
    for (let i = 0; i < oldBodyElements.length; i++) {
      const oldEl = oldBodyElements[i];
      if (isEqualNode(oldEl, newEl.element)) {
        oldBodyElements.splice(i, 1);
        return false;
      }
    }
    return true;
  });
  oldBodyElements.forEach((t) => {
    var _a2;
    return (_a2 = t.parentNode) == null ? void 0 : _a2.removeChild(t);
  });
  oldHeadElements.forEach((t) => {
    var _a2;
    return (_a2 = t.parentNode) == null ? void 0 : _a2.removeChild(t);
  });
  newElements.forEach((t) => {
    if (t.body)
      body.insertAdjacentElement("beforeend", t.element);
    else
      head.insertBefore(t.element, headCountEl);
  });
  headCountEl.setAttribute(
    "content",
    `${headCount - oldHeadElements.length + newElements.filter((t) => !t.body).length}`
  );
};
var updateDOM = async (head, previousTags, document) => {
  var _a, _b;
  const tags = {};
  if (!document)
    document = window.document;
  for (const k2 in head.hooks["before:dom"]) {
    if (await head.hooks["before:dom"][k2]() === false)
      return;
  }
  const resolvedEntries = resolveHeadEntries(head.headEntries);
  for (const h2 in head.hooks["resolved:entries"])
    await head.hooks["resolved:entries"][h2](resolvedEntries);
  const headTags = resolveHeadEntriesToTags(resolvedEntries);
  for (const h2 in head.hooks["resolved:tags"])
    await head.hooks["resolved:tags"][h2](headTags);
  for (const tag of headTags) {
    switch (tag.tag) {
      case "title":
        if (typeof tag.children !== "undefined")
          document.title = tag.children;
        break;
      case "base":
      case "meta":
      case "link":
      case "style":
      case "script":
      case "noscript":
        tags[tag.tag] = tags[tag.tag] || [];
        tags[tag.tag].push(tag);
        break;
    }
  }
  setAttrs(document.documentElement, ((_a = headTags.find((t) => t.tag === "htmlAttrs")) == null ? void 0 : _a.props) || {});
  setAttrs(document.body, ((_b = headTags.find((t) => t.tag === "bodyAttrs")) == null ? void 0 : _b.props) || {});
  const tagKeys = /* @__PURE__ */ new Set([...Object.keys(tags), ...previousTags]);
  for (const tag of tagKeys)
    updateElements(document, tag, tags[tag] || []);
  previousTags.clear();
  Object.keys(tags).forEach((i) => previousTags.add(i));
};
version.startsWith("2.");
var createHead = (initHeadObject) => {
  let entries = [];
  let entryId = 0;
  const previousTags = /* @__PURE__ */ new Set();
  let domUpdateTick = null;
  const head = {
    install(app) {
      if (app.config.globalProperties)
        app.config.globalProperties.$head = head;
      app.provide(PROVIDE_KEY, head);
    },
    hooks: {
      "before:dom": [],
      "resolved:tags": [],
      "resolved:entries": []
    },
    get headEntries() {
      return entries;
    },
    get headTags() {
      const resolvedEntries = resolveHeadEntries(head.headEntries);
      return resolveHeadEntriesToTags(resolvedEntries);
    },
    addHeadObjs(input, options) {
      return head.addEntry(input, options);
    },
    addEntry(input, options = {}) {
      let resolved = false;
      if (options == null ? void 0 : options.resolved) {
        resolved = true;
        delete options.resolved;
      }
      const entry2 = {
        id: entryId++,
        options,
        resolved,
        input
      };
      entries.push(entry2);
      return {
        remove() {
          entries = entries.filter((_objs) => _objs.id !== entry2.id);
        },
        update(updatedInput) {
          entries = entries.map((e) => {
            if (e.id === entry2.id)
              e.input = updatedInput;
            return e;
          });
        }
      };
    },
    async updateDOM(document, force) {
      const doDomUpdate = () => {
        domUpdateTick = null;
        return updateDOM(head, previousTags, document);
      };
      if (force)
        return doDomUpdate();
      return domUpdateTick = domUpdateTick || new Promise((resolve) => nextTick(() => resolve(doDomUpdate())));
    },
    addReactiveEntry(input, options = {}) {
      let entrySideEffect = null;
      const cleanUpWatch = watchEffect(() => {
        const resolvedInput = resolveUnrefHeadInput(input);
        if (entrySideEffect === null) {
          entrySideEffect = head.addEntry(
            resolvedInput,
            { ...options, resolved: true }
          );
        } else {
          entrySideEffect.update(resolvedInput);
        }
      });
      return () => {
        cleanUpWatch();
        if (entrySideEffect)
          entrySideEffect.remove();
      };
    }
  };
  if (initHeadObject)
    head.addEntry(initHeadObject);
  return head;
};
const appHead = { "meta": [{ "name": "viewport", "content": "width=device-width, initial-scale=1" }, { "charset": "utf-8" }], "link": [], "style": [], "script": [], "noscript": [] };
const appLayoutTransition = { "name": "layout", "mode": "out-in" };
const appPageTransition = { "name": "page", "mode": "out-in" };
const appKeepalive = false;
const node_modules_nuxt_dist_head_runtime_lib_vueuse_head_plugin_mjs_D7WGfuP1A0 = defineNuxtPlugin((nuxtApp) => {
  const head = createHead();
  head.addEntry(appHead, { resolved: true });
  nuxtApp.vueApp.use(head);
  nuxtApp._useHead = (_meta, options) => {
    {
      head.addEntry(_meta, options);
      return;
    }
  };
  {
    nuxtApp.ssrContext.renderMeta = async () => {
      const meta2 = await renderHeadToString(head);
      return {
        ...meta2,
        bodyScripts: meta2.bodyTags
      };
    };
  }
});
const metaMixin = {
  created() {
    const instance = getCurrentInstance();
    if (!instance) {
      return;
    }
    const options = instance.type;
    if (!options || !("head" in options)) {
      return;
    }
    const nuxtApp = useNuxtApp();
    const source = typeof options.head === "function" ? () => options.head(nuxtApp) : options.head;
    useHead(source);
  }
};
const node_modules_nuxt_dist_head_runtime_mixin_plugin_mjs_prWV5EzJWI = defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.mixin(metaMixin);
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const meta$8 = void 0;
const meta$7 = void 0;
const meta$6 = void 0;
const meta$5 = void 0;
var L = Object.defineProperty, z = Object.defineProperties, B = Object.getOwnPropertyDescriptors, b = Object.getOwnPropertySymbols, D = Object.prototype.hasOwnProperty, U = Object.prototype.propertyIsEnumerable, v = (o, t, e) => t in o ? L(o, t, { enumerable: true, configurable: true, writable: true, value: e }) : o[t] = e, h = (o, t) => {
  for (var e in t || (t = {}))
    D.call(t, e) && v(o, e, t[e]);
  if (b)
    for (var e of b(t))
      U.call(t, e) && v(o, e, t[e]);
  return o;
}, y = (o, t) => z(o, B(t));
const V = (o) => new Promise((t, e) => {
  return;
}), H = function(o, t) {
  if (!o)
    return null;
  let e = {};
  for (let r in o) {
    let s = o[r];
    t.indexOf(r) > -1 && s !== null && (e[r] = s);
  }
  return e;
}, J = (o) => o === "email";
var Y = {
  nodes: {
    horizontal_rule() {
      return {
        singleTag: "hr"
      };
    },
    blockquote() {
      return {
        tag: "blockquote"
      };
    },
    bullet_list() {
      return {
        tag: "ul"
      };
    },
    code_block(o) {
      return {
        tag: [
          "pre",
          {
            tag: "code",
            attrs: o.attrs
          }
        ]
      };
    },
    hard_break() {
      return {
        singleTag: "br"
      };
    },
    heading(o) {
      return {
        tag: `h${o.attrs.level}`
      };
    },
    image(o) {
      return {
        singleTag: [
          {
            tag: "img",
            attrs: H(o.attrs, ["src", "alt", "title"])
          }
        ]
      };
    },
    list_item() {
      return {
        tag: "li"
      };
    },
    ordered_list() {
      return {
        tag: "ol"
      };
    },
    paragraph() {
      return {
        tag: "p"
      };
    }
  },
  marks: {
    bold() {
      return {
        tag: "b"
      };
    },
    strike() {
      return {
        tag: "strike"
      };
    },
    underline() {
      return {
        tag: "u"
      };
    },
    strong() {
      return {
        tag: "strong"
      };
    },
    code() {
      return {
        tag: "code"
      };
    },
    italic() {
      return {
        tag: "i"
      };
    },
    link(o) {
      const t = h({}, o.attrs), { linktype: e = "url" } = o.attrs;
      return J(e) && (t.href = `mailto:${t.href}`), t.anchor && (t.href = `${t.href}#${t.anchor}`, delete t.anchor), {
        tag: [
          {
            tag: "a",
            attrs: t
          }
        ]
      };
    },
    styled(o) {
      return {
        tag: [
          {
            tag: "span",
            attrs: o.attrs
          }
        ]
      };
    }
  }
};
const F = function(o) {
  const t = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }, e = /[&<>"']/g, r = RegExp(e.source);
  return o && r.test(o) ? o.replace(e, (s) => t[s]) : o;
};
class R {
  constructor(t) {
    t || (t = Y), this.marks = t.marks || [], this.nodes = t.nodes || [];
  }
  addNode(t, e) {
    this.nodes[t] = e;
  }
  addMark(t, e) {
    this.marks[t] = e;
  }
  render(t = {}) {
    if (t.content && Array.isArray(t.content)) {
      let e = "";
      return t.content.forEach((r) => {
        e += this.renderNode(r);
      }), e;
    }
    return console.warn("The render method must receive an object with a content field, which is an array"), "";
  }
  renderNode(t) {
    let e = [];
    t.marks && t.marks.forEach((s) => {
      const n = this.getMatchingMark(s);
      n && e.push(this.renderOpeningTag(n.tag));
    });
    const r = this.getMatchingNode(t);
    return r && r.tag && e.push(this.renderOpeningTag(r.tag)), t.content ? t.content.forEach((s) => {
      e.push(this.renderNode(s));
    }) : t.text ? e.push(F(t.text)) : r && r.singleTag ? e.push(this.renderTag(r.singleTag, " /")) : r && r.html && e.push(r.html), r && r.tag && e.push(this.renderClosingTag(r.tag)), t.marks && t.marks.slice(0).reverse().forEach((s) => {
      const n = this.getMatchingMark(s);
      n && e.push(this.renderClosingTag(n.tag));
    }), e.join("");
  }
  renderTag(t, e) {
    return t.constructor === String ? `<${t}${e}>` : t.map((s) => {
      if (s.constructor === String)
        return `<${s}${e}>`;
      {
        let n = `<${s.tag}`;
        if (s.attrs)
          for (let a in s.attrs) {
            let i = s.attrs[a];
            i !== null && (n += ` ${a}="${i}"`);
          }
        return `${n}${e}>`;
      }
    }).join("");
  }
  renderOpeningTag(t) {
    return this.renderTag(t, "");
  }
  renderClosingTag(t) {
    return t.constructor === String ? `</${t}>` : t.slice(0).reverse().map((r) => r.constructor === String ? `</${r}>` : `</${r.tag}>`).join("");
  }
  getMatchingNode(t) {
    if (typeof this.nodes[t.type] == "function")
      return this.nodes[t.type](t);
  }
  getMatchingMark(t) {
    if (typeof this.marks[t.type] == "function")
      return this.marks[t.type](t);
  }
}
/*!
 * storyblok-js-client v4.5.2
 * Universal JavaScript SDK for Storyblok's API
 * (c) 2020-2022 Stobylok Team
 */
function w(o) {
  return typeof o == "number" && o == o && o !== 1 / 0 && o !== -1 / 0;
}
function $(o, t, e) {
  if (!w(t))
    throw new TypeError("Expected `limit` to be a finite number");
  if (!w(e))
    throw new TypeError("Expected `interval` to be a finite number");
  var r = [], s = [], n = 0, a = function() {
    n++;
    var c = setTimeout(function() {
      n--, r.length > 0 && a(), s = s.filter(function(u) {
        return u !== c;
      });
    }, e);
    s.indexOf(c) < 0 && s.push(c);
    var l = r.shift();
    l.resolve(o.apply(l.self, l.args));
  }, i = function() {
    var c = arguments, l = this;
    return new Promise(function(u, p) {
      r.push({ resolve: u, reject: p, args: c, self: l }), n < t && a();
    });
  };
  return i.abort = function() {
    s.forEach(clearTimeout), s = [], r.forEach(function(c) {
      c.reject(new throttle.AbortError());
    }), r.length = 0;
  }, i;
}
$.AbortError = function() {
  Error.call(this, "Throttled function aborted"), this.name = "AbortError";
};
const K = function(o, t) {
  if (!o)
    return null;
  let e = {};
  for (let r in o) {
    let s = o[r];
    t.indexOf(r) > -1 && s !== null && (e[r] = s);
  }
  return e;
};
var G = { nodes: { horizontal_rule: () => ({ singleTag: "hr" }), blockquote: () => ({ tag: "blockquote" }), bullet_list: () => ({ tag: "ul" }), code_block: (o) => ({ tag: ["pre", { tag: "code", attrs: o.attrs }] }), hard_break: () => ({ singleTag: "br" }), heading: (o) => ({ tag: `h${o.attrs.level}` }), image: (o) => ({ singleTag: [{ tag: "img", attrs: K(o.attrs, ["src", "alt", "title"]) }] }), list_item: () => ({ tag: "li" }), ordered_list: () => ({ tag: "ol" }), paragraph: () => ({ tag: "p" }) }, marks: { bold: () => ({ tag: "b" }), strike: () => ({ tag: "strike" }), underline: () => ({ tag: "u" }), strong: () => ({ tag: "strong" }), code: () => ({ tag: "code" }), italic: () => ({ tag: "i" }), link(o) {
  const t = h({}, o.attrs), { linktype: e = "url" } = o.attrs;
  return e === "email" && (t.href = `mailto:${t.href}`), t.anchor && (t.href = `${t.href}#${t.anchor}`, delete t.anchor), { tag: [{ tag: "a", attrs: t }] };
}, styled: (o) => ({ tag: [{ tag: "span", attrs: o.attrs }] }) } };
class Q {
  constructor(t) {
    t || (t = G), this.marks = t.marks || [], this.nodes = t.nodes || [];
  }
  addNode(t, e) {
    this.nodes[t] = e;
  }
  addMark(t, e) {
    this.marks[t] = e;
  }
  render(t = {}) {
    if (t.content && Array.isArray(t.content)) {
      let e = "";
      return t.content.forEach((r) => {
        e += this.renderNode(r);
      }), e;
    }
    return console.warn("The render method must receive an object with a content field, which is an array"), "";
  }
  renderNode(t) {
    let e = [];
    t.marks && t.marks.forEach((s) => {
      const n = this.getMatchingMark(s);
      n && e.push(this.renderOpeningTag(n.tag));
    });
    const r = this.getMatchingNode(t);
    return r && r.tag && e.push(this.renderOpeningTag(r.tag)), t.content ? t.content.forEach((s) => {
      e.push(this.renderNode(s));
    }) : t.text ? e.push(function(s) {
      const n = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, a = /[&<>"']/g, i = RegExp(a.source);
      return s && i.test(s) ? s.replace(a, (c) => n[c]) : s;
    }(t.text)) : r && r.singleTag ? e.push(this.renderTag(r.singleTag, " /")) : r && r.html && e.push(r.html), r && r.tag && e.push(this.renderClosingTag(r.tag)), t.marks && t.marks.slice(0).reverse().forEach((s) => {
      const n = this.getMatchingMark(s);
      n && e.push(this.renderClosingTag(n.tag));
    }), e.join("");
  }
  renderTag(t, e) {
    return t.constructor === String ? `<${t}${e}>` : t.map((r) => {
      if (r.constructor === String)
        return `<${r}${e}>`;
      {
        let s = `<${r.tag}`;
        if (r.attrs)
          for (let n in r.attrs) {
            let a = r.attrs[n];
            a !== null && (s += ` ${n}="${a}"`);
          }
        return `${s}${e}>`;
      }
    }).join("");
  }
  renderOpeningTag(t) {
    return this.renderTag(t, "");
  }
  renderClosingTag(t) {
    return t.constructor === String ? `</${t}>` : t.slice(0).reverse().map((e) => e.constructor === String ? `</${e}>` : `</${e.tag}>`).join("");
  }
  getMatchingNode(t) {
    if (typeof this.nodes[t.type] == "function")
      return this.nodes[t.type](t);
  }
  getMatchingMark(t) {
    if (typeof this.marks[t.type] == "function")
      return this.marks[t.type](t);
  }
}
const W = (o = 0, t = o) => {
  const e = Math.abs(t - o) || 0, r = o < t ? 1 : -1;
  return ((s = 0, n) => [...Array(s)].map(n))(e, (s, n) => n * r + o);
}, k = (o, t, e) => {
  const r = [];
  for (const s in o) {
    if (!Object.prototype.hasOwnProperty.call(o, s))
      continue;
    const n = o[s], a = e ? "" : encodeURIComponent(s);
    let i;
    i = typeof n == "object" ? k(n, t ? t + encodeURIComponent("[" + a + "]") : a, Array.isArray(n)) : (t ? t + encodeURIComponent("[" + a + "]") : a) + "=" + encodeURIComponent(n), r.push(i);
  }
  return r.join("&");
};
let f = {}, d = {};
class X {
  constructor(t, e) {
    if (!e) {
      let n = t.region ? `-${t.region}` : "", a = t.https === false ? "http" : "https";
      e = t.oauthToken === void 0 ? `${a}://api${n}.storyblok.com/v2` : `${a}://api${n}.storyblok.com/v1`;
    }
    let r = Object.assign({}, t.headers), s = 5;
    t.oauthToken !== void 0 && (r.Authorization = t.oauthToken, s = 3), t.rateLimit !== void 0 && (s = t.rateLimit), this.richTextResolver = new Q(t.richTextSchema), typeof t.componentResolver == "function" && this.setComponentResolver(t.componentResolver), this.maxRetries = t.maxRetries || 5, this.throttle = $(this.throttledRequest, s, 1e3), this.accessToken = t.accessToken, this.relations = {}, this.links = {}, this.cache = t.cache || { clear: "manual" }, this.client = q.create({ baseURL: e, timeout: t.timeout || 0, headers: r, proxy: t.proxy || false }), t.responseInterceptor && this.client.interceptors.response.use((n) => t.responseInterceptor(n)), this.resolveNestedRelations = t.resolveNestedRelations || true;
  }
  setComponentResolver(t) {
    this.richTextResolver.addNode("blok", (e) => {
      let r = "";
      return e.attrs.body.forEach((s) => {
        r += t(s.component, s);
      }), { html: r };
    });
  }
  parseParams(t = {}) {
    return t.version || (t.version = "published"), t.token || (t.token = this.getToken()), t.cv || (t.cv = d[t.token]), Array.isArray(t.resolve_relations) && (t.resolve_relations = t.resolve_relations.join(",")), t;
  }
  factoryParamOptions(t, e = {}) {
    return ((r = "") => r.indexOf("/cdn/") > -1)(t) ? this.parseParams(e) : e;
  }
  makeRequest(t, e, r, s) {
    const n = this.factoryParamOptions(t, ((a = {}, i = 25, c = 1) => y(h({}, a), { per_page: i, page: c }))(e, r, s));
    return this.cacheResponse(t, n);
  }
  get(t, e) {
    let r = `/${t}`;
    const s = this.factoryParamOptions(r, e);
    return this.cacheResponse(r, s);
  }
  async getAll(t, e = {}, r) {
    const s = e.per_page || 25, n = `/${t}`, a = n.split("/");
    r = r || a[a.length - 1];
    const i = await this.makeRequest(n, e, s, 1), c = Math.ceil(i.total / s);
    return ((l = [], u) => l.map(u).reduce((p, O) => [...p, ...O], []))([i, ...await (async (l = [], u) => Promise.all(l.map(u)))(W(1, c), async (l) => this.makeRequest(n, e, s, l + 1))], (l) => Object.values(l.data[r]));
  }
  post(t, e) {
    let r = `/${t}`;
    return this.throttle("post", r, e);
  }
  put(t, e) {
    let r = `/${t}`;
    return this.throttle("put", r, e);
  }
  delete(t, e) {
    let r = `/${t}`;
    return this.throttle("delete", r, e);
  }
  getStories(t) {
    return this.get("cdn/stories", t);
  }
  getStory(t, e) {
    return this.get(`cdn/stories/${t}`, e);
  }
  setToken(t) {
    this.accessToken = t;
  }
  getToken() {
    return this.accessToken;
  }
  _cleanCopy(t) {
    return JSON.parse(JSON.stringify(t));
  }
  _insertLinks(t, e) {
    const r = t[e];
    r && r.fieldtype == "multilink" && r.linktype == "story" && typeof r.id == "string" && this.links[r.id] ? r.story = this._cleanCopy(this.links[r.id]) : r && r.linktype === "story" && typeof r.uuid == "string" && this.links[r.uuid] && (r.story = this._cleanCopy(this.links[r.uuid]));
  }
  _insertRelations(t, e, r) {
    if (r.indexOf(t.component + "." + e) > -1) {
      if (typeof t[e] == "string")
        this.relations[t[e]] && (t[e] = this._cleanCopy(this.relations[t[e]]));
      else if (t[e].constructor === Array) {
        let s = [];
        t[e].forEach((n) => {
          this.relations[n] && s.push(this._cleanCopy(this.relations[n]));
        }), t[e] = s;
      }
    }
  }
  _insertAssetsRelations(t, e) {
    e.forEach((r) => {
      t.id === r.id && (t.original = r, t.original.filename = t.filename, t.original.filename = t.original.filename.includes("https://s3.amazonaws.com/") ? t.original.filename : t.original.filename.replace("https://", "https://s3.amazonaws.com/"), delete t.original.s3_filename);
    });
  }
  iterateTree(t, e) {
    let r = (s) => {
      if (s != null) {
        if (s.constructor === Array)
          for (let n = 0; n < s.length; n++)
            r(s[n]);
        else if (s.constructor === Object) {
          if (s._stopResolving)
            return;
          for (let n in s)
            s.component && s._uid || s.type === "link" ? (this._insertRelations(s, n, e), this._insertLinks(s, n)) : "id" in s && s.fieldtype === "asset" && this._insertAssetsRelations(s, e), r(s[n]);
        }
      }
    };
    r(t.content);
  }
  async resolveLinks(t, e) {
    let r = [];
    if (t.link_uuids) {
      const s = t.link_uuids.length;
      let n = [];
      const a = 50;
      for (let i = 0; i < s; i += a) {
        const c = Math.min(s, i + a);
        n.push(t.link_uuids.slice(i, c));
      }
      for (let i = 0; i < n.length; i++)
        (await this.getStories({ per_page: a, language: e.language, version: e.version, by_uuids: n[i].join(",") })).data.stories.forEach((c) => {
          r.push(c);
        });
    } else
      r = t.links;
    r.forEach((s) => {
      this.links[s.uuid] = y(h({}, s), { _stopResolving: true });
    });
  }
  async resolveRelations(t, e) {
    let r = [];
    if (t.rel_uuids) {
      const s = t.rel_uuids.length;
      let n = [];
      const a = 50;
      for (let i = 0; i < s; i += a) {
        const c = Math.min(s, i + a);
        n.push(t.rel_uuids.slice(i, c));
      }
      for (let i = 0; i < n.length; i++)
        (await this.getStories({ per_page: a, language: e.language, version: e.version, by_uuids: n[i].join(",") })).data.stories.forEach((c) => {
          r.push(c);
        });
    } else
      r = t.rels;
    r.forEach((s) => {
      this.relations[s.uuid] = y(h({}, s), { _stopResolving: true });
    });
  }
  async resolveStories(t, e) {
    let r = [];
    if (e.resolve_relations !== void 0 && e.resolve_relations.length > 0 && (t.rels || t.rel_uuids) && (r = e.resolve_relations.split(","), await this.resolveRelations(t, e)), ["1", "story", "url"].indexOf(e.resolve_links) > -1 && (t.links || t.link_uuids) && await this.resolveLinks(t, e), this.resolveNestedRelations)
      for (const s in this.relations)
        this.iterateTree(this.relations[s], r);
    t.story ? this.iterateTree(t.story, r) : t.stories.forEach((s) => {
      this.iterateTree(s, r);
    });
  }
  resolveAssetsRelations(t) {
    const { assets: e, stories: r, story: s } = t;
    if (r)
      for (const n of r)
        this.iterateTree(n, e);
    else {
      if (!s)
        return t;
      this.iterateTree(s, e);
    }
  }
  cacheResponse(t, e, r) {
    return r === void 0 && (r = 0), new Promise(async (s, n) => {
      let a = k({ url: t, params: e }), i = this.cacheProvider();
      if (this.cache.clear === "auto" && e.version === "draft" && await this.flushCache(), e.version === "published" && t != "/cdn/spaces/me") {
        const l = await i.get(a);
        if (l)
          return s(l);
      }
      try {
        let l = await this.throttle("get", t, { params: e, paramsSerializer: (p) => k(p) }), u = { data: l.data, headers: l.headers };
        if (u.data.assets && u.data.assets.length && this.resolveAssetsRelations(u.data), l.headers["per-page"] && (u = Object.assign({}, u, { perPage: parseInt(l.headers["per-page"]), total: parseInt(l.headers.total) })), l.status != 200)
          return n(l);
        (u.data.story || u.data.stories) && await this.resolveStories(u.data, e), e.version === "published" && t != "/cdn/spaces/me" && i.set(a, u), u.data.cv && (e.version == "draft" && d[e.token] != u.data.cv && this.flushCache(), d[e.token] = u.data.cv), s(u);
      } catch (l) {
        if (l.response && l.response.status === 429 && (r += 1) < this.maxRetries)
          return console.log(`Hit rate limit. Retrying in ${r} seconds.`), await (c = 1e3 * r, new Promise((u) => setTimeout(u, c))), this.cacheResponse(t, e, r).then(s).catch(n);
        n(l);
      }
      var c;
    });
  }
  throttledRequest(t, e, r) {
    return this.client[t](e, r);
  }
  cacheVersions() {
    return d;
  }
  cacheVersion() {
    return d[this.accessToken];
  }
  setCacheVersion(t) {
    this.accessToken && (d[this.accessToken] = t);
  }
  cacheProvider() {
    return this.cache.type === "memory" ? { get: (t) => f[t], getAll: () => f, set(t, e) {
      f[t] = e;
    }, flush() {
      f = {};
    } } : { get() {
    }, getAll() {
    }, set() {
    }, flush() {
    } };
  }
  async flushCache() {
    return await this.cacheProvider().flush(), this;
  }
}
const at = (o = {}) => {
  const { apiOptions: t } = o;
  if (!t.accessToken) {
    console.error("You need to provide an access token to interact with Storyblok API. Read https://www.storyblok.com/docs/api/content-delivery#topics/authentication");
    return;
  }
  return { storyblokApi: new X(t) };
};
var Z = (o) => {
  if (typeof o != "object" || typeof o._editable > "u")
    return {};
  const t = JSON.parse(o._editable.replace(/^<!--#storyblok#/, "").replace(/-->$/, ""));
  return {
    "data-blok-c": JSON.stringify(t),
    "data-blok-uid": t.id + "-" + t.uid
  };
};
let m;
const rt = (o = {}) => {
  const {
    bridge: t,
    accessToken: e,
    use: r = [],
    apiOptions: s = {},
    richText: n = {}
  } = o;
  s.accessToken = s.accessToken || e;
  const a = { bridge: t, apiOptions: s };
  let i = {};
  return r.forEach((c) => {
    i = h(h({}, i), c(a));
  }), t !== false && V(), m = new R(n.schema), n.resolver && E(m, n.resolver), i;
}, E = (o, t) => {
  o.addNode("blok", (e) => {
    let r = "";
    return e.attrs.body.forEach((s) => {
      r += t(s.component, s);
    }), {
      html: r
    };
  });
}, st = /* @__PURE__ */ defineComponent({
  __name: "StoryblokComponent",
  props: {
    blok: null
  },
  setup(o) {
    return (t, e) => (openBlock(), createBlock(resolveDynamicComponent(o.blok.component), normalizeProps(guardReactiveProps({ ...t.$props, ...t.$attrs })), null, 16));
  }
}), ot = {
  beforeMount(o, t) {
    if (t.value) {
      const e = Z(t.value);
      o.setAttribute("data-blok-c", e["data-blok-c"]), o.setAttribute("data-blok-uid", e["data-blok-uid"]), o.classList.add("storyblok__outline");
    }
  }
}, S = (o) => {
  console.error(`You can't use ${o} if you're not loading apiPlugin. Please provide it on StoryblokVue initialization.
    `);
};
let g = null;
const ct = () => (g || S("useStoryblokApi"), g), ht = {
  install(o, t = {}) {
    o.directive("editable", ot), o.component("StoryblokComponent", st);
    const { storyblokApi: e } = rt(t);
    g = e;
  }
};
const meta$4 = void 0;
const meta$3 = void 0;
const meta$2 = void 0;
const meta$1 = void 0;
const meta = void 0;
const _routes = [
  {
    name: "club",
    path: "/club",
    file: "/Users/tobi/Desktop/tobiaszimmer.dev/Kunden/002_tc-dueppenweiler/TCD-Website/pages/club.vue",
    children: [],
    meta: meta$8,
    alias: (meta$8 == null ? void 0 : meta$8.alias) || [],
    redirect: (meta$8 == null ? void 0 : meta$8.redirect) || void 0,
    component: () => import("./_nuxt/club.2aa4b13a.js").then((m2) => m2.default || m2)
  },
  {
    name: "contact",
    path: "/contact",
    file: "/Users/tobi/Desktop/tobiaszimmer.dev/Kunden/002_tc-dueppenweiler/TCD-Website/pages/contact.vue",
    children: [],
    meta: meta$7,
    alias: (meta$7 == null ? void 0 : meta$7.alias) || [],
    redirect: (meta$7 == null ? void 0 : meta$7.redirect) || void 0,
    component: () => import("./_nuxt/contact.fbe2a65e.js").then((m2) => m2.default || m2)
  },
  {
    name: "events",
    path: "/events",
    file: "/Users/tobi/Desktop/tobiaszimmer.dev/Kunden/002_tc-dueppenweiler/TCD-Website/pages/events.vue",
    children: [],
    meta: meta$6,
    alias: (meta$6 == null ? void 0 : meta$6.alias) || [],
    redirect: (meta$6 == null ? void 0 : meta$6.redirect) || void 0,
    component: () => import("./_nuxt/events.c3fc1af0.js").then((m2) => m2.default || m2)
  },
  {
    name: "home",
    path: "/home",
    file: "/Users/tobi/Desktop/tobiaszimmer.dev/Kunden/002_tc-dueppenweiler/TCD-Website/pages/home.vue",
    children: [],
    meta: meta$5,
    alias: (meta$5 == null ? void 0 : meta$5.alias) || [],
    redirect: (meta$5 == null ? void 0 : meta$5.redirect) || void 0,
    component: () => import("./_nuxt/home.d2cfe4e1.js").then((m2) => m2.default || m2)
  },
  {
    name: "index",
    path: "/",
    file: "/Users/tobi/Desktop/tobiaszimmer.dev/Kunden/002_tc-dueppenweiler/TCD-Website/pages/index.vue",
    children: [],
    meta: meta$4,
    alias: (meta$4 == null ? void 0 : meta$4.alias) || [],
    redirect: (meta$4 == null ? void 0 : meta$4.redirect) || void 0,
    component: () => import("./_nuxt/index.2f4762ce.js").then((m2) => m2.default || m2)
  },
  {
    name: "join-us",
    path: "/join-us",
    file: "/Users/tobi/Desktop/tobiaszimmer.dev/Kunden/002_tc-dueppenweiler/TCD-Website/pages/join-us.vue",
    children: [],
    meta: meta$3,
    alias: (meta$3 == null ? void 0 : meta$3.alias) || [],
    redirect: (meta$3 == null ? void 0 : meta$3.redirect) || void 0,
    component: () => import("./_nuxt/join-us.a15373ae.js").then((m2) => m2.default || m2)
  },
  {
    name: "player",
    path: "/player",
    file: "/Users/tobi/Desktop/tobiaszimmer.dev/Kunden/002_tc-dueppenweiler/TCD-Website/pages/player.vue",
    children: [],
    meta: meta$2,
    alias: (meta$2 == null ? void 0 : meta$2.alias) || [],
    redirect: (meta$2 == null ? void 0 : meta$2.redirect) || void 0,
    component: () => import("./_nuxt/player.da2703b5.js").then((m2) => m2.default || m2)
  },
  {
    name: "sub1-teams",
    path: "/sub1/teams",
    file: "/Users/tobi/Desktop/tobiaszimmer.dev/Kunden/002_tc-dueppenweiler/TCD-Website/pages/sub1/teams.vue",
    children: [],
    meta: meta$1,
    alias: (meta$1 == null ? void 0 : meta$1.alias) || [],
    redirect: (meta$1 == null ? void 0 : meta$1.redirect) || void 0,
    component: () => import("./_nuxt/teams.6489f4af.js").then((m2) => m2.default || m2)
  },
  {
    name: "teams",
    path: "/teams",
    file: "/Users/tobi/Desktop/tobiaszimmer.dev/Kunden/002_tc-dueppenweiler/TCD-Website/pages/teams.vue",
    children: [],
    meta,
    alias: (meta == null ? void 0 : meta.alias) || [],
    redirect: (meta == null ? void 0 : meta.redirect) || void 0,
    component: () => import("./_nuxt/teams.de114de6.js").then((m2) => m2.default || m2)
  }
];
const configRouterOptions = {};
const routerOptions = {
  ...configRouterOptions
};
const validate = defineNuxtRouteMiddleware(async (to) => {
  var _a;
  let __temp, __restore;
  if (!((_a = to.meta) == null ? void 0 : _a.validate)) {
    return;
  }
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (typeof result === "boolean") {
    return result;
  }
  return createError(result);
});
const globalMiddleware = [
  validate
];
const namedMiddleware = {};
const node_modules_nuxt_dist_pages_runtime_router_mjs_qNv5Ky2ZmB = defineNuxtPlugin(async (nuxtApp) => {
  var _a, _b, _c, _d;
  let __temp, __restore;
  let routerBase = useRuntimeConfig().app.baseURL;
  if (routerOptions.hashMode && !routerBase.includes("#")) {
    routerBase += "#";
  }
  const history = (_b = (_a = routerOptions.history) == null ? void 0 : _a.call(routerOptions, routerBase)) != null ? _b : createMemoryHistory(routerBase);
  const routes = (_d = (_c = routerOptions.routes) == null ? void 0 : _c.call(routerOptions, _routes)) != null ? _d : _routes;
  const initialURL = nuxtApp.ssrContext.url;
  const router = createRouter({
    ...routerOptions,
    history,
    routes
  });
  nuxtApp.vueApp.use(router);
  const previousRoute = shallowRef(router.currentRoute.value);
  router.afterEach((_to, from) => {
    previousRoute.value = from;
  });
  Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
    get: () => previousRoute.value
  });
  const _route = shallowRef(router.resolve(initialURL));
  const syncCurrentRoute = () => {
    _route.value = router.currentRoute.value;
  };
  nuxtApp.hook("page:finish", syncCurrentRoute);
  router.afterEach((to, from) => {
    var _a2, _b2, _c2, _d2;
    if (((_b2 = (_a2 = to.matched[0]) == null ? void 0 : _a2.components) == null ? void 0 : _b2.default) === ((_d2 = (_c2 = from.matched[0]) == null ? void 0 : _c2.components) == null ? void 0 : _d2.default)) {
      syncCurrentRoute();
    }
  });
  const route = {};
  for (const key in _route.value) {
    route[key] = computed(() => _route.value[key]);
  }
  nuxtApp._route = reactive(route);
  nuxtApp._middleware = nuxtApp._middleware || {
    global: [],
    named: {}
  };
  useError();
  try {
    if (true) {
      ;
      [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
      ;
    }
    ;
    [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
    ;
  } catch (error2) {
    callWithNuxt(nuxtApp, showError, [error2]);
  }
  const initialLayout = useState("_layout");
  router.beforeEach(async (to, from) => {
    var _a2, _b2;
    to.meta = reactive(to.meta);
    if (nuxtApp.isHydrating) {
      to.meta.layout = (_a2 = initialLayout.value) != null ? _a2 : to.meta.layout;
    }
    nuxtApp._processingMiddleware = true;
    const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
    for (const component of to.matched) {
      const componentMiddleware = component.meta.middleware;
      if (!componentMiddleware) {
        continue;
      }
      if (Array.isArray(componentMiddleware)) {
        for (const entry2 of componentMiddleware) {
          middlewareEntries.add(entry2);
        }
      } else {
        middlewareEntries.add(componentMiddleware);
      }
    }
    for (const entry2 of middlewareEntries) {
      const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_b2 = namedMiddleware[entry2]) == null ? void 0 : _b2.call(namedMiddleware).then((r) => r.default || r)) : entry2;
      if (!middleware) {
        throw new Error(`Unknown route middleware: '${entry2}'.`);
      }
      const result = await callWithNuxt(nuxtApp, middleware, [to, from]);
      {
        if (result === false || result instanceof Error) {
          const error2 = result || createError$1({
            statusCode: 404,
            statusMessage: `Page Not Found: ${initialURL}`
          });
          return callWithNuxt(nuxtApp, showError, [error2]);
        }
      }
      if (result || result === false) {
        return result;
      }
    }
  });
  router.afterEach(async (to) => {
    delete nuxtApp._processingMiddleware;
    if (to.matched.length === 0) {
      callWithNuxt(nuxtApp, showError, [createError$1({
        statusCode: 404,
        fatal: false,
        statusMessage: `Page not found: ${to.fullPath}`
      })]);
    } else if (to.matched[0].name === "404" && nuxtApp.ssrContext) {
      nuxtApp.ssrContext.event.res.statusCode = 404;
    } else {
      const currentURL = to.fullPath || "/";
      if (!isEqual(currentURL, initialURL)) {
        await callWithNuxt(nuxtApp, navigateTo, [currentURL]);
      }
    }
  });
  nuxtApp.hooks.hookOnce("app:created", async () => {
    try {
      await router.replace({
        ...router.resolve(initialURL),
        name: void 0,
        force: true
      });
    } catch (error2) {
      callWithNuxt(nuxtApp, showError, [error2]);
    }
  });
  return { provide: { router } };
});
const node_modules__64storyblok_nuxt_src_runtime_plugin_js_9mZ8bwCWc9 = defineNuxtPlugin(({ vueApp }) => {
  let { storyblok } = useRuntimeConfig();
  storyblok = JSON.parse(JSON.stringify(storyblok));
  vueApp.use(ht, { ...storyblok, use: [at] });
});
config.autoAddCss = false;
library.add(fas);
const plugins_fontawesome_js_klhsrycjcK = defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("font-awesome-icon", FontAwesomeIcon, {});
});
const _plugins = [
  _nuxt_components_plugin_mjs_KR1HBZs4kY,
  node_modules_nuxt_dist_head_runtime_lib_vueuse_head_plugin_mjs_D7WGfuP1A0,
  node_modules_nuxt_dist_head_runtime_mixin_plugin_mjs_prWV5EzJWI,
  node_modules_nuxt_dist_pages_runtime_router_mjs_qNv5Ky2ZmB,
  node_modules__64storyblok_nuxt_src_runtime_plugin_js_9mZ8bwCWc9,
  plugins_fontawesome_js_klhsrycjcK
];
const _sfc_main$1 = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const ErrorComponent = defineAsyncComponent(() => import("./_nuxt/error-component.98661b7a.js").then((r) => r.default || r));
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    provide("_route", useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        callWithNuxt(nuxtApp, showError, [err]);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_App = resolveComponent("App");
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(error)) {
            _push(ssrRenderComponent(unref(ErrorComponent), { error: unref(error) }, null, _parent));
          } else {
            _push(ssrRenderComponent(_component_App, null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Fragment = defineComponent({
  setup(_props, { slots }) {
    return () => {
      var _a;
      return (_a = slots.default) == null ? void 0 : _a.call(slots);
    };
  }
});
const _wrapIf = (component, props, slots) => {
  return { default: () => props ? h$1(component, props === true ? {} : props, slots) : h$1(Fragment, {}, slots) };
};
const layouts = {};
const LayoutLoader = defineComponent({
  props: {
    name: String,
    ...{}
  },
  async setup(props, context) {
    const LayoutComponent = await layouts[props.name]().then((r) => r.default || r);
    return () => {
      return h$1(LayoutComponent, {}, context.slots);
    };
  }
});
const __nuxt_component_0 = defineComponent({
  props: {
    name: {
      type: [String, Boolean, Object],
      default: null
    }
  },
  setup(props, context) {
    const injectedRoute = inject("_route");
    const route = injectedRoute === useRoute() ? useRoute$1() : injectedRoute;
    const layout = computed(() => {
      var _a, _b;
      return (_b = (_a = unref(props.name)) != null ? _a : route.meta.layout) != null ? _b : "default";
    });
    return () => {
      var _a;
      const hasLayout = layout.value && layout.value in layouts;
      const transitionProps = (_a = route.meta.layoutTransition) != null ? _a : appLayoutTransition;
      return _wrapIf(Transition, hasLayout && transitionProps, {
        default: () => _wrapIf(LayoutLoader, hasLayout && { key: layout.value, name: layout.value, hasTransition: !!transitionProps }, context.slots).default()
      }).default();
    };
  }
});
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
};
const generateRouteKey = (override, routeProps) => {
  var _a;
  const matchedRoute = routeProps.route.matched.find((m2) => {
    var _a2;
    return ((_a2 = m2.components) == null ? void 0 : _a2.default) === routeProps.Component.type;
  });
  const source = (_a = override != null ? override : matchedRoute == null ? void 0 : matchedRoute.meta.key) != null ? _a : matchedRoute && interpolatePath(routeProps.route, matchedRoute);
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
const __nuxt_component_1 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs }) {
    const nuxtApp = useNuxtApp();
    return () => {
      return h$1(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          var _a, _b, _c, _d;
          if (!routeProps.Component) {
            return;
          }
          const key = generateRouteKey(props.pageKey, routeProps);
          const transitionProps = (_b = (_a = props.transition) != null ? _a : routeProps.route.meta.pageTransition) != null ? _b : appPageTransition;
          const done = nuxtApp.deferHydration();
          return _wrapIf(
            Transition,
            transitionProps,
            wrapInKeepAlive(
              (_d = (_c = props.keepalive) != null ? _c : routeProps.route.meta.keepalive) != null ? _d : appKeepalive,
              h$1(Suspense, {
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => nuxtApp.callHook("page:finish", routeProps.Component).finally(done)
              }, { default: () => h$1(Component, { key, routeProps, pageKey: key, hasTransition: !!transitionProps }) })
            )
          ).default();
        }
      });
    };
  }
});
const Component = defineComponent({
  props: ["routeProps", "pageKey", "hasTransition"],
  setup(props) {
    const previousKey = props.pageKey;
    const previousRoute = props.routeProps.route;
    const route = {};
    for (const key in props.routeProps.route) {
      route[key] = computed(() => previousKey === props.pageKey ? props.routeProps.route[key] : previousRoute[key]);
    }
    provide("_route", reactive(route));
    return () => {
      return h$1(props.routeProps.Component);
    };
  }
});
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLayout = __nuxt_component_0;
  const _component_NuxtPage = __nuxt_component_1;
  _push(ssrRenderComponent(_component_NuxtLayout, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_NuxtPage)
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/pages/runtime/app.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AppComponent = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
let entry;
const plugins = normalizePlugins(_plugins);
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main$1);
    vueApp.component("App", AppComponent);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (err) {
      await nuxt.callHook("app:error", err);
      nuxt.payload.error = nuxt.payload.error || err;
    }
    return vueApp;
  };
}
const entry$1 = (ctx) => entry(ctx);
export {
  _export_sfc as _,
  useState as a,
  useHead as b,
  ct as c,
  __nuxt_component_0$1 as d,
  entry$1 as default,
  useNuxtApp as u
};
//# sourceMappingURL=server.mjs.map
