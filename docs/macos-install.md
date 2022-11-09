# Novacomm Drivers on macOS

webOS was discontinued more than a decade before Apple Silicon and 64-bit-only Mac operating systems were the norm, so the official tools were never compiled for those platforms. However, the community has managed to build the driver for modern macOS and Apple hardware. It just takes a few additional steps to get it going...

## Install the 32-Bit Driver

While the 32-bit driver does not work, the installer is still needed to setup the environment. Start by running the normal [32-bit Mac Installer Package found here](activate.md#prepare-your-computer).

## Swap in the 64-Bit Driver

Download the community-built <a href="https://github.com/incidentist/novacomd/releases/tag/macos64" target="_blank">64-bit Release</a>, and unzip its contents.

Replace the files in **/opt/nova/bin** installed by the 32-bit installer, with the new files in the 64-bit Release.

Restart the driver: `/opt/nova/bin/stop-novacomd && /opt/nova/bin/start-novacomd`

## Install Homebrew

### Intel Processors

Instructions for installing Brew are out of scope for this document, but can be found on the <a href="https://brew.sh/" target="_blank">official Homebrew website</a>.

### Apple Silicon

Brew must be installed with <a href="https://gist.github.com/progrium/b286cd8c82ce0825b2eb3b0b3a0720a0#homebrew" target="_blank">Rosetta enabled</a>, which is not the default install. You can force it with:

`arch -x86_64 zsh /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

## Install Support Libraries

Once brew is installed, you can use it to install the needed USB libraries for your CPU:

### Intel

`brew install libusb libusb-compat`

### Apple Silicon

`arch -x86_64 /usr/local/bin/brew install libusb-compat`

## Testing It Out

If your device is already activated and in Dev mode, you can test the drivers easily:

* Connect your webOS device to your Mac -- preferably with an original Palm/HP USB cable.
* From a Terminal command line, type `palm-log -l` to list installed apps on your device.

## Activating a device

If needed, review the instructions on [Activating a Device](activate.md), or [Enabling Dev Mode](sdkpdk.md#activate-developer-mode).