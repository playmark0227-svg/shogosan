/* =============================================================
   ES Beauty — main JS (multi-page)
   Motion system (smart header / scroll progress / reveals /
   parallax / counters / tilt / magnetic buttons / cursor /
   champagne bubbles), mobile nav, current-page highlight,
   company-name binding from config, Instagram feed.

   Progressive enhancement:
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
  var CFG = window.ES_CONFIG || window.ES_UUR_CONFIG || {};

  function safe(fn) { try { fn(); } catch (e) { /* isolate module failures */ } }

  /* ---------- Brand veil (first page view per tab) ---------- */
  safe(function () {
    if (reduceMotion) return;
    var seen = false;
    try { seen = sessionStorage.getItem("esbVeil") === "1"; } catch (e) {}
    if (seen) return;
    try { sessionStorage.setItem("esbVeil", "1"); } catch (e) {}
    docEl.classList.add("has-veil");
    var veil = document.createElement("div");
    veil.className = "veil";
    veil.setAttribute("aria-hidden", "true");
    veil.innerHTML =
      '<svg viewBox="0 0 56 40" fill="none"><path class="brandmark__path" d="M9,23 C11,23 19,23 20.5,20.5 C22.5,16 16.5,10.5 11,12.5 C5.5,14.5 5.5,24 11.5,28.5 C16.5,32 22,30 25,25 M29,16 C31,9.5 42,9 41.5,14.5 C41,19.5 30.5,18 30.5,23.5 C30.5,29.5 39.5,29.5 45,24" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
      '<p class="veil__word" data-company>ES Beauty</p>';
    document.body.appendChild(veil);
    var kill = function () { if (veil.parentNode) veil.parentNode.removeChild(veil); };
    veil.addEventListener("animationend", function (e) { if (e.animationName === "veilOut") kill(); });
    setTimeout(kill, 2600); /* hard stop even if animations get disabled mid-flight */
  });

  /* ---------- Film grain finish ---------- */
  safe(function () {
    var g = document.createElement("div");
    g.className = "grain";
    g.setAttribute("aria-hidden", "true");
    document.body.appendChild(g);
  });

  /* ---------- Per-character type reveal (skips without JS) ---------- */
  safe(function () {
    if (reduceMotion) return;
    function split(el, base, step) {
      if (!el || el.classList.contains("is-split")) return;
      var idx = 0;
      (function walk(node) {
        var kids = [].slice.call(node.childNodes);
        kids.forEach(function (n) {
          if (n.nodeType === 3) {
            var frag = document.createDocumentFragment();
            var chunks = n.textContent.match(/[A-Za-z0-9]+|\s|[\s\S]/g) || [];
            chunks.forEach(function (chunk) {
              var s = document.createElement("span");
              s.className = "ch";
              if (/^\s$/.test(chunk)) { s.innerHTML = "&nbsp;"; }
              else s.textContent = chunk;
              s.style.animationDelay = (base + idx * step) + "ms";
              idx++;
              frag.appendChild(s);
            });
            node.replaceChild(frag, n);
          } else if (n.nodeType === 1) {
            if (n.classList && n.classList.contains("shimmer")) {
              /* keep shimmer intact: animate a wrapper, not the clipped text */
              var w = document.createElement("span");
              w.className = "ch";
              w.style.animationDelay = (base + idx * step) + "ms";
              idx += 3;
              node.insertBefore(w, n);
              w.appendChild(n);
            } else if (n.tagName === "BR") {
              idx += 2;
            } else {
              walk(n);
            }
          }
        });
      })(el);
      el.classList.add("is-split");
    }
    var off = docEl.classList.contains("has-veil") ? 900 : 0;
    document.querySelectorAll(".hero__title .line > span").forEach(function (sp, li) {
      split(sp, off + 500 + li * 220, 34);
    });
    var heroTitle = document.querySelector(".hero__title");
    if (heroTitle && heroTitle.querySelector(".is-split")) heroTitle.classList.add("is-split");
    split(document.querySelector(".page-hero__title"), off + 380, 30);
  });

  /* ---------- Hero mouse parallax (orbs / ring / logo drift) ---------- */
  safe(function () {
    if (reduceMotion || !finePointer) return;
    var hero = document.querySelector(".hero");
    if (!hero) return;
    var orbs = hero.querySelector(".hero__orbs");
    var ring = hero.querySelector(".hero__ring");
    var logo = hero.querySelector(".hero__logo");
    if (!orbs && !ring && !logo) return;
    var mx = 0, my = 0, cx = 0, cy = 0, running = false;
    function step() {
      cx += (mx - cx) * 0.08;
      cy += (my - cy) * 0.08;
      if (orbs) orbs.style.transform = "translate(" + (cx * 26).toFixed(1) + "px," + (cy * 18).toFixed(1) + "px)";
      if (ring) ring.style.transform = "translate(" + (cx * -22).toFixed(1) + "px," + (cy * -16).toFixed(1) + "px)";
      if (logo) logo.style.transform = "translate(" + (cx * 10).toFixed(1) + "px," + (cy * 8).toFixed(1) + "px)";
      if (Math.abs(mx - cx) > 0.002 || Math.abs(my - cy) > 0.002) requestAnimationFrame(step);
      else running = false;
    }
    hero.addEventListener("mousemove", function (e) {
      var r = hero.getBoundingClientRect();
      mx = e.clientX / r.width - 0.5;
      my = (e.clientY - r.top) / r.height - 0.5;
      if (!running) { running = true; requestAnimationFrame(step); }
    }, { passive: true });
    hero.addEventListener("mouseleave", function () {
      mx = 0; my = 0;
      if (!running) { running = true; requestAnimationFrame(step); }
    });
  });

  /* ---------- Company name binding (single source of truth) ---------- */
  safe(function () {
    if (!CFG.company) return;
    document.querySelectorAll("[data-company]").forEach(function (el) {
      el.textContent = CFG.company;
    });
  });

  /* ---------- Smart header / progress / parallax / to-top ---------- */
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
      if (hero && !reduceMotion && y < window.innerHeight) hero.style.setProperty("--par", (y * 0.12).toFixed(1) + "px");
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
    /* restore scroll lock if resized to desktop while open */
    window.addEventListener("resize", function () {
      if (window.innerWidth > 720) close();
    });
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

  /* ---------- Scroll reveal (JS-gated; above-fold shows instantly) ---------- */
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
      [".service-row", "rv--left"],
      [".video-embed", "rv--scale"],
      [".media-slot", "rv--scale"],
      [".cta-band__inner", "rv--scale"],
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

    /* reveal, then strip the machinery once the entrance settles so each
       element's own hover transforms / transitions apply again */
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
      /* at or above the fold on load (incl. a restored scroll position): instant */
      if (r.top < vh * 0.95) reveal(el);
      else io.observe(el);
    });

    /* failsafe: whatever is in view but still hidden gets revealed */
    var pendingEls = els.slice();
    function sweep() {
      if (!pendingEls.length) return;
      var h = window.innerHeight;
      pendingEls = pendingEls.filter(function (el) {
        if (el.classList.contains("is-in") || (done && done.has(el))) return false;
        /* reveal anything the viewport has REACHED — not just what is
           currently framed. A fast flick or an anchor jump scrolls elements
           past between frames; requiring them to still be on screen stranded
           them at opacity:0 forever. */
        if (el.getBoundingClientRect().top < h) { reveal(el); return false; }
        return true;
      });
    }
    /* continuous rAF sweep while scrolling (and briefly after) — IO can
       miss elements under fast flicks; this guarantees nothing stays
       hidden. Cost shrinks to zero as pendingEls empties. */
    var sweeping = false, lastScrollT = 0;
    function sweepLoop() {
      sweep();
      if (pendingEls.length && Date.now() - lastScrollT < 600) requestAnimationFrame(sweepLoop);
      else sweeping = false;
    }
    document.addEventListener("scroll", function () {
      lastScrollT = Date.now();
      if (!sweeping && pendingEls.length) { sweeping = true; requestAnimationFrame(sweepLoop); }
    }, { passive: true });
    [1500, 4000, 8000].forEach(function (t) { setTimeout(sweep, t); });
    /* last-resort heartbeat: content visibility must never depend on an
       event firing. Stops itself once everything has been revealed. */
    var beats = 0;
    var beat = setInterval(function () {
      sweep();
      if (!pendingEls.length || ++beats > 90) clearInterval(beat);
    }, 700);
    window.addEventListener("resize", sweep, { passive: true });
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
      return '<div class="ig-soon"><h4>Coming soon</h4>' +
        "<p>Instagramアカウントは準備中です。オープンまでいましばらくお待ちください。</p></div>";
    };
    var fallback = function (acc) {
      return '<div class="ig-fallback"><h4>@' + esc(acc) + "</h4>" +
        "<p>最新投稿の取得には <code>js/config.js</code> にアクセストークンを設定してください。</p>" +
        '<a class="btn btn--primary" href="https://www.instagram.com/' + encodeURIComponent(acc) +
        '/" target="_blank" rel="noopener">@' + esc(acc) + " を開く</a></div>";
    };
    var loading = function (acc) {
      return '<div class="ig-loading"><span></span><span></span><span></span><p>Loading @' + esc(acc) + "…</p></div>";
    };

    function render(account, posts) {
      var c = accCfg(account);
      if (c && c.comingSoon) { feedEl.innerHTML = comingSoon(); return; }
      if (!posts || !posts.length) { feedEl.innerHTML = fallback(account); return; }
      feedEl.innerHTML = posts.slice(0, 8).map(function (p, i) {
        var img = p.media_type === "VIDEO" ? (p.thumbnail_url || p.media_url) : p.media_url;
        var cap = p.caption ? esc(p.caption).slice(0, 80) + "…" : "";
        return '<a class="ig-card" style="animation-delay:' + (i * 60) + 'ms" href="' + p.permalink +
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
      var wait = reduceMotion ? 0 : 220;
      var c = accCfg(account);
      feedEl.classList.add("is-switching");
      var pending = true;
      setTimeout(function () {
        if (currentAccount !== account) return;
        if (pending) feedEl.innerHTML = (c && c.comingSoon) ? comingSoon() : loading(account);
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
