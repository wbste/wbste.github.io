# Proxmox

Followed [this guide](https://smarthomescene.com/guides/how-to-install-home-assistant-on-proxmox-the-easy-way/) to migrate [Home Assistant](Home%20Assistant.md) for a Raspberry Pi 3b to a HP Thin Client.

## Tips

- Download the latest **[Proxmox VE ISO Installer](https://www.proxmox.com/en/downloads)** and save it, burn it to a USB with something like [Balena Etcher.](https://www.balena.io/etcher)
- In the BIOS of the device, make sure...
	- **Secure Boot** is **disabled**  
	- **Legacy Boot** is **enabled**  
	- **Virtualization Technology** is **enabled**
- Used the console installer and not the GUI. The GUI one failed twice by getting stuck at different random locations. Console was fine.


