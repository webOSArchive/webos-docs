# Which Setup Path?

You've [activated your device](activate.md) and [installed Preware and an App Store](appstores.md). Everything up to this point is the same for every webOS device. From here, the road forks.

Since webOS was released, Internet encryption (TLS) has moved on, and the version built into webOS can no longer connect to most of the modern web. **How you fix this depends on your device.**

## Set the Date & Time First

Before anything else — and no matter which path you take — set your clock. This is a critical step, not an optional one: TLS encryption is based on dates, so if your internal clock is wrong you'll get errors and failures on nearly every secure site.

* Launch the built-in **Date & Time** app
* Set the date and time as close to reality as you can
* Set your Timezone

Once you're online, you may want to keep the clock from drifting automatically — see [Time Synchronization](timesync.md).

## Choose Your Path

| Your device | webOS version | Your path |
|---|---|---|
| **TouchPad**, **TouchPad Go** | 3.x | ➡️ [**Modern TLS Updates**](modern-tls.md) |
| Pre3, Veer, Pre 2 | 2.x | ➡️ [**Getting Online (Certificates & Proxy)**](online.md) |
| Pre, Pre Plus, Pixi | 1.x | ➡️ [**Getting Online (Certificates & Proxy)**](online.md) |

### TouchPad and TouchPad Go — the easy path

Thanks to recent community work, webOS 3.x tablets can now be updated to speak **modern TLS natively**. That single update replaces almost every work-around that used to be necessary — no root certificate updates, no OpenSSL patches, and no proxy server to run.

If you have a TouchPad or TouchPad Go, head straight to **[Modern TLS Updates](modern-tls.md)**.

### Everything else — the work-around path

For webOS 1.x and 2.x devices (Pre, Pixi, Veer, Pre 2, Pre3), native modern TLS isn't available. Instead, you'll lend webOS a hand with a combination of updated certificates and — where supported — an SSL-bump proxy.

If you have one of these devices, start with **[Getting Online](online.md)**, then set up a **[Proxy](proxysetup.md)**.

---

Once your device can reach the modern web, both paths rejoin for [Browsing the Web](browsers.md) and [Email, Calendars &amp; Contacts](email.md).
