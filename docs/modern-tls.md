# Modern TLS Updates

For years, getting a webOS device onto the modern web meant a stack of work-arounds: updating root certificates, patching OpenSSL, and running an SSL-bump proxy. That's no longer necessary. The community has produced updates that let webOS speak **modern TLS natively** — the same encryption the rest of the Internet uses — on tablets *and* phones.

> **This replaces the work-arounds.** Once you've run the TLS Updates, you do **not** need the OpenSSL updater or a [proxy](proxysetup.md). If you set any of those up previously, they're no longer required and can be removed.

## Which Devices

| Device | webOS version | Supported |
|---|---|---|
| TouchPad, TouchPad Go | 3.0.5 | ✅ Yes |
| Pre3 | 2.2.4 | ✅ Yes |
| Veer, Pre 2 | 2.2.4 | ✅ Yes |
| Veer, Pre 2 | 2.2.0 / 2.1.0 | ❌ [Upgrade to 2.2.4 first](doctor.md) |
| Pre, Pre Plus, Pixi | 1.x | ❌ See [Older Devices](online.md) |

**webOS 2.2.4 is the minimum on phones.** The updates patch specific system binaries, and the ones on 2.2.0 and 2.1.0 aren't the same. Those versions are hidden from the feed so they can't be installed by mistake — if the package doesn't appear on your phone, that's why.

Tested on hardware: **TouchPad** and **HP Pre 3**. The **Veer** and **Pre 2** packages are built and published, but nobody has run them on real hardware yet — reports welcome.

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
    + Turn **Compressed (gzip)** on
* Return to the menu and choose **Update Feeds**

That's the same one URL for every device. Preware only shows you the packages built for the device you're holding.

## Run the TLS Updates

* In Preware, search for **TLS 1.3 Updates**
    + On a phone, just start typing
    + On the TouchPad, use the Search icon in the toolbar at the top of the main scene
* You'll see exactly one result — **TLS 1.3 Updates (TouchPad)** or **TLS 1.3 Updates (Phones)**, whichever matches your device. There's nothing to choose between; the other one is hidden from you.
* Tap the result and press **Install**
* Confirm any prerequisites Preware offers to install for you
    + This installs the latest Root Certs Update and a number of patches, if not already present
* Wait while everything installs and runs — this can take a few minutes
* Your device will reboot once when it finishes

That's it. Your device can now establish modern encrypted connections directly!

## What You Get

Both bundles cover the same core: modern TLS for the **browser**, **apps**, **mail**, **curl** and the **download manager**, current **root certificates**, an **automatic clock sync** so time never drifts again, and the restored **App Catalog** for your device.

The TouchPad bundle adds a few tablet-only extras: the restored on-device **Help** system, **USB Settings** (USB host/OTG, high-power devices like a DualShock 4, USB storage) and **Bluetooth Gamepad Support**.

> **Install and uninstall through Preware.** Deleting one of these from the launcher skips its cleanup script, which can leave things half-patched.

## What Next

With modern TLS in place, secure websites, app feeds, and mail servers connect without any proxy. Move on to [Browsing the Web](browsers.md) and [Email, Calendars & Contacts](email.md) — you can ignore any proxy-related notes on those pages.
