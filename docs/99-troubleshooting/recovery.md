# General Recovery Workflow

## Principles
Recovery should minimize additional writes and changes.

## Live-media recovery
1. Boot a verified Arch installation medium.
2. Identify the installed disk.
3. Mount the installed root.
4. Mount the EFI partition when required.
5. Enter the installed environment.
6. Inspect the failed subsystem.
7. Make the smallest justified repair.
8. Exit and unmount cleanly.
9. Reboot and verify.

## Stop conditions
Stop and switch to a dedicated recovery/data-recovery workflow when:
- the wrong disk may have been modified
- filesystem corruption is suspected
- encrypted storage cannot be safely identified
- important data has no backup
