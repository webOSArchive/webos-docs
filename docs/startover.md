# Touchpad Toolbox

While most software issues can be fixed with a [trip to the doctor](doctor.md), if you (or some previous owner) had been experimenting with alternate OSes, like LuneOS or Android (or both!) and find yourself in a situation where you can't boot and can't doctor, but you *can* get the device to [power on](tprestore.md), the Touchpad Toolbox is here to save the day!

The Touchpad Toolbox loads a minimal environment into memory during a rescue boot, and allows you to wipe partitions and start over. You may also use this tool for other kids of experiments -- those will not be documented here, but if you mess up, these instructions should help you start over!

These instructions are provided for quick reference, no guarantee is implied.

## Download the Toolbox

The Touchpad Toolbox originated with <a href="https://xdaforums.com/m/jcsullins.2763462/" target="_blank">jcsullins</a> on the XDA Forums, where many cool things happen. As of this writing, those links still work, so <a href="https://xdaforums.com/t/tools-touchpad-toolbox-updated-2015-02-25.2756314/" target="_blank">start with the XDA post</a>.

If those links go stale, webOS Archive has a back-up of the essential <a href="https://www.webosarchive.org/activation/TPToolbox-2015-01-08-v42.zip">zip archive here</a>.

## Running the Doctor

### PC Environment

Ensure you have the novacom drivers working on your PC. See the [Prepare Your Computer](activate.md#prepare-your-computer) section of the Activation instructions.

The Toolbox has startup scripts that run in most Mac, Windows and Linux environments -- even as of 2025. If one OS not work, try another -- the script will need access to your PC's USB ports, so may need elevated privileges.

### Touchpad Environment

Regardless of the software state of your Touchpad, if it powers on, you can probably run the toolbox. But start by powering it off...

- Connect a known-good USB cable between your Touchpad and the PC where you have the Toolbox installed
- With the power off, press and continue to hold the Volume Up button on your Touchpad
- With the Volume Up button still held down, press the Power button until the screen lights up (usually about 5 seconds)
- When the USB symbol appears on the screen, release all buttons

### Running the Toolbox

- On your PC, run the appropriate `tptb_` startup script for your OS -- its best to do this from a Terminal/Command Prompt.
- If all goes well, the Toolbox will "install" on the Touchpad and boot into its environment
    - If something goes wrong, check that `novacom` and `novacomd` can run on your PC ([re-visit instructions](activate.md#prepare-your-computer)) and try another USB cable
- Once it starts, use the hardware Volume keys and Home button on your Touchpad to make and confirm selections
- For a true "Start Over", select "Complete Data Reset" and confirm it multiple times
- Once the the data reset completes, select "Create webOS Volumes" and confirm that action as well
- Finally reboot the device back into recovery mode (hold Volume up while powering up), and run the appropriate [Doctor](doctor.md) for your device. For *most* Touchpads, you'll want `webosdoctorp305hstnhwifi.jar`

## Alternate Instructions

This process is similar to the steps involved in <a href="https://www.rootzwiki.com/threads/rom-guide-how-to-install-android-5-x-x-4-4-x-with-jcsullins-tptoolbox-the-super-easy-way.179730/" target="_blank">Installing Android</a> on your Touchpad.

Community member <a href="https://forums.weboslives.eu/u/neon" target="_blank">neon</a> also refreshed the <a href="https://forums.weboslives.eu/d/21-android-on-the-hp-touchpad-a-hopefully-more-streamlined-guide" target="_blank">Android install documentation on the <a href="https://forums.weboslives.eu/" target="_blank">webOS Lives forums</a> in 2023.