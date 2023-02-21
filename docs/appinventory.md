# Extracting an App Inventory

If you have a device with apps that you might be interested in contributing to the Museum, follow these steps to pull an inventory off the device, so we can check for uniqueness.

In these instructions, the "device" is your webOS device (Pre, Touchpad, etc...) and a "computer" means a Mac or PC running Windows, OSX/macOS or Ubuntu.

## Step 1: Connect to your Device

Follow the "Prepare Your Computer" steps on this [activation page](activate.md#prepare-your-computer) to install Java and the Novacom drivers. (It may look like a lot, but its just different options for different environments -- you only need to install one Java, and one Novacom.)

*Note: you do not have to follow the other steps on the page, but it won't hurt your device if you do.*

## Step 2: Put Your Device in Dev Mode

Follow the "Activate Developer Mode" steps on this [build your own apps page](sdkpdk.md#activate-developer-mode) to allow you to issue commands from your computer to the device. You'll type the code for your device's OS from the home screen of your device with no apps open.

*Note: you do not have to follow the other steps on the page, but you can if you wish.*

## Step 3: Connect your Device to your Computer

Plug a micro-USB cable into your device connected to your computer. After a few seconds, the device should ask if you want to go into USB Drive mode -- do *not* do this. Stay in regular mode.

## Step 4: Open a Command Window on your Computer

On your computer, open a command line or terminal window:

- On a Mac, launch the Terminal program from the Applications > Utilities folder.
- On Windows, hold the Windows key on your keyboard down and press R. Then type `cmd` and hit enter.
- I'll assume if you're running Ubuntu that you know how to find a shell ;-)

Now let's find your working directory:

- On Windows, type `echo %cd%`
- On Mac or Ubuntu, type `echo $PWD`

The output will tell you what folder you're working in. Remember this for the next step.

## Step 5: Download Minimal SDK Tools to your Computer

Download this Java jar file: <a href="https://www.webosarchive.org/activation/webos-tools.jar" target="_blank">https://www.webosarchive.org/activation/webos-tools.jar</a> which contains minimal SDK tools.

Copy, move or save this file into the same folder you found during step 4.

*Note: If you've previously installed the full SDK, you don't need this step.*

## Step 6: Get an App Inventory

From the command line on your computer opened in step 4, using the Java file downloaded in step 5, and with the device connected to your computer on step 3, you're ready to run this command:

**Windows**: `java -jar webos-tools.jar palm-log -l`

**Mac or Ubuntu**: `java -jar ./webos-tools.jar palm-log -l`

If it works, you'll get a list of all the apps installed on your device, including AppId, Version and Title. Copy and paste this list into a text file or message!

## Step 7: Send your Inventory

Contact the [Community](community.md) to share your Inventory. 

If you have anything unique, proceed to [App Backup](appbackup.md) to learng how to extract your unique apps for archival!