/* Plain ES5 -- no arrow functions, let/const, template literals, or
   Array/Object niceties newer than what a 2010/2011 WebKit ships. */

var STORAGE_KEY = "wosaHelpFlowState2";

/* Every step card is always visible; collapsedSteps just tracks which
   ones are collapsed to their header. Step 1 starts open, the rest
   start collapsed -- expand as you go, or jump straight to any step. */
function wosaDefaultState() {
  var collapsedSteps = {};
  if (typeof FLOW !== "undefined") {
    for (var i = 0; i < FLOW.length; i++) {
      if (FLOW[i].id !== 1) { collapsedSteps[FLOW[i].id] = true; }
    }
  }
  return { path: {}, deviceFilter: null, collapsedSteps: collapsedSteps };
}

function wosaLoadState() {
  try {
    if (window.localStorage) {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed && parsed.path && parsed.collapsedSteps) {
          if (parsed.deviceFilter === undefined) { parsed.deviceFilter = null; }
          return parsed;
        }
      }
    }
  } catch (e) {
    /* localStorage unavailable or corrupt -- fall back to defaults */
  }
  return wosaDefaultState();
}

var wosaState = wosaLoadState();

/* Transient (not persisted, not part of wosaState): set by wosaChoose
   right before it calls wosaRender(), so wosaRenderNode knows which
   step/level just changed and can animate only what's genuinely new
   as of *this* choice -- everything shallower re-renders without the
   entrance animation, so it doesn't replay on already-visible content.
   Every other render path leaves this null, so nothing animates. */
var wosaAnimateFrom = null;

function wosaSaveState() {
  try {
    if (window.localStorage) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(wosaState));
    }
  } catch (e) {
    /* ignore */
  }
}

function wosaFindStep(id) {
  for (var i = 0; i < FLOW.length; i++) {
    if (FLOW[i].id === id) { return FLOW[i]; }
  }
  return null;
}

/* Steps in FILTER_STEP_IDS all ask the same top-level "which device"
   question. Once it's been answered anywhere, seed that answer into
   any other filter step that hasn't been asked yet, so it isn't
   asked over and over. */
function wosaGetPath(stepId) {
  if (!wosaState.path[stepId]) { wosaState.path[stepId] = []; }
  var isFilterStep = (typeof FILTER_STEP_IDS !== "undefined" && FILTER_STEP_IDS.indexOf(stepId) !== -1);
  var hasFilter = (wosaState.deviceFilter !== null && wosaState.deviceFilter !== undefined);
  if (isFilterStep && hasFilter && wosaState.path[stepId].length === 0) {
    wosaState.path[stepId] = [wosaState.deviceFilter];
  }
  return wosaState.path[stepId];
}

function wosaScrollToStep(stepId) {
  var el = document.getElementById("step-" + stepId);
  if (el && el.scrollIntoView) {
    el.scrollIntoView();
  }
}

/* Every step card is always on the page -- "going to" a step just
   means making sure it's expanded, then scrolling to it. */
function wosaGoto(stepId) {
  wosaState.collapsedSteps[stepId] = false;
  wosaSaveState();
  wosaRender();
  wosaScrollToStep(stepId);
}

/* Resets any step whose own node.options function reads the device
   filter (FILTER_DEPENDENT_STEP_IDS) -- called whenever the filter
   changes, so a stale numeric index can never silently point at a
   different option once that step's filtered choice list reshuffles. */
function wosaInvalidateFilterDependents() {
  if (typeof FILTER_DEPENDENT_STEP_IDS === "undefined") { return; }
  for (var i = 0; i < FILTER_DEPENDENT_STEP_IDS.length; i++) {
    wosaState.path[FILTER_DEPENDENT_STEP_IDS[i]] = [];
  }
}

/* Pick option `idx` at nesting level `level` within step `stepId`.
   Truncates any deeper choices previously made under this level. */
function wosaChoose(stepId, level, idx) {
  var p = wosaGetPath(stepId);
  wosaState.path[stepId] = p.slice(0, level);
  wosaState.path[stepId][level] = idx;

  /* Answering the shared "which device" question at its top level
     updates the remembered filter, and carries the answer over to
     any other filter step so it doesn't have to be asked again. */
  var isFilterStep = (typeof FILTER_STEP_IDS !== "undefined" && FILTER_STEP_IDS.indexOf(stepId) !== -1);
  if (isFilterStep && level === 0) {
    wosaState.deviceFilter = idx;
    for (var i = 0; i < FILTER_STEP_IDS.length; i++) {
      var otherId = FILTER_STEP_IDS[i];
      if (otherId !== stepId) {
        wosaState.path[otherId] = [idx];
      }
    }
    wosaInvalidateFilterDependents();
  }

  wosaAnimateFrom = { stepId: stepId, level: level };
  wosaSaveState();
  wosaRender();
}

