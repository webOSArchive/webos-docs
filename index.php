<html>
<head>
    <title>webOS Archive - Docs</title>
    <style>
      body, html {width: 100%; height: 100%; margin: 0; padding: 0}
      .menu-wrapper {position: absolute;top: 0; left: 0; right: 0; height: 45px; }
      .second-row {position: absolute; top: 45px; left: 0; right: 0; bottom: 0;  }
      .second-row iframe {display: block; width: 100%; height: 100%; border: none;}
    </style>
    <link rel="shortcut icon" href="img/favicon.ico">
</head>
<body>
<?php
//Figure out what protocol the client wanted
if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on')
    $protocol = "https://";
else
    $protocol = "http://";

//Handle reverse proxy redirects
$uri = $_SERVER['REQUEST_URI'];
$uriParts = explode("?", $uri);
$uri = end($uriParts);
$uri = str_replace("/docs/", "", $uri);
if (!isset($uri) || $uri == "" || $uri == "/") {
	$uri = "home";
}
$usePath = $protocol . "stacks.webosarchive.com/docs/" . urldecode($uri);
?>
<?php
echo file_get_contents($protocol . "www.webosarchive.com/menu.php?content=community");
?>
<div class="second-row">
<iframe src="<?PHP echo $usePath ?>" width="100%" height="100%" />
</div>
</body>
</html>
