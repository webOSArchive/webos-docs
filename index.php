<?php
//Figure out what protocol the client wanted
if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on')
    $protocol = "https://";
else
    $protocol = "http://";
?>
<html>
<head>
    <title>webOS Archive - Docs</title>
    <style>
      body, html {width: 100%; height: 100%; margin: 0; padding: 0}
      .menu-wrapper {position: absolute;top: 0; left: 0; right: 0; height: 45px; }
      .second-row {position: absolute; top: 45px; left: 0; right: 0; bottom: 0;  }
      .second-row iframe {display: block; width: 100%; height: 100%; border: none;}
    </style>
    <link rel="shortcut icon" href="<?php echo $protocol ?>www.webosarchive.org/favicon.ico">
</head>
<body>
<?php
//Handle reverse proxy redirects
$uri = $_SERVER['REQUEST_URI'];
$usePath = "home/";
if (!isset($_GET["redir"])) {
  if (strpos($uri, '?') !== false) {
    $uriParts = explode("?", $uri);
    $uri = end($uriParts);
    $uri = str_replace("/docs/", "", $uri);
    if (!isset($uri) || $uri == "" || $uri == "/") {
        $uri = "home";
    }
    $uri = str_replace("//", "/", $uri);
    $usePath = $protocol . $_SERVER['HTTP_HOST'] . "/" . urldecode($uri);
  }
}
?>
<?php
if ($uri == "community") {
	echo file_get_contents($protocol . "www.webosarchive.org/menu.php?content=community");
} else {
	echo file_get_contents($protocol . "www.webosarchive.org/menu.php?content=docs");
}
?>
<div class="second-row">
<iframe src="<?PHP echo $usePath ?>" width="100%" height="100%" />
</div>
</body>
</html>