/* Clears the remembered device filter and the top-level answer on
   every filter step, so the "which device" question is asked fresh
   again wherever it appears. Doesn't save/render -- callers do that. */
function wosaClearFilterState() {
  wosaState.deviceFilter = null;
  if (typeof FILTER_STEP_IDS !== "undefined") {
    for (var i = 0; i < FILTER_STEP_IDS.length; i++) {
      wosaState.path[FILTER_STEP_IDS[i]] = [];
    }
  }
  wosaInvalidateFilterDependents();
}

function wosaClearDeviceFilter() {
  wosaClearFilterState();
  wosaSaveState();
  wosaRender();
}

/* A step's header is always clickable to collapse/expand its body. */
function wosaToggleStepCollapse(stepId) {
  wosaState.collapsedSteps[stepId] = !wosaState.collapsedSteps[stepId];
  wosaSaveState();
  wosaRender();
}

function wosaSetAllCollapsed(collapsed) {
  for (var i = 0; i < FLOW.length; i++) {
    wosaState.collapsedSteps[FLOW[i].id] = collapsed;
  }
  wosaSaveState();
  wosaRender();
}

function wosaExpandAll() {
  wosaSetAllCollapsed(false);
}

function wosaCollapseAll() {
  wosaSetAllCollapsed(true);
}

function wosaReset() {
  wosaState = wosaDefaultState();
  wosaSaveState();
  wosaRender();
}

/* node.options is usually a plain array, but can also be a function
   (evaluated at render time, e.g. against the current device filter)
   for a node whose choices depend on state. */
function wosaResolveOptions(node) {
  if (typeof node.options === "function") { return node.options(); }
  return node.options;
}

/* Renders one question node: the question, then every option as a
   row that stays visible whether or not it's chosen (no collapsing
   away) -- the chosen row just switches to the pale-green "chosen"
   look in place. Once something's chosen, its instructions and --
   recursively -- whatever sub-question comes next are appended below
   the whole option list, so the step only ever grows downward.
   Picking a different option re-renders with that one highlighted
   instead; there's no separate "reopen" step. Returns an HTML string. */
function wosaRenderNode(node, path, stepId, level) {
  var options = wosaResolveOptions(node);

  /* If the device filter has narrowed a *filter-dependent* question
     (node.options is a function) down to exactly one real choice,
     there's nothing to actually decide -- auto-select it instead of
     making the user tap the only row available. This never applies
     to a node that's just naturally single-option by design (a plain
     array), like the "confirm you finished deviceTool" checkpoint,
     which still needs a deliberate tap. Mutates the same path array
     wosaGetPath already lazily seeds from the filter, so it's a
     harmless, always-reproducible derivation, not persisted state. */
  if (typeof node.options === "function" && options.length === 1 &&
      (path[level] === undefined || path[level] === null)) {
    path[level] = 0;
  }

  var chosenIdx = path[level];
  var hasChoice = (chosenIdx !== undefined && chosenIdx !== null && options[chosenIdx]);

  /* This whole sub-question is brand new (never visible before this
     click) only when it's strictly deeper than the level that was
     just answered -- the level that was just answered already had
     its question/option list on screen, so that part shouldn't
     replay the entrance animation, only its resulting leaf-content. */
  var justChosen = (wosaAnimateFrom && wosaAnimateFrom.stepId === stepId) ? wosaAnimateFrom.level : null;
  var animateWrapper = (justChosen !== null && level > justChosen);
  var animateLeaf = (justChosen !== null && level >= justChosen);

  var wrapperCls = "node-block" + (animateWrapper ? " reveal-next" : "");
  var html = '<div class="' + wrapperCls + '">';
  if (node.q) {
    html += '<p class="node-question">' + node.q + '</p>';
  }
  if (node.code) {
    html += '<pre><code>' + node.code + '</code></pre>';
  }
  if (node.info) {
    html += '<div class="node-info">' + node.info + '</div>';
  }
  html += '<div class="opt-list">';
  for (var i = 0; i < options.length; i++) {
    var cls = "opt-btn";
    if (hasChoice) {
      if (i === chosenIdx) {
        cls += " chosen";
        if (justChosen !== null && level === justChosen) { cls += " settle"; }
      } else {
        cls += " dimmed";
      }
    }
    html += '<button type="button" class="' + cls + '" onclick="wosaChoose(' + stepId + ',' + level + ',' + i + ')">' +
      '<img class="chevron" src="images/chevron.png" alt="">' + options[i].label + '</button>';
  }
  html += '</div>';

  if (hasChoice) {
    var opt = options[chosenIdx];
    if (opt.content) {
      var leafCls = "leaf-content" + (animateLeaf ? " reveal" : "");
      html += '<div class="' + leafCls + '">' + opt.content + '</div>';
    }
    if (opt.next) {
      html += wosaRenderNode(opt.next, path, stepId, level + 1);
    }
  }

  html += '</div>';
  return html;
}

