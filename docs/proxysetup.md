# Proxy Setup

Modern encryption isn't available on webOS mobile devices, and efforts to port it haven't panned out so far. Fortunately, on most webOS Devices, you can work-around by using a SSL-bump proxy. Outlined here are some options for proxies that can help you get your device online. Fair warning: SSL-bumping defeats the security of modern encryption, and shouldn't be used for anything highly private.

Unfortunately, the API to set a proxy wasn't added for most devices until webOS 2.2.4 (2.2.0 on Pre3). If you're on an original Pre or Pixi, you're out of luck. If you're on a Pre2 or Veer, it IS possible to update them to webOS 2.2.4, but depending on carrier, it requires some extra work to <a href="https://github.com/webos-internals/meta-doctor/" target="_blank">build and run a Super Doctor</a>. If you're on a Pre3 or TouchPad, you're ready to go.

**Important Note** Make sure the time on your device is at least close to accurate. Certificates are based on dates, so if your internal clock is wrong, you will get errors!

## Self-Hosted Proxy

webOS Archive provides a free, easily installed self-hosting Squid Proxy that handles all the encryption issues for you. You'll need a computer that's always on to act as the proxy server. Linux and macOS are supported easily, Windows is supported through WSL (Windows Subsystem for Linux).

Grab the latest release at <a href="https://github.com/webOSArchive/squid-sslbump-for-webos/releases" target="_blank">https://github.com/webOSArchive/squid-sslbump-for-webos/releases</a> and <a href="https://github.com/webOSArchive/squid-sslbump-for-webos/blob/main/README.md" target="_blank">review the Readme</a> to get started running the server.

### Device Setup

Once you have the Proxy server running, you'll need to configure the device to use it...

#### Easy Install

![webOS Archive Proxy](images/proxyicon.png)

If you're using webOS 2.2.4 or higher, The easiest way to get started is with the NEW **webOS Archive Proxy** app.
To download, install [webOS App Museum II](appstores.md#install-webos-app-museum-ii) and search for "Proxy".

Or use the <a href="http://appcatalog.webosarchive.org/showMuseumDetails.php?app=1005768" target="_top">direct download</a> and install it yourself.

As well as letting you enable or disable the proxy, this app makes it easy to download the certificate and install it in the right place -- do this before trying to use the proxy, to avoid certificate errors.

#### Manual Configuration

If Easy Install doesn't work for you, or you still get certificate prompts, you can do all the steps manually. Make sure you start from a clean slate by removing any existing certs shown in the Certificate Manager app, and deleting downloaded certs from `/media/internal/`.

Also, it never hurts to do a full reboot between clean-up and manual install.

##### Adding the Certificate

Your proxy server provides a certificate you must install in order to bypass certificate warnings from other websites: one certificate that covers the whole Internet!

* On your computer, download the cert:
    + `http://<yourserverip>:3129/cert`
* Plug your webOS device into your computer with a USB cable, and enter USB Disk mode on the device
* Copy the cert you downloaded onto root directory of the USB device
* Launch the built-in webOS app "Device Info"
* From the menu in the top left corner, choose "Certificate Manager..."
* Press the "+" button at the bottom of the screen
* Select the new cert
* When prompted, choose the green button to "Trust" the cert
* Reboot your webOS device

![Certificate Manager](images/certmanager.png)

##### Configure the Proxy

A Proxy switch app adds a feature to webOS allowing you to turn on (and off) a global proxy. Once activated, this proxy works for any app on the device -- including email!

* Install a Proxy app
    + Install the app **webOS Archive Proxy** app from App Museum II, or <a href="http://appcatalog.webosarchive.org/showMuseumDetails.php?app=1005768" target="_top">download directly here</a>.
    + Install the app **Proxy Set Basic** from Preware, or <a href="http://www.webosarchive.org/proxy/com.palm.com.verusora.touchpad.proxysetbasic_1.1.1_all.ipk" target="_top">download directly here</a>.
* Launch the app, and configure the fields as follows:
* Server: `<yourserverip>`
* Port: `3128`
* Press the "Set" button at the bottom

With your proxy configured, you should be able to open almost any modern webpage. But even with connectivity established, you may find that some web pages don't work well on your device -- the web has evolved since webOS was first born! 

## Alternate Proxies

You can also run a proxy directly on your webOS Device:

* <a href="https://gitlab.com/nizovn/com.nizovn.squid" target="_blank">Nizovn's Squid SSL Bump App</a> which you can get by adding his <a href="https://gitlab.com/nizovn/preware_feed/-/tree/master/" target="_blank">Preware feed</a>.

* If Squid is too complex for you, check out the WebOne proxy, which runs on Windows, Mac and Linux: <a href="https://github.com/atauenis/webone" target="_blank">WebOne on GitHub</a>

And finally, you can proxy only web rendering, using WRP. Read more about this approach in the [Browsing the Web](browsers.md#wrp) section.
