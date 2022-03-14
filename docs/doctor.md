# webOS Doctors

If things go really wrong, Palm/HP provided a way to reflash the system image, called a Doctor, allowing you to start almost from scratch. This should be a last resort -- its almost impossible to brick these devices, but there are always risks when flashing an OS. Make sure you have a good quality (preferably OEM) USB cable, and a good charge on your battery.

These instructions are provided for quick reference, no guarantee is implied.

## Download the Doctor

Most Doctors were provided by the manufacturer, but some, such as Meta Doctors and Super Doctors, were built by th the community to provide upgrades and enhancements to system images. These special kinds of doctors were intended to be built by the end user. 

Saved and discovered the <a href="https://1drv.ms/u/s!Av5IQUxnr8DUjsN2Ow18-R-oOlAiWg?e=nYMMw7">webOS Doctors have been archived here</a>.

Refer to the files `_SuperDoctors.txt` and `_webOS Doctor Versions - Ask Mike.pdf` to find the correct Doctor file for your situation. Be 100% sure you have the right Doctor for your device before proceeding!

## Running the Doctor

### Pre-requisites

Refer to the [activation](activate.md) instructions to download the Java run time -- you'll need to setup your environment the same way to run a Doctor as to run the Activation tool.

During the process you'll need to get your device into recovery mode. Instructions for that are also listed on the [activation](activate.md) page.

### Starting the doctor

Run the Doctor jar file using your computer's command line: `java -jar NAMEOFDOCTOR.jar`

Replace `NAMEOFDOCTOR` with the file you downloaded above.

## Alternate Instructions

HP's original <a href="https://h30434.www3.hp.com/t5/Tablets-and-Mobile-Devices-Archive-Read-Only/How-to-use-the-webOS-Doctor-on-the-TouchPad/td-p/2186473" target="_blank">guide to Doctoring a TouchPad is still online here</a>.

The process is similar for phones, but with differing procedures to enter recovery mode depending on your model. Refer to the [activation](activate.md) page for steps to enter recovery mode.