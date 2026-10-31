/* The AI Brief - LB Edition: small enhancements. The site works without this file. */
(function () {
  "use strict";

  var STORE = "aib-audience";
  function load() { try { return localStorage.getItem(STORE); } catch (e) { return null; } }
  function save(v) { try { if (v) { localStorage.setItem(STORE, v); } else { localStorage.removeItem(STORE); } } catch (e) {} }

  /* Which audience keys a label or audience list refers to. */
  function keysFor(text) {
    var t = (text || "").toLowerCase(), k = [];
    if (/student/.test(t)) k.push("students");
    if (/faculty|researcher/.test(t)) k.push("faculty");
    if (/staff|advis/.test(t)) k.push("staff");
    if (/entrepreneur|founder/.test(t)) k.push("entrepreneurs");
    if (/business|firms|companies/.test(t)) k.push("enterprises");
    return k;
  }

  /* Tables: wrap for scrolling, label cells for the phone card layout, keep dates and amounts on one line. */
  function tables() {
    var list = document.querySelectorAll(".prose table");
    Array.prototype.forEach.call(list, function (table) {
      var heads = Array.prototype.map.call(table.querySelectorAll("thead th"), function (th) { return th.textContent.trim(); });
      var wrap = document.createElement("div");
      wrap.className = "table-wrap" + (heads.length > 3 ? " cardable" : "");
      table.parentNode.insertBefore(wrap, table);
      wrap.appendChild(table);
      var nowrap = heads.map(function (h) { return /^(date|deadline|amount|target)$/i.test(h); });
      Array.prototype.forEach.call(table.querySelectorAll("thead th"), function (th, i) { if (nowrap[i]) th.classList.add("nowrap"); });
      Array.prototype.forEach.call(table.querySelectorAll("tbody tr"), function (tr) {
        Array.prototype.forEach.call(tr.children, function (td, i) {
          td.setAttribute("data-label", heads[i] || "");
          if (nowrap[i]) td.classList.add("nowrap");
        });
      });
    });
  }

  /* Sticky bar: hide while scrolling down, return on the way up; show a fade where the switcher scrolls sideways. */
  function bar() {
    var el = document.querySelector(".issue-bar");
    if (!el) return;
    var nav = el.querySelector(".audience-nav");
    var start = el.getBoundingClientRect().top + window.scrollY;
    var last = window.scrollY, ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        var y = window.scrollY;
        var stuck = y > start + 40;
        el.classList.toggle("is-stuck", stuck);
        if (!stuck || y < last - 4) el.classList.remove("is-hidden");
        else if (y > last + 4 && !el.contains(document.activeElement)) el.classList.add("is-hidden");
        last = y;
        ticking = false;
      });
    }, { passive: true });
    el.addEventListener("focusin", function () { el.classList.remove("is-hidden"); });
    function edges() {
      var max = nav.scrollWidth - nav.clientWidth;
      el.classList.toggle("more-right", nav.scrollLeft < max - 2);
      el.classList.toggle("more-left", nav.scrollLeft > 2);
    }
    nav.addEventListener("scroll", edges, { passive: true });
    window.addEventListener("resize", edges);
    var active = nav.querySelector("a.active, a.pressed");
    if (active && nav.scrollWidth > nav.clientWidth) nav.scrollLeft = Math.max(0, active.offsetLeft - 24);
    edges();
  }

  /* Full issue: "Read as" highlights one audience's paragraphs instead of leaving the page. */
  function readAs() {
    var article = document.querySelector("[data-issue-page]");
    if (!article) return;
    var links = article.querySelectorAll(".audience-nav a[data-aud]");
    var note = article.querySelector(".reading-note");

    Array.prototype.forEach.call(article.querySelectorAll(".prose p > strong:first-child"), function (strong) {
      var p = strong.parentNode;
      if (p.firstChild !== strong || !/:\s*$/.test(strong.textContent)) return;
      var k = keysFor(strong.textContent);
      if (k.length) { p.classList.add("aud"); p.setAttribute("data-aud", k.join(" ")); }
    });
    Array.prototype.forEach.call(article.querySelectorAll(".contents li[data-for]"), function (li) {
      li.setAttribute("data-aud", keysFor(li.getAttribute("data-for")).join(" "));
    });

    function apply(key) {
      var link = key && article.querySelector('.audience-nav a[data-aud="' + key + '"]');
      if (!link) key = null;
      document.body.toggleAttribute("data-reading", !!key);
      Array.prototype.forEach.call(links, function (a) {
        var on = a === link;
        a.classList.toggle("pressed", on);
        a.setAttribute("aria-pressed", on ? "true" : "false");
      });
      Array.prototype.forEach.call(article.querySelectorAll("[data-aud]:not(a)"), function (el) {
        el.classList.toggle("match", !!key && (" " + el.getAttribute("data-aud") + " ").indexOf(" " + key + " ") > -1);
      });
      if (note) {
        note.hidden = !key;
        if (key) {
          note.querySelector(".rn-text").textContent = "Highlighting what is for " + link.getAttribute("aria-label").toLowerCase() + ".";
          note.querySelector(".rn-short").href = link.href;
        }
      }
    }

    Array.prototype.forEach.call(links, function (a) {
      a.setAttribute("role", "button");
      a.addEventListener("click", function (e) {
        e.preventDefault();
        var key = a.classList.contains("pressed") ? null : a.getAttribute("data-aud");
        save(key);
        apply(key);
      });
    });
    var btn = note && note.querySelector(".rn-clear");
    if (btn) btn.addEventListener("click", function () { save(null); apply(null); });
    apply(load());
  }

  /* An audience page remembers the reader's choice for the full issue. */
  function remember() {
    var a = document.querySelector("[data-audience]");
    if (a && a.getAttribute("data-audience")) save(a.getAttribute("data-audience"));
  }

  function init() { remember(); tables(); readAs(); bar(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
