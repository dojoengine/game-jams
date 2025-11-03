class u extends Error {
  constructor(e, r, n) {
    super(
      typeof r == "object" ? r.message : r || e,
      {
        cause: typeof r == "object" ? r.cause : n
      }
    ), this.type = e, this.name = "TypedError", Object.setPrototypeOf(this, u.prototype);
  }
}
function h(t) {
  return t.replace(/[A-Z]/g, (e) => `_${e.toLowerCase()}`);
}
function S(t) {
  return t.replace(/_[a-z]/g, (e) => e[1].toUpperCase());
}
const w = "ERR_INVALID_VALUE", D = "ERR_UNEXPECTED_VALUE", W = "ERR_UNEXPECTED_TYPE", d = "ERR_PARSE";
function A(t, e) {
  const r = {};
  for (const n in t) {
    const o = t[n];
    if (!o)
      continue;
    let a, c;
    typeof o == "function" ? (a = n, c = o) : [a, c] = o;
    try {
      const s = c(e(a));
      s !== void 0 && (r[n] = s);
    } catch (s) {
      throw new u(
        d,
        `Parser for "${n}" property failed${a === n ? "" : `. Source field: "${a}"`}`,
        s
      );
    }
  }
  return r;
}
function P(t) {
  let e = t;
  if (typeof e == "string")
    try {
      e = JSON.parse(e);
    } catch (r) {
      throw new u(w, { cause: r });
    }
  if (typeof e != "object" || !e || Array.isArray(e))
    throw new u(D);
  return e;
}
function i(t, e) {
  return (r) => {
    const n = (o) => {
      if (!(r && o === void 0))
        try {
          return e(o);
        } catch (a) {
          throw new u(d, {
            message: `"${t}" transformer failed to parse the value`,
            cause: a
          });
        }
    };
    return /* @__PURE__ */ Object.assign(
      n,
      {
        isValid(o) {
          try {
            return n(o), !0;
          } catch {
            return !1;
          }
        }
      }
    );
  };
}
function m(t, e) {
  return i(e || "object", (r) => {
    const n = P(r);
    return A(t, (o) => n[o]);
  });
}
function p(t) {
  throw new u(W, `Unexpected value received: ${JSON.stringify(t)}`);
}
const E = i("boolean", (t) => {
  if (typeof t == "boolean")
    return t;
  const e = String(t);
  if (e === "1" || e === "true")
    return !0;
  if (e === "0" || e === "false")
    return !1;
  p(t);
}), f = i("string", (t) => {
  if (typeof t == "string" || typeof t == "number")
    return t.toString();
  p(t);
}), g = i("number", (t) => {
  if (typeof t == "number")
    return t;
  if (typeof t == "string") {
    const e = Number(t);
    if (!Number.isNaN(e))
      return e;
  }
  p(t);
}), U = i("date", (t) => t instanceof Date ? t : new Date(g()(t) * 1e3));
function R(t, e) {
  return i(e || "searchParams", (r) => {
    typeof r != "string" && !(r instanceof URLSearchParams) && p(r);
    const n = typeof r == "string" ? new URLSearchParams(r) : r;
    return A(t, (o) => {
      const a = n.get(o);
      return a === null ? void 0 : a;
    });
  });
}
function l(t) {
  for (const e in t)
    t[e] = [h(e), t[e]];
  return t;
}
const N = (t) => {
  const e = g(), r = g(!0), n = f(), o = f(!0), a = E(!0), c = m(l({
    addedToAttachmentMenu: a,
    allowsWriteToPm: a,
    firstName: n,
    id: e,
    isBot: a,
    isPremium: a,
    languageCode: o,
    lastName: o,
    photoUrl: o,
    username: o
  }), "User")(!0);
  return R(
    l({
      authDate: U(),
      canSendAfter: r,
      chat: m(
        l({
          id: e,
          type: n,
          title: n,
          photoUrl: o,
          username: o
        }),
        "Chat"
      )(!0),
      chatInstance: o,
      chatType: o,
      hash: n,
      queryId: o,
      receiver: c,
      startParam: o,
      signature: n,
      user: c
    }),
    "initData"
  )(t);
};
function O(t) {
  return /^#[\da-f]{6}$/i.test(t);
}
function T(t) {
  return /^#[\da-f]{3}$/i.test(t);
}
function _(t) {
  const e = t.replace(/\s/g, "").toLowerCase();
  if (O(e))
    return e;
  if (T(e)) {
    let n = "#";
    for (let o = 0; o < 3; o += 1)
      n += e[1 + o].repeat(2);
    return n;
  }
  const r = e.match(/^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/) || e.match(/^rgba\((\d{1,3}),(\d{1,3}),(\d{1,3}),\d{1,3}\)$/);
  if (!r)
    throw new Error(`Value "${t}" does not satisfy any of known RGB formats.`);
  return r.slice(1).reduce((n, o) => {
    const a = parseInt(o, 10).toString(16);
    return n + (a.length === 1 ? "0" : "") + a;
  }, "#");
}
const C = i("rgb", (t) => _(f()(t))), b = i(
  "themeParams",
  (t) => {
    const e = C(!0);
    return Object.entries(P(t)).reduce((r, [n, o]) => (r[S(n)] = e(o), r), {});
  }
);
// @__NO_SIDE_EFFECTS__
function y(t) {
  return JSON.stringify(
    Object.fromEntries(
      Object.entries(t).map(([e, r]) => [h(e), r])
    )
  );
}
const V = (t) => {
  const e = f(), r = f(!0), n = E(!0);
  return R({
    botInline: ["tgWebAppBotInline", n],
    defaultColors: ["tgWebAppDefaultColors", b(!0)],
    fullscreen: ["tgWebAppFullscreen", n],
    initData: ["tgWebAppData", N(!0)],
    initDataRaw: ["tgWebAppData", r],
    platform: ["tgWebAppPlatform", e],
    showSettings: ["tgWebAppShowSettings", n],
    startParam: ["tgWebAppStartParam", r],
    themeParams: ["tgWebAppThemeParams", b()],
    version: ["tgWebAppVersion", e]
  }, "launchParams")(t);
};
// @__NO_SIDE_EFFECTS__
function $(t) {
  const {
    initDataRaw: e,
    startParam: r,
    showSettings: n,
    botInline: o,
    fullscreen: a,
    defaultColors: c
  } = t, s = new URLSearchParams();
  return s.set("tgWebAppPlatform", t.platform), s.set("tgWebAppThemeParams", /* @__PURE__ */ y(t.themeParams)), s.set("tgWebAppVersion", t.version), e && s.set("tgWebAppData", e), r && s.set("tgWebAppStartParam", r), typeof n == "boolean" && s.set("tgWebAppShowSettings", n ? "1" : "0"), typeof o == "boolean" && s.set("tgWebAppBotInline", o ? "1" : "0"), typeof a == "boolean" && s.set("tgWebAppFullscreen", a ? "1" : "0"), c && s.set("tgWebAppDefaultColors", /* @__PURE__ */ y(c)), s.toString();
}
const j = m({
  eventType: f(),
  eventData: (t) => t
}, "miniAppsMessage");
function L(t, e) {
  return i(e || "array", (r) => {
    let n;
    if (Array.isArray(r))
      n = r;
    else if (typeof r == "string")
      try {
        const o = JSON.parse(r);
        Array.isArray(o) && (n = o);
      } catch {
      }
    return n || p(r), n.map(t);
  });
}
const I = i("fn", (t) => {
  if (typeof t == "function")
    return t;
  p(t);
});
function B(t) {
  return !!t && typeof t == "object" && !Array.isArray(t);
}
export {
  w as ERR_INVALID_VALUE,
  d as ERR_PARSE,
  W as ERR_UNEXPECTED_TYPE,
  D as ERR_UNEXPECTED_VALUE,
  L as array,
  E as boolean,
  i as createTransformerGen,
  U as date,
  I as fn,
  N as initData,
  O as isRGB,
  T as isRGBShort,
  B as isRecord,
  V as launchParams,
  j as miniAppsMessage,
  g as number,
  m as object,
  C as rgb,
  R as searchParams,
  $ as serializeLaunchParams,
  y as serializeThemeParams,
  f as string,
  b as themeParams,
  _ as toRGB,
  P as toRecord
};
//# sourceMappingURL=index.js.map
