/* =============================================================
   ES UUR — main JS (multi-page)
   Motion system (scroll reveal / parallax / counters / tilt /
   magnetic buttons / cursor follower / progress / smart header),
   mobile nav, current-page highlight, Instagram feed.

   All motion is progressive enhancement:
   - without JS nothing is ever hidden (reveal states are
     html.js-gated in CSS)
   - prefers-reduced-motion users get full content, no motion
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
  var finePointer = window.matchMedia("(pointer: fine)").matches;

  /* isolate module failures so one error never kills the rest */
  function safe(fn) { try { fn(); } catch (e) { /* no-op */ } }

  /* ---------- Smart header / scroll progress / parallax / to-top ---------- */
  safe(function () {
    var header = document.getElementById("header");
    var nav = document.getElementById("nav");
    var hero = document.querySelector(".hero");

    var progress = document.createElement("div");
    progress.className = "scroll-progress";
    progress.setAttribute("aria-hidden", "true");
    progress.innerHTML = "<i></i>";
    document.body.appendChild(progress);
    var bar = progress.firstElementChild;

    var toTop = document.createElement("button");
    toTop.className = "to-top";
    toTop.type = "button";
    toTop.setAttribute("aria-label", "ページ上部へ戻る");
    document.body.appendChild(toTop);
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });

    var lastY = window.scrollY, ticking = false;
    function update() {
      ticking = false;
      var y = window.scrollY;
      var max = docEl.scrollHeight - window.innerHeight;
      bar.style.transform = "scaleX(" + (max > 0 ? Math.min(y / max, 1) : 0) + ")";

      if (header) {
        header.classList.toggle("is-scrolled", y > 60);
        var hide;
        if (y <= 320 || (nav && nav.classList.contains("is-open"))) hide = false;
        else if (y > lastY + 6) hide = true;
        else if (y < lastY - 6) hide = false;
        else hide = header.classList.contains("is-hidden");
        header.classList.toggle("is-hidden", hide);
      }
      if (hero && !reduceMotion && y < window.innerHeight) {
        hero.style.setProperty("--par", (y * 0.12).toFixed(1) + "px");
      }
      toTop.classList.toggle("is-visible", y > 640);
      lastY = y;
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
    function close() {
      nav.classList.remove("is-open");
      navToggle.classList.remove("is-open");
      document.body.classList.remove("nav-open");
      document.body.style.overflow = "";
    }
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      navToggle.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
    nav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", close); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    /* leaving the mobile breakpoint (rotate / resize) must release the scroll lock */
    var bpq = window.matchMedia("(max-width: 720px)");
    var onBp = function (e) { if (!e.matches) close(); };
    if (bpq.addEventListener) bpq.addEventListener("change", onBp);
    else if (bpq.addListener) bpq.addListener(onBp);
  });

  /* ---------- Current-page highlight ---------- */
  safe(function () {
    var currentPage = document.body.dataset.page || "home";
    document.querySelectorAll(".nav__list a").forEach(function (a) {
      if (a.dataset.page === currentPage) a.classList.add("is-active");
    });
  });

  /* ---------- Footer year ---------- */
  safe(function () {
    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });

  /* ---------- Scroll reveal (JS-gated, above-fold instant) ---------- */
  safe(function () {
    if (reduceMotion || !("IntersectionObserver" in window)) return;
    var GROUPS = [
      [".section-head", "rv--blur"],
      [".concept__text p", "rv"],
      [".concept__pillars li", "rv--left"],
      [".brand-tile", "rv"],
      [".access-item", "rv--left"],
      [".salon-card", "rv"],
      [".yonua__card", "rv"],
      [".yonua__info > div", "rv"],
      [".fitness-hero__brand", "rv"],
      [".plan-card", "rv"],
      [".body-callout", "rv--scale"],
      [".menu-card", "rv"],
      [".menu-foot li", "rv"],
      [".pet-card", "rv"],
      [".bar__head > *", "rv"],
      [".bar-cat", "rv"],
      [".contact-card", "rv"],
      [".ig-tabs", "rv"]
    ];
    var els = [];
    GROUPS.forEach(function (g) {
      var counts = new Map();
      document.querySelectorAll(g[0]).forEach(function (el) {
        if (el.classList.contains("rv")) return;
        var p = el.parentElement, i = counts.get(p) || 0;
        counts.set(p, i + 1);
        el.classList.add("rv");
        if (g[1] !== "rv") el.classList.add(g[1]);
        el.style.setProperty("--d", Math.min(i * 70, 420) + "ms");
        els.push(el);
      });
    });
    if (!els.length) return;

    /* reveal, then strip the machinery once the entrance settles so the
       element's own hover transforms / transitions apply again
       (2s covers .9s transition + max 420ms stagger + hairline draw) */
    var done = typeof WeakSet === "function" ? new WeakSet() : null;
    function reveal(el) {
      if (el.classList.contains("is-in") || (done && done.has(el))) return;
      el.classList.add("is-in");
      if (done) done.add(el);
      setTimeout(function () {
        el.classList.remove("rv", "rv--left", "rv--scale", "rv--blur", "is-in");
        el.style.removeProperty("--d");
      }, 2000);
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { reveal(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -7% 0px" });

    var vh = window.innerHeight;
    els.forEach(function (el) {
      var r = el.getBoundingClientRect();
      /* anything already in the first viewport shows instantly */
      if (r.top < vh * 0.95 && r.bottom > 0) reveal(el);
      else io.observe(el);
    });

    /* safety net: sweep for anything on screen that IO missed
       (fast scrolling can skip observer callbacks) */
    var pendingEls = els.slice();
    function sweep() {
      if (!pendingEls.length) return;
      var h = window.innerHeight;
      pendingEls = pendingEls.filter(function (el) {
        if (el.classList.contains("is-in") || (done && done.has(el))) return false;
        var r = el.getBoundingClientRect();
        if (r.top < h && r.bottom > 0) { reveal(el); return false; }
        return true;
      });
    }
    var sweepQueued = false;
    document.addEventListener("scroll", function () {
      if (sweepQueued) return;
      sweepQueued = true;
      /* trailing sweep: runs shortly after scrolling pauses or between bursts */
      setTimeout(function () { sweepQueued = false; sweep(); }, 260);
    }, { passive: true });
    [1500, 4000, 8000].forEach(function (t) { setTimeout(sweep, t); });
  });

  /* ---------- Price count-up ---------- */
  safe(function () {
    var els = document.querySelectorAll("[data-count]");
    if (!els.length || !("IntersectionObserver" in window)) return;
    function run(el) {
      var target = parseInt(el.dataset.count, 10);
      if (!isFinite(target)) return;
      var prefix = el.dataset.prefix || "", suffix = el.dataset.suffix || "";
      if (reduceMotion) { el.textContent = prefix + target.toLocaleString("ja-JP") + suffix; return; }
      var t0 = performance.now(), dur = 1200;
      (function tick(t) {
        var p = Math.min((t - t0) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + Math.round(target * eased).toLocaleString("ja-JP") + suffix;
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { io.unobserve(en.target); run(en.target); }
      });
    }, { threshold: 0.4 });
    els.forEach(function (el) { io.observe(el); });
  });

  /* ---------- 3D tilt on cards ---------- */
  safe(function () {
    if (reduceMotion || !finePointer) return;
    document.querySelectorAll(".brand-tile, .salon-card, .pet-card").forEach(function (card) {
      card.addEventListener("mouseenter", function () {
        card.style.transition = "transform .16s ease-out, box-shadow .5s ease";
      });
      card.addEventListener("mousemove", function (e) {
        if (reduceMotion) return;
        var r = card.getBoundingClientRect();
        var rx = ((e.clientY - r.top) / r.height - 0.5) * -5;
        var ry = ((e.clientX - r.left) / r.width - 0.5) * 5;
        card.style.transform = "perspective(900px) translateY(-6px) rotateX(" + rx.toFixed(2) + "deg) rotateY(" + ry.toFixed(2) + "deg)";
      });
      card.addEventListener("mouseleave", function () {
        card.style.transition = "transform .6s cubic-bezier(.2,.8,.2,1), box-shadow .5s ease";
        card.style.transform = "";
      });
    });
  });

  /* ---------- Magnetic buttons ---------- */
  safe(function () {
    if (reduceMotion || !finePointer) return;
    document.querySelectorAll(".btn").forEach(function (btn) {
      btn.addEventListener("mousemove", function (e) {
        if (reduceMotion) return;
        var r = btn.getBoundingClientRect();
        var dx = (e.clientX - r.left - r.width / 2) * 0.22;
        var dy = (e.clientY - r.top - r.height / 2) * 0.3;
        dx = Math.max(-8, Math.min(8, dx));
        dy = Math.max(-6, Math.min(6, dy));
        btn.style.transition = "transform .2s ease";
        btn.style.transform = "translate(" + dx.toFixed(1) + "px," + dy.toFixed(1) + "px)";
      });
      btn.addEventListener("mouseleave", function () {
        btn.style.transition = "transform .45s cubic-bezier(.2,.8,.2,1)";
        btn.style.transform = "";
      });
    });
  });

  /* ---------- Cursor follower ---------- */
  safe(function () {
    if (reduceMotion || !finePointer) return;
    var dot = document.createElement("div");
    var ring = document.createElement("div");
    dot.className = "cursor-dot"; ring.className = "cursor-ring";
    dot.setAttribute("aria-hidden", "true"); ring.setAttribute("aria-hidden", "true");
    document.body.appendChild(dot); document.body.appendChild(ring);
    var x = 0, y = 0, rx = 0, ry = 0, seen = false;
    function loop() {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      ring.style.transform = "translate(" + rx.toFixed(1) + "px," + ry.toFixed(1) + "px)";
      requestAnimationFrame(loop);
    }
    document.addEventListener("mousemove", function (e) {
      x = e.clientX; y = e.clientY;
      dot.style.transform = "translate(" + x + "px," + y + "px)";
      if (!seen) { seen = true; rx = x; ry = y; docEl.classList.add("has-cursor"); loop(); }
    }, { passive: true });
    document.addEventListener("mouseover", function (e) {
      var t = e.target.closest ? e.target.closest("a, button, .ig-tab") : null;
      ring.classList.toggle("is-hover", !!t);
    });
    document.addEventListener("mouseleave", function () { docEl.classList.remove("has-cursor"); });
    document.addEventListener("mouseenter", function () { if (seen) docEl.classList.add("has-cursor"); });
  });

  /* ---------- Champagne bubbles (bar hero) ---------- */
  safe(function () {
    if (reduceMotion || document.body.dataset.page !== "bar") return;
    var host = document.querySelector(".page-hero--dark");
    if (!host) return;
    var wrap = document.createElement("div");
    wrap.className = "bubbles";
    wrap.setAttribute("aria-hidden", "true");
    var P = [
      [6, 4, 9.5, 0], [14, 3, 11, 1.8], [22, 5, 8.5, 3.2], [31, 3, 12, 0.6],
      [42, 4, 9, 2.4], [53, 3, 10.5, 4.1], [61, 5, 8, 1.2], [70, 3, 11.5, 3.7],
      [79, 4, 9.8, 0.9], [86, 3, 10, 2.9], [92, 5, 8.8, 4.6], [97, 3, 12.5, 1.5]
    ];
    P.forEach(function (b) {
      var s = document.createElement("span");
      s.style.left = b[0] + "%";
      s.style.width = s.style.height = b[1] + "px";
      s.style.animationDuration = b[2] + "s";
      s.style.animationDelay = b[3] + "s";
      wrap.appendChild(s);
    });
    host.appendChild(wrap);
  });

  /* ---------- Instagram feed ---------- */
  safe(function () {
    var tabsRoot = document.getElementById("igTabs");
    var feedEl   = document.getElementById("igFeed");
    if (!feedEl) return;

    var cfg = (window.ES_UUR_CONFIG || {}).instagram;
    var pageAccounts = (feedEl.dataset.accounts || "")
      .split(",").map(function (s) { return s.trim(); }).filter(Boolean);
    var currentAccount = pageAccounts[0] || "pianeta_nail_";

    var esc = function (s) {
      return String(s == null ? "" : s).replace(/[&<>"']/g, function (m) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m];
      });
    };

    var fallback = function (acc) {
      return '<div class="ig-fallback">' +
        "<h4>@" + esc(acc) + "</h4>" +
        "<p>最新投稿の取得には <code>js/config.js</code> にアクセストークンの設定が必要です。</p>" +
        '<a class="btn btn--primary" href="https://www.instagram.com/' + encodeURIComponent(acc) + '/" target="_blank" rel="noopener">@' + esc(acc) + " を開く</a></div>";
    };

    var loading = function (acc) {
      return '<div class="ig-loading"><span></span><span></span><span></span><p>Loading @' + esc(acc) + "…</p></div>";
    };

    function render(account, posts) {
      if (!posts || !posts.length) { feedEl.innerHTML = fallback(account); return; }
      feedEl.innerHTML = posts.slice(0, 8).map(function (p, i) {
        var img = p.media_type === "VIDEO" ? (p.thumbnail_url || p.media_url) : p.media_url;
        var cap = p.caption ? esc(p.caption).slice(0, 80) + "…" : "";
        return '<a class="ig-card" style="animation-delay:' + (i * 60) + 'ms" href="' + p.permalink + '" target="_blank" rel="noopener">' +
          '<img loading="lazy" decoding="async" src="' + img + '" alt="@' + esc(account) + '">' +
          (cap ? '<div class="ig-card__caption">' + cap + "</div>" : "") + "</a>";
      }).join("");
    }

    function fetchAccount(account) {
      if (!cfg) return Promise.resolve(null);
      var acc = cfg.accounts && cfg.accounts[account];
      if (!acc || !acc.businessId || !acc.accessToken) return Promise.resolve(null);
      var url = cfg.apiBase + "/" + encodeURIComponent(acc.businessId) + "/media" +
        "?fields=" + encodeURIComponent(cfg.fields) +
        "&limit=" + encodeURIComponent(cfg.limit) +
        "&access_token=" + encodeURIComponent(acc.accessToken);
      return fetch(url)
        .then(function (res) { return res.ok ? res.json() : null; })
        .then(function (data) { return data && Array.isArray(data.data) ? data.data : null; })
        .catch(function () { return null; });
    }

    function show(account) {
      currentAccount = account;
      var wait = reduceMotion ? 0 : 220;
      feedEl.classList.add("is-switching");
      /* fade out current content, then show the loading state */
      var pending = true;
      setTimeout(function () {
        if (currentAccount !== account) return; /* a newer switch owns the feed now */
        if (pending) { feedEl.innerHTML = loading(account); }
        feedEl.classList.remove("is-switching");
      }, wait);
      fetchAccount(account).then(function (posts) {
        pending = false;
        setTimeout(function () {
          if (currentAccount !== account) return; /* a newer tab won */
          render(account, posts);
          feedEl.classList.remove("is-switching");
        }, wait);
      });
    }

    if (tabsRoot) {
      tabsRoot.querySelectorAll(".ig-tab").forEach(function (tab) {
        tab.addEventListener("click", function () {
          tabsRoot.querySelectorAll(".ig-tab").forEach(function (t) { t.classList.remove("is-active"); });
          tab.classList.add("is-active");
          show(tab.dataset.account);
        });
      });
    }
    show(currentAccount);
  });
})();
