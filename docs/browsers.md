# Browsing the Web

> **Before you start:** make sure your device can reach the modern web first. On **webOS 2.2.4 or 3.0.5**, run the [Modern TLS Updates](modern-tls.md) — after that, nothing extra is needed for secure sites. On [older devices](online.md), you're limited to HTTP unless you can run a [proxy](proxysetup.md).

## Built-in Browser

The built-in web browser on your device has two challenges: encryption and rendering.

Most of the web has moved to HTTPS, using an encryption that older webOS versions don't support, so websites can't load. The [Modern TLS Updates](modern-tls.md) solve this on webOS 2.2.4 and 3.0.5; on [older devices](online.md), your options are much narrower.

The next problem is harder -- the browser engine that was built-in back in 2011 (or earlier) is missing some modern features. As a result some pages will not display properly, not display at all, or encourage you to upgrade your browser, then refuse to let you proceed. In these cases, you might consider getting the content over [RSS](thingstotry.md#alternatives).

There's a better answer for the rendering problem now — a genuinely modern browser engine. Read on...

## Atlas

**Atlas** is a modern browser for the TouchPad, built by webOS Ports on WPE WebKit — an engine from this decade rather than 2011. Pages that told the built-in browser to upgrade generally just work. It's a large install (about 103MB), and it's **TouchPad and TouchPad Go only**; there's no phone build.

Atlas needs the [Modern TLS Updates](modern-tls.md) for HTTPS, so install those first — or just let Preware pull them in as a prerequisite.

* In Preware, search for **Atlas** and install it
* Optionally, add one of these two patches — **pick one, not both**:
    + **Make Atlas the default browser** — every link that would have opened the stock browser opens Atlas instead, and the stock browser icon is hidden
    + **Open in Atlas (stock browser menu)** — leaves the stock browser exactly as it is, and adds an "Open in Atlas" item to its App Menu so you can hand the current page over when a site needs it

Preware will restart your device once when the whole set finishes installing.

## Homebrew Browsers

In 2018, community member <a href="https://gitlab.com/nizovn" target="_blank">nizovn</a> compiled some Linux browsers for the Pre3 and Touchpad. The TouchPad version was updated at the end of 2025 with new features. These are still the best option on a Pre3, where Atlas isn't available.

### Automatic Preware Feed

The easiest way to manage dependency installs is to use Preware on your device.

Add the following feed in the Preware "Manage Feeds" menu option, then "Update Feeds":
`http://stacks.webosarchive.org/feeds/modernize/ipkgs/`

Finally search for "QupZilla" (for TouchPad) or "WebBrowser" (for Pre3) and hit Install.

When prompted, confirm that Preware may install the pre-requisites for you. Be patient! It will take quite awhile!

### Manual Install

Download all the required packages to your computer from <a href="https://stacks.webosarchive.org/feeds/modernize/ipkgs/" target="_blank">this archive</a>.

Use [webOS Quick Install](appstores.md#run-wosqi-on-your-computer) to install the packages *in the following order* (**Note:** do not install these packages with the SDK command line tools -- it will not work!)

*    org.webosinternals.dbus
*    com.nizovn.cacert
*    com.nizovn.glibc
*    com.nizovn.openssl
*    com.nizovn.qt5qpaplugins
*    com.nizovn.qt5
*    com.nizovn.qt5sdk

Install the browser of your choice:

* Best for TouchPad: com.nizovn.qupzilla
* Best for Pre3: com.nizovn.qtwebbrowserpalm

## WRP

<a href="https://github.com/tenox7/wrp" target="_blank">Web Rendering Proxy</a> is a general-purpose solution that works for many retro devices. It uses Chrome, running on a modern PC, to render web pages as images, which almost any device can consume. It solves a lot of problems, including out-of-date SSL or JavaScript and HTML parsing engines. Since the rendered images are static, it can't be used for media or interactive content, but its a simple way to enable a lot of newer content.

You don't need anything extra on your webOS device to use WRP -- but you can improve the experience with the <a href="https://appcatalog.webosarchive.org/app/WRPBrowser" target="_blank">WRP Browser app</a> from webOS Archive.

**Note:** You will need to run WRP on a PC or Mac with the Chrome Browser installed.

You can also <a href="http://stacks.webosarchive.org/wrp-browser/wrp.html" target="_blank">add this wrp.html template</a> (Right Click and Save As) in the same folder as the WRP executable to make the UI look more like webOS!
