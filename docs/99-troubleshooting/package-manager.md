# Package Manager Failure Recovery

## Before changing anything
Capture the exact error and determine whether the problem is:
- repository metadata
- signature/keyring
- mirror
- DNS/network
- package conflict
- interrupted transaction
- dependency issue

## Rules
Do not perform a partial system upgrade. Do not blindly delete package databases. Read current Arch news and official package-management documentation when an intervention is required.

## Recovery
Use the live environment and chroot only when the installed system cannot boot or package tooling cannot be repaired from the running system.
