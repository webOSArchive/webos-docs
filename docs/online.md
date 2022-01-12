# Getting Online

This section assumes you've completed the previous steps to [activate your device](activate.md), and [install Preware](appstores.md).<br>
It also assumes you've joined a WiFi network using the built-in Settings, and that your WiFi network has Internet access.

The built-in web browser is dated, and has some limitations, but with a little help, there's still a lot you can do online!

## Set Date and Time

Believe it or not, this is a critical step! Web encryption requires a reasonable delta from UTC (Coordinated Universal Time) time or you'll end up with errors and failures. Use the built-in Settings app to set the date, time and time zone manually. Optionally, you can [sync the time with a network server](timesync.md) once you're online.

## Updating Certificates

The root certificates used to establish trust on the Internet are out-of-date in webOS and need to be updated. Fortunately, the community has made it really easy to solve this problem!

* On your device, launch Preware, and wait for it to update sources.
* Search for "Certs" using Preware's built-in search tool
    + On a phone, just start typing
    + On a Touchpad, use the Search icon in the toolbar at the top of the main scene
* Find the app "Root Certs Update" in the search results, tap on it
* Hit the Install button, and wait while it installs and runs the necessary scripts (this process takes a few minutes!)
    + If you have trouble downloading, try this alternate link:<br>
    [http://www.webosarchive.com/activation/com.palm_.rootcertsupdate_1.0-2_all.ipk](http://www.webosarchive.com/activation/com.palm_.rootcertsupdate_1.0-2_all.ipk)

## Dealing with Encryption

Since webOS was released, encryption standards have changed, and some sites and services have become inaccessible.

A proxy is the simplest and most comprehensive approach to lending webOS a hand, and is covered in detail [here](proxysetup.md).

If you don't want to use a proxy, you can partially improve the situation by installing a SSL update. This is discussed on the [Forums](https://forums.webosnation.com/palm-pre-2/332581-zero-google-2020-step-step.html), but for brevity, downloading and installing [OpenSSL Updater for webOS](http://preware.net/alpha/apps/armv7/org.webosinternals.openssl-updater_0.9.8-6_armv7.ipk) via [webOS Quick Install](appstores.md) is all you need.

## Alternate Instructions

This documentation attempts to update and simplify information available from older, archived sources. You may find that material to be useful as reference:

* [Zero to Google in 2020](https://forums.webosnation.com/palm-pre-2/332581-zero-google-2020-step-step.html)
* [Coming Back to webOS in 2014](https://pivotce.com/2014/10/21/guide-coming-back-to-webos-in-2014-part-1/)