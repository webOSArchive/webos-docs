# Shell Access

webOS may have a beautiful user interface, and easy Javascript-based programming environment, but underneath all that is a powerful Linux-based operating system. While normally you wouldn't see this layer, unlocking the command line gives you the ability to control your device in fun and helpful ways.

There's no jailbreaking required, all the steps can be performed right from your device, using bits found in Preware. These instructions assume you've aleady completed [installing the App Stores](appstores).

## On Device

### Installing Xecutah

* Launch Preware on your device and wait while it syncs
* From the built-in Search feature, type: xecutah
* Tap in the Xecutah search result
* Tap install
* When prompted, confirm that the pre-requisite apps should also be installed

### Launching the Shell

Although multiple apps will be installed, the only one you can actually use is Xecutah -- don't delete the other apps, they are used by Xecutah.

* Tap the Xecutah icon from the Launcher of your webOS device
* Give it a few seconds to startup
* On the TouchPad, you will need to tap with three fingers on the screen to bring up the keyboard
    + Tapping again with three fingers will hide the keyboard again
    + Type `clear` at any time if the screen gets too full
* Try typing some commands:
    + `ls` will list the contents of the current directory
    + `cd ..` will move up one directory
    + `cd /media/internal` will move to the Internal storage directory that you see when you connect your webOS device to a computer

### Customize the Shell

The Tweaks App, and corresponding tweaks, all found in Preware, can be used to customize the shell, including reserving space for the keyboard so you don't have to keep clearing the screen.

## Remote

### Developer Tools

The official Developer Tools allow shell access from a USB-connected PC or Mac, using the command line. More information about the Developer Tools can be found at the restored <a href="http://sdk.webosarchive.com/docs/docs.html#dev-guide/tools.html" target="_top">SDK Archive</a>.

### SSH Access

The Homebrew Community has built and published the OpenSSH server for webOS. The necessary components can be found and installed from [Preware](http://www.webosarchive.com/docs/appstores/#install-preware) on your device.