# Things to Try on webOS
webOS is *not* a dead platform! There's still plenty of things you can on your webOS device. Here's a couple suggestions to get you started....

## Websites

More and more websites are moving to newer encryption over HTTPS as the only way to access the site. On webOS 3.x, including the Pre3 and Touchpad, you can work-around this with a [proxy](proxysetup.md). With Pre 2 and older, you are more limited. Here are some common websites that work, or ways to work around:

* **Google** still works on all devices
* **YouTube**'s website no longer works, but there's an [app for that](#youtube)
* **Reddit** still works on all devices through [old.reddit.com](http://old.reddit.com) or the excellent IAmA Reddit App - [Homebrew](https://preware.pivotce.com/package/com.tehtorq.reddit-hb) and [App Catalog](http://appcatalog.webosarchive.com/showMuseumDetails.php?search=iama&app=10842) versions are available. Reddit videos can be watched in [MeTube](#youtube)
* **Facebook** [mobile](http://m.facebook.com) still works on all devices (and webOS doesn't support most of their tracking!)
* **Wikipedia** only works with a proxy. For older devices, webOS archive provides a "tiny" version that is periodically updated at [wikipedia.webosarchive.com](http://wikipedia.webosarchive.com)
* **Other sites:** many sites can be accessed through their RSS Feed using the [FeedSpider](http://appcatalog.webosarchive.com/showMuseum.php?search=feedspider) app, and a service like [InoReader](http://www.inoreader.com)

## Apps

All of the Apps listed below can be found on [App Museum II](appstores.md), but there's direct download links as well.

### YouTube
<img src="https://www.jonandnic.com/webos/metube/icon.png" align="right" style="padding-left: 8px">YouTube doesn't officially support webOS (or most retro platforms) but thanks to the open source community, its still available. An app called **MeTube**, available in App Museum II, works with a pair of back-end services to fetch YouTube videos for you on demand. The services are hosted by webOS Archive, but you can also run them yourself, if you prefer.

* [Download the App](http://appcatalog.webosarchive.com/showMuseumDetails.php?search=metube&app=1005774)
* [Self-host the services](https://github.com/codepoet80/metube-php-servicewrapper)

### Podcasts
webOS devices make great Podcast listening tools -- whether its a Touchpad setting in Touchstone, maybe connected to a nice Bluetooth speaker, or a tiny little Pre or Veer, slipped in your pocket as you go about your routine. Many Podcasts have switched to HTTPS, which causes problems for older, encryption-challenged devices, but a **Retro Podcast Service**, hosted by webOS Archive (or you, if you want) solves this, and many other problems. Combined with a stand-alone Podcast Directory app, and a number of Podcast players available in the Museum, you can download and listen to thousands of popular podcasts right on your device.

![Podcasts](images/retropodcasts.png)

* Download the [Podcast Directory](http://appcatalog.webosarchive.com/showMuseumDetails.php?search=podcast&app=1005778) app
* Check out some [Podcast](http://appcatalog.webosarchive.com/showMuseumDetails.php?search=podder&app=2046) Player [Apps](http://appcatalog.webosarchive.com/showMuseumDetails.php?search=video&app=10384)
* [Self-host the service](https://github.com/codepoet80/webos-podcastdirectory)

### The Ultimate Night Stand App
Philips Hue lights are some of the best smart bulbs out there -- whether you use their standard bulbs, color changing bulbs, or their Wake-Up light with sunrise simulation. A little Palm Pre or Veer, or even a Touchpad make great companions, allowing you to control them in a dark room... without needing to put a smart speaker in your room listening to you sleep!

<img src="http://www.jonandnic.com/webos/onenightstand/LampsPrePhoto.png" style="width:300px">

**One Night Stand** is a night table clock that switches to a light controller with just a tap. It connects your smart home to webOS with a classy app that turn your Pre, Veer or Touchpad into an elegant controller.

* Download [One Night Stand](http://appcatalog.webosarchive.com/showMuseumDetails.php?search=one+night&app=1005771)
* Learn more about [Philips Hue](https://www.usa.philips.com/c-e/smartsleep/wake-up-light-portfolio.html) 

### Be an Exhibitionist
webOS 2.0 and above have a mode called Exhibition, that allows your device to continuously show content while on its charging dock. A photo slide show is an obvious choice -- load up your device with your favorite pictures of family, pets, or scenery, and let the exhibit roll by.

If you'd rather get some information, **Accuweather** still works on all devices, and on the Touchpad includes a gorgeous Exhibition mode that shows the weather where you are, or in other locations of your choosing.

* Download [Accuweather](http://appcatalog.webosarchive.com/showMuseum.php?search=accuweather)

### Play Some Games!
<img src="../images/angrybirds.jpg" align="right" style="padding-left: 8px">webOS had a great library of games, and the best part? No in-app-purchase, and no spyware. Just some great mobile classics. No matter which webOS device you have, you'll find some great entertainment in the [games section](http://appcatalog.webosarchive.com/showMuseum.php?category=Games&count=1030) of App Museum II. Here's a couple suggestions to get you started...

* [Angry Birds](http://appcatalog.webosarchive.com/showMuseum.php?search=angry+birds) - The original, and some of the variations, covering every screen size
* [SCUMMVM](http://appcatalog.webosarchive.com/showMuseumDetails.php?search=scumm&app=1005763) - Play dozens of PC point-and-click adventures on your Touchpad
* [Radiant Defense](http://appcatalog.webosarchive.com/showMuseum.php?search=radiant) - There's a bunch of great Tower Defense style games, this is a stylish and fun one to start with
* [Snes9X EX](http://appcatalog.webosarchive.com/showMuseumDetails.php?search=snes&app=8214) - webOS is home to many emulators, start with this near-perfect Super Nintendo emulator for Pre through to the Touchpad
* [Assassin's Creed](http://appcatalog.webosarchive.com/showMuseum.php?search=assassin%27s+creed) - A giant adventure for your mobile device
* [Miriel](http://appcatalog.webosarchive.com/showMuseum.php?search=Miriel) - These games keep my youngest daughter busy for hours

### Make Something New
<img src="https://www.jonandnic.com/webos/webos-sdk.png" align="left" style="padding-right: 8px">webOS is an easy platform to learn to develop on. Based on Javascript, and powered by Linux, is an easy environment to explore, reverse engineer and build upon. If you can make a web page, you can make an App for webOS! Check out the [SDK section](sdkpdk.md) for more info about getting started!