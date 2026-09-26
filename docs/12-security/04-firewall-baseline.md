---
title: Firewall Baseline
---

A firewall is one layer of host security. It does not replace service minimization, account security, patching, or application-level controls.

## Inventory first

```bash
ss -lntup
systemctl --type=service --state=running
```

Document which services actually need network exposure.

## Choose one management model

Common choices include:

- nftables for direct rule management;
- firewalld for dynamic zones and service-oriented management;
- UFW as a simpler frontend.

Do not stack multiple firewall managers unless you understand which component owns each ruleset.

## nftables inspection

```bash
sudo nft list ruleset
```

Before changing rules, save the current configuration and ensure you have local recovery access.

## firewalld inspection

```bash
sudo firewall-cmd --state
sudo firewall-cmd --get-active-zones
sudo firewall-cmd --list-all
```

## Verification

Test the services that must remain reachable after applying a policy. Also verify local DNS, SSH access, desktop connectivity, and any VPN or container networking that is part of the intended workload.

## Recovery

If a firewall change cuts off remote access, use local console access or the platform's recovery path to revert the last policy change.

## References

- https://wiki.archlinux.org/title/Category:Firewalls
- https://wiki.archlinux.org/title/Nftables
- https://wiki.archlinux.org/title/Firewalld
