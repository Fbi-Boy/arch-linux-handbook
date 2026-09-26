---
id: first-system-configuration
title: Configure the new system
sidebar_label: First system configuration
---

# Configure the new system

These steps are performed after entering the target with `arch-chroot /mnt`.

## 1. Time zone

List available zones:

```bash
timedatectl list-timezones
```

Set the chosen zone:

```ln -sf /usr/share/zoneinfo/Region/City /etc/localtime
```

Then synchronize the hardware clock:

```hwclock --systohc
```

Use the actual region/city for the machine rather than copying an unrelated example.

## 2. Locale

Edit:

```bash
nano /etc/locale.gen
```

Uncomment the locale required by the system. For example:

```text
en_US.UTF-8 UTF-8
```

Generate locales:

```bash
locale-gen
```

Create `/etc/locale.conf`:

```bash
echo 'LANG=en_US.UTF-8' > /etc/locale.conf
```

## 3. Console keymap

If a non-default console layout is required:

```bash
echo 'KEYMAP=<layout>' > /etc/vconsole.conf
```

Keep console keymap configuration separate from graphical desktop keyboard configuration.

## 4. Hostname

Create:

```bash
echo '<hostname>' > /etc/hostname
```

Then define matching local hosts entries if required by the selected network/hostname setup.

## 5. Root password

Set a strong root password:

```bash
passwd
```

For normal daily work, use an unprivileged account and elevate only when necessary.

## 6. Create a user

```useradd -m -G wheel <username>
passwd <username>
```

Install sudo if it is part of the system design:

```pacman -S sudo
```

Edit sudo policy with the dedicated editor:

```visudo
```

Enable the appropriate `wheel` rule.

> Prefer editing sudoers through `visudo`; it validates syntax before installing the resulting configuration.

## 7. Enable networking

For the NetworkManager baseline:

```bash
systemctl enable NetworkManager.service
```

Do not enable multiple competing network managers for the same interface.

## 8. Verify before bootloader work

```id <username>
systemctl is-enabled NetworkManager.service
locale
cat /etc/hostname
timedatectl status
```

Then continue to the bootloader-specific page.

## References

- ArchWiki: Installation guide
- ArchWiki: Users and groups
- ArchWiki: Sudo
- ArchWiki: NetworkManager
