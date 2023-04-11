# Pixel 6a

## Wired Video Output

Per [Google](https://support.google.com/pixelphone/answer/2865484?hl=en), it's possible to project using a wired dock. Seems you need a DisplayLink certified/compatible dock. Download [DisplayLink Presenter](https://play.google.com/store/apps/details?id=com.displaylink.presenter). After you connect to an appropriate adapter, you'll get a popup asking to connect and "record" screen. Click yes, and you're done!

> [!danger]
> SecondScreen sort of works. On my phone it change the PHONE'S resolution and DPI, which made it hard to interact with. USE EXTREME CAUTION DOING THIS.

Now if you want it to look more like a native desktop experience, you'll need a few other things. A way to change the resolution/DPI, and a launcher that looks more desktop-y. Download [SecondScreen](https://play.google.com/store/apps/details?id=com.farmerbb.secondscreen.free) to take care of the first part. After install, install ADB on your pc and run the command `adb shell pm grant com.farmerbb.secondscreen.free android.permission.WRITE_SECURE_SETTINGS` while the phone is plugged in. You can search on the web how to install ADB and use it. I had to reset the app once, but after that it sort of worked. It asked for a restart and changed the PHONE's resolution and DPI, which is a little scary as you may not be able to unlock it, but I was able to with a mouse.

> [!fyi]
> My current monitor resolution is around ~110 ppi
