# Smart Alarm Clock

IFTTT smart alarm clock private

2 seperate alarm timers with andriod style time picker
plays webradio/stream/mp3 and send out a IFTTT trigger (webhooks) at alarm time so you can do whatever you want on the other side.
webradio ramps up volume after start ( timing can be changed in settings)
for IFTTT, create an applet with the trigger being a webhook. copy the webhook links in the config file.
this is created with the idea of running it on Raspberry pi with a 7" touchscreen (use chromium in kiosk mode)
at the bottom of the screen there are 3 custom buttons which all 3 can have a different webhook event.

I started this because i do not want to go around and change my alarm clock in multiple places/apps.
Also for me the WAF-factor is important as it doesn't require any skills to set an alarm once everything is configured'


This is a work in progress, code needs cleaning up, need backup in case of no internet connection.
Don't blame me if it doesn't wake you up on time!!


if you like to contribute, please do. 


Configuration :

-all settings can be made in settings/config.json
-Copy your IFTTT or other webhook links to the config.json file and add up to 3 value to be passed in the webhook POST.
-for the radio there is only 1 url for both alarms
-the webradio_fadetime is expressed in ms -> 1s=1000ms
-the early trigger is exceuted before the alarm triggers. how much before can be set by the the offset value (in minutes)
-the early trigger can be used to set a nest to heat your home before you wake up or make a cup of coffee at the excact time you need it without setting differnent alarms
-all graphic options need to be changed in the css files.

access the page by using http://localhost:3000.


node run app on startup :
make sure node runs on startup, for this just add one string at the begining of /etc/rc.local:
node /full/path/to/myscript.js < /dev/null &

Rpi Chromium kiosk config:
go to ~/.config/lxsession/LXDE-pi/autostart

delete or comment the line with @xscreensaver -no-splash
and add
@xset s off
@xset -dpms
@xset s noblank
@unclutter
@chromium-browser --noerrdialogs --kiosk --incognito http://www.domain.com/to/kiosk/page


To Do 

- have a failsave if internet is down. 
- Create a settings page for easier customization
- clean up code
- improve GUI 