# Home Assistant
## TTS alert to mobile on alarm channel
The below is the YAML code from the *Actions* section of **Automation**.

> [!fyi]
> This seems to not work anymore with the latest HA release. Need to check again.

```yaml
service: notify.mobile_app_[device name]
data:
  message: "TTS"
  data:
    tts_text: "Here is some text, and here's a variable{{states('variable.value')}}."
    media_stream: "alarm_stream"
```

Above is per this [link](https://companion.home-assistant.io/docs/notifications/notifications-basic/)

## Remote Access
- Setup port forwarding for the HA Server to take TCP traffic from 443 > 8123
- Go to [duckdns.org](https://www.duckdns.org/) and create a domain. Grab the token and domain on the page.
	- Logged in with Google account.
- Install the duckdns add-on.
	- Let's Encrypt, etc. aren't needed.
- Set it up. Make sure to set `accept_terms` to `true` on the configuration screen.
- Add the following to the `configuration.yaml`, which is generated after installing duckdns and running it.
```yaml
http:   
 ssl_certificate: /ssl/fullchain.pem   
 ssl_key: /ssl/privkey.pem
```
- Restart HA.
- Update home and away URLs to use HTTPS.
- Good guide [here](https://djajafer.medium.com/setting-up-duckdns-in-home-assistant-io-14c23316fcff).