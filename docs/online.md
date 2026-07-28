# Getting Online — Older Devices

*This page is for devices running **older than webOS 2.2.4**: the webOS 1.x line (Pre, Pre Plus, Pixi), and any Veer or Pre 2 still on its original 2.2.0 / 2.1.0 firmware. On **webOS 2.2.4 or 3.0.x** — any TouchPad, and Pre3, Veer or Pre 2 that's been upgraded — use [Modern TLS Updates](modern-tls.md) instead. It replaces everything on this page.*

This section assumes you've completed the previous steps to [activate your device](activate.md), and [install Preware](appstores.md).<br>
It also assumes you've joined a WiFi network using the built-in Settings, that your WiFi network has Internet access, and that you've [set the date and time](setup-path.md#set-the-date-time-first).

## First: Can You Upgrade Instead?

If you have a **Veer** or a **Pre 2**, the single best thing you can do is get it to **webOS 2.2.4**. That isn't just a version number — it's the point where native modern TLS becomes available, and everything on this page stops being necessary.

The upgrade is done with an unofficial **Super Doctor**, and many have already been built and archived, so in most cases it's a download-and-run rather than a build-it-yourself job. See [Call the Doctor](doctor.md) for where to find the right one for your device and carrier, and how to run it. (If nothing archived matches your carrier, a Super Doctor can still be built from <a href="https://github.com/webos-internals/meta-doctor/" target="_blank">meta-doctor</a>.)

A **Pre3** already ships with 2.2.4, so it should go straight to [Modern TLS Updates](modern-tls.md).

For the webOS **1.x** devices (Pre, Pre Plus, Pixi) there's no upgrade path, and the rest of this page is for you. The built-in web browser is dated, and has some real limitations, but with a little help there's still a lot you can do online!

## What to Expect

Modern TLS isn't available below 2.2.4, and neither is the [proxy](proxysetup.md) work-around — the API a proxy switcher needs wasn't added to webOS until 2.2.4 (2.2.0 on the Pre3). In practice that means these devices are **limited to what they can reach over plain HTTP**, plus whatever older HTTPS a site still accepts after a certificate update.

That's more than it sounds like. Plenty of the retro-friendly web is still reachable, and several of the [things to try](thingstotry.md) work fine over HTTP.

## Updating Certificates

The root certificates used to establish trust on the Internet are out-of-date in webOS and need to be updated. Fortunately, the community has made it really easy to solve this problem!

* On your device, launch Preware, and wait for it to update sources.
* Search for "Certs" using Preware's built-in search tool
    + On a phone, just start typing
    + On a TouchPad, use the Search icon in the toolbar at the top of the main scene
* Find the app "Root Certs Update" in the search results, tap on it
* Hit the Install button, and wait while it installs and runs the necessary scripts (this process takes a few minutes!)
    + If you have trouble with the app method, try downloading [Root Certs Update 1.0.5 from Herrie82](https://github.com/Herrie82/webOS-rootcerts/raw/refs/heads/main/com.palm_.rootcertsupdate_1.0-5_all.ipk)

## Dealing with Encryption

Since webOS was released, encryption standards have changed, and some sites and services have become inaccessible.

You can partially improve the situation by installing a SSL update. This is discussed on the <a href="http://stacks.webosarchive.org/forums/Zero%20to%20Google%20in%202020%20-%20step%20by%20step%20-%20webOS%20Nation%20Forums.html" target="_blank">Forums</a>, but for brevity, downloading and installing [OpenSSL Updater for webOS](http://www.webosarchive.org/activation/org.webosinternals.openssl-updater_0.9.8-6_armv7.ipk) via [webOS Quick Install](appstores.md) is all you need. It won't get you to the modern web, but it widens what still connects.

Without a proxy or modern TLS, your access to the web is significantly limited — and so is your access to some Preware files, since many have moved to HTTPS. This can result in errors during install. As a work-around for Preware issues, look at the end of the error message for the URL of the file -- you can then download that on your computer, and use [webOS Quick Install](appstores.md) to "sideload" to your device. Community member Nomad84 also maintains <a href="https://github.com/h8pewou/legacy-webos-feeds/blob/main/README.md" target="_blank">HTTP-only Preware feeds</a> that avoid the problem entirely.

If your device is a Pre3 on 2.2.0, you *are* able to run a [proxy](proxysetup.md) — but upgrading to 2.2.4 and running the [TLS Updates](modern-tls.md) is a better use of the effort.

For the earliest webOS devices, you can run the <a href="https://palmdb.net/app/opera-mini" target="_blank">Opera Mini</a> browser in [Classic](thingstotry.md#classic) to get around encryption problems on web pages.

With or without modern encryption, there's still lots of interesting things you can do with your devices...

## Hot Spot Detection

When you join (or re-join) a WiFi network, webOS may incorrectly notify you that a Hot Spot has been detected and ask you to log-in. The captive portal detection webOS used depended on a server that's long gone. Modifying your [hosts](hosts.md) file eliminates these notifications on any device. (If you happen to be running the [self-host proxy](proxysetup.md), it handles this for you.)

## What Next

Now that you're online, check out a [few of the things you can do with your webOS device](thingstotry.md).

## Alternate Instructions

This documentation attempts to update and simplify information available from older, archived sources. You may find that material to be useful as reference:

* <a href="http://stacks.webosarchive.org/forums/Zero%20to%20Google%20in%202020%20-%20step%20by%20step%20-%20webOS%20Nation%20Forums.html" target="_blank">Zero to Google in 2020</a>
* <a href="https://pivotce.com/2014/10/21/guide-coming-back-to-webos-in-2014-part-1/" target="_blank">Coming Back to webOS in 2014</a>
