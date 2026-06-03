/* =============================================================
   ES UUR - Main JS (multi-page)
   ============================================================= */
(function () {
  "use strict";

  /* ---------- Header: scrolled state ---------- */
  const header = document.getElementById("header");
  const onScroll = () => {
    if (window.scrollY > 60) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      nav.classList.toggle("is-open");
      navToggle.classList.toggle("is-open");
    });
    nav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        nav.classList.remove("is-open");
        navToggle.classList.remove("is-open");
      });
    });
  }

  /* ---------- Current-page highlight ---------- */
  const currentPage = document.body.dataset.page || "home";
  document.querySelectorAll(".nav__list a").forEach(a => {
    if (a.dataset.page === currentPage) a.classList.add("is-active");
  });

  /* ---------- Year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Reveal on scroll ---------- */
  const targets = document.querySelectorAll(
    ".section-head, .concept__text, .concept__pillars li, .yonua__card, .salon-card, .menu-card, .pet-card, .access-item, .contact-card, .plan-card, .fitness-hero__brand, .fitness-hero__plans, .body-callout, .bar__head, .bar-cat, .hero__index li, .brand-tile, .page-hero"
  );
  targets.forEach(t => t.classList.add("reveal"));
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    targets.forEach(t => io.observe(t));
  } else {
    targets.forEach(t => t.classList.add("is-in"));
  }

  /* ---------- Instagram feed (per-page accounts) ---------- */
  const tabsRoot = document.getElementById("igTabs");
  const feedEl   = document.getElementById("igFeed");
  const cfg      = window.ES_UUR_CONFIG && window.ES_UUR_CONFIG.instagram;
  if (!feedEl) return;

  const pageAccounts = (feedEl.dataset.accounts || "").split(",").map(s => s.trim()).filter(Boolean);
  let currentAccount = pageAccounts[0] || "pianeta_nail_";

  const escapeHTML = (s = "") =>
    s.replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));

  const fallbackCard = (acc) => `
    <div class="ig-fallback">
      <h4>@${escapeHTML(acc)}</h4>
      <p>
        Instagram Graph APIのアクセストークンが未設定のため、<br>
        最新投稿の表示には<code>js/config.js</code>の設定が必要です。<br>
        下のリンクから直接Instagramでご確認ください。
      </p>
      <a class="btn btn--primary" href="https://www.instagram.com/${encodeURIComponent(acc)}/" target="_blank" rel="noopener">@${escapeHTML(acc)} を開く</a>
    </div>`;

  const loadingMarkup = (acc) => `
    <div class="ig-loading">
      <span></span><span></span><span></span>
      <p>Loading @${escapeHTML(acc)}…</p>
    </div>`;

  function renderPosts(account, posts) {
    if (!posts || !posts.length) { feedEl.innerHTML = fallbackCard(account); return; }
    feedEl.innerHTML = posts.slice(0, 8).map(p => {
      const img = p.media_type === "VIDEO" ? (p.thumbnail_url || p.media_url) : p.media_url;
      const cap = p.caption ? escapeHTML(p.caption).slice(0, 80) + "…" : "";
      return `<a class="ig-card" href="${p.permalink}" target="_blank" rel="noopener">
        <img loading="lazy" src="${img}" alt="${escapeHTML(account)} post">
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
      if (!res.ok) throw new Error("api error " + res.status);
      const data = await res.json();
      return Array.isArray(data.data) ? data.data : null;
    } catch (err) {
      console.warn("[Instagram] fetch failed for", account, err);
      return null;
    }
  }

  async function showTab(account) {
    currentAccount = account;
    feedEl.innerHTML = loadingMarkup(account);
    const posts = await fetchAccount(account);
    renderPosts(account, posts);
  }

  if (tabsRoot) {
    tabsRoot.querySelectorAll(".ig-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        tabsRoot.querySelectorAll(".ig-tab").forEach(t => t.classList.remove("is-active"));
        tab.classList.add("is-active");
        showTab(tab.dataset.account);
      });
    });
  }
  showTab(currentAccount);

})();
