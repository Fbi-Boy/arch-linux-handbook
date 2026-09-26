# Boot Failure Recovery

## Symptoms
- Firmware does not show Arch.
- Bootloader starts but kernel does not.
- System returns to firmware.
- Windows remains available but Arch is missing.

## Triage
1. Confirm firmware mode.
2. Confirm EFI System Partition is present.
3. Mount the installed system from the live environment.
4. Inspect EFI files.
5. Inspect firmware boot entries.
6. Check kernel and initramfs files.
7. Repair only the layer confirmed to be broken.

## Safety
Do not format the EFI partition as a first response. Do not delete Windows EFI files in a dual-boot installation.

## Verification
After repair, test Arch boot and, for dual boot systems, Windows boot as separate validation steps.
