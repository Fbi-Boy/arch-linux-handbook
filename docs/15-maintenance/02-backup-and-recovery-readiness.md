---
id: backup-and-recovery-readiness
title: Backup and Recovery Readiness
sidebar_position: 2
---

A recovery plan is useful only when the data and instructions required by that plan actually exist.

## 1. Identify what must survive

Separate data into categories:

- personal files;
- project source;
- configuration;
- package and toolchain records;
- SSH keys and other credentials;
- service data;
- recovery documentation.

Do not copy secrets into a backup merely because they are convenient. Protect sensitive backups appropriately.

## 2. Inventory important paths

Start with a clear list rather than backing up the entire filesystem blindly.

Common user data:

```bash
du -sh ~/Documents ~/Downloads ~/Projects 2>/dev/null
```

System configuration that may matter:

```bash
sudo ls -la /etc
```

Identify application-specific data before deciding what to copy.

## 3. Use a verified backup destination

A backup is not established merely because a copy command completed.

After copying, verify:

- the destination is accessible;
- expected files exist;
- file sizes are plausible;
- representative files can be opened;
- the backup is not stored on the same failure domain as the original.

For important data, maintain more than one recovery path.

## 4. Preserve system identity and configuration information

Before risky maintenance, record:

```bash
uname -r
lsblk -f
findmnt
ip -br address
systemctl --failed
```

For boot troubleshooting, also preserve:

```bash
efibootmgr -v
bootctl status
```

Only run firmware-related commands when the system is booted in the appropriate mode.

## 5. Package inventory

Create a package inventory for reconstruction:

```bash
pacman -Qqe > ~/package-list.txt
pacman -Qqm > ~/aur-package-list.txt
```

These lists are references, not scripts to execute blindly on a new installation. Review them before rebuilding a system.

## 6. Configuration backup strategy

Prefer backing up declarative configuration and documented changes instead of copying every generated file.

For example:

```bash
sudo cp -a /etc/fstab ~/recovery-fstab.txt
```

For sensitive configuration, use an access-controlled destination.

## 7. Recovery drill

A recovery plan should answer:

1. Where is the backup?
2. How do I boot recovery media?
3. How do I identify the correct root filesystem?
4. How do I mount it safely?
5. How do I enter the installed system with `arch-chroot`?
6. How do I repair the bootloader or initramfs?
7. How do I restore user data?

If these questions cannot be answered without improvisation, the recovery plan is incomplete.

## 8. Test the backup

Periodically restore a small representative dataset to a separate location.

Verify:

```bash
find <restore-location> -type f | head
```

Then open several restored files and compare important checksums where appropriate.

## 9. Recovery principle

When a system fails:

**preserve evidence → identify the failing layer → make one controlled change → verify → document the result.**

Avoid formatting, reinstalling, deleting caches, or rewriting boot configuration merely because the first repair attempt failed.

## Recovery readiness gate

A system is recovery-ready when:

- critical data has a verified backup;
- the boot/recovery media is available;
- disk and filesystem layout is documented;
- package inventory is available;
- important configuration is recoverable;
- the restoration procedure has been tested.

## Next step

Continue to [Troubleshooting](../99-troubleshooting/README.md).
