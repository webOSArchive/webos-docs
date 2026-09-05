/* Content lives here, separate from the renderer in app.js, so it can be
   edited without touching any logic. Plain ES5 objects/strings only.

   A "node" is one question: { q, code, info, options: [...] }
   An "option" is one answer: { label, content, next }
     - content: HTML shown once this answer is picked
     - next: optional nested node (a follow-up question)
   A "step" is a top-level, numbered row: { id, title, node }

   Links: relative for anything on this site; plain http:// (not https://)
   for webosarchive.org resources so we never force a protocol upgrade on
   a device that can't do modern TLS; external third-party links keep
   whatever scheme they require. */

var STEP1_NODE = {
  q: "From a command line on your computer, run:",
  code: "novacom -l",
  info: "<p>This lists any webOS devices connected over USB. An empty result is fine &mdash; it just means nothing's plugged in yet. What matters is whether the computer recognizes the command at all.</p>",
  options: [
    {
      label: "It ran (recognized the command &mdash; even with no devices listed)",
      content: "<p>Good &mdash; your computer already has what it needs.</p>" +
        "<p><button type='button' class='continue-btn' onclick='wosaGoto(2)'>Continue to Step 2 &rarr;</button></p>"
    },
    {
      label: "Command not found / I've never set this up",
      next: {
        q: "What kind of computer are you using?",
        options: [
          {
            label: "Windows",
            content: "<p>You'll need two things &mdash; install Java first, since novacom itself depends on it.</p>" +
              "<ul>" +
              "<li>Java 8 &mdash; <a href='https://www.java.com/download/ie_manual.jsp'>download here</a></li>" +
              "<li>novacom driver &mdash; <a href='http://www.webosarchive.org/activation/drivers/novacom-win-32/'>32-bit</a> (tested on Windows 7) or <a href='http://www.webosarchive.org/activation/drivers/novacom-win-64/'>64-bit</a> (tested on Windows 10/11)</li>" +
              "</ul>" +
              "<p>Use a good quality micro USB cable plugged directly into your computer, not a hub &mdash; OEM cables have a small silver indented circle near the connector.</p>" +
              "<p>Once installed, open a command line and try <code>novacom -l</code> again.</p>" +
              "<p><button type='button' class='continue-btn' onclick='wosaGoto(2)'>Continue to Step 2 &rarr;</button></p>"
          },
          {
            label: "macOS",
            content: "<p>Modern macOS (Catalina and later, including Apple Silicon) needs a community-rebuilt driver. Install Java first &mdash; novacom itself depends on it.</p>" +
              "<ol>" +
              "<li>Install <a href='https://support.apple.com/en-us/HT204036'>Java</a>.</li>" +
              "<li>Install <a href='https://brew.sh/'>Homebrew</a>, then run <code>brew install libusb libusb-compat</code> in Terminal.</li>" +
              "<li>Download and run the <a href='http://www.webosarchive.org/activation/drivers/novacom-macos-64/'>64-bit driver installer</a>. (On very old macOS up to Mojave, use the <a href='http://www.webosarchive.org/activation/drivers/novacom-osx-32/'>32-bit installer</a> instead.)</li>" +
              "<li>macOS will probably block the installer at first &mdash; approve it under System Preferences &rarr; Security.</li>" +
              "</ol>" +
              "<p>Test it: plug in your device with a good cable and run <code>novacom -l</code> in Terminal.</p>" +
              "<p><button type='button' class='continue-btn' onclick='wosaGoto(2)'>Continue to Step 2 &rarr;</button></p>"
          },
          {
            label: "Linux",
            content: "<p>Install Java first &mdash; novacom itself depends on it.</p>" +
              "<ul>" +
              "<li>Java 8 &mdash; <a href='https://www.fosstechnix.com/install-oracle-java-8-on-ubuntu-20-04/'>install guide</a></li>" +
              "<li>novacom driver &mdash; <a href='http://www.webosarchive.org/activation/drivers/novacom-linux-32/'>32-bit</a> or <a href='http://www.webosarchive.org/activation/drivers/novacom-linux-64/'>64-bit</a> DEB package (tested on Ubuntu)</li>" +
              "</ul>" +
              "<p>Use a good quality micro USB cable plugged directly into your computer, not a hub.</p>" +
              "<p>Once installed, try <code>novacom -l</code> again.</p>" +
              "<p><button type='button' class='continue-btn' onclick='wosaGoto(2)'>Continue to Step 2 &rarr;</button></p>"
          }
        ]
      }
    }
  ]
};

