---
id: 07-system-configuration
---

# 07 — System Configuration

## Order
1. Time zone
2. Locale
3. Keyboard
4. Hostname
5. Network management
6. Initramfs and kernel-related configuration as required
7. Root credential
8. Unprivileged user
9. Privilege elevation
10. Required services

## Security principle
Use an unprivileged account for daily work and reserve root for administration.

## Verification
The system should correctly report local time, locale, hostname, networking, user authentication, and administrative privilege.

## Recovery
If configuration causes boot failure, boot the live medium, mount the target, enter the installed environment through the recovery procedure, inspect the relevant configuration, and repair only the failed layer.
