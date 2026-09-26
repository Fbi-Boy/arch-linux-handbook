# General Recovery Workflow

Recovery is a controlled diagnostic process, not a sequence of increasingly destructive commands.

## Recovery model

**Preserve → Identify → Isolate → Repair → Verify → Record**

### Preserve

Capture the current state before changing it:

```bash
date
uname -r
lsblk -f
findmnt
systemctl --failed
journalctl -b -p err..alert --no-pager
```

For boot incidents:

```bash
efibootmgr -v
bootctl status
```

### Identify

Classify the failure:

- firmware/boot;
- storage/filesystem;
- network;
- package manager;
- graphics/session;
- service/userspace.

Use the smallest set of commands that distinguishes these layers.

### Isolate

Reduce the problem to one failing component.

Examples:

- bootloader works but kernel fails → inspect initramfs/kernel;
- IP works but names fail → inspect DNS;
- TTY works but desktop fails → inspect graphics/session;
- package download works but transaction fails → inspect pacman/dependencies.

### Repair

Make one controlled change at a time.

Record:

- what changed;
- why it was changed;
- expected result;
- actual result.

## Live-media recovery

When the installed system cannot boot:

1. boot a verified Arch installation medium;
2. confirm firmware mode;
3. identify disks with `lsblk -f`;
4. mount the correct root filesystem;
5. mount the ESP only when required;
6. enter with `arch-chroot`;
7. inspect the failing layer;
8. make the smallest justified repair;
9. exit and unmount cleanly;
10. reboot and verify.

Example verification:

```bash
findmnt -R /mnt
```

## Data-first safety

Stop before repair if:

- the wrong disk may have been selected;
- filesystem corruption is suspected;
- encrypted storage is not positively identified;
- important data has no verified backup;
- a command would overwrite a partition or filesystem.

If data integrity is uncertain, prioritize evidence preservation and data recovery over system reinstallation.

## Verify

After repair, test the layer that originally failed and then test dependent layers.

For example:

**boot → network → package manager → desktop**

Do not declare recovery successful merely because the machine reaches a login screen.

## Record

Document the root cause, evidence, repair, verification result, and any remaining risk.

A good recovery record makes the next incident faster and safer.
