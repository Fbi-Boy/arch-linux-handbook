# Package Manager Failure Recovery

Pacman failures should be classified before attempting repair. The package database, keyring, mirrors, dependency graph, and system state are different failure layers.

## 1. Capture the exact error

```bash
pacman --version
pacman -Q
df -h /
systemctl --failed
```

Save the relevant error text before retrying.

## 2. Classify the failure

| Symptom | First inspection |
| --- | --- |
| cannot download database | network/mirror |
| invalid or unknown signature | keyring/signature |
| target not found | repository metadata/package name |
| file conflict | package ownership/conflict |
| dependency conflict | package graph |
| interrupted transaction | pacman state and filesystem |
| read-only filesystem | storage/filesystem layer |

## 3. Avoid partial upgrades

Use the normal full upgrade workflow:

```bash
sudo pacman -Syu
```

Do not combine a database refresh with a postponed system upgrade.

If pacman requests an intervention you do not understand, stop and inspect the package information and current Arch guidance.

## 4. Repository and mirror checks

Inspect configured repositories:

```bash
grep -nE '^\[|^Server|^Include' /etc/pacman.conf
```

Check whether the network itself works before changing mirrors.

Do not replace the entire mirror configuration simply because one download failed.

## 5. Signature and keyring failures

Capture the exact signature error first.

Inspect installed keyring packages:

```bash
pacman -Q | grep -E 'keyring'
```

Do not delete the pacman keyring directory as a generic repair step.

## 6. File conflicts

Identify ownership:

```bash
pacman -Qo /path/to/conflicting/file
```

Inspect the package transaction and determine which package should own the file before removing anything.

Never use a blind recursive deletion to “clear” a package conflict.

## 7. Interrupted transactions

Check the package database and filesystem state:

```bash
pacman -Q
df -h /
findmnt /
```

Read the exact pacman error. A filesystem problem, interrupted process, or dependency issue can require different recovery actions.

## 8. Live-media recovery

If the installed system cannot boot or pacman cannot be repaired safely from the running system:

1. boot verified installation media;
2. identify the installed root filesystem;
3. mount it;
4. mount the ESP if required;
5. enter with `arch-chroot`;
6. inspect the package state;
7. make the smallest justified repair;
8. rebuild boot artifacts if the repair requires it;
9. exit and verify before rebooting.

## Stop conditions

Stop when:

- the filesystem is unexpectedly read-only;
- the wrong root filesystem may be mounted;
- package database corruption is suspected but not understood;
- the repair would require deleting system directories;
- the proposed command uses `--overwrite`, `--force`, or destructive deletion without a package-specific justification.

**A failed package transaction is evidence. Preserve it before changing more state.**
