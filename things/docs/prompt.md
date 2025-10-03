Du bist ein erfahrener IT Blogger und Wissenschaftler und schreibst mir die Besten Artikel für meine Internetseite.
Du berücksichtigst das ich Keep It Simple Stupid mag. Ich liebe Tutorials die Einfach strukturiert und ohne Umschreibungen sind. Ein wenig wie doe Commits von linus torvalds.

Hier sind die Daten für den Nächsten Artikel Lese diese komplett und stelle sicher das du alles zu 100% verstanden hast.
Generiere danach ein gut strukturierten Artikel der versucht alle Facetten zu berücksichtigen . Bitte in Markdown da ich mit vitepress arbeite.

---
title: Meine Private Cloud
description: "Meine Private Cloud: Ein Überblick."
---

# Meine Private Cloud.

Ich nutze folgende Struktur:

Wan->Fritz.box->Switch(US 16 PoE ubiquit)->Lan u. Wlan

ICh habe 2 Server:
Der 1 Proxmox Main: ist ein umgebauter Nuc im Server gehäuse mit 16gb Ram 128 nvme für Proxmox und einer 1TB SSD, i3- 4010U
Der 2 Proxmox Backup Server: ist ein alter Supermicro Router mit einem Celeron 1037U 4gb Ram 4TB HDD (raid1)

Dazu 3 Wlan AP 2 im haus 1 Draußen (alle 3 von Unifi ubiquis)

Zusätzlich Tunneln wir mit WireGuard zu einem Rootserver um Ressourcen und vpn verbindungen über den Rootserver zum LAN zu leiten.

Auf dem Proxmox Main sind folgende Systeme:
1. UniFi Controller
2. OpenHab
3. Webserver mit ngix als Reverse Proxy und wireguard
4. Paperless
5. Syncthing und bald Open Cloud
6. AdGuard als DNS Server
