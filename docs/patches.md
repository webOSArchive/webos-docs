# Patches and Hacks

<img src="../images/patch.png" align="right" width="128" style="width:128px; padding-left: 8px"> webOS was an extremely customizable operating system, with community-created patches for a wide variety of modifications. Most of these Patches can still be found in [Preware](appstores.md#install-preware) and should be installed from there, since they were created by contemporaneous developers. Information about what each Patch does can be found in the Preware app.

Newer patches don't benefit from the expertise of the original community, or the infrastructure that was created to deliver and support them, so will be discussed further here. 

Note that you must have run at least one historical patch via Preware, to install all the necessary dependencies before running the below (on TouchPad, I recommend "Advanced Reset Options" in Preware to start!)

## Removing Dead Apps

Depending on the device and original carrier, there's a number of pre-installed apps that are difficult to remove. And even on versions of the OS that didn't included 3rd party pre-loads, a few built-in apps became "dead" after HP's servers shut down.

webOS Archive has produced a series of patches that can help hide these dead apps, providing a tidier Launcher experience:

<a href="https://stacks.webosarchive.org/patches" target="_blank">Download and run webOS Archive Patches</a>

**Note:** These patches are meant to be installed with [WOSQI (webOS Quick Install)](appstores.md#download-wosqi) from a PC -- *not* from within Preware.

## USB-C Connectivity

Community member Alan Morford has successfully replaced the micro-USB port on the Touchpad with a modern USB-C connector. His hack preserves both data and charging, but requires micro-soldering. If you have the tools and the skills, check out his <a href="https://pivotce.com/2024/09/25/guide-converting-the-touchpads-micro-usb-port-to-usb-c/" target="_blank">Guide on PivotCE</a>. 

## Warning-Free Charger

The original HP charging barrel was a little unique, and while you **can** charge the Touchpad with almost anything, it *will* complain if it doesn't detect the original circuitry. Alan Morford has a guide to <a href="https://pivotce.com/2024/12/05/guide-create-an-original-barrel-charging-wire-for-your-hp-touchpad/" target="_blank">fixing the charging warning</a> -- and its a little easier to pull off than the USB-C hack.