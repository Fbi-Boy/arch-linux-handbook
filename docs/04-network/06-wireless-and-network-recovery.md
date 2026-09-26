---
title: Wireless and Network Recovery
sidebar_label: Wireless Recovery
---

## Purpose

Wireless failures should be narrowed from radio state to association, address, route, and DNS.

## Evidence first

```bash
rfkill list
ip -br link
nmcli radio
nmcli device status
journalctl -b -u NetworkManager --no-pager
```

If Wi-Fi is blocked:

```bash
rfkill unblock wifi
```

Verify the result before proceeding.

## Association

Inspect visible networks:

```bash
nmcli device wifi list
```

Then inspect the active connection:

```bash
nmcli connection show --active
ip -br address
ip route
```

Do not repeatedly delete and recreate profiles before determining whether the failure is radio, authentication, DHCP, routing, or DNS.

## Driver and firmware

Identify the hardware:

```bash
lspci -k
lsusb
journalctl -b -k | grep -Ei 'firmware|wifi|wlan|iwlwifi|ath|rtw|brcm'
```

Use the device and kernel evidence to select the appropriate driver/firmware documentation.

## Network recovery

If remote access is essential, keep a local TTY recovery path before modifying NetworkManager, firewall, or SSH configuration.

A safe recovery sequence is:

1. restore the last known-good network configuration;
2. restart only the affected service;
3. verify interface and address;
4. verify route;
5. verify DNS;
6. test the application.

## Stop conditions

Stop when a proposed fix requires:

- deleting all network profiles;
- replacing the network stack without evidence;
- disabling the firewall as a permanent workaround;
- rebooting remotely without a confirmed recovery path.

## References

- [ArchWiki: Network configuration](https://wiki.archlinux.org/title/Network_configuration)
- [ArchWiki: NetworkManager](https://wiki.archlinux.org/title/NetworkManager)
- [ArchWiki: Wireless network configuration](https://wiki.archlinux.org/title/Network_configuration/Wireless)