var STEP2_NODE = {
  q: "Is your device working normally right now?",
  options: [
    {
      label: "Yes, it works fine",
      content: "<p>Nothing to fix &mdash; you're ready to move on.</p>" +
        "<p><button type='button' class='continue-btn' onclick='wosaGoto(5)'>Continue to Step 5 &rarr;</button></p>"
    },
    {
      label: "It works, but I want to reset or upgrade it",
      content: "<p>No rush &mdash; head to Step 3 and pick your device to see the reset or upgrade option that fits it.</p>" +
        "<p><button type='button' class='continue-btn' onclick='wosaGoto(3)'>Continue to Step 3 &rarr;</button></p>"
    },
    {
      label: "It boots, but I can't activate it or get to the Launcher",
      content: "<p>That's expected, not a problem with your device &mdash; Palm/HP's activation servers have been offline for years, so it gets stuck trying (and failing) to activate itself. This is solved with a computer tool called deviceTool, which the next couple of steps walk through.</p>" +
        "<p>Make sure <a href='#' onclick='wosaGoto(1); return false;'>Step 1</a> (computer + drivers) is done, then continue.</p>" +
        "<p><button type='button' class='continue-btn' onclick='wosaGoto(3)'>Continue to Step 3 &rarr;</button></p>"
    },
    {
      label: "It boots, but I'm locked out (forgot the PIN)",
      content: "<p>You can clear the passcode from the command line &mdash; but first, run deviceTool to make sure the device is developer-unlocked. Follow <a href='#' onclick='wosaGoto(4); return false;'>Step 4</a>'s instructions to get into recovery mode and run deviceTool (this works even though you can't get past the lock screen), then come back here.</p>" +
        "<p>Once that's done, get a shell on the device:</p>" +
        "<ul>" +
        "<li>Boot the device normally and connect it to your computer with a good USB cable.</li>" +
        "<li>On Mac or Linux, run <code>novaterm</code> from a command line. On Windows, run <code>C:\\Program Files\\Palm, Inc\\terminal\\novaterm.bat</code>.</li>" +
        "</ul>" +
        "<p>From that shell, enter:</p>" +
        "<pre><code>luna-send -f -n 1 palm://com.palm.systemmanager/setDevicePasscode '{\"passCode\":\"\", \"lockMode\":\"none\"}'</code></pre>" +
        "<p>You should see <code>{ \"returnValue\": true }</code>. If you get <code>false</code> instead (common on enterprise setups, which require a PIN), set a new one instead of removing it:</p>" +
        "<pre><code>luna-send -f -n 1 palm://com.palm.systemmanager/setDevicePasscode '{\"passCode\":\"1234\", \"lockMode\":\"pin\"}'</code></pre>" +
        "<p>Then reboot from the same shell:</p>" +
        "<pre><code>reboot</code></pre>" +
        "<p><button type='button' class='continue-btn' onclick='wosaGoto(5)'>Continue to Step 5 &rarr;</button></p>"
    },
    {
      label: "It boots, but won't load webOS (or a Doctor won't finish) &mdash; often after trying LuneOS, Android, etc.",
      content: "<p class='note'>TouchPad only.</p>" +
        "<p>The Touchpad Toolbox loads a rescue environment so you can wipe the partitions and start fresh.</p>" +
        "<ul>" +
        "<li>Get the toolbox from the <a href='https://xdaforums.com/t/tools-touchpad-toolbox-updated-2015-02-25.2756314/'>original XDA post</a>, or a <a href='http://www.webosarchive.org/activation/TPToolbox-2015-01-08-v42.zip'>backup copy from webOS Archive</a> if that link ever goes stale.</li>" +
        "<li>Make sure novacom is working on your computer (<a href='#' onclick='wosaGoto(1); return false;'>Step 1</a>).</li>" +
        "<li>Power off the TouchPad. Hold Volume Up, then press and hold Power until the screen lights up (about 5 seconds), then release both when the USB symbol appears.</li>" +
        "<li>Run the matching <code>tptb_</code> startup script for your computer's OS from a terminal or command prompt.</li>" +
        "<li>Once the Toolbox boots on the TouchPad, use the hardware Volume keys and Home button to navigate. Choose <strong>Complete Data Reset</strong> and confirm, then <strong>Create webOS Volumes</strong> and confirm that too.</li>" +
        "<li>Reboot back into recovery mode (hold Volume Up while powering on).</li>" +
        "</ul>" +
        "<p><button type='button' class='continue-btn' onclick='wosaGoto(3)'>Continue to Step 3 &rarr;</button> (to run a fresh Doctor)</p>"
    },
    {
      label: "It won't power on or show anything at all",
      next: {
        q: "TouchPads have a known battery-chip quirk that can look like a dead device. Let's try charging it back to life first.",
        info: "<p>Use a <strong>lower-power</strong> charger than the original &mdash; something like a 5V/1A phone charger, not the stock 5.3V/2A one. (A drained A6 battery chip can refuse a high-power charge.) Plug it in and wait.</p>" +
          "<p>Give it 2&ndash;3 days, up to a week. Watch for the home button light alternating, or a low-battery symbol &mdash; either is a good sign. If you see one, switch to a higher-power charger (5.3V/2A) to finish charging.</p>" +
          "<p class='note'>Have a phone instead of a TouchPad? There's no documented deep-rescue path here &mdash; try a different known-good charger and cable, let it sit for a few hours, and reach out to the <a href='#' onclick='wosaGoto(7); return false;'>Community (Step 7)</a> if it still won't wake up.</p>",
        options: [
          {
            label: "It powered on",
            content: "<p>Good news &mdash; now go run a Doctor.</p>" +
              "<p><button type='button' class='continue-btn' onclick='wosaGoto(3)'>Continue to Step 3 &rarr;</button></p>"
          },
          {
            label: "Still nothing after about a week",
            next: {
              q: "Try some button combinations before assuming the worst:",
              info: "<ul>" +
                "<li>Power alone, 30 seconds</li>" +
                "<li>Power + Home, 30 seconds</li>" +
                "<li>Power, then rapidly press Home 15+ times</li>" +
                "<li>Home, then rapidly press Power 15+ times</li>" +
                "<li>Power + Home + Volume Up (or Down), 30 seconds</li>" +
                "</ul>" +
                "<p class='note'>Careful: Power + Volume Up alone boots into webOS recovery, not a rescue mode.</p>",
              options: [
                {
                  label: "It powered on",
                  content: "<p>Now go run a Doctor.</p>" +
                    "<p><button type='button' class='continue-btn' onclick='wosaGoto(3)'>Continue to Step 3 &rarr;</button></p>"
                },
                {
                  label: "Still dead, or showing a white battery with a &lsquo;?&rsquo;",
                  content: "<p>That usually means the battery chip firmware itself is corrupted, and needs reflashing with a tool called <strong>TP Debrick</strong>. It runs from a bootable USB drive on a separate computer &mdash; that drive will be erased in the process, so back it up first.</p>" +
                    "<ul>" +
                    "<li>Read the <a href='https://forum.xda-developers.com/t/hp-touchpad-debrick-linux-live-cd.4189245/'>XDA thread</a> for background, or watch the <a href='https://www.youtube.com/watch?v=WKrXu99XvA0'>video walkthrough</a>.</li>" +
                    "<li>Download the <a href='https://drive.google.com/file/d/1XUJNWqvkfH6WwMi0cTDn99JB1pdf3q-y/view?usp=sharing'>TP Debrick v005 ISO</a> and write it to a USB drive (at least 1GB, will be erased) with <a href='https://unetbootin.github.io/'>UNetbootin</a>.</li>" +
                    "<li>Boot your computer from that USB drive (enable Legacy Boot / disable Secure Boot in the BIOS if needed) and follow the on-screen instructions. The password is <code>1234</code>.</li>" +
                    "<li>Reconnect the TouchPad to its original charger (5.3V/2A) afterward and give it another week.</li>" +
                    "</ul>" +
                    "<p>Still nothing after that? It's likely beyond what can be fixed remotely &mdash; worth asking the <a href='#' onclick='wosaGoto(7); return false;'>Community (Step 7)</a>, someone may have ideas.</p>"
                }
              ]
            }
          }
        ]
      }
    }
  ]
};

/* Shared across Step 3 and Step 6, in this exact order, so a device
   category picked in one step can be remembered and reused in the
   other (see FILTER_STEP_IDS / the device filter chip in app.js). */
var DEVICE_CATEGORY_LABELS = [
  "Older Phone: Pre, Pre Plus, Pixi, or Pixi Plus",
  "Later Phone: Pre 2, Pre 3, or Veer",
  "TouchPad 10&quot; (WiFi or 4G)",
  "TouchPad Go 7&quot; (4G)"
];
var DEVICE_CATEGORY_SHORT = [
  "Older Phone",
  "Later Phone",
  "TouchPad 10&quot;",
  "TouchPad Go"
];
var DEVICE_CATEGORY_ICONS = [
  "DeviceIcons/ml-pre-small.png",
  "DeviceIcons/ml-pre3-small.png",
  "DeviceIcons/ml-touchpad-small.png",
  "DeviceIcons/ml-touchpad-go.png"
];
var FILTER_STEP_IDS = [3, 6];

