# Root Certificates and Hosts

## Hosts Files
With the latest updates from the community, there's less need to update the hosts file. However, some restoration efforts and Preware sources require that you trick you webOS device into looking for Palm/HP content from archived servers, rather than trying to reach dead servers. The easiest way to do this is with an App from Preware:

**Note**: If you are using the webOS Archive Proxy, you do not need to modify your local hosts files -- the proxy will resolve these hosts for you.

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
* In the text editor that opens, enter the following lines exactly as shown:

```
23.4.17.24          cdn.downloads.palm.com
140.211.169.161     ipkg.preware.org
23.141.224.193      ipkg.preware.net
23.141.224.193      preware.net
```

* From the Interalz Pro menu in the top left, choose "Save File" then "Close"