# Activating a webOS Device

The Palm/HP activation services have been down a long time, but that doesn't mean your beautiful phone or tablet are dead! HP left us a gift, in the form of "doctor" tools that can activate a device without needing any servers. You just need to do a little work on your own computer...

## Preparing Your Computer

This process works on Mac, Linux and Windows, but requires Java to be installed:

* Install Java (JDK) for Windows: [https://www.oracle.com/java/technologies/javase-downloads.html](https://www.oracle.com/java/technologies/javase-downloads.html)
* Install Java for Mac: [https://support.apple.com/en-us/HT204036](https://support.apple.com/en-us/HT204036)
* Install Java for Linux: [https://java.com/en/download/manual.jsp](https://java.com/en/download/manual.jsp)

Next you will need the Novacomm driver for your computer:

* Windows 32-bit (Tested on Windows 7): [Installer MSI](http://www.webosarchive.com/activation/drivers/novacom-win-32/)
* Windows 64-bit (Tested on Windows 10): [Installer MSI](http://www.webosarchive.com/activation/drivers/novacom-win-64/)
* Mac 32-bit (Tested up to Mojave): [Installer PKG](http://www.webosarchive.com/activation/drivers/novacom-mac/)
* Linux 32-bit (Tested on Ubunutu): [DEB Package](http://www.webosarchive.com/activation/drivers/novacom-linux-32/)
* Linux 64-bit (Tested on Ubunutu): [DEB Package](http://www.webosarchive.com/activation/drivers/novacom-linux-64/)

## Download the Doctor Tool for your Device

* TouchPad Doctor: **coming soon**

## Preparing Your TouchPad

This author doesn't have other webOS devices to test this with, so the following steps document the process on TouchPad. It should be similar on other devices, but there might be some differences.

* Reboot your TouchPad into recovery mode...
* Hold the Power and Volume Up buttons until the TouchPad restarts
* Keep holding both buttons until you see the USB symbol

## Running the Doctor

You'll need a command line in your operating system of choice. On a Mac or Ubuntu, this is called Terminal. On Windows, press the Windows key and type "command" and hit enter.

* Using your command line, navigate to the directory where you downloaded the Doctor tool.
* Run the command: `java -jar devicetool2.jar`
* Wait while the device is updated and rebooted

## Alternate Instructions

This documentation attempts to update and simplify information available from older, archived sources. You may find that material to be useful as reference:

* [WebOS-Internals Wiki](https://webos-internals.org/wiki/WebOS_Doctor_Versions)
* [Archived HP Forum Post](https://h30434.www3.hp.com/t5/Tablets-and-Mobile-Devices-Archive-Read-Only/How-to-use-the-webOS-Doctor-on-the-TouchPad/td-p/2186473)