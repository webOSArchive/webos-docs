# Browsing the Web

## Built-in Browser

The built-in web browser on your device has two challenges: encryption and rendering.

Most of the web has moved to HTTPS, using an encryption that webOS doesn't support, so websites can't load. To work-around this, [install or use a proxy](proxysetup.md).

The next problem is harder -- the browser engine that was built-in back in 2011 (or earlier) is missing some modern features. As a result some pages will not display properly, not display at all, or encourage you to upgrade your browser, then refuse to let you proceed. In these cases, you might consider getting the content over [RSS](thingstotry.md#alternatives).

In 2018, community member <a href="https://gitlab.com/nizovn" target="_blank">nizovn</a> compiled some Linux browsers for the Pre3 and Touchpad. The TouchPad version was updated at the end of 2025 with new features. Read on for details on how to install those...

## Homebrew Browsers

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
