# PIN Bypass

If you stumble upon a Touchpad with a screen lock, but don't know the PIN, this process describes how to unlock the device. Do not use this procedure maliciously (but also: do not store anything sensitive on unsupported devices that haven't been patched for more than a decade!!)

## Enable Developer Mode

The usual process for [enabling developer mode](sdkpdk.md#activate-developer-mode) won't work, since you can't interact with the device. You may get lucky and find that the device is already in developer mode -- which you can test by connecting to a PC with the [SDK](sdkpdk.md) installed and issuing a command like `palm-log -l`. However, if you're here, you're probably not that lucky. Fortunately, the device tool enables developer mode as part of its process.

Follow the [activation](activate.md) steps through to the end of running devicetool.

## Install the SDK

Follow the steps to <a href="https://sdk.webosarchive.org/" target="_blank">install the SDK on your computer</a>.

## Get Shell Access

With the Touchpad booted normally, and a *good* USB cable connected from it to your PC, open a command prompt.

In *nix-based environments, the command `novaterm` will launch a shell.

In Windows, use `C:\Program Files\Palm, Inc\terminal\novaterm.bat`

## Luna Service Bus

From the shell on the device, enter:

`luna-send -f -n 1 palm://com.palm.systemmanager/setDevicePasscode '{"passCode":"", "lockMode":"none"}'`

If successful, you should get a response like:

```
{
    "returnValue": true
}
```

If you get `false` instead, don't give up. Enterprise setups required a PIN, so you can't remove it. Instead, set it to something else:

`luna-send -f -n 1 palm://com.palm.systemmanager/setDevicePasscode '{"passCode":"1234", "lockMode":"pin"}'`

Either way, you can check the set value with:

`luna-send -f -n 1 palm://com.palm.systemmanager/getDeviceLockMode {}`

## Reboot

Still on the shell, enter: `reboot`

When the device comes back up, the PIN should be removed (or set to the value you specified!)

## Other Options

You can use shell to set a password, if you prefer:

`luna-send -f -n 1 palm://com.palm.systemmanager/setDevicePasscode '{"passCode":"mypass", "lockMode":"password"}'`

## Alternate Instructions

This page was based on a historical forum thread, archived <a href="https://web.archive.org/web/20160312213626/https://forums.webosnation.com/hp-touchpad/309660-how-allow-yourself-back-when-you-forget-your-lock-screen-passcode.html" target="_blank">here</a>.