/* Steps whose node.options is a function that reads the device filter
   (see STEP4_NODE and STEP5_DEVMODE_NODE below) rather than steps
   that ask the category question itself. Their answers must be
   invalidated whenever the filter changes -- otherwise a stale
   numeric index could silently point at the wrong option once the
   filtered list re-shuffles. */
var FILTER_DEPENDENT_STEP_IDS = [4, 5];

function wosaDeviceIconLabel(i) {
  return "<img class='device-icon' src='" + DEVICE_CATEGORY_ICONS[i] + "' alt=''>" + DEVICE_CATEGORY_LABELS[i];
}

var STEP3_DOCTOR_INTRO = "<div class='callout'>If your device is currently usable, consider doing an app inventory before you reset or upgrade it &mdash; you might be carrying apps the archive is still missing. See <a href='#' onclick='wosaGoto(7); return false;'>Contribute to the Archive (Step 7)</a> for how.</div>" +
  "<p>Running a Doctor wipes the device back to stock, so back up anything on it you want to keep first. Get your device into recovery mode the same way <a href='#' onclick='wosaGoto(4); return false;'>Step 4</a> describes for your device, but run the matching Doctor file below instead of deviceTool: <code>java -jar NAMEOFDOCTOR.jar</code>.</p>" +
  "<p>Download the matching file for your device and carrier from the <a href='https://archive.org/details/webOSDoctors'>archived webOS Doctors</a>:</p>";

var STEP3_DOCTOR_NOTE_SUPER = "<p class='note'>&ldquo;Super Doctor&rdquo; files are community-updated to install a newer webOS version than the device originally shipped with; the rest restore the last official release for that carrier.</p>";

var STEP3_DOCTOR_OLDER_PHONE = STEP3_DOCTOR_INTRO +
  "<ul>" +
  "<li><code>webosdoctorp100ewwbellmo.jar</code> &mdash; Pre on Bell Mobility (to 1.4.5)</li>" +
  "<li><code>webosdoctorp100ewwsprint.jar</code> &mdash; Pre on Sprint (to 1.4.5)</li>" +
  "<li><code>webosdoctorp100ueu-wr.jar</code> &mdash; Pre on O2 or Movistar (to 1.4.5)</li>" +
  "<li><code>webosdoctorp101ewwatt.jar</code> &mdash; Pre Plus on AT&amp;T (to 1.4.5)</li>" +
  "<li><code>webosdoctorp101ewwverizonwireless-1.4.5.1.jar</code> &mdash; Pre Plus on Verizon (to 1.4.5.1)</li>" +
  "<li><code>webosdoctorp101ueu-wr.jar</code> &mdash; Pre Plus on O2, Movistar, or SFR France (to 2.1.0)</li>" +
  "<li><code>webosdoctorp101ueude-wr.jar</code> &mdash; Pre Plus on Vodafone (to 2.1.0)</li>" +
  "<li><code>webosdoctorp121ewwatt.jar</code> &mdash; Pixi Plus on AT&amp;T (to 1.4.5)</li>" +
  "<li><code>webosdoctorp121ewweu-wr.jar</code> &mdash; Pixi Plus on EU carriers (to 1.4.5)</li>" +
  "<li><code>webosdoctorp121ewwverizonwireless.jar</code> &mdash; Pixi Plus on Verizon (to 1.4.5)</li>" +
  "<li><code>webosdoctorp121pixiplus-att-2.1.0.jar</code> &mdash; Super Doctor, Pixi Plus on AT&amp;T (to 2.2.1)</li>" +
  "<li><code>webosdoctorp121pixiplus-verizon-2.1.0.jar</code> &mdash; Super Doctor, Pixi Plus on Verizon (to 2.2.1)</li>" +
  "<li><code>webosdoctorp200ewwsprint.jar</code> &mdash; Pixi on Sprint (to 1.4.5)</li>" +
  "</ul>" +
  STEP3_DOCTOR_NOTE_SUPER;

var STEP3_DOCTOR_LATER_PHONE = STEP3_DOCTOR_INTRO +
  "<ul>" +
  "<li><code>webosdoctorp102verizonwireless.jar</code> &mdash; Pre 2 on Verizon (to 2.1.0)</li>" +
  "<li><code>webosdoctorp224pre2-verizon-2.2.4.jar</code> &mdash; Super Doctor, Pre 2 on Verizon (to 2.2.4)</li>" +
  "<li><code>webosdoctorp224pre2wr.jar</code> &mdash; Pre 2 unlocked, or on SFR France / Rogers (to 2.2.4)</li>" +
  "<li><code>webosdoctorp224mantaatt-pre3.jar</code> &mdash; Pre 3 on AT&amp;T (to 2.2.4)</li>" +
  "<li><code>webosdoctorp224mantaverizon.jar</code> &mdash; Pre 3 on Verizon (to 2.2.4)</li>" +
  "<li><code>webosdoctorp224mantawr.jar</code> &mdash; Pre 3 unlocked, or EU/ROW carriers (to 2.2.4)</li>" +
  "<li><code>webosdoctorp160unaatt-veer.jar</code> &mdash; Veer on AT&amp;T (to 2.1.1)</li>" +
  "<li><code>webosdoctorp160unawr.jar</code> &mdash; Veer on EU carriers (to 2.1.1)</li>" +
  "<li><code>webosdoctorp160unaatt-2.2.4.jar</code> &mdash; Super Doctor, Veer on AT&amp;T (to 2.2.4)</li>" +
  "<li><code>webosdoctorp160unawr-2.2.4.jar</code> &mdash; Super Doctor, Veer on EU carriers (to 2.2.4)</li>" +
  "</ul>" +
  STEP3_DOCTOR_NOTE_SUPER;

var STEP3_DOCTOR_TOUCHPAD_RESET = STEP3_DOCTOR_INTRO +
  "<ul>" +
  "<li><code>webosdoctorp305hstnhatt.jar</code> &mdash; TouchPad 10&quot; AT&amp;T (3.0.5)</li>" +
  "<li><code>webosdoctorp305hstnhwifi.jar</code> &mdash; TouchPad 10&quot; 16/32/64GB WiFi (3.0.5)</li>" +
  "</ul>";

var STEP3_DOCTOR_TOUCHPAD_CE = STEP3_DOCTOR_INTRO +
  "<ul>" +
  "<li><code>webosdoctorp310hstnh-ce-600070.jar</code> &mdash; TouchPad 10&quot; AT&amp;T (3.1.0 Community Edition)</li>" +
  "<li><code>webosdoctorp310hstnhatt-ce-600071.jar</code> &mdash; TouchPad 10&quot; 16/32/64GB WiFi (3.1.0 Community Edition)</li>" +
  "</ul>";

var STEP3_DOCTOR_TOUCHPAD_GO = STEP3_DOCTOR_INTRO +
  "<ul>" +
  "<li><code>webosdoctoropal3gatt-3.0.5.jar</code> &mdash; TouchPad Go 7&quot; all radios (3.0.5)</li>" +
  "</ul>";

