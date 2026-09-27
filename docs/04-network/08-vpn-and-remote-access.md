---
title: VPN and Remote Access
sidebar_label: VPN and Remote Access
---

## Purpose

A VPN creates a protected communication channel over another network. It does not automatically make every service trustworthy.

## Choose the model

| Need | Model |
| --- | --- |
| Access one private network remotely | Site/client VPN |
| Connect controlled networks | Site-to-site VPN |
| Reach selected private services | Host-based or overlay VPN |
| Temporary administration | SSH over a controlled path |

Choose the implementation from the actual topology, authentication model, and operational requirements.

## Baseline inspection

```bash
ip -br address
ip route
ss -lntup
systemctl --failed
```

Document which interfaces and routes the VPN is expected to add.

## Routing verification

```bash
ip -br address
ip route
ip -6 route
resolvectl status
```

A successful tunnel does not prove that traffic uses the intended route.

## DNS boundary

Compare DNS before and after connection:

```bash
resolvectl status
resolvectl query example.org
```

Document split-DNS behavior when only internal names should use the VPN.

## Firewall boundary

```bash
ss -lntup
sudo nft list ruleset
```

Treat a VPN interface as another network boundary, not as a universal trust zone.

## Recovery

1. Identify the tunnel interface.
2. Compare routes before and after connection.
3. Check DNS separately from routing.
4. Inspect service logs.
5. Disconnect the tunnel and restore the known-good route.

Keep a local recovery path so a bad route cannot lock you out.

## References

- [ArchWiki: Virtual Private Network](https://wiki.archlinux.org/title/VPN)
- [ArchWiki: Network configuration](https://wiki.archlinux.org/title/Network_configuration)
