/* =============================================================
   ES UUR - main JS (multi-page)
   Header scroll state, mobile nav, current-page highlight,
   Instagram feed (Graph API) with per-page accounts.
   ============================================================= */
(function () {
  "use strict";

  /* Header: add subtle bg/blur after a small scroll */
  const header = document.getElementById("header");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 60);
    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* Mobile nav */
  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");
  if (navToggle && nav) {
    const close = () => { nav.classList.remove("is-open"); navToggle.classList.remove("is-open"); };
    navToggle.addEventListener("click", () => {
      nav.classList.toggle("is-open");
      navToggle.classList.toggle("is-open");
    });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", close));
  }

  /* Current-page highlight */
  const currentPage = document.body.dataset.page || "home";
  document.querySelectorAll(".nav__list a").forEach(a => {
    if (a.dataset.page === currentPage) a.classList.add("is-active");
  });

  /* Footer year */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Instagram feed */
  const tabsRoot = document.getElementById("igTabs");
  const feedEl   = document.getElementById("igFeed");
  if (!feedEl) return;

  const cfg = (window.ES_UUR_CONFIG || {}).instagram;
  const pageAccounts = (feedEl.dataset.accounts || "")
    .split(",").map(s => s.trim()).filter(Boolean);
  let currentAccount = pageAccounts[0] || "pianeta_nail_";

  const esc = (s = "") =>
    s.replace(/[&<>"']/g, m => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[m]));

  const fallback = acc => `
    <div class="ig-fallback">
      <h4>@${esc(acc)}</h4>
      <p>最新投稿の取得には <code>js/config.js</code> にアクセストークンの設定が必要です。</p>
      <a class="btn btn--primary" href="https://www.instagram.com/${encodeURIComponent(acc)}/" target="_blank" rel="noopener">@${esc(acc)} を開く</a>
    </div>`;

  const loading = acc => `
    <div class="ig-loading">
      <span></span><span></span><span></span>
      <p>Loading @${esc(acc)}…</p>
    </div>`;

  function render(account, posts) {
    if (!posts || !posts.length) { feedEl.innerHTML = fallback(account); return; }
    feedEl.innerHTML = posts.slice(0, 8).map(p => {
      const img = p.media_type === "VIDEO" ? (p.thumbnail_url || p.media_url) : p.media_url;
      const cap = p.caption ? esc(p.caption).slice(0, 80) + "…" : "";
      return `<a class="ig-card" href="${p.permalink}" target="_blank" rel="noopener">
        <img loading="lazy" decoding="async" src="${img}" alt="@${esc(account)}">
        ${cap ? `<div class="ig-card__caption">${cap}</div>` : ""}
      </a>`;
    }).join("");
  }

  async function fetchAccount(account) {
    if (!cfg) return null;
    const acc = cfg.accounts && cfg.accounts[account];
    if (!acc || !acc.businessId || !acc.accessToken) return null;
    const url = `${cfg.apiBase}/${encodeURIComponent(acc.businessId)}/media`
      + `?fields=${encodeURIComponent(cfg.fields)}`
      + `&limit=${encodeURIComponent(cfg.limit)}`
      + `&access_token=${encodeURIComponent(acc.accessToken)}`;
    try {
      const res = await fetch(url);
      if (!res.ok) return null;
      const data = await res.json();
      return Array.isArray(data.data) ? data.data : null;
    } catch { return null; }
  }

  async function show(account) {
    currentAccount = account;
    feedEl.innerHTML = loading(account);
    render(account, await fetchAccount(account));
  }

  if (tabsRoot) {
    tabsRoot.querySelectorAll(".ig-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        tabsRoot.querySelectorAll(".ig-tab").forEach(t => t.classList.remove("is-active"));
        tab.classList.add("is-active");
        show(tab.dataset.account);
      });
    });
  }
  show(currentAccount);
})();
