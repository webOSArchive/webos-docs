# Getting Ready

You've [activated your device](activate.md) and [installed Preware and an App Store](appstores.md). Two short things to take care of before you get online: setting the clock, and checking what your device's version of webOS can do.

Since webOS was released, Internet encryption (TLS) has moved on, and the version built into webOS can no longer connect to most of the modern web. The community has fixed that — natively, on the device — for **webOS 2.2.4 and 3.0.x**. That's a single update, and it's the same next step for tablets and phones alike.

## Set the Date & Time First

Before anything else, set your clock. This is a critical step, not an optional one: TLS encryption is based on dates, so if your internal clock is wrong you'll get errors and failures on nearly every secure site.

* Launch the built-in **Date & Time** app
* Set the date and time as close to reality as you can
* Set your Timezone

The [Modern TLS Updates](modern-tls.md) will keep the clock from drifting for you from then on. If you'd rather not run those, see [Time Synchronization](timesync.md) for other options.

## What Your Device Can Do

| Your device | webOS version | What to do |
|---|---|---|
| **TouchPad**, **TouchPad Go** | 3.0.x | ➡️ [**Modern TLS Updates**](modern-tls.md) |
| **Pre3**, **Veer**, **Pre 2** | 2.2.4 | ➡️ [**Modern TLS Updates**](modern-tls.md) |
| Veer, Pre 2 | 2.2.0 / 2.1.0 | Upgrade to 2.2.4 if you can — otherwise see [Older Devices](online.md) |
| Pre, Pre Plus, Pixi | 1.x | [Older Devices](online.md) — limited to HTTP |

**webOS 2.2.4 is the dividing line.** At 2.2.4 or above, your device can be updated to speak modern TLS directly — no root certificate juggling, no OpenSSL updater, no proxy server to run. Below 2.2.4, none of that is available (and neither is the proxy work-around, which needs an API that only arrived in 2.2.4), so those devices are effectively limited to what they can reach over plain HTTP.

If you have a Veer or a Pre 2 that's still on its original firmware, it is worth upgrading it to 2.2.4 with an unofficial **Super Doctor** — that puts it on the same footing as everything else here. Many are already built and archived, so it's usually just a matter of downloading the right one; see [Call the Doctor](doctor.md).

---

Next: **[Modern TLS Updates](modern-tls.md)**.
