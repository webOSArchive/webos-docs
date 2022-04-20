# Restoring a Dead Touchpad
<sup>by: M.A.Touchpad</sup>

You might have found this old relic in one of your drawers, or you might have bought it off eBay. No matter how you found it, if it hasn’t been used in ages, you will probably need to do more than just plugging it into a charger.

---
> **_NOTE:_**  If your Touchpad has been used recently (charges and turns on), you DO NOT need to use this guide.

---

## Step 1: Charge

The Touchpad requires that you use a 5.3V 2A charger to charge it. You might have gotten or have the original charger which is rated at those specs, but we will not be using that. The community has speculated that the A6 battery chip lets the battery drain to a point where the chip will not let it charge again. To bypass this, we will need to use a lower power charger. The charger you got with your iPhone will do (5V 1A). You could go even lower than that if you wanted to. Just plug the Touchpad into the low power charger and wait. 

In general, the Touchpad should boot in 2-3 days. You should wait maximum a week (especially if you are using a very low powered charger). If the Touchpad’s home button light alternates back and forth, leave it on the low power charger. If the low battery symbol is displayed, connect it to the original charger if you have it (make sure that the original charger works since they are known to fail after some time). If you don’t have the original charger, keep it on the charger but make sure it isn’t on a very low powered charger (5v 1A or higher). 

If your Touchpad successfully boots, follow the tips below to keep the battery healthy...

### Charging Tips

The best way to charge your Touchpad is by using an original charger or another that is 5.3V and 2A. You can also charge it using a lower power charger. In WebOS, the Touchpad may give you the “to reliably charge” message if you plug it into a low powered charger. It may also not have the charging symbol on the battery. However, the Touchpad will still charge using a low powered charger, but it will take longer. You could also shut the Touchpad down while it is charging so that it charges faster. Another option for charging is the touchstone, which is basically wireless charging. You should be able to buy the Touchstone and the charger on eBay.

## Step 2: Buttons

If after one week the Touchpad does not boot, try some button gymnastics!

* Power 30 seconds.
* Power + Home 30 seconds.
* Power + rapidly pressing home at least 15 times.
* Home + rapidly pressing power at least 15 times.
* Power + Home + Volume up or down 30 seconds.

You could try some more random combinations, but be warned that power + volume up boots the Touchpad into WebOS recovery. If the Touchpad did not boot or it displayed a white battery with ? symbol on the screen, go to the next step. If your Touchpad did boot, skip to the charging tips section.

## Step 3: TP Debrick

At this point, if the Touchpad is still not working, we will have to assume that the A6 battery chip firmware is corrupt. This is especially true if your Touchpad displays a white battery with a question mark. To fix this, we need to reflash the battery firmware using a tool called TP Debrick. The latest version of it is v005 but v004 also works though it requires a lot more work. In this guide, we will cover the v005 version, but I will provide a link with instructions for the v004 version as well.

TP Debrick v005 is an operating system that will run from a USB drive on a computer. All of the data on the USB drive will be gone after this procedure, so back it up if you have data on there. The data on your computer and Touchpad should not be affected by this procedure, but WebOS Archive does not guarantee that your data and devices will be safe. For this procedure, you will need a USB drive with a capacity of at least 1GB, a USB to micro USB cable, a computer, and, of course, your Touchpad.

### Download files:

#### TP Debrick v005 (Recommended)

+ Read the <a href="https://forum.xda-developers.com/t/hp-touchpad-debrick-linux-live-cd.4189245/" target="_blank">XDA Touchpad Forum Thread</a>.

+ Tool Downloads (.iso files)
+ + <a href="https://drive.google.com/file/d/1XUJNWqvkfH6WwMi0cTDn99JB1pdf3q-y/view?usp=sharing" target="_blank">Download from Google Drive</a> 
+ + <a href="http://www.mediafire.com/file/0xu1u2s3afjas9a/HP_TOUCHPAD_DEBRICK_LIVE_CD.iso/file" target="_blank">Download from MediaFire</a>

+ Watch the <a href="https://www.youtube.com/watch?v=WKrXu99XvA0&feature=youtu.be" target="_blank">Youtube Video Description</a>.

+ Tool to make the TP Debrick work. Download the right one for your OS.
+ + <a href="https://unetbootin.github.io/">UNetbootin</a>

#### TP Debrick v004

+ Read the <a href="https://www.rootzwiki.com/threads/tpdebrick-v004.38786/" target="_blank">RootzWiki Thread</a>

### Make the USB drive bootable:

* Insert the USB drive into your computer.
* Open the UNetbootin application (.exe) and click the “Diskimage” radio button.
* Next, press the button with 3 dots. Navigate to where you keep the “HP_TOUCHPAD_DEBRICK_LIVE_CD.iso” file, select the file, and click “Open.”
* Select the correct drive if you have multiple drives connected to your computer using the “Drive” drop-down menu.
* Once you have the correct drive selected, press “OK.”
* UNetbootin will start to write the .iso file to the USB drive. You may see a box pop up in the middle of the procedure and the status bar may stop moving. This can be ignored as it still writes to the USB drive.
* After some time, UNetbootin will finish flashing to the USB drive. Once it says it has finished, move on to the next step.

### Boot the computer via the USB drive:

* Shutdown the computer you are going to use for this procedure.
* Find which key gets the computer into the boot menu. You will have to search the internet for the boot menu key, as this varies from manufacturer to manufacturer.
* Once you know the boot menu key, turn on the computer and immediately and repeatedly press the boot menu key. The computer should eventually display a menu that you can use the arrow and enter keys to navigate.
* Select the option that says “Setup” or “BIOS Setup” Once you are in the setup, make sure that the computer has legacy boot enabled and not UEFI/Secure Boot. The BIOS interfaces of all computers are different, so I can not provide you with instructions on how to do this. I would recommend that you take a picture of the settings before you change them, just so you know what they were before.
* After you change the settings, save them and shutdown the computer. Turn it back on and get back into the boot menu.
* Select the option that has something to do with USB, like “USB HDD: Mass Storage Device.” The computer should then boot via the USB drive.

### Perform the TP Debrick:

* Follow the instructions on the wallpaper to perform the procedure. The password is: 1234.
* The Touchpad may have automatically booted after the procedure. If a “moboot” menu appears, this means that Android was probably installed on the tablet. Use the arrow keys to move and the home button to select and option. If you want to boot into WebOS, look for the option that says “boot webOS.” If you want to boot into Android, look for an option that says “boot CyanogenMod” or maybe “boot Evervolv.” If you do not see a WebOS option, you will probably have to use WebOS Doctor and the TP Toolbox to put WebOS on there.
* If your Touchpad did not boot, connect it back to the charger. The creator of the TP Debrick v005 says to use the original charger (5.3V or 2A) or an equivalent, but you could also use the low powered chargers as well. Continue charging it for at least one week. If it has not booted by then, it probably has a very serious problem and, as far as we know, cannot be revived.
* After you have finished the procedure, shutdown the computer. If you made any changes to the BIOS, reboot it into the boot menu and then select the BIOS setup. Put the settings back like how they were before. After you are done changing the settings, save them and shutdown the computer.