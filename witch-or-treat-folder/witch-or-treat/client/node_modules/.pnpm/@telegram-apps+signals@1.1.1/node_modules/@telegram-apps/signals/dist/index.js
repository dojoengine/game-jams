let r;
function y(e, c) {
  r && r.set(e, c) || c();
}
function m(e) {
  if (r)
    return e();
  r = /* @__PURE__ */ new Map();
  try {
    e();
  } finally {
    r.forEach((c) => c()), r = void 0;
  }
}
// @__NO_SIDE_EFFECTS__
function S(e, c) {
  c || (c = {});
  const g = c.equals || Object.is;
  let u = [], s = e;
  const i = (t) => {
    if (!g(s, t)) {
      const l = s;
      s = t, y(o, () => {
        [...u].forEach(([f, d]) => {
          f(t, l), d && n(f, !0);
        });
      });
    }
  };
  function a(t) {
    const l = typeof t != "object" ? { once: t } : t;
    return {
      once: l.once || !1,
      signal: l.signal || !1
    };
  }
  const n = (t, l) => {
    const f = a(l), d = u.findIndex(([h, p]) => h === t && p.once === f.once && p.signal === f.signal);
    d >= 0 && u.splice(d, 1);
  }, o = Object.assign(
    function() {
      return j(o), s;
    },
    {
      destroy() {
        u = [];
      },
      set: i,
      reset() {
        i(e);
      },
      sub(t, l) {
        return u.push([t, a(l)]), () => n(t, l);
      },
      unsub: n,
      unsubAll() {
        u = u.filter((t) => t[1].signal);
      }
    }
  );
  return o;
}
const b = [];
function j(e) {
  b.length && b[b.length - 1].add(e);
}
// @__NO_SIDE_EFFECTS__
function x(e, c) {
  let g = /* @__PURE__ */ new Set(), u;
  function s() {
    return u || (u = /* @__PURE__ */ S(a(), c));
  }
  function i() {
    s().set(a());
  }
  function a() {
    g.forEach((t) => {
      t.unsub(i, { signal: !0 });
    });
    const n = /* @__PURE__ */ new Set();
    let o;
    b.push(n);
    try {
      o = e();
    } finally {
      b.pop();
    }
    return n.forEach((t) => {
      t.sub(i, { signal: !0 });
    }), g = n, o;
  }
  return Object.assign(function() {
    return s()();
  }, {
    destroy() {
      s().destroy();
    },
    sub(...n) {
      return s().sub(...n);
    },
    unsub(...n) {
      s().unsub(...n);
    },
    unsubAll(...n) {
      s().unsubAll(...n);
    }
  });
}
export {
  m as batch,
  x as computed,
  S as signal
};
//# sourceMappingURL=index.js.map