var STEP3_NODE = {
  q: "Which best describes your device?",
  options: [
    {
      label: wosaDeviceIconLabel(0),
      next: {
        q: "What do you need to do?",
        options: [
          {
            label: "Just activate it (it boots fine, just stuck at setup)",
            content: "<p><button type='button' class='continue-btn' onclick='wosaGoto(4)'>Continue to Step 4 &rarr;</button></p>"
          },
          {
            label: "Reset it to stock / wipe it",
            content: STEP3_DOCTOR_OLDER_PHONE
          }
        ]
      }
    },
    {
      label: wosaDeviceIconLabel(1),
      next: {
        q: "What do you need to do?",
        options: [
          {
            label: "Just activate it (it boots fine, just stuck at setup)",
            content: "<p><button type='button' class='continue-btn' onclick='wosaGoto(4)'>Continue to Step 4 &rarr;</button></p>"
          },
          {
            label: "Reset or upgrade it",
            content: STEP3_DOCTOR_LATER_PHONE
          }
        ]
      }
    },
    {
      label: wosaDeviceIconLabel(2),
      next: {
        q: "What do you need to do?",
        options: [
          {
            label: "Just activate it (it boots fine, just stuck at setup)",
            content: "<p><button type='button' class='continue-btn' onclick='wosaGoto(4)'>Continue to Step 4 &rarr;</button></p>"
          },
          {
            label: "Reset it to stock",
            content: STEP3_DOCTOR_TOUCHPAD_RESET
          },
          {
            label: "Upgrade to webOS 3.1.0 Community Edition",
            content: "<p class='note'>The Community Edition doctor leaves the device activated &mdash; Step 4 becomes a quick on-device confirmation instead of the usual recovery-mode/deviceTool dance.</p>" + STEP3_DOCTOR_TOUCHPAD_CE
          }
        ]
      }
    },
    {
      label: wosaDeviceIconLabel(3),
      next: {
        q: "What do you need to do?",
        options: [
          {
            label: "Just activate it (it boots fine, just stuck at setup)",
            content: "<p><button type='button' class='continue-btn' onclick='wosaGoto(4)'>Continue to Step 4 &rarr;</button></p>"
          },
          {
            label: "Reset it to stock",
            content: STEP3_DOCTOR_TOUCHPAD_GO
          }
        ]
      }
    }
  ]
};

var STEP4_RUN_TOOL_NODE = {
  q: "Now run deviceTool from your computer.",
  info: "<p>Make sure <a href='#' onclick='wosaGoto(1); return false;'>Step 1</a> (Java + drivers) is done first.</p>" +
    "<ul>" +
    "<li>Download <a href='http://www.webosarchive.org/activation/devicetool/devicetoolAIO.jar'>devicetoolAIO.jar</a>.</li>" +
    "<li>From a command line, navigate to the folder you downloaded it to.</li>" +
    "<li>Run: <code>java -jar devicetoolAIO.jar</code></li>" +
    "<li>Wait while it updates and reboots your device &mdash; this can take a few minutes.</li>" +
    "</ul>" +
    "<p class='note'>If it doesn't detect your device, the novacom driver probably isn't working &mdash; double check <a href='#' onclick='wosaGoto(1); return false;'>Step 1</a>.</p>",
  options: [
    {
      label: "It finished and rebooted",
      content: "<p>Once it restarts, join your WiFi network using the built-in Settings &mdash; webOS works with 2.4GHz networks and common security types, including WPA.</p>" +
        "<p><button type='button' class='continue-btn' onclick='wosaGoto(5)'>Continue to Step 5 &rarr;</button></p>"
    }
  ]
};

var STEP4_OPT_BATTERY_PHONE = {
  label: "Phone with a removable battery (Pre, Pre Plus, Pixi, Pixi Plus, Pre 2, Pre 3)",
  content: "<ol>" +
    "<li>Unplug the USB cable from the device end (leave it plugged into your computer).</li>" +
    "<li>Remove the battery.</li>" +
    "<li>Hold down the Volume Up button.</li>" +
    "<li>Plug the USB cable into the device.</li>" +
    "<li>Reinsert the battery.</li>" +
    "<li>Release Volume Up.</li>" +
    "</ol>",
  next: STEP4_RUN_TOOL_NODE
};

var STEP4_OPT_BROKEN_COVER = {
  label: "Phone where I can't or don't want to remove the fragile cover (eg: Pre3)",
  content: "<p class='note'>Especially common on the Pre3 &mdash; its back cover cracks easily once removed, which destroys wireless (Touchstone) charging. If yours won't come off cleanly, don't force it; use this instead.</p>" +
    "<ol>" +
    "<li>Hold down the Power button.</li>" +
    "<li>While still holding Power, toggle the mute switch off, then on, three times in a row. This forces a reboot.</li>" +
    "<li>As soon as it restarts, release Power and hold Volume Up.</li>" +
    "<li>Keep holding Volume Up until you see the USB symbol.</li>" +
    "</ol>",
  next: STEP4_RUN_TOOL_NODE
};

var STEP4_OPT_TOUCHPAD_VEER = {
  label: "TouchPad or Veer (no removable battery)",
  content: "<ol>" +
    "<li>Reboot the device &mdash; on TouchPad, hold Home + Power to force a reboot and keep holding; on Veer, power off completely, wait a few seconds, then press and hold Power to turn it back on.</li>" +
    "<li>As soon as it restarts, release Power (and Home, on TouchPad) and hold Volume Up.</li>" +
    "<li>Keep holding Volume Up until you see the USB symbol.</li>" +
    "</ol>",
  next: STEP4_RUN_TOOL_NODE
};

/* True only when Step 3's answer was upgrading a TouchPad 10" to webOS
   3.1.0 Community Edition -- that Doctor already leaves the device
   activated, so none of Step 4's recovery-mode/deviceTool steps apply.
   Purely derived from Step 3's own path (not a separate stored flag),
   so it can never drift out of sync with what was actually chosen: if
   the filter or the Step 3 answer changes, this just re-evaluates true
   on the next render. */
function wosaIsCEUpgrade() {
  if (typeof wosaState === "undefined" || wosaState.deviceFilter !== 2) { return false; }
  var step3Path = wosaState.path && wosaState.path[3];
  return !!(step3Path && step3Path[1] === 2);
}

var STEP4_OPT_CE_COMPLETE = {
  label: "Complete the setup wizard on-device to finish activation.",
  content: "<p>The Community Edition doctor already leaves your device activated &mdash; no deviceTool or recovery mode needed.</p>" +
    "<p><button type='button' class='continue-btn' onclick='wosaGoto(5)'>Continue to Step 5 &rarr;</button></p>"
};

