---
id: live-network
title: Network during installation
sidebar_label: Live network
---

The installer needs working network access to retrieve packages. Treat network setup as a dependency, not a side quest.

## Diagnose in layers

### Layer 1 — Interface exists

```bash
ip link
```

If the expected interface is missing, investigate hardware visibility and firmware before changing network configuration.

### Layer 2 — Link/association

For Ethernet, verify the cable and link state.

For Wi-Fi, verify that the wireless interface is not blocked:

```bash
rfkill
```

Then use an appropriate network client available in the live environment.

### Layer 3 — IP connectivity

```ip addr
ip route
ping -c 3 1.1.1.1
```

If IP connectivity works but a hostname does not resolve, the problem is likely DNS rather than the physical connection.

### Layer 4 — DNS

```getent hosts archlinux.org
ping -c 3 archlinux.org
```

Do not start replacing resolver configuration randomly. First identify which network stack is currently managing the live environment.

## Common network stacks

Arch supports several network-management approaches. Examples include:

- NetworkManager,
- systemd-networkd,
- iwd as a wireless daemon,
- wpa_supplicant.

Choose one coherent management model for the installed system. Do not enable multiple services that attempt to manage the same interface.

For example, ArchWiki notes that each network interface should be managed by only one DHCP client or network manager.

## Installed-system recommendation

For a desktop/laptop handbook, NetworkManager is a practical default because it covers wired, Wi-Fi, VPN, and desktop-oriented workflows.

Install it with the base system:

```bash
pacstrap -K /mnt base linux linux-firmware networkmanager
```

Enable it after entering the installed system:

```bash
systemctl enable NetworkManager.service
```

## Captive portals

A successful Wi-Fi association does not guarantee Internet access. Hotel, campus, café, and public networks may require a browser-based login.

Test an actual hostname and HTTP/HTTPS access after association.

## Troubleshooting matrix

| Symptom | First checks |
| --- | --- |
| Interface missing | `ip link`, firmware, hardware |
| Wi-Fi blocked | `rfkill` |
| Has IP but no route | `ip route` |
| IP works, hostname fails | DNS / resolver |
| Wi-Fi associates but Internet blocked | captive portal |
| Multiple managers active | systemd services and process ownership |

## References

- ArchWiki: Network configuration
- ArchWiki: NetworkManager
- ArchWiki: systemd-networkd
- ArchWiki: iwd
