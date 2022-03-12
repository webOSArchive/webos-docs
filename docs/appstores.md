# Installing Apps on your webOS Device

There's a vibrant community rescuing, archiving, restoring and even building apps for webOS. Since the actual HP App Catalog is gone, you'll need your computer one more time to "side-load" one app that gives you access to the rest of this "after-life" ecosystem.

## Prepare Your Computer

This tool works on Mac, Linux and Windows, and requires Java and the devices drivers to be installed. If you've completed the [activation process documented here](activate.md), you can skip this step, because you've already installed these pieces:

* Install Java (JDK) for Windows: <a href="https://www.oracle.com/java/technologies/downloads/" target="_blank">https://www.oracle.com/java/technologies/downloads/</a>
* Install Java for Mac: <a href="https://support.apple.com/en-us/HT204036" target="_blank">https://support.apple.com/en-us/HT204036</a>
* Install Java for Linux: <a href="https://www.fosstechnix.com/install-oracle-java-8-on-ubuntu-20-04/" target="_blank">https://www.fosstechnix.com/install-oracle-java-8-on-ubuntu-20-04/</a>

Next you will need the Novacomm driver for your computer:

* Windows 32-bit (Tested on Windows 7): [Installer MSI](http://www.webosarchive.com/activation/drivers/novacom-win-32/)
* Windows 64-bit (Tested on Windows 10): [Installer MSI](http://www.webosarchive.com/activation/drivers/novacom-win-64/)
* macOS 32-bit (Tested up to Mojave): [Installer PKG](http://www.webosarchive.com/activation/drivers/novacom-mac/)
* macOS 64-bit (For Catalina and Later): <a href="https://github.com/incidentist/novacomd/releases/tag/macos64" target="_blank">GitHub Release</a>
* Linux 32-bit (Tested on Ubunutu): [DEB Package](http://www.webosarchive.com/activation/drivers/novacom-linux-32/)
* Linux 64-bit (Tested on Ubunutu): [DEB Package](http://www.webosarchive.com/activation/drivers/novacom-linux-64/)

Make sure you have a good quality micro USB cable connected directly to your computer (not to a hub.) The OEM cables are your best bet (they're recognizable by a silver indented circle near USB connectors.)

## Download WOSQI

Once you have Java, you will need to download the webOS Quick Install (WOSQI) tool:

* <a href="http://www.webosarchive.com/activation/WebOSQuickInstall-4.6.0.jar" target="_blank">Download from webOS Archive</a>

## Run WOSQI on your Computer

* With your webOS device plugged into your computer:
* Using your computer's command line, navigate to the directory where you downloaded WOSQI
* Run the command: `java -jar WebOS-Quick-Install-4-7-2.jar`
* The webOS Quick Install app should open on your computer

## Install Preware

The Preware app is the original Homebrew App Store for webOS, and contains many useful apps, hacks, tweaks from the glory days of webOS. Community members still occasionally publish new apps and updates, and it provides useful infrastructure for installing apps from other sources, so you don't need to plug your Device into your computer.

* Download the Preware app to your computer
    + [Download from webOS Archive](http://www.webosarchive.com/activation/org.webosinternals.preware_1.9.14_arm.ipk)
    + [Download from PivotCE](http://ipkg.preware.net/feeds/webos-internals/armv7/org.webosinternals.preware_1.9.14_arm.ipk)
* Drag the Preware IPK you just downloaded onto the WOSQI window (or hit the + button and browse for it)
* Press the Install button to install Preware on your device

![Install Preware from WebOS Quick Install](images/wosqi.png)

## Install webOS App Museum II

<i>Note: Works for webOS 2.0 only</i><br>
The original App Museum was a listing of the original Palm/HP App Catalog, and provided a way to link to FTP archives and install some of those apps.

App Museum II pulls together multiple sources into a single interface for downloading App Catalog apps that have been rescued or archived by the community. Its a mostly historical source of apps, but curated sections of the Museum contain patched versions and instructions to making some important apps work again.

Note that App Museum II requires Preware, so install that first!

You can use WOSI to Install webOS App Museum II, just like you did with Preware.

* Download the Museum to your computer:
    + [Download Latest Version](http://appcatalog.webosarchive.com/latest.php)
* Drag the Museum IPK you just downloaded onto the WOSQI window (or hit the + button and browse for it)
* Press the Install button to install Preware on your device

## Use Your Device to Install Apps

Now that you have a couple App stores on your device, you won't need WOSQI or your computer any more. Make sure you're on WiFi, then just launch Preware or App Museum II and find and download apps there!
<br>Just look for these icons in your Launcher...

![Preware](images/preware-icon.png) &nbsp;&nbsp;![App Museum II](images/appmuseum-icon.png)

## Video Tutorial

A video showing activation and [app installation](appstores.md) is available on YouTube...

<a href="https://www.youtube.com/watch?v=-ieDXW8yA5c" target="_blank">[![Video Tutorial](images/videotutorial.png)]</a>

## Alternate Instructions

This documentation attempts to update and simplify information available from older, archived sources. You may find that material to be useful as reference:

* <a href="https://webos-internals.org/wiki/Application:Preware#Installing_Preware_with_WebOS_Quick_Install" target="_blank">WebOS-Internals Wiki</a>
* <a href="https://www.webosnation.com/how-install-homebrew-apps-your-touchpad-or-webos-smartphone" target="_blank">WebOS Nation Article</a>