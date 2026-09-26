---
title: Networking Architecture
sidebar_label: Networking Architecture
---

## Purpose

Use a layered model to diagnose connectivity without changing several variables at once.

## Layer model

### Network layer flow

Device → Link → Address → Route → DNS → Application

A failure at one layer can make every layer above it appear broken.

## Inventory

Start with evidence:

```bash
ip -br link
ip -br address
ip route
resolvectl status
nmcli device status
```

For hardware identification:

```bash
lspci -k
lsusb
rfkill list
```

Record the interface name, link state, address, route, DNS configuration, driver, and relevant service.

## IPv4 and IPv6

Do not assume an IPv6 failure means IPv4 is broken, or vice versa.

Inspect both:

```bash
ip -4 address
ip -6 address
ip -4 route
ip -6 route
```

Test the smallest layer first. An interface with no address is not a DNS problem.

## DNS

Inspect resolver state:

```bash
resolvectl status
resolvectl query archlinux.org
```

If an IP address is reachable but name resolution fails, investigate the resolver layer instead of replacing the network configuration.

## NetworkManager

For systems using NetworkManager:

```bash
systemctl status NetworkManager
nmcli general status
nmcli device status
nmcli connection show
```

Use NetworkManager's state as evidence before changing profiles.

## Firewall boundary

A working local interface does not prove that a service is reachable remotely.

Compare:

```bash
ss -lntup
ip route
```

with the intended firewall policy. Keep service exposure and firewall changes separate so failures remain attributable.

## Recovery

Use:

### Recovery flow

Identify → isolate layer → make one change → verify → record

If networking breaks after a configuration change, revert the smallest recent change first.

## Stop conditions

Stop before replacing network services or drivers when:

- the interface has not been identified;
- the current route/resolver state has not been captured;
- multiple network managers are active without a deliberate reason;
- the proposed change would remove the only remote recovery path.

## References

- [ArchWiki: Network configuration](https://wiki.archlinux.org/title/Network_configuration)
- [ArchWiki: NetworkManager](https://wiki.archlinux.org/title/NetworkManager)
- [ArchWiki: systemd-resolved](https://wiki.archlinux.org/title/Systemd-resolved)
