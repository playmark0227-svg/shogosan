/* =============================================================
   ES Beauty — main JS

   Deliberately small. The design carries itself; script only
   does the things HTML and CSS cannot:
     header state, mobile nav, current page, footer year,
     one scroll entrance, and the Instagram feed.

   Progressive enhancement:
   - nothing is ever hidden without JS (the reveal's hidden
     state lives behind html.js in the stylesheet)
   - prefers-reduced-motion gets the full page, no motion
   ============================================================= */
(function () {
  "use strict";

  var docEl = document.documentElement;
  docEl.classList.add("js");

  var rmq = window.matchMedia("(prefers-reduced-motion: reduce)");
  var reduceMotion = rmq.matches;
  var onRmq = function (e) { reduceMotion = e.matches; };
  if (rmq.addEventListener) rmq.addEventListener("change", onRmq);
  else if (rmq.addListener) rmq.addListener(onRmq);

  var CFG = window.ES_CONFIG || window.ES_UUR_CONFIG || {};

  function safe(fn) { try { fn(); } catch (e) { /* isolate module failures */ } }

  /* ---------- Company name binding (single source of truth) ---------- */
  safe(function () {
    if (!CFG.company) return;
    document.querySelectorAll("[data-company]").forEach(function (el) {
      el.textContent = CFG.company;
    });
  });

  /* ---------- Header state + back to top ---------- */
  safe(function () {
    var header = document.getElementById("header");

    var toTop = document.createElement("button");
    toTop.className = "to-top";
    toTop.type = "button";
    toTop.setAttribute("aria-label", "ページ上部へ戻る");
    document.body.appendChild(toTop);
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });

    var ticking = false;
    function update() {
      ticking = false;
      var y = window.scrollY;
      if (header) header.classList.toggle("is-scrolled", y > 40);
      toTop.classList.toggle("is-visible", y > 700);
    }
    document.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  });

  /* ---------- Mobile nav ---------- */
  safe(function () {
    var navToggle = document.getElementById("navToggle");
    var nav = document.getElementById("nav");
    if (!navToggle || !nav) return;

    function set(open) {
      nav.classList.toggle("is-open", open);
      navToggle.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
      document.body.style.overflow = open ? "hidden" : "";
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
    }
    navToggle.addEventListener("click", function () {
      set(!nav.classList.contains("is-open"));
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { set(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) set(false);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 720 && nav.classList.contains("is-open")) set(false);
    });
  });

  /* ---------- Current-page highlight ---------- */
  safe(function () {
    var currentPage = document.body.dataset.page || "home";
    document.querySelectorAll(".nav__list a").forEach(function (a) {
      if (a.dataset.page === currentPage) {
        a.classList.add("is-active");
        a.setAttribute("aria-current", "page");
      }
    });
  });

  /* ---------- Footer year ---------- */
  safe(function () {
    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });

  /* ---------- Scroll entrance — one move, one easing ---------- */
  safe(function () {
    if (reduceMotion || !("IntersectionObserver" in window)) return;

    var SELECTORS = [
      ".section-head", ".statement__body > *", ".statement__figure",
      ".brand-tile", ".access-item", ".band", ".cta-band__inner",
      ".contact-card", ".salon-card", ".pet-card", ".plan-card",
      ".menu-card", ".menu-foot li", ".body-callout", ".bar-cat",
      ".bar__head > *", ".media-slot", ".intro-split > div", ".ig-tabs"
    ];

    var els = [];
    SELECTORS.forEach(function (sel) {
      var counts = new Map();
      document.querySelectorAll(sel).forEach(function (el) {
        if (el.classList.contains("rv")) return;
        var p = el.parentElement, i = counts.get(p) || 0;
        counts.set(p, i + 1);
        el.classList.add("rv");
        el.style.setProperty("--d", Math.min(i * 60, 300) + "ms");
        els.push(el);
      });
    });
    if (!els.length) return;

    /* strip the machinery once the entrance settles, so each element's
       own hover transitions apply again */
    var done = typeof WeakSet === "function" ? new WeakSet() : null;
    function reveal(el) {
      if (el.classList.contains("is-in") || (done && done.has(el))) return;
      el.classList.add("is-in");
      if (done) done.add(el);
      setTimeout(function () {
        el.classList.remove("rv", "is-in");
        el.style.removeProperty("--d");
      }, 1600);
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { reveal(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });

    var vh = window.innerHeight;
    els.forEach(function (el) {
      if (el.getBoundingClientRect().top < vh * 0.95) reveal(el);
      else io.observe(el);
    });

    /* failsafe: content visibility must never depend on an event firing */
    var pending = els.slice();
    function sweep() {
      if (!pending.length) return;
      var h = window.innerHeight;
      pending = pending.filter(function (el) {
        if (el.classList.contains("is-in") || (done && done.has(el))) return false;
        if (el.getBoundingClientRect().top < h) { reveal(el); return false; }
        return true;
      });
    }
    document.addEventListener("scroll", sweep, { passive: true });
    window.addEventListener("resize", sweep, { passive: true });
    var beats = 0;
    var beat = setInterval(function () {
      sweep();
      if (!pending.length || ++beats > 60) clearInterval(beat);
    }, 700);
  });

  /* ---------- Instagram feed ---------- */
  safe(function () {
    var tabsRoot = document.getElementById("igTabs");
    var feedEl   = document.getElementById("igFeed");
    if (!feedEl) return;

    var cfg = CFG.instagram;
    var pageAccounts = (feedEl.dataset.accounts || "")
      .split(",").map(function (s) { return s.trim(); }).filter(Boolean);
    var currentAccount = pageAccounts[0] || "pianeta_nail_";

    var esc = function (s) {
      return String(s == null ? "" : s).replace(/[&<>"']/g, function (m) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m];
      });
    };

    function accCfg(a) { return (cfg && cfg.accounts && cfg.accounts[a]) || null; }

    var comingSoon = function () {
      return '<div class="ig-soon"><h4>準備中</h4>' +
        "<p>Instagram アカウントは開設準備中です。オープンまで、いましばらくお待ちください。</p></div>";
    };
    /* No feed yet (no API token configured): send the visitor to the real
       profile. Never surface set-up instructions on a public page. */
    var profileLink = function (acc) {
      return '<div class="ig-fallback"><h4>@' + esc(acc) + "</h4>" +
        "<p>最新の施術写真は Instagram で公開しています。</p>" +
        '<a class="btn btn--primary" href="https://www.instagram.com/' + encodeURIComponent(acc) +
        '/" target="_blank" rel="noopener">Instagram を見る</a></div>';
    };
    var loading = function () {
      return '<div class="ig-loading"><p>Loading…</p></div>';
    };

    function render(account, posts) {
      var c = accCfg(account);
      if (c && c.comingSoon) { feedEl.innerHTML = comingSoon(); return; }
      if (!posts || !posts.length) { feedEl.innerHTML = profileLink(account); return; }
      feedEl.innerHTML = posts.slice(0, 8).map(function (p) {
        var img = p.media_type === "VIDEO" ? (p.thumbnail_url || p.media_url) : p.media_url;
        var cap = p.caption ? esc(p.caption).slice(0, 80) + "…" : "";
        return '<a class="ig-card" href="' + p.permalink +
          '" target="_blank" rel="noopener"><img loading="lazy" decoding="async" src="' + img +
          '" alt="@' + esc(account) + '">' +
          (cap ? '<div class="ig-card__caption">' + cap + "</div>" : "") + "</a>";
      }).join("");
    }

    function fetchAccount(account) {
      var c = accCfg(account);
      if (!c || c.comingSoon || !c.businessId || !c.accessToken) return Promise.resolve(null);
      var url = cfg.apiBase + "/" + encodeURIComponent(c.businessId) + "/media" +
        "?fields=" + encodeURIComponent(cfg.fields) +
        "&limit=" + encodeURIComponent(cfg.limit) +
        "&access_token=" + encodeURIComponent(c.accessToken);
      return fetch(url)
        .then(function (res) { return res.ok ? res.json() : null; })
        .then(function (data) { return data && Array.isArray(data.data) ? data.data : null; })
        .catch(function () { return null; });
    }

    function show(account) {
      currentAccount = account;
      var c = accCfg(account);
      feedEl.innerHTML = (c && c.comingSoon) ? comingSoon() : loading();
      fetchAccount(account).then(function (posts) {
        if (currentAccount !== account) return; /* a newer tab won */
        render(account, posts);
      });
    }

    /* A real tab widget: roving tabindex, arrow keys, and a panel that says
       which tab labels it. The markup declares role="tab"; this implements it. */
    if (tabsRoot) {
      var tabs = [].slice.call(tabsRoot.querySelectorAll(".ig-tab"));

      function select(tab, focus) {
        tabs.forEach(function (t) {
          var on = t === tab;
          t.classList.toggle("is-active", on);
          t.setAttribute("aria-selected", on ? "true" : "false");
          t.tabIndex = on ? 0 : -1;
        });
        if (tab.id) feedEl.setAttribute("aria-labelledby", tab.id);
        if (focus) tab.focus();
        show(tab.dataset.account);
      }

      tabs.forEach(function (tab, i) {
        tab.addEventListener("click", function () { select(tab, false); });
        tab.addEventListener("keydown", function (e) {
          var next = null;
          if (e.key === "ArrowRight" || e.key === "ArrowDown") next = tabs[(i + 1) % tabs.length];
          else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = tabs[(i - 1 + tabs.length) % tabs.length];
          else if (e.key === "Home") next = tabs[0];
          else if (e.key === "End") next = tabs[tabs.length - 1];
          if (next) { e.preventDefault(); select(next, true); }
        });
      });

      var initial = tabs.filter(function (t) { return t.classList.contains("is-active"); })[0] || tabs[0];
      if (initial && initial.id) feedEl.setAttribute("aria-labelledby", initial.id);
    }
    show(currentAccount);
  });
})();
