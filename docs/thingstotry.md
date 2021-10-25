# Things to Try on webOS
webOS is *not* a dead platform! There's still plenty of things you can on your webOS device. Here's a couple suggestions to get you started....

## Websites

More and more websites are moving to newer encryption over HTTPS as the only way to access the site. On webOS 3.x, including the Pre3 and TouchPad, you can work-around this with a [proxy](proxysetup.md). With Pre 2 and older, you are more limited. Here are some common websites that work, or ways to work around:

### Common Sites
* **Google** still works on all devices
* **YouTube**'s website no longer works, but there's an app for that called [MeTube](#youtube), or you can try the retro-friendly website [Invidious](https://ytprivate.com).
* **Reddit** still works with an [HTTPS proxy enabled](proxysetup.md) on all devices through [old.reddit.com](http://old.reddit.com) or the excellent IAmA Reddit App - [Homebrew](https://preware.pivotce.com/package/com.tehtorq.reddit-hb) and [App Catalog](http://appcatalog.webosarchive.com/showMuseumDetails.php?search=iama&app=10842) versions are available. Reddit videos can also be watched in [MeTube](#youtube)
* **Facebook** [mobile](http://m.facebook.com) still works on all devices (and webOS doesn't support most of their tracking!), and the [PreBook app](http://appcatalog.webosarchive.com/showMuseumDetails.php?search=prebook&app=1005784) makes the experience a little nicer
* **Twitter** blocks the webOS browser, but [Project Macaw](https://preware.pivotce.com/package/net.minego.phnx) delivers a pretty great Twitter experience via a Homebrew App and a [HTTPS proxy](proxysetup.md).
* **Wikipedia** only works with a proxy. For older devices, webOS archive provides a "tiny" version that is periodically updated at [wikipedia.webosarchive.com](http://wikipedia.webosarchive.com)

### Alternatives
* **RSS:** many sites can be accessed through their RSS Feed using the [FeedSpider](http://appcatalog.webosarchive.com/showMuseum.php?search=feedspider) app, and a service like [InoReader](http://www.inoreader.com)
* **Google News:** retro-computer enthusiast [Action Retro](https://www.youtube.com/channel/UCoL8olX-259lS1N6QPyP4IQ) has built an excellent text-only Google News web app that works on almost anything. Check out [68k.news](http://68k.news/)
* **Text-Only Web:** many popular sites have a text-only version that works well on a variety of retro devices. Sijmen J. Mulder has assembled a good list here: [https://sjmulder.nl/en/textonly.html](https://sjmulder.nl/en/textonly.html)

## Community
There's still an active webOS Community, swapping notes on devices and patches, and even building new apps...

* **Forums:** [webOS Nation](https://forums.webosnation.com) Forums are still up, and you can expect roughly weekly interactions from both long-term experts, and newer users. There's even a [Forums app](http://appcatalog.webosarchive.com/showMuseumDetails.php?search=forums&app=1005770) you can use to participate from your webOS device.
<img src="https://www.jonandnic.com/webos/simplechat/icon.png" align="right" style="padding-left: 8px">
* **Discord + SimpleChat:** the most active community of webOS Users is on a [2021 webOS app called SimpleChat](http://appcatalog.webosarchive.com/showMuseum.php?search=simplechat) -- which is also connected to a [Discord server](discord.gg/7NrrT8exrn). Join in the conversation!

## Apps

All of the Apps listed below can be found on [App Museum II](appstores.md), but there's direct download links as well.

### YouTube
<img src="http://www.jonandnic.com/webos/metube/icon.png" align="right" style="padding-left: 8px">YouTube doesn't officially support webOS (or most retro platforms) but thanks to the open source community, its still available. An app called **MeTube**, available in App Museum II, works with a pair of back-end services to fetch YouTube videos for you on demand. The services are hosted by webOS Archive, but you can also run them yourself, if you prefer.

* [Download the App](http://appcatalog.webosarchive.com/showMuseumDetails.php?search=metube&app=1005774)
* [Self-host the services](https://github.com/codepoet80/metube-php-servicewrapper)

### Podcasts
webOS devices make great Podcast listening tools -- whether its a TouchPad sitting in Touchstone, maybe connected to a nice Bluetooth speaker, or a tiny little Pre or Veer, slipped in your pocket as you go about your routine. Many Podcasts have switched to HTTPS, which causes problems for older, encryption-challenged devices, but a **Retro Podcast Service**, hosted by webOS Archive (or you, if you want) solves this, and many other problems. Combined with a stand-alone Podcast Directory app, and a number of Podcast players available in the Museum, you can download and listen to thousands of popular podcasts right on your device.

![Podcasts](images/retropodcasts.png)

* Download the [Podcast Directory](http://appcatalog.webosarchive.com/showMuseumDetails.php?search=podcast&app=1005778) app
* Check out some [Podcast](http://appcatalog.webosarchive.com/showMuseumDetails.php?search=podder&app=2046) Player [Apps](http://appcatalog.webosarchive.com/showMuseumDetails.php?search=video&app=10384)
* [Self-host the service](https://github.com/codepoet80/webos-podcastdirectory)

### The Ultimate Night Stand App
Philips Hue lights are some of the best smart bulbs out there -- whether you use their standard bulbs, color changing bulbs, or their Wake-Up light with sunrise simulation. A little Palm Pre or Veer, or even a TouchPad make great companions, allowing you to control them in a dark room... without needing to put a smart speaker in your room listening to you sleep!

<img src="http://www.jonandnic.com/webos/onenightstand/LampsPrePhoto.png" style="width:300px">

**One Night Stand** is a night table clock that switches to a light controller with just a tap. It connects your smart home to webOS with a classy app that turn your Pre, Veer or TouchPad into an elegant controller.

* Download [One Night Stand](http://appcatalog.webosarchive.com/showMuseumDetails.php?search=one+night&app=1005771)
* Learn more about [Philips Hue](https://www.usa.philips.com/c-e/smartsleep/wake-up-light-portfolio.html) 

### Read a Book
<img src="../images/kindle.png" align="right" style="padding-left: 8px">The TouchPad makes a great reading device (the TouchPad Go is even better -- if you can find one!) and a number of eReader apps were released. The premier app being the Amazon Kindle Beta. Despite the moniker, its fully functional in the U.S. (YMMV in other regions) with only a slight tweak needed to the login experience: when you login with your Amazon credentials, watch your phone or email for a One-Time Password (OTP) from Amazon that you'll use for your second login attempt. Once that's done, your fully library of books will be available: including color illustrations where the book content includes them!

* Download [Amazon Kindle Beta](http://appcatalog.webosarchive.com/showMuseumDetails.php?search=kindle&app=9216)
* If you prefer open book formats, try [ProBook HD](http://appcatalog.webosarchive.com/showMuseumDetails.php?search=book&app=5139)

### Be an Exhibitionist
webOS 2.0 and above have a mode called Exhibition, that allows your device to continuously show content while on its charging dock. A photo slide show is an obvious choice -- load up your device with your favorite pictures of family, pets, or scenery, and let the exhibit roll by. You can even updated your picture frame remotely from a modern phone or computer with **Share Space**.

* Download [Share Space](http://appcatalog.webosarchive.com/showMuseumDetails.php?search=share&app=1005788)

If you'd rather get some information, **Accuweather** still works on all devices, and on the TouchPad includes a gorgeous Exhibition mode that shows the weather where you are, or in other locations of your choosing.

* Download [Accuweather](http://appcatalog.webosarchive.com/showMuseum.php?search=accuweather)

### Play Some Games!
<img src="../images/angrybirds.jpg" align="right" style="padding-left: 8px">webOS had a great library of games, and you don't have to worry about in-app-purchases and spyware. Just some great mobile classics, including offerings from big publishers like Gameloft and EA. No matter which webOS device you have, you'll find some great entertainment in the [games section](http://appcatalog.webosarchive.com/showMuseum.php?category=Games&count=1030) of App Museum II. Here's a couple suggestions to get you started...

* [Angry Birds](http://appcatalog.webosarchive.com/showMuseum.php?search=angry+birds) - The original, and some of the variations, covering every screen size
* [SCUMMVM](http://appcatalog.webosarchive.com/showMuseumDetails.php?search=scumm&app=1005763) - Play dozens of PC point-and-click adventures on your TouchPad
* [The Sims 3](http://appcatalog.webosarchive.com/showMuseumDetails.php?search=sims&app=1100) - The addictive classic had a great offering on the Pre, and has recently been patched to work on TouchPad and Pre 3 as well.
* [Snes9X EX](http://appcatalog.webosarchive.com/showMuseumDetails.php?search=snes&app=8214) - webOS is home to many emulators, start with this near-perfect Super Nintendo emulator for Pre through to the TouchPad
* [Assassin's Creed](http://appcatalog.webosarchive.com/showMuseum.php?search=assassin%27s+creed) - A giant adventure for your mobile device
* [Oregon Trail](http://appcatalog.webosarchive.com/showMuseumDetails.php?search=oregon&app=1097) - The video game that taught a generation how to play video games has a beautiful version for the TouchPad
* [Miriel](http://appcatalog.webosarchive.com/showMuseum.php?search=Miriel) - These games keep my youngest daughter busy for hours

### Make Something New
<img src="http://www.jonandnic.com/webos/webos-sdk.png" align="left" style="padding-right: 8px">webOS is an easy platform to learn to develop on. Based on Javascript, and powered by Linux, its an easy environment to explore, reverse engineer and build upon. If you can make a web page, you can make an App for webOS! Check out the [SDK section](sdkpdk.md) for more info about getting started!