var STEP4_NODE = {
  q: function () {
    return wosaIsCEUpgrade() ? "" : "First, get your device into recovery mode so deviceTool can see it.";
  },
  info: function () {
    return wosaIsCEUpgrade() ? "" : "<p>Connect a good quality micro-USB cable directly between your device and computer &mdash; not through a hub. (OEM cables are recognizable by a small silver indented circle near the connector.)</p>";
  },
  /* Options narrow based on the remembered device filter (see
     FILTER_STEP_IDS): an Older Phone always has a plain removable
     back/battery, so the broken-cover variant only makes sense for
     Later Phones (Pre 2/Pre 3) -- and neither phone option applies
     to a TouchPad or Veer. With no filter set, show everything. A
     TouchPad upgraded to Community Edition skips all of that. */
  options: function () {
    if (wosaIsCEUpgrade()) {
      return [STEP4_OPT_CE_COMPLETE];
    }
    var filter = (typeof wosaState !== "undefined") ? wosaState.deviceFilter : null;
    if (filter === 0) {
      return [STEP4_OPT_BATTERY_PHONE];
    }
    if (filter === 2 || filter === 3) {
      return [STEP4_OPT_TOUCHPAD_VEER];
    }
    /* Later Phone (1), or no filter set at all. */
    return [STEP4_OPT_BATTERY_PHONE, STEP4_OPT_BROKEN_COVER, STEP4_OPT_TOUCHPAD_VEER];
  }
};

var STEP5_WOSQI_NODE = {
  q: "Install WOSQI, Preware, and an App Store.",
  info: "<ul>" +
    "<li>Download <a href='http://www.webosarchive.org/activation/webOSQuickInstall-4.6.0.jar'>webOS Quick Install (WOSQI) 4.6.0</a> and run it: <code>java -jar webOSQuickInstall-4.6.0.jar</code> (double-clicking the jar also works in some environments). With your device plugged in normally (not USB Drive mode), WOSQI should see it.</li>" +
    "<li>Download <a href='http://www.webosarchive.org/activation/org.webosinternals.preware_1.9.18_arm.ipk'>Preware 1.9.18</a>, drag it onto the WOSQI window (or use the + button), and press Install. This is the original homebrew app store and gives you access to almost everything else.</li>" +
    "<li>Install an App Store the same way: <a href='https://appcatalog.webosarchive.org/?latest'>download the App Catalog or App Museum II</a> and drag it onto WOSQI. App Catalog is the restored original store (best for webOS 2.2.4/3.0.5+); App Museum II works on any Enyo-capable device, including LuneOS.</li>" +
    "<li>webOS 1.x devices can skip WOSQI for the app store step &mdash; just open <a href='http://appcatalog.webosarchive.org'>appcatalog.webosarchive.org</a> in the built-in browser instead.</li>" +
    "</ul>",
  options: [
    {
      label: "Done &mdash; apps are installed on my device",
      content: "<p>You won't need WOSQI or your computer again &mdash; from here on, just use Preware or App Museum II on the device itself, over WiFi.</p>" +
        "<p><button type='button' class='continue-btn' onclick='wosaGoto(6)'>Continue to Step 6 &rarr;</button></p>"
    }
  ]
};

var STEP5_OPT_WEBOS1 = {
  label: "webOS 1.0 (original Pre)",
  content: "<p>From the Launcher, start typing: <code>webos20090606</code>. Tap the Developer Mode icon that appears, and turn it On.</p>",
  next: STEP5_WOSQI_NODE
};

var STEP5_OPT_WEBOS2 = {
  label: "webOS 2.0 and later (Pre 2, Pre 3, Veer, TouchPad)",
  content: "<p>Use \"Just Type\" on the Launcher and type: <code>upupdowndownleftrightleftrightbastart</code>. Tap the Developer Mode icon that appears and turn it On. When prompted for a password, just hit Enter.</p>",
  next: STEP5_WOSQI_NODE
};

var STEP5_DEVMODE_NODE = {
  q: "Which webOS version?",
  /* Narrows by the remembered device filter, same idea as Step 4:
     an Older Phone can only ever be webOS 1.x, and a Later Phone or
     TouchPad can only ever be 2.0+ -- no device could actually go
     either way, so don't ask if we already know. */
  options: function () {
    var filter = (typeof wosaState !== "undefined") ? wosaState.deviceFilter : null;
    if (filter === 0) {
      return [STEP5_OPT_WEBOS1];
    }
    if (filter === 1 || filter === 2 || filter === 3) {
      return [STEP5_OPT_WEBOS2];
    }
    return [STEP5_OPT_WEBOS1, STEP5_OPT_WEBOS2];
  }
};

var STEP5_OPT_CE_INSTALLED = {
  label: "App Stores are already installed in 3.1.0, but you may want to visit them to check for updates and to see what's new.",
  content: "<p>Developer Mode is already turned on too, in case you ever want to install homebrew apps directly.</p>" +
    "<p><button type='button' class='continue-btn' onclick='wosaGoto(6)'>Continue to Step 6 &rarr;</button></p>"
};

var STEP5_NODE = {
  q: function () {
    return wosaIsCEUpgrade() ? "" : "Did your device just finish Step 4 (deviceTool)?";
  },
  /* A Community Edition upgrade already includes the app stores --
     nothing to install, just worth a visit for updates. */
  options: function () {
    if (wosaIsCEUpgrade()) {
      return [STEP5_OPT_CE_INSTALLED];
    }
    return [
      {
        label: "Yes",
        content: "<p>Good &mdash; deviceTool already enables homebrew installs, so there's nothing extra to turn on.</p>",
        next: STEP5_WOSQI_NODE
      },
      {
        label: "No, it was already activated and working",
        content: "<p>You'll need to turn on Developer Mode first, to allow homebrew app installs.</p>",
        next: STEP5_DEVMODE_NODE
      }
    ];
  }
};

