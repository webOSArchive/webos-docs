# Modern TLS Updates

*This page is for **TouchPad** and **TouchPad Go** (webOS 3.x). On another device? Head back to [Which Setup Path?](setup-path.md)*

For years, getting a webOS device onto the modern web meant a stack of work-arounds: updating root certificates, patching OpenSSL, and running an SSL-bump proxy. On the TouchPad, that's no longer necessary. The community has produced updates that let webOS 3.x speak **modern TLS natively** — the same encryption the rest of the Internet uses.

> **This replaces the work-arounds.** Once you've run the TLS Updates, you do **not** need the OpenSSL updater, or a [proxy](proxysetup.md). If you set any of those up previously, they're no longer required and can be removed. You can safely skip the [Getting Online](online.md) and [Proxy Setup](proxysetup.md) pages entirely.

## Before You Start

Make sure the **date and time on your device are accurate**. TLS is based on dates, so a wrong clock will cause errors even after the update. If you skipped it, see [Set the Date & Time](setup-path.md#set-the-date-time-first).

You'll also need **Preware** installed. If you followed the [Installing Apps](appstores.md) steps you already have the latest; if not, [install it now](appstores.md#install-preware).

## Add the Modernize Feed (if needed)

The TLS Updates are distributed through the community "modernize" feed. If you just installed Preware, you already have it!

If you're using an older version of Preware, add the modernize feed once:

* Launch **Preware** and wait for it to finish updating its sources
* Open the menu and choose **Manage Feeds**
* Add a new feed with this URL:
    + `http://stacks.webosarchive.org/feeds/modernize/ipkgs/`
* Return to the menu and choose **Update Feeds**

## Run the TLS Updates

* In Preware, search for **TLS 1.3 Updates**
    + On the TouchPad, use the Search icon in the toolbar at the top of the main scene
* Tap the result and press **Install**
* Confirm any prerequisites Preware offers to install for you
   +  This installs the latest Root Certs Update and a number of patches, if not already present
* Wait while everything installs and runs — this can take a few minutes
* Your TouchPad will reboot when it finishes

That's it. Your TouchPad can now establish modern encrypted connections directly!

## What Next

With modern TLS in place, secure websites, app feeds, and mail servers should connect without any proxy. Move on to [Browsing the Web](browsers.md) and [Email, Calendars & Contacts](email.md) — you can ignore any proxy-related notes on those pages.
