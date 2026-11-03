/* =====================================================================
   PILab — site scripts (no dependencies)
   1) KO/EN 언어 전환   2) 모바일 메뉴   3) 논문 필터·검색
   4) 탭(구성원·뉴스)   5) 히어로 레이더 애니메이션 / 사진 슬라이드
   ===================================================================== */
(function () {
  "use strict";
  var root = document.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. language ---------- */
  function applyPlaceholders(lang) {
    document.querySelectorAll("[data-ph-ko]").forEach(function (el) {
      el.setAttribute("placeholder", el.getAttribute("data-ph-" + lang) || "");
    });
  }
  function setLang(lang) {
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang);
    try { localStorage.setItem("pilab-lang", lang); } catch (e) {}
    try {
      var u = new URL(location.href);
      if (u.searchParams.has("lang")) { u.searchParams.set("lang", lang); history.replaceState(null, "", u); }
    } catch (e) {}
    applyPlaceholders(lang);
  }
  applyPlaceholders(root.getAttribute("data-lang") || "ko");

  /* ---------- back to top ---------- */
  document.querySelectorAll(".to-top").forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  });
  document.querySelectorAll(".lang-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLang(root.getAttribute("data-lang") === "en" ? "ko" : "en");
    });
  });

  /* ---------- 2. header & mobile nav ---------- */
  var header = document.querySelector(".site-header");
  var navToggle = document.querySelector(".nav-toggle");
  if (navToggle) {
    navToggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".site-nav a").forEach(function (a) {
      a.addEventListener("click", function () { document.body.classList.remove("nav-open"); navToggle.setAttribute("aria-expanded", "false"); });
    });
  }
  function onScroll() { if (header) header.classList.toggle("is-scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- 3. publications filter ---------- */
  var list = document.querySelector("[data-pub-list]");
  if (list) {
    var state = { type: "all", scope: "all", q: "" };
    var items = Array.prototype.slice.call(list.querySelectorAll(".pub"));
    var groups = Array.prototype.slice.call(list.querySelectorAll("[data-year-group]"));
    var countEl = document.querySelector("[data-pub-count]");
    var emptyEl = document.querySelector("[data-pub-empty]");
    var run = function () {
      var total = 0, q = state.q.trim().toLowerCase();
      items.forEach(function (el) {
        var ok = (state.type === "all" || el.dataset.type === state.type) &&
                 (state.scope === "all" || el.dataset.scope === state.scope) &&
                 (!q || (el.dataset.search || "").indexOf(q) !== -1);
        el.hidden = !ok;
        if (ok) total++;
      });
      groups.forEach(function (g) {
        var n = 0;
        g.querySelectorAll(".pub").forEach(function (el) {
          if (!el.hidden) { n++; var num = el.querySelector(".pub-num"); if (num) num.textContent = n + "."; }
        });
        g.hidden = n === 0;
      });
      if (countEl) countEl.textContent = total;
      if (emptyEl) emptyEl.hidden = total !== 0;
    };
    var bindGroup = function (sel, key, attr) {
      var wrap = document.querySelector(sel);
      if (!wrap) return;
      wrap.addEventListener("click", function (e) {
        var b = e.target.closest("button");
        if (!b || !wrap.contains(b)) return;
        wrap.querySelectorAll("button").forEach(function (x) { x.classList.toggle("is-active", x === b); });
        state[key] = b.getAttribute(attr);
        run();
      });
    };
    bindGroup("[data-pub-tabs]", "type", "data-type");
    bindGroup("[data-pub-scope]", "scope", "data-scope");
    var search = document.querySelector("[data-pub-search]");
    if (search) search.addEventListener("input", function () { state.q = search.value; run(); });
  }

  /* ---------- 4. tabs ---------- */
  document.querySelectorAll("[data-tabs]").forEach(function (wrap) {
    wrap.addEventListener("click", function (e) {
      var b = e.target.closest("[data-tab]");
      if (!b) return;
      var id = b.getAttribute("data-tab");
      wrap.querySelectorAll("[data-tab]").forEach(function (x) { x.classList.toggle("is-active", x === b); });
      document.querySelectorAll("[data-panel]").forEach(function (p) { p.hidden = p.getAttribute("data-panel") !== id; });
      if (history.replaceState) history.replaceState(null, "", "#" + id);
    });
    // 주소 끝의 #id 로 탭 바로 열기 (예: /courses/#tutorials)
    function openFromHash() {
      var h = location.hash.slice(1).replace(/[^\w-]/g, "");
      var hb = h && wrap.querySelector('[data-tab="' + h + '"]');
      if (hb && !hb.classList.contains("is-active")) hb.click();
    }
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
  });
  /* ---------- Research 파이프라인: 누른 단계까지 줄 채우기 ---------- */
  var pipe = document.querySelector("[data-pipeline]");
  if (pipe) {
    var steps = Array.prototype.slice.call(pipe.querySelectorAll("li"));
    var cur = 0;
    var fillTo = function (n) {
      steps.forEach(function (li, i) {
        var d = n >= cur ? Math.max(0, i - cur) * 80 : Math.max(0, cur - i) * 60;
        li.style.setProperty("--d", d + "ms");
        li.classList.toggle("is-filled", i <= n);
        li.classList.toggle("is-current", i === n);
      });
      cur = n;
    };
    var fromHash = function () {
      var id = location.hash.slice(1);
      steps.forEach(function (li, i) {
        var a = li.querySelector("a");
        if (a && a.getAttribute("href") === "#" + id) fillTo(i);
      });
    };
    pipe.addEventListener("click", function (e) {
      var li = e.target.closest("li");
      if (li) fillTo(steps.indexOf(li));
    });
    fromHash();
    window.addEventListener("hashchange", fromHash);
  }

  var newsTabs = document.querySelector("[data-news-tabs]");
  if (newsTabs) {
    newsTabs.addEventListener("click", function (e) {
      var b = e.target.closest("[data-cat]");
      if (!b) return;
      var c = b.getAttribute("data-cat");
      newsTabs.querySelectorAll("[data-cat]").forEach(function (x) { x.classList.toggle("is-active", x === b); });
      document.querySelectorAll(".news-grid > [data-cat]").forEach(function (n) { n.hidden = c !== "all" && n.getAttribute("data-cat") !== c; });
    });
  }

  /* ---------- 5a. hero slides (사진이 있을 때) ---------- */
  var slides = document.querySelectorAll("[data-slides] .hero-slide");
  if (slides.length > 1 && !reduceMotion) {
    var si = 0;
    setInterval(function () {
      slides[si].classList.remove("is-active");
      si = (si + 1) % slides.length;
      slides[si].classList.add("is-active");
    }, 6000);
  }

  /* ---------- 5b. radar BEV animation ----------
     자차(아래 중앙) 기준 4D 레이더 BEV. 빔이 ±60°를 왕복하며 표적을 비추면
     도플러 색(접근=빨강, 이탈=파랑)의 반사점과 3D 박스가 나타났다가 서서히 사라집니다. */
  var canvas = document.getElementById("radar-canvas");
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");
  var W = 0, H = 0, DPR = 1, ox = 0, oy = 0, scale = 1;
  var MAX_R = 80, FOV = Math.PI / 3; // 80 m, ±60°
  var TEAL = "63,213,196", RED = "255,107,107", BLUE = "77,171,255";

  function rnd(a, b) { return a + Math.random() * (b - a); }
  function gauss() { return (Math.random() + Math.random() + Math.random() - 1.5) / 1.5; }

  var lanes = [-7.2, -3.6, 0, 3.6, 7.2];
  var targets = [];
  function makeTarget(i) {
    var ped = i >= 7;
    var lane = ped ? (Math.random() < .5 ? -11 : 11) + rnd(-1, 1) : lanes[i % lanes.length] + rnd(-.4, .4);
    var oncoming = !ped && lane < -1;
    return {
      kind: ped ? "PED" : (Math.random() < .2 ? "TRUCK" : "CAR"),
      x: lane, y: rnd(10, 76),
      vy: ped ? rnd(-.6, .6) : oncoming ? rnd(-16, -10) : rnd(-3.5, 3.5), // 자차 기준 상대속도 (m/s)
      vx: ped ? rnd(-.5, .5) : 0,
      len: ped ? .7 : 4.6, wid: ped ? .7 : 1.9,
      hit: -1e9, pts: [], conf: rnd(.82, .98)
    };
  }
  for (var i = 0; i < 9; i++) targets.push(makeTarget(i));
  targets.forEach(function (t) { if (t.kind === "TRUCK") { t.len = 8.5; t.wid = 2.4; } });

  var clutter = [];
  function resetClutter() {
    clutter = [];
    for (var k = 0; k < 70; k++) {
      var r = rnd(4, MAX_R), a = rnd(-FOV, FOV);
      clutter.push({ r: r, a: a, hit: -1e9 });
    }
  }
  resetClutter();

  function resize() {
    var rect = canvas.getBoundingClientRect();
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = Math.max(1, rect.width); H = Math.max(1, rect.height);
    canvas.width = Math.round(W * DPR); canvas.height = Math.round(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ox = W / 2; oy = H * .93;
    var rMax = Math.max(20, Math.min(H * .86, (W / 2 - 16) / Math.sin(FOV)));
    scale = rMax / MAX_R;
  }
  function toScreen(x, y) { return [ox + x * scale, oy - y * scale]; }

  function drawGrid() {
    ctx.lineWidth = 1;
    for (var r = 20; r <= MAX_R; r += 20) {
      ctx.strokeStyle = "rgba(255,255,255," + (r === MAX_R ? .22 : .1) + ")";
      ctx.beginPath();
      ctx.arc(ox, oy, r * scale, -Math.PI / 2 - FOV, -Math.PI / 2 + FOV);
      ctx.stroke();
      var p = toScreen(.8, r);
      ctx.fillStyle = "rgba(255,255,255,.32)";
      ctx.font = "10px ui-monospace, Menlo, monospace";
      ctx.fillText(r + "m", p[0] + 3, p[1] - 4);
    }
    for (var d = -60; d <= 60; d += 30) {
      var a = d * Math.PI / 180;
      var e = toScreen(Math.sin(a) * MAX_R, Math.cos(a) * MAX_R);
      ctx.strokeStyle = "rgba(255,255,255," + (d === 0 ? .12 : .07) + ")";
      ctx.setLineDash(d === 0 ? [4, 6] : []);
      ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(e[0], e[1]); ctx.stroke();
    }
    ctx.setLineDash([]);
  }

  function drawSweep(ang, dir) {
    var trail = .55;
    var a0 = -Math.PI / 2 + ang, a1 = a0 - dir * trail;
    var steps = 14;
    for (var s = 0; s < steps; s++) {
      var f0 = s / steps, f1 = (s + 1) / steps;
      ctx.fillStyle = "rgba(" + TEAL + "," + (0.10 * (1 - f0)) + ")";
      ctx.beginPath(); ctx.moveTo(ox, oy);
      var b0 = a0 - dir * trail * f0, b1 = a0 - dir * trail * f1;
      ctx.arc(ox, oy, MAX_R * scale, Math.min(b0, b1), Math.max(b0, b1));
      ctx.closePath(); ctx.fill();
    }
    var e = [ox + Math.cos(a0) * MAX_R * scale, oy + Math.sin(a0) * MAX_R * scale];
    ctx.strokeStyle = "rgba(" + TEAL + ",.85)"; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(e[0], e[1]); ctx.stroke();
  }

  function scanHits(t, prevAng, ang) {
    var lo = Math.min(prevAng, ang) - .02, hi = Math.max(prevAng, ang) + .02;
    targets.forEach(function (tg) {
      var az = Math.atan2(tg.x, tg.y);
      if (az >= lo && az <= hi && tg.y > 2 && Math.hypot(tg.x, tg.y) < MAX_R) {
        tg.hit = t; tg.pts = [];
        var n = tg.kind === "PED" ? 3 + (Math.random() * 3 | 0) : 9 + (Math.random() * 9 | 0);
        for (var k = 0; k < n; k++) tg.pts.push([gauss() * tg.wid * .55, gauss() * tg.len * .5]);
      }
    });
    clutter.forEach(function (c) { if (c.a >= lo && c.a <= hi) { c.hit = t; } });
  }

  function drawTargets(t) {
    targets.forEach(function (tg) {
      var age = (t - tg.hit) / 1000;
      var alpha = Math.max(0, Math.exp(-age / 1.6));
      if (alpha < .03) return;
      var r = Math.hypot(tg.x, tg.y) || 1;
      var vr = (tg.x * tg.vx + tg.y * tg.vy) / r; // radial velocity
      var col = vr < -.3 ? RED : vr > .3 ? BLUE : "230,236,245";
      tg.pts.forEach(function (p) {
        var s = toScreen(tg.x + p[0], tg.y + p[1]);
        ctx.fillStyle = "rgba(" + col + "," + (alpha * .95) + ")";
        ctx.beginPath(); ctx.arc(s[0], s[1], 2.1, 0, Math.PI * 2); ctx.fill();
      });
      var c = toScreen(tg.x, tg.y), bw = tg.wid * scale, bl = tg.len * scale;
      ctx.strokeStyle = "rgba(" + TEAL + "," + (alpha * .9) + ")"; ctx.lineWidth = 1.2;
      ctx.strokeRect(c[0] - bw / 2, c[1] - bl / 2, bw, bl);
      if (alpha > .25 && W > 520) {
        ctx.fillStyle = "rgba(" + TEAL + "," + alpha + ")";
        ctx.font = "600 10px ui-monospace, Menlo, monospace";
        ctx.fillText(tg.kind + " " + tg.conf.toFixed(2), c[0] + bw / 2 + 4, c[1] - bl / 2 + 8);
        ctx.fillStyle = "rgba(255,255,255," + alpha * .55 + ")";
        ctx.font = "10px ui-monospace, Menlo, monospace";
        ctx.fillText((vr >= 0 ? "+" : "") + vr.toFixed(1) + " m/s", c[0] + bw / 2 + 4, c[1] - bl / 2 + 20);
      }
    });
    clutter.forEach(function (cl) {
      var age = (t - cl.hit) / 1000, alpha = Math.exp(-age / 1.1) * .45;
      if (alpha < .03) return;
      var s = [ox + Math.sin(cl.a) * cl.r * scale, oy - Math.cos(cl.a) * cl.r * scale];
      ctx.fillStyle = "rgba(200,210,230," + alpha + ")";
      ctx.fillRect(s[0] - 1, s[1] - 1, 2, 2);
    });
  }

  function drawEgo() {
    ctx.fillStyle = "rgba(255,255,255,.9)";
    ctx.beginPath();
    ctx.moveTo(ox, oy - 12); ctx.lineTo(ox + 7, oy + 4); ctx.lineTo(ox - 7, oy + 4); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = "rgba(" + TEAL + ",.6)";
    ctx.beginPath(); ctx.arc(ox, oy, 16, 0, Math.PI * 2); ctx.stroke();
  }

  function step(dt) {
    targets.forEach(function (tg, idx) {
      tg.y += tg.vy * dt; tg.x += tg.vx * dt;
      if (tg.y > MAX_R + 6 || tg.y < -2 || Math.abs(tg.x) > 14) {
        var n = makeTarget(idx);
        n.y = tg.vy < 0 ? rnd(70, 82) : rnd(6, 12);
        if (tg.kind === "TRUCK") { n.kind = "TRUCK"; n.len = 8.5; n.wid = 2.4; }
        targets[idx] = n;
      }
    });
  }

  var ang = -FOV, dir = 1, last = 0, running = true, rafId = 0;
  var SWEEP_SPEED = 1.15; // rad/s
  function frame(t) {
    if (!last) last = t;
    var dt = Math.min(.05, (t - last) / 1000); last = t;
    var prev = ang;
    ang += dir * SWEEP_SPEED * dt;
    if (ang > FOV) { ang = FOV; dir = -1; }
    if (ang < -FOV) { ang = -FOV; dir = 1; resetClutterPartial(); }
    step(dt);
    scanHits(t, prev, ang);
    ctx.clearRect(0, 0, W, H);
    drawGrid();
    drawSweep(ang, dir);
    drawTargets(t);
    drawEgo();
    if (running) rafId = requestAnimationFrame(frame);
  }
  function resetClutterPartial() {
    clutter.forEach(function (c) { if (Math.random() < .5) { c.r = rnd(4, MAX_R); c.a = rnd(-FOV, FOV); } });
  }
  function drawStatic() {
    var t = 1000;
    scanHits(t, -FOV, FOV);
    ctx.clearRect(0, 0, W, H);
    drawGrid(); drawSweep(FOV * .35, 1); drawTargets(t); drawEgo();
  }

  resize();
  window.addEventListener("resize", function () { resize(); if (reduceMotion) drawStatic(); });
  if (reduceMotion) { drawStatic(); return; }

  function start() { if (!running) { running = true; last = 0; rafId = requestAnimationFrame(frame); } }
  function stop() { running = false; cancelAnimationFrame(rafId); }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (ents) { ents[0].isIntersecting ? start() : stop(); }).observe(canvas);
  }
  document.addEventListener("visibilitychange", function () { document.hidden ? stop() : start(); });
  drawStatic();
  rafId = requestAnimationFrame(frame);
})();