var STEP6_NODE = {
  q: "Which best describes your device?",
  info: "<div class='callout'>Set your device's clock before doing anything else here: TLS certificate checks are based on the date, so a wrong clock causes connection errors and failures on nearly every secure site.</div>",
  options: [
    {
      label: wosaDeviceIconLabel(0),
      content: "<p>webOS 1.x can't run the Modern TLS Updates, so you're mostly limited to plain HTTP &mdash; but there's still plenty to do.</p>" +
        "<ul>" +
        "<li>In Preware, search for <strong>Root Certs Update</strong> and install it &mdash; this fixes the out-of-date certificate trust store.</li>" +
        "<li>Install the <a href='http://www.webosarchive.org/activation/org.webosinternals.openssl-updater_0.9.8-6_armv7.ipk'>OpenSSL Updater</a> via WOSQI &mdash; it won't get you to the modern web, but it widens what still connects over HTTPS.</li>" +
        "<li>There's no automatic clock sync at this webOS version &mdash; install the <a href='http://appcatalog.webosarchive.org/app/ClockSync'>Clock Sync</a> app to keep the date accurate on a schedule, so TLS connections that do work don't fail on a drifted clock.</li>" +
        "<li>For what's left over plain HTTP, DuckDuckGo Lite, <a href='http://68k.news/'>68k.news</a>, and <a href='http://www.frogfind.com/'>FrogFind</a> are good starting points.</li>" +
        "<li>Install the <a href='http://appcatalog.webosarchive.org/app/ClassicEmulator'>Classic Emulator</a> for a huge catalog of vintage <strong>PalmOS</strong> apps and games.</li>" +
        "</ul>" +
        "<p><button type='button' class='continue-btn' onclick='wosaGoto(7)'>Continue to Step 7 &rarr;</button></p>"
    },
    {
      label: wosaDeviceIconLabel(1),
      content: "<p>On webOS 2.2.4, your phone can speak modern TLS natively &mdash; no proxy or certificate juggling.</p>" +
        "<ul>" +
        "<li>Still on 2.2.0 or 2.1.0? Upgrade to 2.2.4 first with a Super Doctor &mdash; see <a href='#' onclick='wosaGoto(3); return false;'>Step 3</a>.</li>" +
        "<li>In Preware, add the modernize feed if you don't already have it: <code>http://stacks.webosarchive.org/feeds/modernize/ipkgs/</code> (turn on Compressed/gzip), then choose Update Feeds.</li>" +
        "<li>Search for <strong>TLS 1.3 Updates (Phones)</strong> and install it, confirming any prerequisites Preware offers. This covers the browser, apps, mail, curl, the download manager, current root certificates, automatic clock sync, and the restored App Catalog.</li>" +
        "<li>The stock browser is dated. On a Pre3, search Preware for <strong>WebBrowser</strong> (nizovn's homebrew browser) for better rendering.</li>" +
        "</ul>" +
        "<p><button type='button' class='continue-btn' onclick='wosaGoto(7)'>Continue to Step 7 &rarr;</button></p>"
    },
    {
      label: wosaDeviceIconLabel(2),
      content: "<p>Your TouchPad can speak modern TLS natively, starting at webOS 3.0.5.</p>" +
        "<ul>" +
        "<li>In Preware, add the modernize feed if needed: <code>http://stacks.webosarchive.org/feeds/modernize/ipkgs/</code> (Compressed/gzip on), then Update Feeds.</li>" +
        "<li>Search for <strong>TLS 1.3 Updates (TouchPad)</strong> and install it. This covers browser/app/mail/curl/download-manager TLS, current root certs, automatic clock sync, the restored App Catalog, plus the restored on-device Help, USB Settings, and Bluetooth gamepad support.</li>" +
        "<li>Search Preware for <strong>Atlas</strong> and install it &mdash; a genuinely modern browser engine for pages the stock browser can't render.</li>" +
        "</ul>" +
        "<p><button type='button' class='continue-btn' onclick='wosaGoto(7)'>Continue to Step 7 &rarr;</button></p>"
    },
    {
      label: wosaDeviceIconLabel(3),
      content: "<p>Your TouchPad Go can speak modern TLS natively, same as the 10&quot; TouchPad.</p>" +
        "<ul>" +
        "<li>In Preware, add the modernize feed if needed: <code>http://stacks.webosarchive.org/feeds/modernize/ipkgs/</code> (Compressed/gzip on), then Update Feeds.</li>" +
        "<li>Search for <strong>TLS 1.3 Updates (TouchPad)</strong> and install it &mdash; the same package covers both TouchPad sizes.</li>" +
        "<li>Search Preware for <strong>Atlas</strong> and install it for modern browser rendering.</li>" +
        "</ul>" +
        "<p><button type='button' class='continue-btn' onclick='wosaGoto(7)'>Continue to Step 7 &rarr;</button></p>"
    }
  ]
};

