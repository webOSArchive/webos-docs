<?php
/*
 * Same-origin proxy for the shared webOS Archive top navigation.
 *
 * The docs pages fetch this endpoint client-side and inline the result,
 * so the menu (including its hover dropdowns) lives in the page DOM.
 * Because it's served from the same origin as the docs, no CORS is needed.
 *
 * We fetch the upstream menu over the SAME protocol the client used, so
 * legacy devices on http stay on http (no HTTPS work-around required) and
 * modern devices on https get https resources (no mixed-content blocking).
 * This mirrors the protocol logic in the site's index.php.
 */
// Honor X-Forwarded-Proto too, so protocol detection stays correct when the
// docs host sits behind a TLS-terminating reverse proxy.
if ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') ||
    (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && strtolower($_SERVER['HTTP_X_FORWARDED_PROTO']) === 'https')) {
    $protocol = "https://";
} else {
    $protocol = "http://";
}

// Which section to highlight in the menu (defaults to docs). Sanitised.
$content = isset($_GET['content']) ? preg_replace('/[^a-zA-Z0-9_-]/', '', $_GET['content']) : 'docs';

header('Content-Type: text/html; charset=UTF-8');
echo file_get_contents($protocol . "www.webosarchive.org/menu.php?content=" . urlencode($content));
