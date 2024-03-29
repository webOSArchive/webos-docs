# Syncing Email, Calendars and Contacts

<img src="../images/touchpad-pim.png" align="right" width="300" style="width:300px; padding-left: 8px">

webOS has a first-class email client (arguably the best Exchange client for any Linux) that still works in some cases. Success is varied, depending on the server infrastructure.

## Email

#### IMAP and POP mail

POP and IMAP servers still work, provided the server's encryption method is compatible with webOS. Run the [OpenSSL Updater for webOS](http://www.webosarchive.org/activation/org.webosinternals.openssl-updater_0.9.8-6_armv7.ipk) to improve your odds of connecting.

#### Exchange Web Access

Private and hosted Exchange servers that provide EAS (Exchange Active Sync) can still be used, provided you have a [SSL-bump proxy](proxysetup.md) enabled.

#### Office365 (aka Microsoft365)

Microsoft has moved to "modern authentication," including an OAuth sign-in page that cannot be rendered on webOS devices. Attempts to request exceptions, even for paid accounts, have been met with hositility. As a work-around, <a href="https://davmail.sourceforge.net/" target="_blank">you can use DavMail on a PC or server to proxy access to your Office365 inbox using non-proprietary standards</a>.

#### Gmail

Some users are still able to use Gmail, but changes to Google's OAuth flow are creating problems. The most recent guidance for <a href="https://forums.weboslives.eu/d/34-getting-gmail-working-in-2023/6" target="_blank">connecting webOS to Gmail is available in the new webOS Lives Forums</a>.

#### Zoho

<a href="https://mail.zoho.com" target="_blank"><img src="../images/zoho.png" align="right" width="300" style="width:128px; padding-left: 8px"></a><a href="https://mail.zoho.com" target="_blank">Zoho</a> provides a cost-effective and full-featured alternative to Office365 and Google, with support for custom domains and Exchange ActiveSync. It works perfectly with webOS, with no hacks, work-arounds or modifications. If you have a choice in mail providers, webOS Archive highly recommends checking it out.

#### iCloud

You may be able to get IMAP access to your iCloud inbox if you run the [OpenSSL Updater for webOS](http://www.webosarchive.org/activation/org.webosinternals.openssl-updater_0.9.8-6_armv7.ipk) first.

## Calendars and Contacts

The Calendar app on webOS is still one of the best out there -- particularly with the extra Touchpad screen real estate. As with email, service providers are continuing to lock down their environments in ways that webOS cannot support, but some of this can be resolved by leveraging web standards.

#### Exchange Web Access

As with mail, Private and hosted Exchange servers that provide EAS (Exchange Active Sync) can still be used, provided you have a [SSL-bump proxy](proxysetup.md) enabled. Calendars and Contacts will sync seamlessly in a bi-directional fashion.

#### Zoho

<a href="https://calendar.zoho.com" target="_blank">Zoho</a> syncs via Exchange ActiveSync, and works without compromise on webOS.

#### All Other Service Providers

<img src="../images/caldav.png" align="right" width="300" style="width:128px; padding-left: 8px">
For providers like Google or iCloud, you will need to publish your calendar and contacts to a webDav server, then use the C+Dav Synergy app to sync to your device. For Office365, you can use <a href="https://davmail.sourceforge.net/" target="_blank">DavMail</a> to do the same thing with less steps.

The C+Dav app supports a wide variety of WebDav providers, including ownCloud and Radicale, and was updated in 2023.<br>
To learn more, and download the current version, <a href="https://webos-ports.org/wiki/C+_Dav_Synergy_Connector" target="_blank">visit the webOS Ports wiki</a>.

If you need a WebDav host to publish calendars to, or to learn more about WebDav publishing, check back later in 2023 -- webOS Archive plans to provide this service to webOS users.