var STEP7_NODE = {
  topics: [
    {
      label: "Websites &amp; Browsing",
      content: "<p>More and more websites are moving to newer encryption over HTTPS as the only way in. On webOS 2.2.4 and above, the <a href='#' onclick='wosaGoto(6); return false;'>Modern TLS Updates</a> solve this outright; on older devices you're more limited. Here are some common things you can still do in the 2011-era web, or the equivalent apps:</p>" +
        "<p><strong>Google</strong>'s website no longer works. Try <a href='https://duckduckgo.com/html' target='_blank'>DuckDuckGo Lite</a> instead.</p>" +
        "<p><strong>YouTube</strong>'s website no longer works, but there's an app for that called <a href='https://appcatalog.webosarchive.org/app/MeTube' target='_blank'>MeTube</a>, that also plays Reddit and Dailymotion videos." +
        "<p><img src='images/reddit.png' align='right' style='padding-left: 8px'><strong>Reddit</strong> still works with a newer Browser, old in the stock browser via <a href='http://reddit.wosa.link'>reddit.wosa.link</a> or the still-maintained <a href='https://appcatalog.webosarchive.org/app/IAmAReddit' target='_blank'>IAmA Reddit</a> app. Reddit videos can also be watched in MeTube.</p>" +
        "<p><strong>Wikipedia</strong> works great once you have HTTPS. For older devices, webOS Archive provides a &ldquo;tiny&rdquo; version at <a href='http://wikipedia.webosarchive.org'>wikipedia.webosarchive.org</a>.</p>" +
        "<p><strong>RSS:</strong> many sites can be reached through their RSS feed using the <a href='https://appcatalog.webosarchive.org/showMuseum.php?search=feedspider' target='_blank'>FeedSpider</a> app, and a free service like <a href='http://www.inoreader.com'>InoReader</a>.</p>" +
        "<p><strong>Google News:</strong> retro-computer enthusiast Action Retro built an excellent text-only Google News web app that works on almost anything &mdash; check out <a href='http://68k.news/'>68k.news</a>. On Touchpad, check out <a href='https://appcatalog.webosarchive.org/app/WorldToday' target='_blank'>World Today</a> and <a href='https://appcatalog.webosarchive.org/app/CableNews' target='_blank'>Cable News</a>.</p>"
    },
    {
      label: "Email, Calendars &amp; Contacts",
      content: "<img src='images/touchpad-pim.png' align='right' width='300' style='width:300px; padding-left: 8px'>" +
        "<p>webOS has a first-class email client (arguably the best Exchange client for any Linux) that still works in some cases. Success varies with the server infrastructure.</p>" +
        "<p><strong>IMAP and POP mail</strong> work great, although many require <a href='#' onclick='wosaGoto(6); return false;'>Modern TLS</a>.</p>" +
        "<p><strong>Exchange Web Access:</strong> private and hosted Exchange servers that provide EAS can still be used.</p>" +
        "<p><strong>Office365:</strong> Microsoft has moved to modern authentication, including an OAuth sign-in page that can't be rendered on webOS. As a work-around, <a href='https://davmail.sourceforge.net/'>DavMail</a> lets you run a proxy on a PC or server using non-proprietary standards.</p>" +
        "<p><strong>Gmail:</strong> add it as a plain IMAP account using a <a href='https://myaccount.google.com/apppasswords'>Google App Password</a> rather than your normal password (this requires 2-Step Verification).</p>" +
        "<p><strong>Zoho</strong> provides a cost-effective, full-featured alternative to Office365 and Google, with support for custom domains and Exchange ActiveSync. It works perfectly with webOS, no hacks required &mdash; webOS Archive's top recommendation if you have a choice in mail providers.</p>" +
        "<p><strong>iCloud:</strong> you may be able to get IMAP access to your iCloud inbox.</p>" +
        "<p><img src='images/caldav.png' width='128' style='width:128px; padding-right: 14px; float:left;'>The Calendar app on webOS is still one of the best out there, particularly on the TouchPad's extra screen real estate. <strong>Exchange Web Access</strong> works the same as mail; <strong>Zoho</strong> syncs via EAS too. For a one-way sync of a public calendar (Google, iCloud, Outlook.com, Canvas), install <a href='https://appcatalog.webosarchive.org/app/webCalSync' target='_blank'>WebCal Sync</a> from the App Museum.</p>" +
        "<p>If you host your own calendar and contacts in a WebDAV-compatible service like ownCloud or NextCloud, the <strong>C+Dav</strong> app does a one-way or two-way sync.</p>"
    },
    {
      label: "Games &amp; Apps",
      content: "<img src='images/angrybirds.png' align='right' style='padding-left: 8px'>" +
        "<p><strong>Play on!</strong> webOS has a great library of games, and you don't have to worry about in-app-purchases and spyware &mdash; just great mobile classics, including offerings from big publishers like Gameloft and EA. You'll find plenty in the <a href='http://appcatalog.webosarchive.org/showMuseum.php?category=Games&count=1030'>games section of the App Museum</a>, including Angry Birds, SCUMMVM, The Sims 3, Snes9X EX, Assassin's Creed, Oregon Trail, and Miriel.</p>" +
        "<p><strong>Watch (Some) Videos:</strong> YouTube doesn't officially support webOS, but thanks to the open source community it's still available &mdash; <a href='https://appcatalog.webosarchive.org/app/MeTube' target='_blank'>MeTube</a> fetches short YouTube videos on demand. <a href='https://appcatalog.webosarchive.org/app/Flixnet' target='_blank'>FlixNet</a> and <a href='https://appcatalog.webosarchive.org/app/NovaCast' target='_blank'>NovaCast</a> play Public Domain movies from archive.org, and <a href='https://appcatalog.webosarchive.org/app/PlexforwebOS' target='_blank'>Plex for webOS</a> streams from your own media server.</p>" +
        "<p><strong>Podcasts:</strong> a TouchPad in Touchstone with a Bluetooth speaker, or a little Pre or Veer in your pocket, makes a great podcast player. The webOS Archive <a href='http://podcasts.webosarchive.org'>Podcast Directory</a> solves the HTTPS problem many podcasts now require.</p>" +
        "<p><img src='images/retropodcasts.png'></p>" +
        "<p><strong>The Ultimate Night Stand App:</strong> Philips Hue lights are some of the best smart bulbs out there, and a little Pre or Veer &mdash; or even a TouchPad &mdash; makes a great companion, letting you control them in a dark room without a smart speaker listening to you sleep. <strong>One Night Stand</strong> turns your device into a light controller with a tap.</p>" +
        "<p><img src='images/LampsPrePhoto.png' style='width:300px'></p>" +
        "<p><strong>Rock Out:</strong> <a href='https://appcatalog.webosarchive.org/showMuseum.php?search=pandora' target='_blank'>Pandora and third-party Pandora</a> apps still work. On TouchPad, <a href='https://appcatalog.webosarchive.org/app/Jukie' target='_blank'>Jukie</a> streams Apple Music, while <a href='https://appcatalog.webosarchive.org/app/Retune' target='_blank'>Retune</a> remote-controls iTunes, including HomePods and AppleTVs.</p>" +
        "<p><strong>Read a Book:</strong> the TouchPad makes a great reading device. <a href='https://appcatalog.webosarchive.org/app/PapyruseReader' target='_blank'>Papyrus eReader</a> is a fresh take on DRM-free ePub reading, derived from the Kindle app and an older indie project, and available on Touchpad <i>and</i> modern devices as a <a href='https://papyrus.wosa.link' target='_blank'>Progressive Web App (PWA)</a>.</p>" +
        "<p><strong>Be an Exhibitionist:</strong> webOS 2.0 and up have an Exhibition mode that shows content continuously while docked &mdash; a photo slideshow, or Accuweather's gorgeous weather Exhibition.</p>" +
        "<p><img src='images/ExhibitionMode.png'></p>" +
        "<p><img src='images/palm-logo.png' align='right' style='padding-left: 8px'><strong>Classic:</strong> the Classic Emulator gives you access to a huge catalog of vintage <strong>PalmOS</strong> apps and games. Install <a href='https://appcatalog.webosarchive.org/app/Classic' target='_blank'>Classic Emulator from the App Museum</a>, plus (webOS 2.0+) Classic Container via WOSQI. It expires weekly &mdash; run it in Airplane Mode, and when it expires, delete <code>/usr/lib/palmos/expired.rgba</code> from a shell to re-arm it.</p>" +
        "<p><strong>Make Something New:</strong> webOS is an easy platform to learn to develop on, especially with modern AI tools. See <a href='#' onclick='wosaGoto(8); return false;'>Dev &amp; Hack (Step 8)</a> to get started.</p>"
    },
    {
      label: "Join the Community",
      content: "<img src='images/discord.png' align='right' style='padding-left: 8px'>" +
        "<p>There's still an active webOS community, swapping notes on devices and patches, and even building new apps.</p>" +
        "<p><strong>Discord + SimpleChat:</strong> the most active community of webOS users is on a modern webOS app called SimpleChat, which is also connected to a <a href='http://www.webosarchive.org/discord'>Discord server</a>. Join in the conversation from both old and new devices.</p>" +
        "<p><strong>Social Media:</strong> webOS Archive is on <a href='https://bsky.app/profile/webosarchive.org' target='_blank'>Bluesky</a>, in the <a href='https://palm.weboslives.eu/users/webosarchive' target='_blank'>Fediverse</a>, and on <a href='https://x.com/webOSArchive' target='_blank'>X/Twitter</a>.</p>" +
        "<p><strong>Pivot + RSS:</strong> New and archived webOS news can be followed in your browser, or RSS reader at <a href='https://www.webosarchive.org/news' target='_top'>webosarchive.org/news</a></p>" +
        "<p><strong>Forums:</strong> the old webOS Nation forums have been archived by the Wayback Machine, with a handy shortcut at <a href='http://forums.webosarchive.org'>forums.webosarchive.org</a>. In 2023, the community started rebuilding at the <a href='https://forums.weboslives.eu/'>webOS Lives Forums</a>.</p>"
    },
    {
      label: "Patches and Hacks",
      content: "<img src='images/patch.png' align='right' width='128' style='width:128px; padding-left: 8px'>" +
        "<p>webOS was an extremely customizable operating system, with community-created patches for a wide variety of modifications. Most patches can still be found in <a href='#' onclick='wosaGoto(5); return false;'>Preware</a> and should be installed from there, since they were created by contemporaneous developers.</p>" +
        "<p>webOS Archive has produced a series of patches that hide dead pre-installed apps that stopped working after HP's servers shut down, for a tidier Launcher. These are meant to be installed with WOSQI from a PC, <em>not</em> from within Preware.</p>" +
        "<p><strong>Hardware mods</strong> (advanced, requires micro-soldering): community member Alan Morford has guides to <a href='https://pivotce.com/2024/09/25/guide-converting-the-touchpads-micro-usb-port-to-usb-c/'>converting the TouchPad's micro-USB port to USB-C</a> and <a href='https://pivotce.com/2024/12/05/guide-create-an-original-barrel-charging-wire-for-your-hp-touchpad/'>building a warning-free charging cable</a>.</p>"
    },
    {
      label: "Shell Access",
      content: "<p>webOS may have a beautiful user interface and an easy JavaScript-based programming environment, but underneath it all is a powerful Linux-based operating system. Unlocking the command line lets you control your device in fun and helpful ways &mdash; no jailbreaking required, all from bits found in Preware.</p>" +
        "<p><strong>On device:</strong> install <strong>Xecutah</strong> from Preware (confirm its prerequisites), then launch it from the Launcher. On TouchPad, tap the screen with three fingers to bring up the keyboard &mdash; tap again to hide it. The Tweaks app can reserve space for the keyboard so it doesn't keep scrolling out of view.</p>" +
        "<p><strong>From a computer:</strong> the official Developer Tools give shell access over USB from a connected PC or Mac. The Homebrew community has also built and published an OpenSSH server, installable from Preware.</p>"
    },
    {
      label: "Contribute to the Archive",
      content: "<img src='images/appscanner.png' align='right' style='padding-left: 8px'>" +
        "<p>Many apps are still missing from the Museum. If you have a device with apps that might be unique, follow these steps to pull an inventory, so we can check for anything the archive needs.</p>" +
        "<p>Once you have Preware on your device, the easiest way is to install <strong>App Scanner</strong> from the App Catalog or App Museum II &mdash; it automatically inventories your device and compares against the list of missing apps.</p>" +
        "<p>Or do it manually: with Java and novacom set up (<a href='#' onclick='wosaGoto(1); return false;'>Step 1</a>), connect your device (stay in regular mode, not USB Drive mode) and run <code>java -jar webos-tools.jar palm-log -l</code> (Windows) or <code>java -jar ./webos-tools.jar palm-log -l</code> (Mac/Linux) to get a full list of installed apps.</p>" +
        "<p><strong><a href='https://stacks.webosarchive.org/activation/webos-tools.jar' target='_blank'>Download webos-tools.jar</a></strong></p>" +
        "<p>Share the list in the Community section above &mdash; if anything's unique, you can back it up over a shell with <code>cp -R /media/cryptofs/apps/usr/palm/applications/&lt;app-id&gt; /media/internal</code>, then copy it off in USB Drive mode.</p>"
    }
  ],
  after: "<p><button type='button' class='continue-btn' onclick='wosaGoto(8)'>Continue to Step 8 &rarr;</button></p>"
};

