# Browsing the Web

## Built-in Browser

The built-in web browser on your device has two challenges: encryption and rendering.

Most of the web has moved to HTTPS, using an encryption that webOS doesn't support, so websites can't load. To work-around this, [install or use a proxy](proxysetup.md).

The next problem is harder -- the browser engine that was built-in back in 2011 (or earlier) is missing some modern features. As a result some pages will not display properly, not display at all, or encourage you to upgrade your browser, then refuse to let you proceed. In these cases, you might consider getting the content over [RSS](thingstotry.md#alternatives).

As recently as 2020, however, community member <a href="https://gitlab.com/nizovn" target="_blank">nizovn</a> compiled some Linux browsers for the Pre3 and Touchpad, read on for details on how to install those...

## WRP

<a href="https://github.com/tenox7/wrp" target="_blank">Web Rendering Proxy</a> is a general-purpose solution that works for many retro devices. It uses Chrome, running on a modern PC, to render web pages as images, which almost any device can consume. It solves a lot of problems, including out-of-date SSL or JavaScript and HTML parsing engines. Since the rendered images are static, it can't be used for media or interactive content, but its a simple way to enable a lot of newer content.

You don't need anything extra on your webOS device to use WRP -- but you can improve the experience with the WRP Browser app from webOS Archive (currently only available to <a href="http://www.webosarchive.org/support" target="_top">supporters</a>!)

However, you will need to run WRP on a PC or Mac with the Chrome Browser installed.

You can also <a href="http://www.webosarchive.org/wrp-browser/wrp.html" target="_blank">add this wrp.html template</a> (Right Click and Save As) in the same folder as the WRP executable to make the UI look more like webOS!

## Homebrew Browsers

### Using the Feed

*documentation contributed by mazzinia*

You're new to webOS, found a device and want now to get it a bit more open towards the internet. Or you are an old
aficionado restoring a device after doctoring. In both cases you will surely want to install some more modern browser, 
and that means either QupZilla or QT WebBrowser, from user Nizovn.

Due to the webosnation forum being now archived on archive.org, finding some info is a bit more difficult for who
doesn't know exactly what to look, and this is to help you.

You will need, as prerequisite, to have installed on your device one package from the alpha feeds : dbus.
While you can enable the alpha and beta feeds on Preware, this wants to be a more quicker and simpler way.. so

<a href="http://ipkg.preware.net/alpha/apps/armv7/" target="_blank">http://ipkg.preware.net/alpha/apps/armv7/</a>  is the alpha feed for webos 2.x and 3.0.x

<a href="http://ipkg.preware.net/alpha/apps/armv7/org.webosinternals.dbus_1.4.16-3_armv7.ipk" target="_blank">http://ipkg.preware.net/alpha/apps/armv7/org.webosinternals.dbus_1.4.16-3_armv7.ipk</a> is the package you want to install

You can use Internalz Pro or Webos Quick Install to add it to your phone or tablet.

Then is just a matter of adding a feed on Preware, and the instructions are here :
<a href="https://gitlab.com/nizovn/preware_feed" target="_blank">https://gitlab.com/nizovn/preware_feed</a>

Yes, it's https , but you surely have installed the [webOS Archive Proxy](proxysetup.md) from the Webos App Museum II and requested 
an account to use the service to access https from your legacy device. If you didn't, just don't be lazy and do it.

Then simply launch Preware with the feed added, search for Qt WebBrowser and/or QupZilla, and install them. The 
pre-requisites will be added for you alongside.

And welcome to internet.

### Manual Install

Download all the required packages to your computer from <a href="https://1drv.ms/f/s!Av5IQUxnr8DUjN1urFe1bvuihdSCAQ?e=6KBazO" target="_blank">this archive</a>.

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
* Best to Pre3: com.nizovn.qtwebbrowserpalm