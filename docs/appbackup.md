# Backing Up an Installed App

Depending on the type of app, and how it was installed, its usually possible to backup an app installed on a device, so it can be recompiled and added to the archive. Most FTP sites and other stores have already been added to the Museum, so the best way to grow the archive is from apps found on devices. You can follow [these steps to inventory your device](appinventory.md).

If you have a Touchpad that won't start, try the [rescue instructions](tprestore.md).

In these instructions, the "Device" is your webOS device (Pre, Touchpad, etc...) and a "Computer" means a Mac or PC running Windows, OSX/macOS or Ubuntu.

## Step 1: Inventory Your Device

If you haven't already, follow the [App Inventory](appinventory.md) steps to prepare and connect to your device -- make sure you confirm which apps the community needs from your device before you extract any apps!

## Step 2: Open a Command Window on your Computer

On your computer, open a command line or terminal window:

- On a Mac, launch the Terminal program from the Applications > Utilities folder.
- On Windows, hold the Windows key on your keyboard down and press R. Then type `cmd` and hit enter.
- I'll assume if you're running Ubuntu that you know how to find a shell ;-)

Now let's find your novacom directory:

- On Windows, type `cd "c:\Program Files\Palm, Inc"`
- On Mac or Ubuntu, type `cd /opt/nova/bin/`

## Step 3: Connect your Device to your Computer

Plug a micro-USB cable into your device connected to your computer. After a few seconds, the device should ask if you want to go into USB Drive mode -- do *not* do this yet. Stay in regular mode for now.

## Step 4: Get Shell Access

From your Command Window or Terminal, in the directory as determined in Step 2, type the command to get shell access:

- On Windows: `novacom.exe -t open tty://`
- On Mac: `./novacom $* -t open tty://`

## Step 5: Find the App folder to backup

You're now interacting with the shell of the device. So navigate to the install folder:

`cd /media/cryptofs/apps/usr/palm/applications/`

Then type `ls` to get a directory listing. Review the list to find the folder for the App you want to backup. As an example, we'll backup the drPodder app -- you would have to substitute the drPodder folder for the App you actually want to backup:

`cp -R ./com.drnull.drpodder /media/internal`

You can repeat this process for each app you want to backup. When you're done, type `exit` to close the device shell.

## Step 6: Copy the Backup to Your Computer

Disconnect your device from your computer and wait a couple seconds. Now reconnect the device -- this time when prompted, choose "USB Drive Mode" on your device. After a couple seconds, your device should show up as a USB drive on your computer. When it does, you will see the App folder(s) you backed-up in Step 5. Copy this folder to your computer.

Once the folder is on your computer, zip it up and share it with the [Community](community.md) so we can attempt to save it. Depending on the app, there may be additional folders we need you to grab, but the process will be similar to the steps above.