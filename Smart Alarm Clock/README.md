# Smart Alarm Clock

IFTTT smart alarm clock 

2 seperate alarm timers with andriod style time picker
plays webradio/stream/mp3 and send out a IFTTT trigger at alarm time so you can do whatever you want on IFTTT side.
webradio ramps up volume after start ( timing can be changed in settings)
for IFTTT, create an applet with the trigger being a webhook. copy the webhook links in the config file.
this is created with the idea of running it on Raspberry pi with a 7" touchscreen (use chromium in kiosk mode)
at the bottom of the screen there are 3 custom buttons which all 3 can have a different IFTTT event.

This is a work in progress, code needs cleaning up, need backup in case of no internet connection.
all settings can be made in settings/config.json

all graphic options need to be changed in the css files. 

if you like to contribute, please do. 

To Do 

- have a failsave if internet is down. 
- Create a settings page for easier customization