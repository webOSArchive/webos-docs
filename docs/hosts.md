# Root Certificates and Hosts

## Hosts Files

With the latest updates from the community, there's less need to update the hosts file. However, some restoration efforts and Preware sources require that you trick you webOS device into looking for Palm/HP content from archived servers, rather than trying to reach dead servers. The easiest way to do this is with an App from Preware:

**Note**: If you are using the [webOS Archive Proxy](proxysetup.md) you do not need to modify your local hosts files -- the proxy will resolve these hosts for you.

* Launch Preware and wait while it syncs
* Use the built-in search feature to search for `internalz`
* Select "Internalz Pro" by Jason Robitaille
* Tap the button to install
* Once its installed, start "Internalz Pro" from the Launcher on your device
* From the Interalz Pro menu at the top left of your screen, choose "Preferences"
* At the bottom of the preferences list, find "Master mode" and turn it on
* Press "Yes" in the confirmation window, then close Preferences from the menu
* In the File Browser, navigate to `/etc`
* Scroll down until you find the file `hosts`, tap on it, and choose "Open" in the menu that appears
* In the text editor that opens, enter the following lines:

<code>23.4.17.24 &nbsp; cdn.downloads.palm.com<br/>
140.211.169.161 &nbsp; ipkg.preware.org<br/>
23.141.224.193 &nbsp; ipkg.preware.net<br/>
23.141.224.193 &nbsp; preware.net<br/></code>

* From the Interalz Pro menu in the top left, choose "Save File" then "Close"

## Help Hosts

Additional Hosts can be configured to restore the on-device Help app for some devices. This restoration effort is documented at <a href="http://help.webosarchive.com/HowToUse.php" target="_blank">http://help.webosarchive.com</a>