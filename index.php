<?php
/*
 * Fetches the shared webOS Archive top nav server-side and inlines it
 * directly into this page, rather than via a client-side XHR (which
 * would need CORS headers www.webosarchive.org doesn't send).
 *
 * Fetched over the SAME protocol this request arrived on, so legacy
 * http-only devices stay on http and modern devices get https -- we
 * never force a protocol upgrade. Mirrors the protocol logic the old
 * docs site's menu.php used.
 */
if ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') ||
    (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && strtolower($_SERVER['HTTP_X_FORWARDED_PROTO']) === 'https')) {
    $wosaProtocol = "https://";
} else {
    $wosaProtocol = "http://";
}
$wosaMenuHtml = @file_get_contents($wosaProtocol . "www.webosarchive.org/menu.php?content=docs");
$wosaHasMenu = ($wosaMenuHtml !== false && trim($wosaMenuHtml) !== "");

/* Cache-busting version query string for our own static assets, based
 * on each file's last-modified time. Without this, a CDN (or browser)
 * happily keeps serving a stale cached copy of e.g. css/wosa-menu.css
 * under its unchanged URL after we deploy a fix -- this way every
 * edit gets a new URL automatically, no manual purge or version bump
 * required. */
function wosaAssetVer($path) {
    $mtime = @filemtime(__DIR__ . "/" . $path);
    return $path . "?v=" . ($mtime ? $mtime : "0");
}
?>
<!DOCTYPE html>
<html lang="en"<?php echo $wosaHasMenu ? ' class="wosa-has-menu"' : ''; ?>>
<head>
<meta charset="utf-8">
<title>webOS Archive Docs</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="Everything you need to set up, activate, and get the most out of your legacy webOS device.">

<link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="images/favicon-16.png">
<link rel="apple-touch-icon" sizes="180x180" href="images/apple-touch-icon.png">

<meta property="og:type" content="website">
<meta property="og:site_name" content="webOS Archive">
<meta property="og:title" content="webOS Archive Docs">
<meta property="og:description" content="Everything you need to set up, activate, and get the most out of your legacy webOS device.">
<meta property="og:url" content="https://docs.webosarchive.org/">
<meta property="og:image" content="https://docs.webosarchive.org/images/og-image.png">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="webOS Archive Docs">
<meta name="twitter:description" content="Everything you need to set up, activate, and get the most out of your legacy webOS device.">
<meta name="twitter:image" content="https://docs.webosarchive.org/images/og-image.png">

<link rel="stylesheet" href="<?php echo wosaAssetVer('style.css'); ?>">
<link rel="stylesheet" href="<?php echo wosaAssetVer('css/wosa-menu.css'); ?>">
</head>
<body>

<?php if ($wosaHasMenu): ?>
<div id="wosa-menu-mount"><?php echo $wosaMenuHtml; ?></div>
<?php endif; ?>

<div id="site-header">
  <div class="content-inner">
    <img id="site-icon" src="images/help-book-icon.png" alt="">
    <div class="header-actions">
      <a class="header-btn" href="http://stacks.webosarchive.org/activation/drivers/">
        <img src="images/drivers.png" alt="Download Drivers" title="Download Drivers" target="_blank">Drivers</a>
      <a class="header-btn" href="https://archive.org/details/webOSDoctors">
        <img src="images/firmware.png" alt="Download Firmware" title="Download Firmware" target="_blank">Firmware</a>
    </div>
    <div class="site-header-text">
      <h1>webOS Docs</h1>
      <p class="tagline">Everything you need to set up, activate, and get the most out of your legacy webOS device.</p>
    </div>
  </div>
</div>

<div id="controls">
  <div class="content-inner">
    <span class="link-group">
      <a href="#" onclick="wosaExpandAll(); return false;">Expand all</a>
      <a href="#" onclick="wosaCollapseAll(); return false;">Collapse all</a>
    </span>
    <a href="#" id="resetLink" onclick="wosaReset(); return false;">Start Over</a>
    <div id="deviceFilterBar"><!-- device filter chip, filled in by app.js --></div>
  </div>
</div>

<div id="wrap" class="content-inner">
  <div id="app"><!-- step cards rendered here --></div>
</div>

<div id="site-footer">
  <div class="content-inner">
    <p>webOS Archive Docs &middot; <a href="http://www.github.com/webOSArchive/webos-docs">github.com/webOSArchive/webos-docs</a></p>
  </div>
</div>

<script src="<?php echo wosaAssetVer('flow-data.js'); ?>"></script>
<script src="<?php echo wosaAssetVer('app.js'); ?>"></script>
</body>
</html>
