/*
 * Injects the shared webOS Archive top-nav bar into every docs page.
 *
 * Written in plain ES5 (no fetch/arrow/const) and wrapped in try/catch so
 * that a legacy webOS browser which can't run it simply shows the docs
 * without the menu bar -- the documentation itself is always readable.
 *
 * SHARED FILE -- deployed verbatim to docs, the blog, and any other
 * webOS Archive property. Keep it free of per-site details; anything
 * site-specific belongs in that site's menu.php or wosa-menu.css.
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

  // Work out where menu.php lives by looking at where THIS script was loaded
  // from. It always sits at <root>/js/wosa-menu.js, so stripping that suffix
  // yields the root whether the site is at a host root (docs.webosarchive.org),
  // reverse-proxied under a path (/docs/), or served from a subdirectory of a
  // larger site (/pivot/). Deriving it is what lets this file stay byte-for-byte
  // identical across every property -- a hardcoded marker would not.
  function menuRoot() {
    var tags = document.getElementsByTagName("script");
    for (var i = 0; i < tags.length; i++) {
      // .src is the absolute, resolved URL even when the tag was written with
      // a relative path -- MkDocs emits ../js/... on deeper pages.
      var src = tags[i].src || "";
      var cut = src.indexOf("/js/wosa-menu.js");
      if (cut === -1) continue;
      var scheme = src.indexOf("://");
      var pathStart = scheme === -1 ? 0 : src.indexOf("/", scheme + 3);
      if (pathStart === -1 || pathStart > cut) return "/";
      return src.substring(pathStart, cut) + "/";
    }
    return "/";                       // not found: assume the host root
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
    // No content= param: each site's own menu.php declares which nav item
    // it is via its default, so this script stays identical everywhere.
    xhr.open("GET", menuRoot() + "menu.php", true);
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
