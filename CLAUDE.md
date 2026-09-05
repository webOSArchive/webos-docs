# webOS Archive Docs / Help Flow

An interactive, progressive-disclosure help site for setting up, activating, and
using legacy Palm/HP webOS devices. It's the primary help entry point for
webOS Archive, replacing an older flat mkdocs documentation site.

Live at `https://docs.webosarchive.org`. Repo: `webOSArchive/webos-docs`.

## Git branches

- `main` — this site (what you're looking at).
- `old-version` — the complete history of the previous mkdocs-based docs
  site, preserved unchanged. If content here seems thinner than before, or
  you need to recover exact old wording/links/images, check that branch —
  it's the source of truth for pre-rewrite content. Some things were
  deliberately cut or restructured (the old site was flat per-topic pages;
  this one is a step-by-step wizard), so a diff isn't automatically a bug.
- `main`'s history also has `old-version`'s tip as a merge-commit ancestor
  (the cutover was done as a history-preserving merge, not a squash), so
  the old commits are reachable from `main` too, not just via the branch.

## Hard constraints — read before touching JS/CSS

This has to run correctly on real 2010-2011-era webOS browsers (TouchPad at
1024x768, Pre3 at 480x800) *as well as* modern desktop/phone browsers. That
means:

- **JS: plain ES5 only.** No arrow functions, `let`/`const`, template
  literals, classes, or newer `Array`/`Object` methods.
- **CSS: no flexbox, no grid, no custom properties, no `rem` units.**
  Layout is done with floats + `overflow:hidden` clearfix tricks (see
  `.site-header-text`, `.header-actions` in `style.css` for the pattern).
- No build step, no bundler, no npm dependencies. Everything is loaded as
  plain `<script>`/`<link>` tags.
- Prefer relative links for anything on this site. For links to
  `webosarchive.org` resources, always use plain `http://`, never
  `https://` — legacy devices can't do modern TLS, and we never want to
  force a protocol upgrade on them. Third-party links keep whatever scheme
  they require.
- When adding an icon/image that gets displayed small (buttons, favicons),
  pre-scale it close to its CSS display size rather than relying on the
  browser to downscale a large source image — old WebKit's scaler produces
  visible aliasing on a large ratio (e.g. a 320px source shown at 36px). A
  clean rule of thumb: ship at ~2x the CSS display size.

## File layout

- `index.php` — the only HTML entry point. Also does one server-side job:
  fetches the shared webOS Archive top nav (`www.webosarchive.org/menu.php`)
  over the *same protocol the request arrived on* and inlines it directly
  into the page. This is server-side specifically because
  `www.webosarchive.org` sends no CORS headers, so a client-side fetch from
  a different origin would be blocked by the browser — inlining via PHP
  sidesteps that entirely. **Requires a PHP-enabled host.** Local dev:
  `php -S 127.0.0.1:PORT` from the repo root — NOT `python3 -m http.server`,
  which can't execute `.php` files (it'll just serve the raw source).
- `flow-data.js` — all step/question/answer content. No rendering logic.
- `app.js` — the rendering/state engine. No content. See "Content model"
  below for the shape it expects from `flow-data.js`.
- `style.css` — site styling.
- `css/wosa-menu.css` — positions the injected top-nav bar (fixed, 45px
  tall) and reserves page space for it, only when `index.php`'s
  server-side fetch actually succeeded (graceful degradation — a failed
  fetch leaves no empty gap).
- `images/` — content images, icons, favicons. `DeviceIcons/` — the four
  device-category icons used in Steps 3 and 6 (order must match
  `DEVICE_CATEGORY_ICONS` in `flow-data.js`).

## Content model (`flow-data.js`)

- A **node** is one question: `{ q, code, info, options }`.
- An **option** is one answer: `{ label, content, next }` — `content` is
  HTML shown once picked; `next` is an optional nested node for a
  follow-up question.
- A **step** is a top-level numbered row: `{ id, title, node }`, collected
  in the `FLOW` array in step order.
