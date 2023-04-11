# Home Assistant

[Home Assistant](https://www.home-assistant.io/) is free and open-source software for home automation designed to be a central control system for smart home devices with a focus on local control and privacy.

## TTS alert to mobile on alarm channel

The below is the complete YAML code from  **Automations**. It plays the alert on the same audio stream as the alarm does on android. That way you can keep the regular audio stream muted and still get these alerts.

```yaml
alias: High Water Usage
description: ""
trigger:
  - platform: numeric_state
    entity_id: sensor.flume_sensor_home_60_minutes
    above: "20"
condition: []
action:
  - service: notify.mobile_app_[PHONENAME]
    data:
      message: >-
        You are currently consuming
        {{states('sensor.flume_sensor_home_60_minutes')}} GPM
      title: High water usage detected
  - service: notify.mobile_app_[PHONENAME]
    data:
      message: TTS
      data:
        tts_text: >-
          High water usage detected. You are currently consuming
          {{states('sensor.flume_sensor_home_60_minutes')}} gallons per minute.
        media_stream: alarm_stream
        priority: high
        ttl: 0
mode: single
```

Above is per this [link](https://companion.home-assistant.io/docs/notifications/notifications-basic/)

## Camera Take Picture on Tap

Create a **Script**, the input the below, which is taken from [this](https://www.home-assistant.io/integrations/blink/#snap-picture-and-save-locally). You can use a **Picture Glance** card with a service that calls that script on tap.

```yaml
alias: Blink Snap Picture Driveway
sequence:
  - service: blink.trigger_camera
    target:
      entity_id: camera.blink_driveway
    data: {}
  - delay: "00:00:05"
  - service: blink.blink_update
    data: {}
  - service: camera.snapshot
    target:
      entity_id: camera.blink_driveway
    data:
      filename: /media/driveway.jpg
mode: single
```

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

## Commands

### Home Assistant

```bash
ha core check
ha core info
ha core logs
ha core options
ha core rebuild
ha core restart
ha core start
ha core stats
ha core stop
ha core update
```

### Supervisor

```bash
ha supervisor info
ha supervisor logs
ha supervisor reload
ha supervisor update
```

### Host

```bash
ha host reboot
ha host shutdown
ha host update
```

### Hardware

```bash
ha hardware info
ha hardware audio
```

### Example Updates

`ha core update --version 2022.10.1`

`ha os update --version 9.2`

`ha supervisor update --version 2022.10.0`

### HA Help Output

```bash
The Home Assistant CLI is a small and simple command line utility that allows
you to control and configure different aspects of Home Assistant

Usage:
  ha [command]

Available Commands:
  addons         Install, update, remove and configure Home Assistant add-ons
  audio          Audio device handling.
  authentication Authentication for Home Assistant users.
  backups        Create, restore and remove backups
  banner         Prints the CLI Home Assistant banner along with some useful information
  cli            Get information, update or configure the Home Assistant cli backend
  core           Provides control of the Home Assistant Core
  dns            Get information, update or configure the Home Assistant DNS server
  docker         Docker backend specific for info and OCI configuration
  hardware       Provides hardware information about your system
  help           Help about any command
  host           Control the host/system that Home Assistant is running on
  info           Provides a general Home Assistant information overview
  jobs           Get information and manage running jobs
  multicast      Get information, update or configure the Home Assistant Multicast
  network        Network specific for updating, info and configuration imports
  observer       Get information, update or configure the Home Assistant observer
  os             Operating System specific for updating, info and configuration imports
  resolution     Resolution center of Supervisor, show issues and suggest solutions
  supervisor     Monitor, control and configure the Home Assistant Supervisor

Flags:
      --api-token string   Home Assistant Supervisor API token
      --config string      Optional config file (default is $HOME/.homeassistant.yaml)
      --endpoint string    Endpoint for Home Assistant Supervisor (default is 'supervisor')
  -h, --help               help for ha
      --log-level string   Log level (defaults to Warn)
      --no-progress        Disable the progress spinner
      --raw-json           Output raw JSON from the API

Use "ha [command] --help" for more information about a command.
```
