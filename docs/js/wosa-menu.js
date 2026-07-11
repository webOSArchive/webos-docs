/*
 * Injects the shared webOS Archive top-nav bar into every docs page.
 *
 * Written in plain ES5 (no fetch/arrow/const) and wrapped in try/catch so
 * that a legacy webOS browser which can't run it simply shows the docs
 * without the menu bar -- the documentation itself is always readable.
 *
 * The menu is pulled from a SAME-ORIGIN endpoint (menu.php), which proxies
 * the real menu over whichever protocol the client arrived on. That keeps
 * http-only devices on http and avoids any CORS requirement.
 */
(function () {
  // Only inject when we are the top-level document. When the page is loaded
  // inside the legacy index.php wrapper (an iframe), that wrapper already
  // renders the menu, so injecting here would double it up.
  try {
    if (window.top !== window.self) return;
  } catch (e) {
    // Cross-origin framing threw on access -- assume framed, do nothing.
    return;
  }

  // Work out where menu.php lives. In production the docs are reverse-proxied
  // under /docs/; on the standalone docs host (and locally) they sit at the
  // root. Handle both so the request stays same-origin either way.
  function menuRoot() {
    var path = window.location.pathname || "/";
    var marker = path.indexOf("/docs/");
    if (marker !== -1) return path.substring(0, marker) + "/docs/";
    return "/";
  }

  // Re-create <script> tags copied in via innerHTML so they actually execute
  // (menu.js for the mobile toggle, analytics, notifications).
  function activateScripts(container) {
    var found = container.getElementsByTagName("script");
    var list = [];
    for (var i = 0; i < found.length; i++) list.push(found[i]);
    for (var j = 0; j < list.length; j++) {
      var old = list[j];
      var fresh = document.createElement("script");
      if (old.src) {
        fresh.src = old.src;
      } else {
        fresh.text = old.text || old.textContent || old.innerHTML || "";
      }
      if (old.parentNode) old.parentNode.replaceChild(fresh, old);
    }
  }

  function run() {
    var xhr;
    try {
      xhr = new XMLHttpRequest();
    } catch (e) {
      return;
    }
    xhr.open("GET", menuRoot() + "menu.php?content=docs", true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      if (xhr.status >= 200 && xhr.status < 300 && xhr.responseText) {
        var mount = document.createElement("div");
        mount.id = "wosa-menu-mount";
        if (document.body.firstChild) {
          document.body.insertBefore(mount, document.body.firstChild);
        } else {
          document.body.appendChild(mount);
        }
        mount.innerHTML = xhr.responseText;
        activateScripts(mount);
        // Only now reserve space for the bar, so a failed load leaves no gap.
        var root = document.documentElement;
        root.className += (root.className ? " " : "") + "wosa-has-menu";
      }
      // Any non-2xx / network failure: leave the docs menu-less but readable.
    };
    try {
      xhr.send();
    } catch (e) {
      /* offline or blocked -- ignore, docs remain usable */
    }
  }

  if (document.readyState === "interactive" || document.readyState === "complete") {
    run();
  } else if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", run, false);
  } else if (window.attachEvent) {
    window.attachEvent("onload", run);
  }
})();
