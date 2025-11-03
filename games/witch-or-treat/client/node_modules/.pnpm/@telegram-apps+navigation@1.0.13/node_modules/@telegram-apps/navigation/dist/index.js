function i() {
  return performance.getEntriesByType("navigation")[0];
}
function c() {
  const t = i();
  return !!t && t.type === "reload";
}
function o(t, n) {
  return t.startsWith(n) ? t : `${n}${t}`;
}
function R(t) {
  return new URL(
    typeof t == "string" ? t : [
      t.pathname || "",
      o(t.search || "", "?"),
      o(t.hash || "", "#")
    ].join(""),
    "http://a"
  );
}
function a(t) {
  const n = (typeof t == "string" ? t : t.pathname || "").startsWith("/"), e = R(t), { pathname: s } = e;
  return `${n ? s : s.slice(1)}${e.search}${e.hash}`;
}
const r = "ERR_NAVIGATION_HISTORY_EMPTY", I = "ERR_NAVIGATION_CURSOR_INVALID";
export {
  I as ERR_CURSOR_INVALID,
  r as ERR_HISTORY_EMPTY,
  R as createSafeURL,
  o as ensurePrefix,
  i as getFirstNavigationEntry,
  c as isPageReload,
  a as urlToPath
};
//# sourceMappingURL=index.js.map
