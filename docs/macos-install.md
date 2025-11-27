# Novacom Drivers on macOS

webOS was discontinued more than a decade before Apple Silicon and 64-bit-only Mac operating systems were the norm, so the official tools were never compiled for those platforms. However, the community has managed to build the driver for modern macOS and Apple hardware. It just takes a few additional steps to get it going...

## Optional (But Recommended)

### Install Homebrew

Use the standard instructions for installing Homebrew, found on the <a href="https://brew.sh/" target="_blank">official Homebrew website</a>.

### Install Support Libraries

Once brew is installed, you can use it to install the needed USB libraries for your CPU:

`brew install libusb libusb-compat`

## Install Driver

Download the community-built <a href="https://www.webosarchive.org/activation/drivers/novacom-macos-64/" target="_blank">64-bit Release</a>, and run the installer.
(Huge thanks to <a href="https://github.com/incidentist" target="_blank">incidentist!</a>)

**_IMPORTANT NOTE:_** By default, macOS may block execution of the installer. You will need to confirm security exceptions in System Preferences...

## Testing It Out

If your device is already activated and in Dev mode, you can test the drivers easily:

* Connect your webOS device to your Mac -- preferably with an original Palm/HP USB cable.
* From a Terminal command line, type `novacom -l` to list devices.

If everything worked, you're ready to [install the SDK](sdkpdk.md) and start making apps!

## Activating a device

If needed, review the instructions on [Activating a Device](activate.md), or [Enabling Dev Mode](sdkpdk.md#activate-developer-mode).