/* Renders a topics list (Step 7 / Step 8) as one continuous scrolling
   document -- a heading per topic, its content always visible below,
   like the original docs pages, rather than a click-to-expand list. */
function wosaRenderTopics(node) {
  var html = "";
  for (var i = 0; i < node.topics.length; i++) {
    var topic = node.topics[i];
    html += '<div class="node-block">';
    html += '<h3 class="node-question">' + topic.label + '</h3>';
    html += '<div class="leaf-content">' + topic.content + '</div>';
    html += '</div>';
  }
  if (node.after) {
    html += '<div class="node-block"><div class="leaf-content">' + node.after + '</div></div>';
  }
  return html;
}

/* Flattens the chosen-answer chain for a step into a short breadcrumb,
   shown on its collapsed header. Topics steps have no single "answer,"
   so they never show a breadcrumb. */
/* Strips any markup (e.g. the device icon baked into device option
   labels) down to plain text -- the collapsed header's summary strip
   is a single condensed line, not the place for an icon. */
function wosaPlainText(html) {
  return html.replace(/<[^>]*>/g, "");
}

function wosaStepSummary(step) {
  if (step.node.topics) { return ""; }
  var path = wosaGetPath(step.id);
  var node = step.node;
  var parts = [];
  var lvl = 0;
  while (node && path[lvl] !== undefined) {
    var options = wosaResolveOptions(node);
    if (!options || !options[path[lvl]]) { break; }
    parts.push(wosaPlainText(options[path[lvl]].label));
    node = options[path[lvl]].next;
    lvl++;
  }
  return parts.join(" &rarr; ");
}

function wosaRenderStepCard(step) {
  var html = '<div class="step-card" id="step-' + step.id + '">';
  var collapsed = !!wosaState.collapsedSteps[step.id];

  if (!collapsed) {
    html += '<div class="step-header clickable-header" onclick="wosaToggleStepCollapse(' + step.id + ')">' +
      '<img class="disclosure" src="images/disclosure-open.png" alt="">' +
      'Step ' + step.id + ': ' + step.title +
      '</div>';
    var body = step.node.topics ?
      wosaRenderTopics(step.node) :
      wosaRenderNode(step.node, wosaGetPath(step.id), step.id, 0);
    html += '<div class="step-body">' + body + '</div>';
  } else {
    var summary = wosaStepSummary(step);
    html += '<div class="step-header clickable-header" onclick="wosaToggleStepCollapse(' + step.id + ')">' +
      '<img class="disclosure" src="images/disclosure-closed.png" alt="">' +
      'Step ' + step.id + ': ' + step.title +
      (summary ? ' &mdash; <span class="summary-text">' + summary + '</span>' : '') +
      '</div>';
  }
  html += '</div>';
  return html;
}

/* Updates the removable "Device: ___" chip in #controls. */
function wosaRenderDeviceFilterBar() {
  var el = document.getElementById("deviceFilterBar");
  if (!el) { return; }
  var hasFilter = (wosaState.deviceFilter !== null && wosaState.deviceFilter !== undefined);
  if (!hasFilter) {
    el.innerHTML = "";
    return;
  }
  var label = (typeof DEVICE_CATEGORY_SHORT !== "undefined" && DEVICE_CATEGORY_SHORT[wosaState.deviceFilter]) || "set";
  var iconSrc = (typeof DEVICE_CATEGORY_ICONS !== "undefined" && DEVICE_CATEGORY_ICONS[wosaState.deviceFilter]) || "";
  var iconHtml = iconSrc ? "<img class='filter-chip-icon' src='" + iconSrc + "' alt=''>" : "";
  el.innerHTML = '<span class="filter-chip">' + iconHtml + 'Device: <strong>' + label + '</strong> &nbsp;' +
    '<a href="#" class="filter-clear" onclick="wosaClearDeviceFilter(); return false;">Remove filter</a></span>';
}

function wosaRender() {
  var app = document.getElementById("app");
  var html = "";
  wosaRenderDeviceFilterBar();
  for (var i = 0; i < FLOW.length; i++) {
    html += wosaRenderStepCard(FLOW[i]);
  }
  app.innerHTML = html;
  wosaAnimateFrom = null;
}

wosaRender();