- `q`, `info`, and `options` can each be either a plain value/array, or a
  **function** evaluated fresh on every render (e.g. reading the device
  filter). See `wosaResolveField`/`wosaResolveOptions` in `app.js`. Use
  this when a question's wording or choices need to depend on state
  already collected elsewhere in the flow.
- Steps 7 and 8 don't use the question/option wizard shape at all — they're
  `{ topics: [{label, content}, ...], after }`, rendered by
  `wosaRenderTopics` as a continuous flowing document (like the old docs
  pages), not a click-to-expand list.

## Device filter

Steps 3 and 6 (`FILTER_STEP_IDS`) both ask the same top-level "which
device?" question (`DEVICE_CATEGORY_LABELS`/`_SHORT`/`_ICONS`, a shared
4-entry array: Older Phone, Later Phone, TouchPad 10", TouchPad Go).
Answering it anywhere seeds `wosaState.deviceFilter` and carries the answer
into whichever of the two hasn't been asked yet, so the user is never asked
twice.

`FILTER_DEPENDENT_STEP_IDS` (currently `[4, 5]`) lists steps whose *own*
`options` function reads that filter to narrow its choices (e.g. Step 4's
recovery-mode procedure differs by device). Any answer change within a
filter step (not just the top-level device pick — e.g. Step 3's nested
"upgrade to Community Edition" sub-answer) invalidates those steps' stored
answers via `wosaInvalidateFilterDependents()`, so a stale option index can
never silently point at the wrong choice once the filtered list reshuffles.

When a filter-dependent node's `options` function resolves to exactly one
real choice, `wosaRenderNode` auto-selects it — no point making someone tap
the only available answer. This never applies to a node that's *naturally*
single-option by design (a plain array, e.g. the "confirm deviceTool
finished" checkpoint), which still requires a deliberate tap since it's
confirming a real-world action, not narrowing a question.

`wosaIsCEUpgrade()` in `flow-data.js` is a further example of this pattern:
it derives (purely from Step 3's own path — TouchPad 10" filter plus its
"Upgrade to webOS 3.1.0 Community Edition" sub-answer) whether Steps 4 and
5 should skip their normal instructions in favor of a short "already
handled by the CE Doctor" message.

## Rendering / state

- State lives in `localStorage` (`wosaHelpFlowState2`): `{ path,
  deviceFilter, collapsedSteps }`. `wosaReset()` clears it back to
  defaults (step 1 expanded, everything else collapsed).
- Every state change triggers a full re-render (`wosaRender()` rebuilds
  the entire `#app` innerHTML from `FLOW`) — there's no incremental DOM
  patching.
- Because of that, entrance animations are scoped via a transient,
  non-persisted global, `wosaAnimateFrom = {stepId, level}`, set right
  before a re-render so only the genuinely-new content (deeper than the
  level that was just answered) gets the reveal animation — otherwise
  already-visible content would replay its animation on every unrelated
  re-render.
- Options stay visible after being answered (highlighted green, others
  dimmed) rather than collapsing away — changing an answer is just
  clicking a different visible option.

## Testing pattern used during development

- **Headless smoke tests**: fake minimal `document`/`window` objects in a
  Node one-liner, `eval` `flow-data.js` then `app.js`, call `wosaChoose`/
  `wosaGoto` directly, and inspect the generated `innerHTML` string for
  expected classes/content. Fast, no browser needed, good for verifying
  render-tree logic (auto-select, filter narrowing, CE-upgrade branches).
- **Live browser verification**: needed for anything visual (layout,
  animation, icon rendering) or to catch caching gotchas — the browser
  caches `app.js`/`flow-data.js` separately from `index.php`, so a
  cache-busting query string on the page alone won't bust the script
  cache; a real hard reload is needed after editing JS.
- Always reset state (`wosaReset()`) before ending a test session so the
  next visitor doesn't inherit leftover test state from localStorage.
