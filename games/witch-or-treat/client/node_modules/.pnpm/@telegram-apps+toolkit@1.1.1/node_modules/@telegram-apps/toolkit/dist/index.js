var k = Object.defineProperty;
var I = (r, e, t) => e in r ? k(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var E = (r, e, t) => I(r, typeof e != "symbol" ? e + "" : e, t);
class d extends Error {
  constructor(e, t, n) {
    super(
      typeof t == "object" ? t.message : t || e,
      {
        cause: typeof t == "object" ? t.cause : n
      }
    ), this.type = e, this.name = "TypedError", Object.setPrototypeOf(this, d.prototype);
  }
}
function x(r, e, t) {
  return r.addEventListener(e, t), () => r.removeEventListener(e, t);
}
function _(...r) {
  const e = r.flat(1);
  return [
    e.push.bind(e),
    () => {
      e.forEach((t) => {
        t();
      });
    }
  ];
}
function F(r, e) {
  return r instanceof d && r.type === e;
}
function m(r) {
  return (e) => F(e, r);
}
const R = "ERR_ABORTED", $ = "ERR_CANCELED", S = "ERR_TIMED_OUT";
function T(r) {
  return new d(R, { cause: r });
}
const U = m(S), V = m(R), B = m($);
function C(r, e) {
  return r.reject = e.reject, r;
}
class i extends Promise {
  constructor(t, n) {
    let o, s;
    typeof t == "function" ? (o = t, s = n) : s = t;
    let u, c;
    super((a, h) => {
      s || (s = {});
      const { abortSignal: l } = s;
      if (l && l.aborted)
        return h(T(l.reason));
      const [y, A] = _(), b = (f) => (...L) => (A(), f(...L)), w = new AbortController(), { signal: D } = w;
      c = b((f) => {
        w.abort(f), h(f);
      }), u = b(a), l && y(
        x(l, "abort", () => {
          c(T(l.reason));
        })
      );
      const { timeout: g } = s;
      if (g) {
        const f = setTimeout(() => {
          c(new d(S, `Timeout reached: ${g}ms`));
        }, g);
        y(() => {
          clearTimeout(f);
        });
      }
      o && o(u, c, D);
    });
    /**
     * Rejects the promise.
     */
    E(this, "reject");
    this.reject = c;
  }
  /**
   * Creates a new BetterPromise instance using executor, resolving promise when a result
   * was returned.
   * @param fn - function returning promise result.
   * @param options - additional options.
   */
  static withFn(t, n) {
    return new i((o, s, u) => {
      try {
        const c = t(u);
        return c instanceof Promise ? c.then(o, s) : o(c);
      } catch (c) {
        s(c);
      }
    }, n);
  }
  /**
   * @see Promise.resolve
   */
  static resolve(t) {
    return new i((n) => {
      n(t);
    });
  }
  /**
   * @see Promise.reject
   */
  static reject(t) {
    return new i((n, o) => {
      o(t);
    });
  }
  /**
   * Cancels the promise execution.
   */
  cancel() {
    this.reject(new d($));
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
    return C(super.finally(t), this);
  }
  /**
   * @see Promise.then
   */
  then(t, n) {
    return C(super.then(t, n), this);
  }
}
function v(r, e) {
  return r.resolve = e.resolve, r;
}
class p extends i {
  constructor(t, n) {
    let o, s;
    typeof t == "function" ? (o = t, s = n) : s = t;
    let u;
    super((c, a, h) => {
      u = c, o && o(c, a, h);
    }, s);
    /**
     * Resolves the promise.
     */
    E(this, "resolve");
    this.resolve = u;
  }
  /**
   * Creates a new EnhancedPromise instance using executor, resolving promise when a result
   * was returned.
   * @param fn - function returning promise result.
   * @param options - additional options.
   */
  static withFn(t, n) {
    return new p(
      (o, s, u) => i.withFn(t, { abortSignal: u }).then(o, s),
      n
    );
  }
  /**
   * @see Promise.resolve
   */
  static resolve(t) {
    return new p((n) => {
      n(t);
    });
  }
  /**
   * @see Promise.reject
   */
  static reject(t) {
    return new p((n, o) => {
      o(t);
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
    return v(super.finally(t), this);
  }
  /**
   * @see Promise.then
   */
  then(t, n) {
    return v(super.then(t, n), this);
  }
}
function Z(r, e) {
  return new i((t) => {
    setTimeout(t, r);
  }, { abortSignal: e });
}
function j(r) {
  return `tapps/${r}`;
}
function J(r, e) {
  sessionStorage.setItem(j(r), JSON.stringify(e));
}
function K(r) {
  const e = sessionStorage.getItem(j(r));
  try {
    return e ? JSON.parse(e) : void 0;
  } catch {
  }
}
function M(r) {
  return r.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`);
}
function z(r) {
  return r.replace(/[A-Z]/g, (e) => `_${e.toLowerCase()}`);
}
function G(r) {
  return r.replace(/_[a-z]/g, (e) => e[1].toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function q(r, e) {
  e || (e = {});
  const {
    textColor: t,
    bgColor: n,
    shouldLog: o = !0
  } = e;
  function s(u, ...c) {
    if (!o || typeof o == "function" && !o())
      return;
    const a = "font-weight:bold;padding:0 5px;border-radius:5px";
    console[u](
      `%c${Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        fractionalSecondDigits: 3,
        timeZone: "UTC"
      }).format(/* @__PURE__ */ new Date())}%c / %c${r}`,
      `${a};background-color: lightblue;color:black`,
      "",
      `${a};${t ? `color:${t};` : ""}${n ? `background-color:${n}` : ""}`,
      ...c
    );
  }
  return [
    function(...c) {
      s("log", ...c);
    },
    function(...c) {
      s("error", ...c);
    }
  ];
}
function H(r, e) {
  document.documentElement.style.setProperty(r, e);
}
function P(r) {
  document.documentElement.style.removeProperty(r);
}
export {
  i as CancelablePromise,
  R as ERR_ABORTED,
  $ as ERR_CANCELED,
  S as ERR_TIMED_OUT,
  p as EnhancedPromise,
  d as TypedError,
  x as addEventListener,
  M as camelToKebab,
  z as camelToSnake,
  T as createAbortError,
  _ as createCbCollector,
  q as createLogger,
  m as createTypedErrorPredicate,
  P as deleteCssVar,
  K as getStorageValue,
  V as isAbortError,
  B as isCanceledError,
  F as isErrorOfType,
  U as isTimeoutError,
  H as setCssVar,
  J as setStorageValue,
  Z as sleep,
  G as snakeToCamel
};
//# sourceMappingURL=index.js.map
