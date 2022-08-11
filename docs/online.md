# Getting Online

This section assumes you've completed the previous steps to [activate your device](activate.md), and [install Preware](appstores.md).<br>
It also assumes you've joined a WiFi network using the built-in Settings, and that your WiFi network has Internet access.

The built-in web browser is dated, and has some limitations, but with a little help, there's still a lot you can do online!

## Set Date and Time

Believe it or not, this is a critical step! Web encryption requires a reasonable delta from UTC (Coordinated Universal Time) time or you'll end up with errors and failures. Use the built-in Settings app to set the date, time and time zone manually. Depending on your device, you may want to [sync the time with a remote server](timesync.md) once you're online.

## Updating Certificates

The root certificates used to establish trust on the Internet are out-of-date in webOS and need to be updated. Fortunately, the community has made it really easy to solve this problem!

* On your device, launch Preware, and wait for it to update sources.
* Search for "Certs" using Preware's built-in search tool
    + On a phone, just start typing
    + On a TouchPad, use the Search icon in the toolbar at the top of the main scene
* Find the app "Root Certs Update" in the search results, tap on it
* Hit the Install button, and wait while it installs and runs the necessary scripts (this process takes a few minutes!)
    + If you have trouble downloading, try downloading [Root Certs Update 1.0.2 from webOS Archive](http://www.webosarchive.org/activation/com.palm_.rootcertsupdate_1.0-2_all.ipk)

## Dealing with Encryption

Since webOS was released, encryption standards have changed, and some sites and services have become inaccessible.

If you're on webOS 2.2.4 or higher, a proxy is the simplest and most comprehensive approach to lending webOS a hand, and is covered in detail [here](proxysetup.md).

If you don't want to use a proxy, you can partially improve the situation by installing a SSL update. This is discussed on the <a href="https://forums.webosnation.com/palm-pre-2/332581-zero-google-2020-step-step.html" target="_blank">Forums</a>, but for brevity, downloading and installing [OpenSSL Updater for webOS](http://www.webosarchive.org/activation/org.webosinternals.openssl-updater_0.9.8-6_armv7.ipk) via [webOS Quick Install](appstores.md) is all you need.

If you're on an older version of webOS, you won't be able to install or use a Proxy, since the API was not present. This significantly limits your access to the web, and even to some Preware files -- since many have been moved to HTTPS and are inaccessible. This can result in errors during install. As a work-around for Preware issues, look at the end of the error message for the URL of the file -- you can then download that on your computer, and use [webOS Quick Install](appstores.md) to "sideload" to your device.

For the earliest webOS devices, you can run the <a href="https://palmdb.net/app/opera-mini" target="_blank">Opera Mini</a> browser in [Classic](thingstotry.md#classic) to get around encryption problems on web pages.

With or without modern encryption, there's still lots of interesting things you can do with your devices...

## What Next

Now that you're online, check out a [few of the things you can do with your webOS device](thingstotry.md).

## Alternate Instructions

This documentation attempts to update and simplify information available from older, archived sources. You may find that material to be useful as reference:

* <a href="https://forums.webosnation.com/palm-pre-2/332581-zero-google-2020-step-step.html" target="_blank">Zero to Google in 2020</a>
* <a href="https://pivotce.com/2014/10/21/guide-coming-back-to-webos-in-2014-part-1/" target="_blank">Coming Back to webOS in 2014</a>