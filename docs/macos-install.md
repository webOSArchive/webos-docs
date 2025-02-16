# Novacomm Drivers on macOS

webOS was discontinued more than a decade before Apple Silicon and 64-bit-only Mac operating systems were the norm, so the official tools were never compiled for those platforms. However, the community has managed to build the driver for modern macOS and Apple hardware. It just takes a few additional steps to get it going...

## Install Homebrew

### Intel Processors

Use the standard instructions for installing Brew, found on the <a href="https://brew.sh/" target="_blank">official Homebrew website</a>.

### Apple Silicon

Brew must be installed with <a href="https://gist.github.com/progrium/b286cd8c82ce0825b2eb3b0b3a0720a0#homebrew" target="_blank">Rosetta enabled</a>, which is not the default install. You can force it with:

`arch -x86_64 zsh /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

## Install Support Libraries

Once brew is installed, you can use it to install the needed USB libraries for your CPU:

### Intel Processors

`brew install libusb libusb-compat`

### Apple Silicon

`arch -x86_64 /usr/local/bin/brew install libusb libusb-compat`

## Install Driver

Download the community-built <a href="https://www.webosarchive.org/activation/drivers/novacom-macos-64bit.zip" target="_blank">64-bit Release</a>, and unzip its contents.
(Huge thanks to <a href="https://github.com/incidentist" target="_blank">incidentist!</a>)

Launch terminal, navigate to the folder you just unzipped and make sure both the installer and uninstaller are executable:

`chmod +x *.sh`

Launch the installer as super user:

`sudo ./install-novacom.sh`

---
> **_NOTE:_** macOS will initially block execution of the installed files. You will need to confirm security exceptions in System Preferences for both novacomd *and* novacom. The former will try to start automatically, the latter, when you try to test novacom...

---

## Testing It Out

If your device is already activated and in Dev mode, you can test the drivers easily:

* Connect your webOS device to your Mac -- preferably with an original Palm/HP USB cable.
* From a Terminal command line, type `palm-log -l` to list installed apps on your device.

## Activating a device

If needed, review the instructions on [Activating a Device](activate.md), or [Enabling Dev Mode](sdkpdk.md#activate-developer-mode).