var STEP8_NODE = {
  topics: [
    {
      label: "SDK &amp; PDK",
      content: "<p>webOS apps are built in JavaScript (the <strong>SDK</strong>: Mojo on older devices, Enyo from webOS 2.0 on, with NodeJS-backed Luna services); performance-critical code (mostly games and media) used the <strong>PDK</strong>, C/C++ with more direct hardware access.</p>" +
        "<ul>" +
        "<li>Developer Mode is covered in <a href='#' onclick='wosaGoto(5); return false;'>Step 5</a> if you haven't turned it on yet.</li>" +
        "<li><a href='http://sdk.webosarchive.org'>sdk.webosarchive.org</a> has the restored SDK/PDK, documentation, and emulator downloads.</li>" +
        "<li>webOS is easy to learn on, especially with modern AI tools &mdash; if you can build (or vibe-code) a web page, you can build an app for webOS.</li>" +
        "<li>The 2009 O'Reilly book <em>Palm webOS: The Insider's Guide</em> is free on <a href='https://books.google.com/books?id=sHT6PeMp1k8C&printsec=frontcover'>Google Books</a>. Tuts+ also has a still-useful <a href='https://web.archive.org/web/20140309041556/https://code.tutsplus.com/series/introduction-to-webos-sdk-development--mobile-22879'>5-part Mojo series</a>.</li>" +
        "</ul>"
    },
    {
      label: "webOS MCP (AI-Assisted Development)",
      content: "<p><a href='https://github.com/webOSArchive/webos-mcp'>webos-mcp</a> is a Model Context Protocol server for webOS &mdash; it gives AI coding assistants direct access to webOS SDK docs and tooling, so they can actually help you build and debug webOS apps instead of guessing.</p>"
    },
    {
      label: "Emulator",
      content: "<p>webOS Archive repackaged the original SDK emulator as an OVA Virtual Appliance for current VirtualBox (and probably other virtualization tools). It emulates a TouchPad.</p>" +
        "<ul>" +
        "<li><a href='https://github.com/webOSArchive/webos-emulator/releases'>Download from GitHub</a>.</li>" +
        "<li>Keyboard shortcuts simulate hardware: End = Launcher, Esc = back gesture, Home = minimize/maximize card, Left/Right = switch cards, F6&ndash;F9 = orientation.</li>" +
        "<li>Not supported: audio, camera, Bluetooth, multi-touch, the gesture area, and <strong>HTTPS</strong> (the proxy-setting APIs aren't present in the emulated OS, and it's x86 so ARM-native PDK apps won't run).</li>" +
        "<li>Preware needs its own <a href='http://www.webosarchive.org/activation'>i686 build</a> to run in the emulator.</li>" +
        "</ul>"
    }
  ],
  after: "<p>There's so much more to discover with webOS -- we couldn't document it all here. Dive in, <a href='https://www.webosarchive.org/discord'>join the community</a>, or build something new!</p><p><button type='button' class='continue-btn' onclick='wosaReset()'>Start Over</button></p>"
};

var FLOW = [
  { id: 1, title: "Computer Setup", node: STEP1_NODE },
  { id: 2, title: "Determine Device State", node: STEP2_NODE },
  { id: 3, title: "Identify Your Device", node: STEP3_NODE },
  { id: 4, title: "Activate Your Device", node: STEP4_NODE },
  { id: 5, title: "Install App Stores", node: STEP5_NODE },
  { id: 6, title: "What Your Device Can Do", node: STEP6_NODE },
  { id: 7, title: "Things to Try", node: STEP7_NODE },
  { id: 8, title: "Dev and Hack webOS", node: STEP8_NODE }
];
