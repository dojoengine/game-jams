class d extends Error {
  constructor(t, r, n) {
    super(
      typeof r == "object" ? r.message : r || t,
      {
        cause: typeof r == "object" ? r.cause : n
      }
    ), this.type = t, this.name = "TypedError", Object.setPrototypeOf(this, d.prototype);
  }
}
function G(e) {
  return e.replace(/[A-Z]/g, (t) => `_${t.toLowerCase()}`);
}
function we(e) {
  return e.replace(/_[a-z]/g, (t) => t[1].toUpperCase());
}
const he = "ERR_INVALID_VALUE", me = "ERR_UNEXPECTED_VALUE", de = "ERR_UNEXPECTED_TYPE", K = "ERR_PARSE";
function V(e, t) {
  const r = {};
  for (const n in e) {
    const o = e[n];
    if (!o)
      continue;
    let s, a;
    typeof o == "function" ? (s = n, a = o) : [s, a] = o;
    try {
      const c = a(t(s));
      c !== void 0 && (r[n] = c);
    } catch (c) {
      throw new d(
        K,
        `Parser for "${n}" property failed${s === n ? "" : `. Source field: "${s}"`}`,
        c
      );
    }
  }
  return r;
}
function Z(e) {
  let t = e;
  if (typeof t == "string")
    try {
      t = JSON.parse(t);
    } catch (r) {
      throw new d(he, { cause: r });
    }
  if (typeof t != "object" || !t || Array.isArray(t))
    throw new d(me);
  return t;
}
function g(e, t) {
  return (r) => {
    const n = (o) => {
      if (!(r && o === void 0))
        try {
          return t(o);
        } catch (s) {
          throw new d(K, {
            message: `"${e}" transformer failed to parse the value`,
            cause: s
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
function l(e, t) {
  return g(t || "object", (r) => {
    const n = Z(r);
    return V(e, (o) => n[o]);
  });
}
function R(e) {
  throw new d(de, `Unexpected value received: ${JSON.stringify(e)}`);
}
const $ = g("boolean", (e) => {
  if (typeof e == "boolean")
    return e;
  const t = String(e);
  if (t === "1" || t === "true")
    return !0;
  if (t === "0" || t === "false")
    return !1;
  R(e);
}), _ = g("string", (e) => {
  if (typeof e == "string" || typeof e == "number")
    return e.toString();
  R(e);
}), P = g("number", (e) => {
  if (typeof e == "number")
    return e;
  if (typeof e == "string") {
    const t = Number(e);
    if (!Number.isNaN(t))
      return t;
  }
  R(e);
}), Ee = g("date", (e) => e instanceof Date ? e : new Date(P()(e) * 1e3));
function z(e, t) {
  return g(t || "searchParams", (r) => {
    typeof r != "string" && !(r instanceof URLSearchParams) && R(r);
    const n = typeof r == "string" ? new URLSearchParams(r) : r;
    return V(e, (o) => {
      const s = n.get(o);
      return s === null ? void 0 : s;
    });
  });
}
function j(e) {
  for (const t in e)
    e[t] = [G(t), e[t]];
  return e;
}
const ye = (e) => {
  const t = P(), r = P(!0), n = _(), o = _(!0), s = $(!0), a = l(j({
    addedToAttachmentMenu: s,
    allowsWriteToPm: s,
    firstName: n,
    id: t,
    isBot: s,
    isPremium: s,
    languageCode: o,
    lastName: o,
    photoUrl: o,
    username: o
  }), "User")(!0);
  return z(
    j({
      authDate: Ee(),
      canSendAfter: r,
      chat: l(
        j({
          id: t,
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
      receiver: a,
      startParam: o,
      signature: n,
      user: a
    }),
    "initData"
  )(e);
};
function ve(e) {
  return /^#[\da-f]{6}$/i.test(e);
}
function Pe(e) {
  return /^#[\da-f]{3}$/i.test(e);
}
function Re(e) {
  const t = e.replace(/\s/g, "").toLowerCase();
  if (ve(t))
    return t;
  if (Pe(t)) {
    let n = "#";
    for (let o = 0; o < 3; o += 1)
      n += t[1 + o].repeat(2);
    return n;
  }
  const r = t.match(/^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/) || t.match(/^rgba\((\d{1,3}),(\d{1,3}),(\d{1,3}),\d{1,3}\)$/);
  if (!r)
    throw new Error(`Value "${e}" does not satisfy any of known RGB formats.`);
  return r.slice(1).reduce((n, o) => {
    const s = parseInt(o, 10).toString(16);
    return n + (s.length === 1 ? "0" : "") + s;
  }, "#");
}
const Te = g("rgb", (e) => Re(_()(e))), I = g(
  "themeParams",
  (e) => {
    const t = Te(!0);
    return Object.entries(Z(e)).reduce((r, [n, o]) => (r[we(n)] = t(o), r), {});
  }
);
// @__NO_SIDE_EFFECTS__
function W(e) {
  return JSON.stringify(
    Object.fromEntries(
      Object.entries(e).map(([t, r]) => [G(t), r])
    )
  );
}
const Ae = (e) => {
  const t = _(), r = _(!0), n = $(!0);
  return z({
    botInline: ["tgWebAppBotInline", n],
    defaultColors: ["tgWebAppDefaultColors", I(!0)],
    fullscreen: ["tgWebAppFullscreen", n],
    initData: ["tgWebAppData", ye(!0)],
    initDataRaw: ["tgWebAppData", r],
    platform: ["tgWebAppPlatform", t],
    showSettings: ["tgWebAppShowSettings", n],
    startParam: ["tgWebAppStartParam", r],
    themeParams: ["tgWebAppThemeParams", I()],
    version: ["tgWebAppVersion", t]
  }, "launchParams")(e);
};
// @__NO_SIDE_EFFECTS__
function Se(e) {
  const {
    initDataRaw: t,
    startParam: r,
    showSettings: n,
    botInline: o,
    fullscreen: s,
    defaultColors: a
  } = e, c = new URLSearchParams();
  return c.set("tgWebAppPlatform", e.platform), c.set("tgWebAppThemeParams", /* @__PURE__ */ W(e.themeParams)), c.set("tgWebAppVersion", e.version), t && c.set("tgWebAppData", t), r && c.set("tgWebAppStartParam", r), typeof n == "boolean" && c.set("tgWebAppShowSettings", n ? "1" : "0"), typeof o == "boolean" && c.set("tgWebAppBotInline", o ? "1" : "0"), typeof s == "boolean" && c.set("tgWebAppFullscreen", s ? "1" : "0"), a && c.set("tgWebAppDefaultColors", /* @__PURE__ */ W(a)), c.toString();
}
const X = l({
  eventType: _(),
  eventData: (e) => e
}, "miniAppsMessage"), Y = g("fn", (e) => {
  if (typeof e == "function")
    return e;
  R(e);
});
function $e(e) {
  return !!e && typeof e == "object" && !Array.isArray(e);
}
const Ce = l({
  TelegramWebviewProxy: l({ postEvent: Y() })()
});
function Q(e) {
  return Ce().isValid(e);
}
function Ne() {
  try {
    return window.self !== window.top;
  } catch {
    return !0;
  }
}
var De = Object.defineProperty, je = (e, t, r) => t in e ? De(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, ee = (e, t, r) => je(e, typeof t != "symbol" ? t + "" : t, r);
class b extends Error {
  constructor(t, r, n) {
    super(
      typeof r == "object" ? r.message : r || t,
      {
        cause: typeof r == "object" ? r.cause : n
      }
    ), this.type = t, this.name = "TypedError", Object.setPrototypeOf(this, b.prototype);
  }
}
function te(e, t, r) {
  return e.addEventListener(t, r), () => e.removeEventListener(t, r);
}
function k(...e) {
  const t = e.flat(1);
  return [
    t.push.bind(t),
    () => {
      t.forEach((r) => {
        r();
      });
    }
  ];
}
function Ue(e, t) {
  return e instanceof b && e.type === t;
}
function L(e) {
  return (t) => Ue(t, e);
}
const re = "ERR_ABORTED", ne = "ERR_CANCELED", oe = "ERR_TIMED_OUT";
function M(e) {
  return new b(re, { cause: e });
}
const nt = L(oe), ot = L(re), st = L(ne);
function F(e, t) {
  return e.reject = t.reject, e;
}
class w extends Promise {
  constructor(t, r) {
    let n, o;
    typeof t == "function" ? (n = t, o = r) : o = t;
    let s, a;
    super((c, i) => {
      o || (o = {});
      const { abortSignal: u } = o;
      if (u && u.aborted)
        return i(M(u.reason));
      const [f, h] = k(), m = (E) => (...ge) => (h(), E(...ge)), T = new AbortController(), { signal: A } = T;
      a = m((E) => {
        T.abort(E), i(E);
      }), s = m(c), u && f(
        te(u, "abort", () => {
          a(M(u.reason));
        })
      );
      const { timeout: D } = o;
      if (D) {
        const E = setTimeout(() => {
          a(new b(oe, `Timeout reached: ${D}ms`));
        }, D);
        f(() => {
          clearTimeout(E);
        });
      }
      n && n(s, a, A);
    }), ee(this, "reject"), this.reject = a;
  }
  /**
   * Creates a new BetterPromise instance using executor, resolving promise when a result
   * was returned.
   * @param fn - function returning promise result.
   * @param options - additional options.
   */
  static withFn(t, r) {
    return new w((n, o, s) => {
      try {
        const a = t(s);
        return a instanceof Promise ? a.then(n, o) : n(a);
      } catch (a) {
        o(a);
      }
    }, r);
  }
  /**
   * @see Promise.resolve
   */
  static resolve(t) {
    return new w((r) => {
      r(t);
    });
  }
  /**
   * @see Promise.reject
   */
  static reject(t) {
    return new w((r, n) => {
      n(t);
    });
  }
  /**
   * Cancels the promise execution.
   */
  cancel() {
    this.reject(new b(ne));
  }
  /**
   * @see Promise.catch
   */
  catch(t) {
    return this.then(void 0, t);
  }
  /**
   * @see Promise.finally
   */
  finally(t) {
    return F(super.finally(t), this);
  }
  /**
   * @see Promise.then
   */
  then(t, r) {
    return F(super.then(t, r), this);
  }
}
function J(e, t) {
  return e.resolve = t.resolve, e;
}
class S extends w {
  constructor(t, r) {
    let n, o;
    typeof t == "function" ? (n = t, o = r) : o = t;
    let s;
    super((a, c, i) => {
      s = a, n && n(a, c, i);
    }, o), ee(this, "resolve"), this.resolve = s;
  }
  /**
   * Creates a new EnhancedPromise instance using executor, resolving promise when a result
   * was returned.
   * @param fn - function returning promise result.
   * @param options - additional options.
   */
  static withFn(t, r) {
    return new S(
      (n, o, s) => w.withFn(t, { abortSignal: s }).then(n, o),
      r
    );
  }
  /**
   * @see Promise.resolve
   */
  static resolve(t) {
    return new S((r) => {
      r(t);
    });
  }
  /**
   * @see Promise.reject
   */
  static reject(t) {
    return new S((r, n) => {
      n(t);
    });
  }
  /**
   * @see Promise.catch
   */
  catch(t) {
    return this.then(void 0, t);
  }
  /**
   * @see Promise.finally
   */
  finally(t) {
    return J(super.finally(t), this);
  }
  /**
   * @see Promise.then
   */
  then(t, r) {
    return J(super.then(t, r), this);
  }
}
function at(e, t) {
  return new w((r) => {
    setTimeout(r, e);
  }, { abortSignal: t });
}
function se(e) {
  return `tapps/${e}`;
}
function We(e, t) {
  sessionStorage.setItem(se(e), JSON.stringify(t));
}
function xe(e) {
  const t = sessionStorage.getItem(se(e));
  try {
    return t ? JSON.parse(t) : void 0;
  } catch {
  }
}
function ct(e) {
  return e.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
}
function it(e) {
  return e.replace(/[A-Z]/g, (t) => `_${t.toLowerCase()}`);
}
function ut(e) {
  return e.replace(/_[a-z]/g, (t) => t[1].toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function ke(e, t) {
  t || (t = {});
  const {
    textColor: r,
    bgColor: n,
    shouldLog: o = !0
  } = t;
  function s(a, ...c) {
    if (!o || typeof o == "function" && !o())
      return;
    const i = "font-weight:bold;padding:0 5px;border-radius:5px";
    console[a](
      `%c${Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        fractionalSecondDigits: 3,
        timeZone: "UTC"
      }).format(/* @__PURE__ */ new Date())}%c / %c${e}`,
      `${i};background-color: lightblue;color:black`,
      "",
      `${i};${r ? `color:${r};` : ""}${n ? `background-color:${n}` : ""}`,
      ...c
    );
  }
  return [
    function(...a) {
      s("log", ...a);
    },
    function(...a) {
      s("error", ...a);
    }
  ];
}
function pt(e, t) {
  document.documentElement.style.setProperty(e, t);
}
function ft(e) {
  document.documentElement.style.removeProperty(e);
}
function Le(e, t) {
  t();
}
// @__NO_SIDE_EFFECTS__
function y(e, t) {
  t || (t = {});
  const r = t.equals || Object.is;
  let n = [], o = e;
  const s = (u) => {
    if (!r(o, u)) {
      const f = o;
      o = u, Le(i, () => {
        [...n].forEach(([h, m]) => {
          h(u, f), m && c(h, !0);
        });
      });
    }
  };
  function a(u) {
    const f = typeof u != "object" ? { once: u } : u;
    return {
      once: f.once || !1,
      signal: f.signal || !1
    };
  }
  const c = (u, f) => {
    const h = a(f), m = n.findIndex(([T, A]) => T === u && A.once === h.once && A.signal === h.signal);
    m >= 0 && n.splice(m, 1);
  }, i = Object.assign(
    function() {
      return Oe(i), o;
    },
    {
      destroy() {
        n = [];
      },
      set: s,
      reset() {
        s(e);
      },
      sub(u, f) {
        return n.push([u, a(f)]), () => c(u, f);
      },
      unsub: c,
      unsubAll() {
        n = n.filter((u) => u[1].signal);
      }
    }
  );
  return i;
}
const U = [];
function Oe(e) {
  U.length && U[U.length - 1].add(e);
}
const ae = /* @__PURE__ */ y(!1), [O, qe] = /* @__PURE__ */ ke("Bridge", {
  bgColor: "#9147ff",
  textColor: "white",
  shouldLog: ae
}), Ie = {
  clipboard_text_received: l({
    req_id: _(),
    data: (e) => e === null ? e : _(!0)(e)
  }, "clipboard_text_received"),
  custom_method_invoked: l({
    req_id: _(),
    result: (e) => e,
    error: _(!0)
  }, "custom_method_invoked"),
  popup_closed: g("popup_closed", (e) => e ? l({
    button_id: (t) => t == null ? void 0 : _()(t)
  })()(e) : {}),
  viewport_changed: l({
    height: P(),
    width: (e) => e == null ? window.innerWidth : P()(e),
    is_state_stable: $(),
    is_expanded: $()
  }, "viewport_changed")
};
function Me(e) {
  const t = window, [, r] = k(
    // Add listener, which handles events sent from the Telegram web application and also events
    // generated by the local emitEvent function.
    te(t, "message", (n) => {
      if (n.source !== t.parent)
        return;
      let o;
      try {
        o = X()(n.data);
      } catch {
        return;
      }
      const { eventType: s, eventData: a } = o, c = Ie[s];
      try {
        const i = c ? c()(a) : a;
        O("Event received:", i ? { eventType: s, eventData: i } : { eventType: s }), e([s, i]);
      } catch (i) {
        qe(
          [
            `An error occurred processing the "${s}" event from the Telegram application.`,
            "Please, file an issue here:",
            "https://github.com/Telegram-Mini-Apps/telegram-apps/issues/new/choose"
          ].join(`
`),
          o,
          i
        );
      }
    })
  );
  return r;
}
const C = /* @__PURE__ */ y(), N = /* @__PURE__ */ y();
function ce() {
  return N() || N.set(Me(C.set)), C;
}
const v = /* @__PURE__ */ y({});
function ie(e) {
  let t = v()[e];
  return t || (t = /* @__PURE__ */ y(void 0, {
    equals() {
      return !1;
    }
  }), ce().sub((r) => {
    r && r[0] === e && t.set(r[1]);
  }), v.set({ ...v(), [e]: t })), t;
}
function Fe(e, t, r) {
  return ie(e).sub(t, r);
}
const Je = "ERR_METHOD_UNSUPPORTED", Be = "ERR_RETRIEVE_LP_FAILED", He = "ERR_METHOD_PARAMETER_UNSUPPORTED", Ge = "ERR_UNKNOWN_ENV", Ke = "ERR_INVOKE_CUSTOM_METHOD_RESPONSE", ue = /* @__PURE__ */ y("https://web.telegram.org");
function pe(e, t) {
  O("Posting event:", t ? { eventType: e, eventData: t } : { eventType: e });
  const r = window;
  if (Q(r)) {
    r.TelegramWebviewProxy.postEvent(e, JSON.stringify(t));
    return;
  }
  const n = JSON.stringify({ eventType: e, eventData: t });
  if (Ne())
    return r.parent.postMessage(n, ue());
  const { external: o } = r;
  if (l({ notify: Y() })().isValid(o)) {
    o.notify(n);
    return;
  }
  throw new b(Ge);
}
function fe(e, t, r) {
  r || (r = {});
  const { capture: n } = r, [o, s] = k();
  return new w((a) => {
    (Array.isArray(t) ? t : [t]).forEach((c) => {
      o(
        Fe(c, (i) => {
          (!n || (Array.isArray(t) ? n({
            event: c,
            payload: i
          }) : n(i))) && a(i);
        })
      );
    }), (r.postEvent || pe)(e, r.params);
  }, r).finally(s);
}
function q(e) {
  return Ae()(e);
}
function _e(e) {
  return q(
    e.replace(/^[^?#]*[?#]/, "").replace(/[?#]/g, "&")
  );
}
function Ve() {
  return _e(window.location.href);
}
function Ze() {
  const e = performance.getEntriesByType("navigation")[0];
  if (!e)
    throw new Error("Unable to get first navigation entry.");
  return _e(e.name);
}
const ze = "launchParams";
function Xe() {
  return q(xe(ze) || "");
}
function le(e) {
  We("launchParams", /* @__PURE__ */ Se(e));
}
function be(e) {
  return e instanceof Error ? e.message + (e.cause ? `
  ${be(e.cause)}` : "") : JSON.stringify(e);
}
function Ye() {
  const e = [];
  for (const t of [
    // Try to retrieve launch parameters from the current location. This method can return
    // nothing in case, location was changed, and then the page was reloaded.
    Ve,
    // Then, try using the lower level API - window.performance.
    Ze,
    // Finally, try to extract launch parameters from the session storage.
    Xe
  ])
    try {
      const r = t();
      return le(r), r;
    } catch (r) {
      e.push(r);
    }
  throw new b(Be, [
    "Unable to retrieve launch parameters from any known source. Perhaps, you have opened your app outside Telegram?",
    "📖 Refer to docs for more information:",
    "https://docs.telegram-mini-apps.com/packages/telegram-apps-bridge/environment",
    "Collected errors:",
    ...e.map((t) => `— ${be(t)}`)
  ].join(`
`));
}
function _t(e) {
  if (e === "simple")
    try {
      return Ye(), !0;
    } catch {
      return !1;
    }
  return w.withFn(async () => {
    if (Q(window))
      return !0;
    try {
      return await fe("web_app_request_theme", "theme_changed", { timeout: 100 }), !0;
    } catch {
      return !1;
    }
  }, e);
}
function x(e, t) {
  window.dispatchEvent(new MessageEvent("message", {
    data: JSON.stringify({ eventType: e, eventData: t }),
    // We specify window.parent to imitate the case, the parent iframe sent us this event.
    source: window.parent
  }));
}
function Qe(e, t) {
  if (typeof t == "string")
    try {
      const { eventType: r } = X()(t);
      r === "web_app_request_theme" && x("theme_changed", {
        theme_params: JSON.parse(/* @__PURE__ */ W(e))
      }), r === "web_app_request_viewport" && x("viewport_changed", {
        width: window.innerWidth,
        height: window.innerHeight,
        is_state_stable: !0,
        is_expanded: !0
      });
    } catch {
    }
}
function lt(e) {
  var n;
  const t = typeof e == "string" ? q(e) : e;
  le(t);
  const r = (n = window.TelegramWebviewProxy) == null ? void 0 : n.postEvent;
  window.TelegramWebviewProxy = {
    postEvent(o, s) {
      Qe(t.themeParams, JSON.stringify({ eventType: o, eventData: s })), r == null || r(o, s);
    }
  }, O("Environment was mocked by the mockTelegramEnv function");
}
function bt() {
  [
    ["TelegramGameProxy_receiveEvent"],
    // Windows Phone.
    ["TelegramGameProxy", "receiveEvent"],
    // Desktop.
    ["Telegram", "WebView", "receiveEvent"]
    // Android and iOS.
  ].forEach((e) => {
    let t = window;
    e.forEach((r, n, o) => {
      if (n === o.length - 1) {
        t[r] = x;
        return;
      }
      r in t || (t[r] = {}), t = t[r];
    });
  });
}
function gt() {
  ["TelegramGameProxy_receiveEvent", "TelegramGameProxy", "Telegram"].forEach((e) => {
    delete window[e];
  });
}
function wt(e, t, r) {
  ie(e).unsub(t, r);
}
function ht(e, t) {
  return ce().sub(e, t);
}
function mt(e, t) {
  C.unsub(e, t);
}
function et(e) {
  return ({ req_id: t }) => t === e;
}
function B(e) {
  return e.split(".").map(Number);
}
function tt(e, t) {
  const r = B(e), n = B(t), o = Math.max(r.length, n.length);
  for (let s = 0; s < o; s += 1) {
    const a = r[s] || 0, c = n[s] || 0;
    if (a !== c)
      return a > c ? 1 : -1;
  }
  return 0;
}
function p(e, t) {
  return tt(e, t) <= 0;
}
function H(e, t, r) {
  if (typeof r == "string") {
    if (e === "web_app_open_link") {
      if (t === "try_instant_view")
        return p("6.4", r);
      if (t === "try_browser")
        return p("7.6", r);
    }
    if (e === "web_app_set_header_color" && t === "color")
      return p("6.9", r);
    if (e === "web_app_close" && t === "return_back")
      return p("7.6", r);
    if (e === "web_app_setup_main_button" && t === "has_shine_effect")
      return p("7.10", r);
  }
  switch (e) {
    case "web_app_open_tg_link":
    case "web_app_open_invoice":
    case "web_app_setup_back_button":
    case "web_app_set_background_color":
    case "web_app_set_header_color":
    case "web_app_trigger_haptic_feedback":
      return p("6.1", t);
    case "web_app_open_popup":
      return p("6.2", t);
    case "web_app_close_scan_qr_popup":
    case "web_app_open_scan_qr_popup":
    case "web_app_read_text_from_clipboard":
      return p("6.4", t);
    case "web_app_switch_inline_query":
      return p("6.7", t);
    case "web_app_invoke_custom_method":
    case "web_app_request_write_access":
    case "web_app_request_phone":
      return p("6.9", t);
    case "web_app_setup_settings_button":
      return p("6.10", t);
    case "web_app_biometry_get_info":
    case "web_app_biometry_open_settings":
    case "web_app_biometry_request_access":
    case "web_app_biometry_request_auth":
    case "web_app_biometry_update_token":
      return p("7.2", t);
    case "web_app_setup_swipe_behavior":
      return p("7.7", t);
    case "web_app_share_to_story":
      return p("7.8", t);
    case "web_app_setup_secondary_button":
    case "web_app_set_bottom_bar_color":
      return p("7.10", t);
    case "web_app_request_safe_area":
    case "web_app_request_content_safe_area":
    case "web_app_request_fullscreen":
    case "web_app_exit_fullscreen":
    case "web_app_set_emoji_status":
    case "web_app_add_to_home_screen":
    case "web_app_check_home_screen":
    case "web_app_request_emoji_status_access":
      return p("8.0", t);
    default:
      return [
        "iframe_ready",
        "iframe_will_reload",
        "web_app_close",
        "web_app_data_send",
        "web_app_expand",
        "web_app_open_link",
        "web_app_ready",
        "web_app_request_theme",
        "web_app_request_viewport",
        "web_app_setup_main_button",
        "web_app_setup_closing_behavior"
      ].includes(e);
  }
}
function dt(e, t) {
  t || (t = "strict");
  const r = typeof t == "function" ? t : (n) => {
    const { method: o, version: s } = n;
    let a, c;
    if ("param" in n ? (a = `Parameter "${n.param}" of "${o}" method is unsupported in Mini Apps version ${s}`, c = He) : (a = `Method "${o}" is unsupported in Mini Apps version ${s}`, c = Je), t === "strict")
      throw new b(c, a);
    return console.warn(a);
  };
  return (n, o) => H(n, e) ? $e(o) && n === "web_app_set_header_color" && "color" in o && !H(n, "color", e) ? r({ version: e, method: n, param: "color" }) : pe(n, o) : r({ version: e, method: n });
}
function Et(e, t, r, n) {
  return fe("web_app_invoke_custom_method", "custom_method_invoked", {
    ...n || {},
    params: { method: e, params: t, req_id: r },
    capture: et(r)
  }).then(({ result: o, error: s }) => {
    if (s)
      throw new b(Ke, s);
    return o;
  });
}
function rt(e) {
  e.unsubAll(), e.reset();
}
function yt() {
  var e;
  (e = N()) == null || e(), [
    ...Object.values(v()),
    v,
    C,
    N,
    ue,
    ae
  ].forEach(rt);
}
export {
  ae as $debug,
  ue as $targetOrigin,
  w as CancelablePromise,
  re as ERR_ABORTED,
  ne as ERR_CANCELED,
  Ke as ERR_CUSTOM_METHOD_ERR_RESPONSE,
  He as ERR_METHOD_PARAMETER_UNSUPPORTED,
  Je as ERR_METHOD_UNSUPPORTED,
  Be as ERR_RETRIEVE_LP_FAILED,
  oe as ERR_TIMED_OUT,
  Ge as ERR_UNKNOWN_ENV,
  S as EnhancedPromise,
  b as TypedError,
  te as addEventListener,
  ct as camelToKebab,
  it as camelToSnake,
  et as captureSameReq,
  tt as compareVersions,
  M as createAbortError,
  k as createCbCollector,
  ke as createLogger,
  dt as createPostEvent,
  L as createTypedErrorPredicate,
  bt as defineEventHandlers,
  ft as deleteCssVar,
  x as emitMiniAppsEvent,
  xe as getStorageValue,
  Q as hasWebviewProxy,
  Et as invokeCustomMethod,
  ot as isAbortError,
  st as isCanceledError,
  Ne as isIframe,
  _t as isTMA,
  nt as isTimeoutError,
  lt as mockTelegramEnv,
  wt as off,
  Fe as on,
  pe as postEvent,
  gt as removeEventHandlers,
  fe as request,
  yt as resetPackageState,
  Ye as retrieveLaunchParams,
  pt as setCssVar,
  We as setStorageValue,
  at as sleep,
  ut as snakeToCamel,
  ht as subscribe,
  H as supports,
  mt as unsubscribe
};
//# sourceMappingURL=index.js.map
