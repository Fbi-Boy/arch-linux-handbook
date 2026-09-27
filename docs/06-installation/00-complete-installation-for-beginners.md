# Complete Arch Linux Installation for Absolute Beginners

> **Goal:** install a clean UEFI/GPT Arch Linux system from a Windows/Linux computer, configure a normal user, install a bootloader, boot Arch successfully, install a desktop, and perform a final health check.
>
> This is the handbook's **single linear beginner path**. The other documents remain the detailed reference library.

## Read this before touching the disk

This guide is intentionally repetitive. That is a safety feature.

You will see the same rule many times:

> **STOP → CHECK → VERIFY → CONTINUE**

Do not skip a verification because the previous command "looked normal".

> **What this guide assumes:**

The main path assumes:

- 64-bit UEFI firmware.
- The computer can boot the official Arch installation image.
- The installation target is a **clean disk** that you are allowed to erase.
- The target uses GPT.
- One EFI System Partition (ESP) will be mounted at `/boot`.
- The root filesystem will use ext4.
- systemd-boot will be used as the boot manager.
- NetworkManager will manage networking after installation.
- GNOME will be used as the first desktop environment.
- You have a backup of anything important.

> **If Windows is still on the disk:**

**Do not follow the destructive clean-disk path.**

Use the dedicated [Windows dual-boot safety path](../14-dual-boot/01-windows-dual-boot-safety.md) first. A dual-boot installation has different partitioning rules because the existing Windows EFI System Partition must normally be preserved.

> **If you want encryption, Btrfs, RAID, LVM, ZFS, a custom kernel, or a custom boot design:**

Stop here and use the specialist documentation instead:

- [Filesystem strategy](../05-storage/03-filesystem-strategy.md)
- [LUKS encryption strategy](../05-storage/05-luks-encryption-strategy.md)
- [Btrfs snapshots and recovery](../05-storage/06-btrfs-snapshots-and-recovery.md)
- [Bootloader strategy](../08-bootloader/01-bootloader-strategy.md)

The beginner path deliberately chooses fewer moving parts.

---

## PART 0 — Understand what you are about to do

## The final result

When everything is finished, the computer should work approximately like this:

```text
Power button
    ↓
UEFI firmware
    ↓
systemd-boot
    ↓
Arch Linux kernel
    ↓
initramfs
    ↓
systemd
    ↓
NetworkManager + services
    ↓
GDM login screen
    ↓
GNOME desktop
    ↓
your normal user
```text

The installation is not one command. It is a chain.

If one link is wrong, do not randomly change another link. Find the first broken layer.

## The words you need to know

| Word | Simple meaning |
| --- | --- |
| ISO | The Arch Linux installation image |
| USB installer | A USB drive containing the Arch ISO |
| UEFI | Modern firmware used to start operating systems |
| GPT | Modern disk partition-table format |
| ESP | Small FAT32 partition used by UEFI boot files |
| root | The main Linux filesystem, mounted as `/` |
| mount | Make a filesystem available at a directory |
| chroot | Enter the newly installed filesystem as if it were the running system |
| pacstrap | Arch tool that installs the base system into a target directory |
| initramfs | Early userspace loaded before the main system |
| bootloader | Software that selects and starts the operating system |
| systemd-boot | The UEFI boot manager used by this guide |
| microcode | CPU updates supplied by AMD or Intel |
| NetworkManager | Network management service used after installation |
| display manager | Graphical login screen manager |
| GNOME | Desktop environment used by this beginner path |

---

## PART 1 — Before you start

## STEP 1 — Back up your important files

> **🎯 Goal:**

Make sure a failed installation cannot destroy the only copy of your important data.

> **👀 You should have:**

At least one copy of important files somewhere **outside the disk you may erase**:

- documents
- photos
- school/work projects
- browser data you need
- SSH keys
- Git repositories
- passwords or recovery information
- Windows recovery information if Windows exists

> **⌨️ Do this:**

Use your normal operating system to copy important files to an external disk or trusted backup destination.

> **✅ Correct result:**

You can identify where your backup is and you have tested that important files can actually be opened.

> **❌ If this is not true:**

**STOP.**

Do not partition or format anything yet.

> **⚠️ Danger:**

A partitioning or formatting command can destroy data. Being an administrator does not make a destructive command reversible.

---

## STEP 2 — Decide which installation path you need

Choose exactly one:

> **Path A — Erase the entire target disk:**

Use this guide's main path.

**Everything on the selected target disk will be removed.**

> **Path B — Keep Windows and dual boot:**

Do **not** use the clean-disk partitioning steps below.

Read [Windows dual-boot safety](../14-dual-boot/01-windows-dual-boot-safety.md) first.

> **Path C — Keep existing Linux partitions or use advanced storage:**

Do not use the beginner partitioning sequence. Use the storage documentation.

> **✅ Correct result:**

You can say out loud:

> "I am installing to this specific disk, and I am allowed to erase that disk."

If you cannot say that confidently:

**STOP.**

---

## PART 2 — Prepare the Arch USB

## STEP 3 — Download the official Arch ISO

> **🎯 Goal:**

Get the official installation image.

> **⌨️ Do this:**

Open the official Arch Linux download page:

https://archlinux.org/download/

Download the current x86_64 installation image.

> **👀 What to notice:**

The download page publishes:

- the current release
- SHA-256 checksum
- BLAKE2b checksum
- PGP signature information

> **✅ Correct result:**

You have an ISO file and the corresponding checksum/signature files.

> **❌ If the download is incomplete:**

Download it again before continuing.

> **⚠️ Danger:**

Do not use an ISO from an unknown mirror, random file-sharing page, or modified third-party image.

---

## STEP 4 — Verify the ISO

> **🎯 Goal:**

Make sure the downloaded image is not corrupted before writing it to USB.

> **On Windows:**

Use a trusted checksum utility or PowerShell to calculate the SHA-256 hash of the ISO.

Example:

```powershell
Get-FileHash .\\archlinux-YYYY.MM.DD-x86_64.iso -Algorithm SHA256
```text

Replace the filename with the actual filename you downloaded.

Compare the resulting hash with the SHA-256 value published on the official Arch download page.

> **On Linux:**

After downloading the checksum file:

```bash
sha256sum -c sha256sums.txt
```text

The official download page also documents BLAKE2b and PGP verification.

> **👀 Correct result:**

The checksum matches exactly.

For a checksum comparison, **one character difference is a failure**.

> **❌ If it does not match:**

Delete the ISO and download it again.

Do not continue with a failed checksum.

> **⚠️ Why this matters:**

Writing a bad ISO to USB can create confusing installation failures later.

---

## STEP 5 — Write the ISO to a USB drive

> **🎯 Goal:**

Turn the ISO into bootable installation media.

> **⚠️ Danger:**

Writing an ISO with a disk-writing tool can erase the selected USB drive.

**Confirm the USB device before writing.**

> **On Windows:**

Use a reputable image-writing application such as Rufus or another trusted ISO-writing utility.

Select:

1. the Arch ISO;
2. the correct USB drive;
3. the normal image-writing mode recommended by the application;
4. write/start;
5. wait until it finishes.

Do not select your internal SSD/HDD.

> **✅ Correct result:**

The USB-writing application reports success.

> **❌ If the tool reports an error:**

Do not assume the USB is usable.

Try another USB port or USB drive, then write the verified ISO again.

---

## PART 3 — Boot the installer

## STEP 6 — Boot from the Arch USB

> **🎯 Goal:**

Start the Arch installation environment instead of the installed operating system.

> **⌨️ Do this:**

1. Shut down the computer.
2. Insert the Arch USB.
3. Power on.
4. Open the firmware boot menu.
5. Select the USB's **UEFI** entry.

The boot-menu key varies by manufacturer. Common examples include `F12`, `F11`, `Esc`, or `F8`.

> **👀 Correct result:**

You reach the Arch Linux installation environment and a terminal prompt.

> **❌ If Windows starts instead:**

The computer probably booted the internal disk.

Restart and choose the USB's UEFI entry.

> **⚠️ Danger:**

Do not change random firmware settings just because the USB did not appear. First confirm the USB was written correctly and check the computer manufacturer's boot-menu instructions.

---

## STEP 7 — Confirm UEFI mode

> **🎯 Goal:**

Make sure the installer was booted in UEFI mode.

> **⌨️ Run:**

```bash
ls /sys/firmware/efi/efivars
```text

> **👀 Correct result:**

The command lists EFI variables/directories instead of reporting that the path does not exist.

> **❌ If you get:**

```text
ls: cannot access '/sys/firmware/efi/efivars': No such file or directory
```text

**STOP.**

You likely booted the USB in legacy/BIOS mode.

Restart and select the UEFI version of the USB.

> **⚠️ Why this matters:**

This guide uses GPT + UEFI + systemd-boot. Do not continue with a different firmware mode.

---

## PART 4 — Connect to the internet

## STEP 8 — Check the network device

> **🎯 Goal:**

Make sure the live environment can see your network hardware.

> **⌨️ Run:**

```bash
ip link
```text

> **👀 Look for:**

An interface other than the loopback interface.

Typical names can look like:

- `enp...` for Ethernet
- `wlan...` for Wi-Fi

The exact name depends on the hardware.

> **❌ If Wi-Fi is missing:**

Check:

```bash
rfkill list
```text

If the adapter is blocked, investigate the hardware/firmware or physical wireless switch before continuing.

---

## STEP 9 — Connect to Wi-Fi if needed

> **🎯 Goal:**

Connect the live installer to the internet.

> **⌨️ Run:**

```bash
iwctl
```text

Inside `iwctl`:

```device list
```text

Find the Wi-Fi device name.

Then:

```station <wifi-device> scan
station <wifi-device> get-networks
station <wifi-device> connect "<your-SSID>"
```text

Replace:

- `<wifi-device>` with the real device name;
- `<your-SSID>` with the real Wi-Fi name.

Enter the Wi-Fi password when asked.

Exit:

```exit
```text

> **👀 Correct result:**

The Wi-Fi connection is established.

> **⌨️ Verify:**

```ping -c 3 ping.archlinux.org
```text

> **✅ Correct result:**

You receive replies.

> **❌ If ping fails:**

Check in this order:

1. Wi-Fi device exists.
2. Wi-Fi is not blocked.
3. SSID is correct.
4. Password is correct.
5. The router has internet.
6. Try Ethernet if available.

Do not begin disk operations while you are still unsure whether the live environment can reach the package repositories.

---

## PART 5 — Check the system clock

## STEP 10 — Enable network time synchronization in the live environment

> **🎯 Goal:**

Keep the installer clock accurate.

> **⌨️ Run:**

```bash
timedatectl set-ntp true
timedatectl status
```text

> **👀 Correct result:**

The system reports a synchronized or synchronizing network clock.

> **❌ If time synchronization fails:**

Fix the network connection first.

---

## PART 6 — Identify the disk before destroying anything

## STEP 11 — List every storage device

> **🎯 Goal:**

Know exactly which disk you are going to install to.

> **⌨️ Run:**

```bash
lsblk -o NAME,SIZE,TYPE,FSTYPE,LABEL,UUID,MOUNTPOINTS,MODEL
```text

You can also run:

```bash
fdisk -l
```text

> **👀 What you are looking for:**

You may see devices such as:

```text
nvme0n1   476.9G   disk   ...   Internal SSD
sda       931.5G   disk   ...   External HDD
sdb        14.6G   disk   ...   USB installer
```text

The names and sizes on your computer will be different.

> **🚨 Critical rule:**

**Never assume `/dev/nvme0n1` is your target.**

Your target must be identified using evidence such as:

- model
- size
- connection type
- existing partitions
- whether it is the USB installer
- whether it contains data you need

> **✅ Correct result:**

You can point to one disk and explain why it is the installation target.

> **❌ If two disks look similar:**

**STOP.**

Do not format either disk.

Disconnect unnecessary external drives if possible and inspect again.

---

## PART 7 — Final destructive-operation checkpoint

## STEP 12 — Confirm the target disk one last time

Before partitioning, write down:

```text
TARGET DISK:
MODEL:
SIZE:
DEVICE:
DATA ON IT MAY BE DESTROYED: YES
BACKUP VERIFIED: YES
```text

For example:

```text
TARGET DISK:
MODEL: Example NVMe SSD
SIZE: 476.9G
DEVICE: /dev/nvme0n1
DATA ON IT MAY BE DESTROYED: YES
BACKUP VERIFIED: YES
```text

> **STOP condition:**

If you cannot fill all fields confidently, do not continue.

> **⚠️ Danger:**

The commands from the next section modify the partition table.

---

## PART 8 — Create the GPT partition table

## STEP 13 — Open the target disk with fdisk

> **🎯 Goal:**

Create two partitions:

1. EFI System Partition: 1 GiB
2. Linux root partition: remaining space

> **⌨️ Run:**

Replace `/dev/<target-disk>` only after verifying the disk in Step 12.

```bash
fdisk /dev/<target-disk>
```text

Examples:

- NVMe: `/dev/nvme0n1`
- SATA disk: `/dev/sda`

Do not blindly copy an example device name.

> **⚠️ Danger:**

You are now operating on the selected disk.

---

## STEP 14 — Create a new GPT table

Inside `fdisk`:

```text
g
```text

This creates a new GPT partition table.

> **🚨 STOP:**

This destroys the existing partition-table layout on the selected disk.

Only press `g` if you have already confirmed the disk may be erased.

---

## STEP 15 — Create the EFI System Partition

Inside `fdisk`:

```text
n
```text

Use:

- partition number: `1`
- first sector: press Enter
- last sector: `+1G`

Then set the partition type:

```text
t
```text

For partition 1, choose the EFI System type.

If `fdisk` asks for a type number, use its displayed menu and select the entry named **EFI System**. Do not rely on a number copied from an old tutorial if your `fdisk` menu differs.

> **👀 Correct result:**

Partition 1 is approximately 1 GiB and its type is EFI System.

---

## STEP 16 — Create the root partition

Inside `fdisk`:

```text
n
```text

Use:

- partition number: `2`
- first sector: press Enter
- last sector: press Enter to use the remaining disk space

> **👀 Correct result:**

You should now have approximately:

```text
Partition 1   ~1 GiB   EFI System
Partition 2   remaining space   Linux filesystem
```text

---

## STEP 17 — Review before writing

Inside `fdisk`:

```text
p
```text

Read the complete table.

> **You must see:**

- GPT partition table
- partition 1 = EFI System
- partition 2 = Linux filesystem
- expected disk size

> **❌ If anything is wrong:**

Do **not** use `w`.

Fix the table or quit without saving:

```text
q
```text

Then start again only after understanding what was wrong.

> **✅ If everything is correct:**

Write the partition table:

```text
w
```text

---

## PART 9 — Verify the new partitions

## STEP 18 — Identify the partition names

> **⌨️ Run:**

```bash
lsblk -o NAME,SIZE,TYPE,FSTYPE,PARTTYPE,MOUNTPOINTS,MODEL
```text

> **Typical result:**

For NVMe, it may look like:

```text
nvme0n1
├─nvme0n1p1   1G
└─nvme0n1p2   rest
```text

For SATA, it may look like:

```text
sda
├─sda1        1G
└─sda2        rest
```text

Your names may differ.

> **⚠️ Important:**

From now on:

- `<esp-partition>` means partition 1.
- `<root-partition>` means partition 2.

Do not type the angle brackets.

---

## PART 10 — Format the partitions

## STEP 19 — Format the EFI System Partition

> **🎯 Goal:**

Create the FAT32 filesystem required by the UEFI System Partition.

> **⌨️ Run:**

Replace the placeholder with your actual partition 1:

```bash
mkfs.fat -F 32 /dev/<esp-partition>
```text

> **⚠️ Danger:**

Formatting the wrong partition destroys data on that partition.

Before running it, compare the partition name against Step 18.

> **✅ Correct result:**

The command completes without an error.

---

## STEP 20 — Format the root partition

> **⌨️ Run:**

```bash
mkfs.ext4 /dev/<root-partition>
```text

> **⚠️ Danger:**

This destroys the contents of the selected root partition.

This is expected only because Step 12 explicitly confirmed a clean-disk installation.

> **✅ Correct result:**

The ext4 filesystem is created successfully.

---

## STEP 21 — Verify the filesystems

> **⌨️ Run:**

```lsblk -f
```text

> **👀 Correct result:**

You should see:

- partition 1 → vfat/FAT32
- partition 2 → ext4

---

## PART 11 — Mount the new system

## STEP 22 — Mount the root filesystem

> **⌨️ Run:**

```bash
mount /dev/<root-partition> /mnt
```text

> **Verify:**

```findmnt /mnt
```text

> **Correct result:**

The root partition is mounted at `/mnt`.

---

## STEP 23 — Create the boot mount directory

> **⌨️ Run:**

```bash
mkdir -p /mnt/boot
```text

---

## STEP 24 — Mount the EFI System Partition

> **⌨️ Run:**

```bash
mount /dev/<esp-partition> /mnt/boot
```text

> **Verify:**

```findmnt -R /mnt
```text

> **👀 Correct result:**

You should see:

- root filesystem mounted at `/mnt`
- EFI System Partition mounted at `/mnt/boot`

> **❌ If the mount layout is wrong:**

Stop.

Do not run `pacstrap`.

Fix the mount layout first.

---

## PART 12 — Install the base Arch system

## STEP 25 — Final mount check

> **⌨️ Run:**

```bash
lsblk -o NAME,SIZE,FSTYPE,MOUNTPOINTS
findmnt -R /mnt
```text

> **You need:**

```text
ROOT → /mnt
ESP  → /mnt/boot
```text

Only continue when that is true.

---

## STEP 26 — Install the base packages

> **🎯 Goal:**

Put the minimal Arch operating system into `/mnt`.

> **⌨️ Run:**

```bash
pacstrap -K /mnt base linux linux-firmware networkmanager
```text

> **Why these packages?:**

- `base` → core Arch userspace
- `linux` → standard Arch kernel
- `linux-firmware` → firmware used by many hardware devices
- `networkmanager` → network management after installation

> **👀 Correct result:**

`pacstrap` completes without a fatal error.

> **❌ If package download fails:**

Check:

```ping -c 3 ping.archlinux.org
```text

Then inspect the error before retrying.

Do not randomly delete package databases or switch mirrors without understanding the failure.

---

## STEP 27 — Install CPU microcode

> **Find your CPU vendor:**

Run:

```bash
lscpu | grep -E 'Vendor ID|Model name'
```text

> **AMD:**

```bash
pacstrap -K /mnt amd-ucode
```text

> **Intel:**

```bash
pacstrap -K /mnt intel-ucode
```text

> **Correct result:**

The package matching your CPU vendor is installed.

> **Why?:**

CPU microcode provides processor updates that can improve stability and address processor-level issues.

---

## PART 13 — Generate fstab

## STEP 28 — Generate the filesystem table

> **🎯 Goal:**

Tell the installed system which filesystems to mount automatically during boot.

> **⌨️ Run:**

```bash
genfstab -U /mnt >> /mnt/etc/fstab
```text

> **Verify:**

```cat /mnt/etc/fstab
```text

> **👀 Correct result:**

You should see entries for:

- the root filesystem
- the EFI System Partition

> **❌ If the file is empty or obviously wrong:**

Stop and inspect:

```lsblk -f
findmnt -R /mnt
```text

Do not reboot.

---

## PART 14 — Enter the new Arch system

## STEP 29 — Enter chroot

> **🎯 Goal:**

Configure the newly installed Arch system.

> **⌨️ Run:**

```bash
arch-chroot /mnt
```text

> **👀 You are now inside the new system:**

The shell prompt may look different.

From this point, paths such as:

```text
/etc
/boot
/home
```text

refer to the new Arch installation.

> **Important chroot rule:**

Some systemd commands need a running system and D-Bus. Do not use commands such as `timedatectl`, `hostnamectl`, or `localectl` as the primary configuration/verification mechanism inside this chroot.

Use direct configuration files while inside chroot.

---

## PART 15 — Set the timezone

## STEP 30 — Find your timezone

> **🎯 Goal:**

Tell Arch which timezone the computer uses.

For Indonesia, common examples include:

- `Asia/Jakarta`
- `Asia/Makassar`
- `Asia/Jayapura`

Choose the timezone matching your actual location.

> **⌨️ Verify the directory exists:**

```bash
ls /usr/share/zoneinfo/Asia
```text

> **⌨️ Set it:**

Example for Jakarta:

```bash
ln -sf /usr/share/zoneinfo/Asia/Jakarta /etc/localtime
```text

Replace the path if your timezone is different.

> **Verify:**

```readlink -f /etc/localtime
```text

> **👀 Correct result:**

The command prints the timezone you selected.

---

## STEP 31 — Write the hardware clock

> **⌨️ Run:**

```bash
hwclock --systohc
```text

> **Correct result:**

The command returns without a fatal error.

---

## PART 16 — Configure language

## STEP 32 — Edit locale.gen

> **🎯 Goal:**

Enable the language/locale that your system will generate.

> **⌨️ Run:**

```nano /etc/locale.gen
```text

Find:

```text
#en_US.UTF-8 UTF-8
```text

Remove the `#`:

```text
en_US.UTF-8 UTF-8
```text

Save and exit.

In nano:

- `Ctrl+O` → Enter to save
- `Ctrl+X` → exit

> **STEP 33 — Generate the locale:**

```bash
locale-gen
```text

> **👀 Correct result:**

The selected locale is generated successfully.

---

## STEP 34 — Create locale.conf

> **⌨️ Run:**

```bash
echo 'LANG=en_US.UTF-8' > /etc/locale.conf
```text

> **Verify:**

```cat /etc/locale.conf
```text

Expected:

```text
LANG=en_US.UTF-8
```text

---

## PART 17 — Configure the keyboard

## STEP 35 — Configure the console keyboard

For a standard US keyboard:

```bash
echo 'KEYMAP=us' > /etc/vconsole.conf
```text

If your physical keyboard uses another layout, replace `us` with the correct layout.

> **Verify:**

```cat /etc/vconsole.conf
```text

> **Important:**

This setting controls the Linux virtual console. Desktop keyboard settings can be configured later in GNOME.

---

## PART 18 — Give the computer a hostname

## STEP 36 — Choose a hostname

A hostname is the computer's name on the network.

Example:

```text
arch-pc
```text

Use a simple name without spaces.

> **⌨️ Run:**

```echo 'arch-pc' > /etc/hostname
```text

Replace `arch-pc` if you want another name.

> **Verify:**

```cat /etc/hostname
```text

---

## PART 19 — Set the root password

## STEP 37 — Set root password

> **⌨️ Run:**

```passwd
```text

Enter a strong password twice.

> **Important:**

Nothing may appear while you type the password. That is normal.

> **Correct result:**

You receive a success message.

> **Security rule:**

Do not put the password into this documentation, shell history, screenshots, Git commits, or chat messages.

---

## PART 20 — Create your normal user

## STEP 38 — Create the user account

> **🎯 Goal:**

Use a normal account for daily work instead of logging into the desktop as root.

Choose a simple username.

Example:

```bash
useradd -m -G wheel fabi
```text

Replace `fabi` with your own username.

> **Verify:**

```id fabi
```text

Expected output includes the user and the `wheel` group.

---

## STEP 39 — Set the user password

```bash
passwd fabi
```text

Replace `fabi` with your actual username.

> **Correct result:**

The password is accepted.

---

## PART 21 — Configure sudo

## STEP 40 — Install sudo

```bash
pacman -S sudo
```text

> **Correct result:**

The package installs successfully.

---

## STEP 41 — Safely enable wheel sudo access

> **🎯 Goal:**

Allow members of the `wheel` group to use `sudo`.

> **⌨️ Run:**

```EDITOR=nano visudo
```text

Find:

```text
# %wheel ALL=(ALL:ALL) ALL
```text

Change it to:

```text
%wheel ALL=(ALL:ALL) ALL
```text

Save and exit.

> **Why use visudo?:**

`visudo` checks sudoers syntax before accepting the file. A malformed sudoers file can disable sudo.

> **Verify:**

```visudo -c
```text

> **Correct result:**

You should see a syntax check success.

---

## PART 22 — Configure networking for the installed system

## STEP 42 — Enable NetworkManager

> **🎯 Goal:**

Make networking start automatically after the real system boots.

> **⌨️ Run:**

```systemctl enable NetworkManager.service
```text

> **Verify:**

```systemctl is-enabled NetworkManager.service
```text

> **Correct result:**

```enabled
```text

> **Important:**

Do not enable multiple competing network managers for the same interface unless you intentionally configured them to cooperate.

---

## PART 23 — Rebuild the initramfs

## STEP 43 — Generate initramfs

> **🎯 Goal:**

Create the early boot files needed to start Linux.

> **⌨️ Run:**

```bash
mkinitcpio -P
```text

> **Correct result:**

The command completes successfully and creates the kernel initramfs files under `/boot`.

> **Verify:**

```ls -lh /boot
```text

You should see files such as:

```text
vmlinuz-linux
initramfs-linux.img
initramfs-linux-fallback.img
```text

You may also see the CPU microcode image.

> **❌ If mkinitcpio fails:**

Do not continue to bootloader installation blindly.

Read the first meaningful error and compare it with:

[Initramfs and microcode](../07-system-configuration/02-initramfs-and-microcode.md)

---

## PART 24 — Install systemd-boot

## STEP 44 — Verify the ESP is really mounted at /boot

> **⌨️ Run:**

```bash
findmnt /boot
```text

> **Correct result:**

The output identifies your FAT32 EFI System Partition.

> **⚠️ Danger:**

If `/boot` is not the ESP, stop.

Do not install the bootloader until the mount layout is correct.

---

## STEP 45 — Install systemd-boot

The safest current method for creating the UEFI boot entry from a chroot is to use systemd mode.

First exit the ordinary chroot:

```bash
exit
```text

You are back in the live environment.

Confirm:

```findmnt -R /mnt
```text

Then enter with systemd mode:

```arch-chroot -S /mnt
```text

> **Now run:**

```bootctl --esp-path=/boot install
```text

> **Verify:**

```bootctl --esp-path=/boot status
```text

> **👀 Correct result:**

systemd-boot is installed to the ESP and a UEFI boot entry is available.

> **Why the `-S` mode?:**

Current Arch documentation notes that systemd-boot needs access to UEFI variables when creating the boot entry, and `arch-chroot -S` provides the systemd-mode environment needed for that operation.

---

## PART 25 — Create the systemd-boot entry

## STEP 46 — Check the kernel files

> **⌨️ Run:**

```bash
ls -lh /boot
```text

You need to identify:

- `vmlinuz-linux`
- `initramfs-linux.img`
- CPU microcode image if installed

For AMD, it is normally:

```text
amd-ucode.img
```text

For Intel:

```text
intel-ucode.img
```text

---

## STEP 47 — Find the root UUID

> **⌨️ Run:**

```blkid /dev/<root-partition>
```text

Example output:

```text
/dev/nvme0n1p2: UUID="1234-..." TYPE="ext4"
```text

Copy only the UUID value.

> **⚠️ Do not guess the UUID:**

The boot entry must contain the UUID belonging to the root filesystem.

---

## STEP 48 — Create loader.conf

> **⌨️ Run:**

```bash
mkdir -p /boot/loader/entries
nano /boot/loader/loader.conf
```text

Enter:

```text
default arch.conf
timeout 4
editor no
```text

Save and exit.

---

## STEP 49 — Create the Arch boot entry

> **⌨️ Run:**

```nano /boot/loader/entries/arch.conf
```text

For AMD:

```text
title   Arch Linux
linux   /vmlinuz-linux
initrd  /amd-ucode.img
initrd  /initramfs-linux.img
options root=UUID=ROOT-UUID rw
```text

For Intel:

```text
title   Arch Linux
linux   /vmlinuz-linux
initrd  /intel-ucode.img
initrd  /initramfs-linux.img
options root=UUID=ROOT-UUID rw
```text

Replace `ROOT-UUID` with the exact UUID from Step 47.

> **Critical rule:**

The microcode initramfs must appear **before** the normal initramfs.

> **Verify the file:**

```cat /boot/loader/entries/arch.conf
```text

---

## PART 26 — Verify the bootloader before rebooting

## STEP 50 — Check bootctl

> **⌨️ Run:**

```bootctl --esp-path=/boot status
```text

Then:

```bootctl --esp-path=/boot list
```text

> **👀 Correct result:**

You should see:

- Linux Boot Manager/systemd-boot information
- an Arch Linux entry
- the kernel path
- the initramfs path

> **❌ If Arch Linux is missing:**

Check:

```cat /boot/loader/loader.conf
cat /boot/loader/entries/arch.conf
ls -lh /boot
```text

Do not reboot until the entry is correct.

---

## STEP 51 — Check the UEFI boot entries

> **⌨️ Run:**

```efibootmgr -v
```text

> **👀 Correct result:**

There should be a Linux Boot Manager/systemd-boot entry.

If Windows exists on another disk, its Microsoft Boot Manager entry should be preserved.

> **⚠️ Important:**

Do not delete UEFI entries just because you see entries you do not recognize. Investigate first.

---

## PART 27 — Final pre-reboot gate

## STEP 52 — Check everything

Run:

```findmnt -R /
cat /etc/fstab
findmnt --verify --verbose
cat /etc/hostname
cat /etc/locale.conf
cat /etc/vconsole.conf
id <your-username>
systemctl is-enabled NetworkManager.service
pacman -Q linux linux-firmware
ls -lh /boot
bootctl --esp-path=/boot status
bootctl --esp-path=/boot list
efibootmgr -v
```text

Replace `<your-username>` with your actual username.

> **You should be able to answer YES to all of these:**

- Is the root filesystem mounted correctly?
- Is the ESP mounted at `/boot`?
- Does fstab contain the expected filesystems?
- Does fstab verify successfully?
- Is the hostname correct?
- Is the locale configured?
- Is the keyboard layout configured?
- Does the user exist?
- Is NetworkManager enabled?
- Is the kernel installed?
- Is the initramfs present?
- Is systemd-boot installed?
- Does an Arch boot entry exist?
- Does the UEFI boot entry exist?

If one answer is **NO**, stop and repair it before rebooting.

---

## PART 28 — Exit safely

## STEP 53 — Leave the installed system

If you are inside the systemd-mode chroot:

```bash
exit
```text

You should return to the live installer shell.

> **Verify:**

```findmnt -R /mnt
```text

---

## STEP 54 — Unmount the installation

> **⌨️ Run:**

```umount -R /mnt
```text

> **Verify:**

```findmnt -R /mnt
```text

> **Correct result:**

There should be no remaining mounted filesystem under `/mnt`.

> **❌ If unmount reports "target is busy":**

Do not use `umount -l` blindly.

Check what is using the mount:

```fuser -vm /mnt
```text

Leave any shell currently inside `/mnt`, then retry.

---

## PART 29 — Reboot

## STEP 55 — Final disk check before reboot

> **⌨️ Run:**

```lsblk -o NAME,SIZE,FSTYPE,MOUNTPOINTS,MODEL
```text

The target filesystems should no longer be mounted under `/mnt`.

> **STEP 56 — Reboot:**

```reboot
```text

When the firmware begins the next boot, remove the USB installer if necessary so the computer boots from the internal disk.

---

## PART 30 — First boot

## STEP 57 — Choose Arch Linux

The system should show the systemd-boot menu.

Choose:

```text
Arch Linux
```text

> **Correct boot chain:**

You should see the machine proceed through:

```UEFI
→ systemd-boot
→ Arch kernel
→ initramfs
→ systemd
→ login
```text

> **❌ If you return to firmware:**

Use the [boot recovery guide](../08-bootloader/03-boot-recovery.md).

Do not repartition the disk just because the boot entry failed.

---

## STEP 58 — Log in

At the text login prompt:

Enter the username created earlier.

Then enter its password.

> **Correct result:**

You reach a shell as your normal user.

Verify:

```whoami
id
```text

---

## PART 31 — First live-system verification

## STEP 59 — Verify the running kernel

```uname -r
```text

> **Correct result:**

You see an Arch Linux kernel version.

---

## STEP 60 — Verify the root filesystem

```findmnt /
```text

> **Correct result:**

The root filesystem is mounted at `/`.

---

## STEP 61 — Verify the boot filesystem

```findmnt /boot
```text

> **Correct result:**

The EFI System Partition is mounted at `/boot`.

---

## STEP 62 — Verify networking

```systemctl is-active NetworkManager.service
ip -br address
ping -c 3 ping.archlinux.org
```text

> **Correct result:**

- NetworkManager is active.
- The network interface has an address.
- Ping receives replies.

> **❌ If network fails:**

Read:

[Network troubleshooting](../99-troubleshooting/network.md)

Do not install a second network manager at random.

---

## STEP 63 — Verify time

Now that you are on the real running system, systemd status tools are appropriate.

Run:

```timedatectl status
```text

> **Correct result:**

The timezone and clock state are correct.

---

## STEP 64 — Verify microcode

```journalctl -k --grep='microcode:'
```text

> **Correct result:**

You may see a microcode update message.

It is also possible that the CPU firmware is already current and no update message appears.

The important point is that the correct microcode package was installed for the CPU vendor.

---

## PART 32 — Update the new system

## STEP 65 — Perform the first full update

> **🎯 Goal:**

Bring the newly installed system to the current repository state.

> **⌨️ Run:**

```sudo pacman -Syu
```text

Confirm the package transaction when prompted.

> **Correct result:**

The system updates without a fatal error.

> **⚠️ Important:**

Arch Linux is a rolling-release distribution. Use complete system upgrades rather than selectively upgrading random packages.

> **❌ If pacman fails:**

Read the error.

Start with:

[Package manager troubleshooting](../99-troubleshooting/package-manager.md)

---

## PART 33 — Install the desktop

## STEP 66 — Install GNOME

This guide uses GNOME as its beginner desktop baseline.

> **⌨️ Run:**

```sudo pacman -S gnome
```text

When pacman asks you to choose packages from the group, the default selection is normally the complete group. Review the list and accept the default unless you intentionally know which components you are excluding.

> **Why GNOME?:**

This is not a claim that GNOME is the only or universally best desktop. It is simply the baseline used by this linear beginner path.

GNOME provides an integrated graphical desktop and uses GDM as its graphical login manager.

---

## STEP 67 — Enable GDM

> **⌨️ Run:**

```sudo systemctl enable gdm.service
```text

> **Verify:**

```systemctl is-enabled gdm.service
```text

Expected:

```text
enabled
```text

> **Important:**

Do not enable several display managers at the same time.

---

## PART 34 — Reboot into the desktop

## STEP 68 — Reboot

```sudo reboot
```text

> **Expected sequence:**

```systemd-boot
    ↓
Arch Linux
    ↓
systemd
    ↓
GDM
    ↓
GNOME login screen
```text

---

## STEP 69 — Log into GNOME

Select the user created earlier.

Enter the password.

> **Correct result:**

The GNOME desktop appears.

---

## PART 35 — Final health check

## STEP 70 — Check the desktop session

Open Terminal and run:

```echo "$XDG_CURRENT_DESKTOP"
echo "$XDG_SESSION_TYPE"
```text

> **Correct result:**

You should see a GNOME-related desktop value and normally a Wayland session type on a supported modern setup.

The exact environment can differ with hardware and configuration.

---

## STEP 71 — Check failed services

```systemctl --failed
```text

> **Correct result:**

Ideally:

```0 loaded units listed
```text

If a failed service appears, do not immediately reinstall the whole system.

Inspect:

```systemctl status <service>
journalctl -u <service> -b --no-pager
```text

---

## STEP 72 — Check storage

```lsblk -f
df -h
findmnt
```text

> **Correct result:**

- root filesystem exists and is mounted;
- ESP exists and is mounted;
- available disk space is sensible.

---

## STEP 73 — Check memory

```free -h
```text

This gives a baseline for installed RAM and current memory use.

Do not treat "used memory" alone as a failure. Linux uses available RAM for useful caching.

---

## STEP 74 — Check hardware

```lspci -k
lsusb
lscpu
```text

If a device is not working, use the hardware troubleshooting path instead of installing random drivers.

---

## STEP 75 — Check the boot path one last time

```bootctl status
```text

> **Correct result:**

systemd-boot should report the installed boot manager and current boot information.

---

## PART 36 — Installation is complete

## You are done when all of these are true

> **Storage:**

- [ ] Correct target disk was used.
- [ ] Root filesystem mounts at `/`.
- [ ] ESP mounts at `/boot`.
- [ ] fstab is valid.

> **Boot:**

- [ ] UEFI mode was used.
- [ ] systemd-boot is installed.
- [ ] Arch Linux entry exists.
- [ ] Kernel and initramfs exist.
- [ ] The computer can reboot without the USB installer.

> **User:**

- [ ] Normal user exists.
- [ ] Normal user can log in.
- [ ] User belongs to `wheel`.
- [ ] sudo works.

> **Network:**

- [ ] NetworkManager is enabled.
- [ ] NetworkManager is active.
- [ ] Internet works.

> **System:**

- [ ] Timezone is correct.
- [ ] Locale is generated.
- [ ] Hostname is correct.
- [ ] CPU microcode package matches the CPU vendor.
- [ ] System is updated.

> **Desktop:**

- [ ] GNOME starts.
- [ ] GDM starts.
- [ ] User can log in graphically.

> **Recovery:**

- [ ] You know where the boot recovery guide is.
- [ ] You know where the general recovery guide is.
- [ ] You have a backup.

---

## PART 37 — What to do when something goes wrong

Do not use "try random commands" as a troubleshooting strategy.

Use this order:

```text
1. STOP
2. Do not erase anything
3. Record the exact error
4. Identify the layer
5. Check the current state
6. Make the smallest repair
7. Verify
8. Reboot only when the layer is healthy
```text

## If the computer will not boot

Start with:

- [Boot troubleshooting](../99-troubleshooting/boot.md)
- [Boot recovery](../08-bootloader/03-boot-recovery.md)
- [Recovery guide](../99-troubleshooting/recovery.md)

Useful evidence:

```bash
lsblk -f
efibootmgr -v
bootctl status
```text

## If the internet does not work

Start with:

- [Network troubleshooting](../99-troubleshooting/network.md)
- [Wireless and network recovery](../04-network/06-wireless-and-network-recovery.md)

Evidence:

```bash
ip -br link
ip -br address
systemctl status NetworkManager
```text

## If pacman fails

Start with:

- [Package manager troubleshooting](../99-troubleshooting/package-manager.md)
- [Package signature troubleshooting](../99-troubleshooting/package-signatures.md)

Do not perform a partial system upgrade.

## If the desktop does not start

Switch to a TTY if possible and inspect:

```systemctl --failed
systemctl status gdm
journalctl -b -p err..alert --no-pager
```text

Then use:

- [Display troubleshooting](../99-troubleshooting/display.md)
- [Wayland/display stack](../11-hardware/05-wayland-display-stack.md)

---

## PART 38 — The five rules that prevent most beginner mistakes

## Rule 1 — Never guess a disk

Always run:

```bash
lsblk -o NAME,SIZE,MODEL,FSTYPE,MOUNTPOINTS
```text

Then identify the target by evidence.

## Rule 2 — Never format before verifying

Before every `mkfs`, ask:

> "What exact partition will this command format?"

## Rule 3 — Never reboot with an unknown boot state

Before reboot:

```bash
cat /etc/fstab
findmnt --verify --verbose
ls -lh /boot
bootctl status
bootctl list
efibootmgr -v
```text

## Rule 4 — Never repair by destroying evidence

When something fails, preserve:

```bash
date
uname -r
lsblk -f
findmnt
systemctl --failed
journalctl -b -p err..alert --no-pager
```text

## Rule 5 — One change at a time

If you change five things and the problem disappears, you do not know which change fixed it.

Make the smallest change that can test your hypothesis.

---

## PART 39 — What this guide deliberately does not hide

This is a beginner guide, but Arch Linux is still a manual distribution.

You are expected to learn:

- what your disk is;
- what a partition is;
- what an ESP is;
- why `/boot` matters;
- what fstab does;
- what chroot means;
- why a bootloader exists;
- why a normal user is preferable to root;
- how to read a terminal error;
- how to recover instead of reinstalling immediately.

The goal is not to make you blindly copy commands.

The goal is to make every command understandable enough that you can stop safely.

---

# References

Use these authoritative sources when this guide and a future Arch release appear to disagree:

- [Arch Linux Downloads](https://archlinux.org/download/)
- [ArchWiki — Installation guide](https://wiki.archlinux.org/title/Installation_guide)
- [ArchWiki — Pacstrap](https://wiki.archlinux.org/title/Pacstrap)
- [Arch manual — arch-chroot](https://man.archlinux.org/man/arch-chroot.8)
- [ArchWiki — systemd-boot](https://wiki.archlinux.org/title/Systemd-boot)
- [ArchWiki — Microcode](https://wiki.archlinux.org/title/Microcode)
- [ArchWiki — Sudo](https://wiki.archlinux.org/title/Sudo)
- [ArchWiki — NetworkManager](https://wiki.archlinux.org/title/NetworkManager)
- [ArchWiki — GNOME](https://wiki.archlinux.org/title/GNOME)
- [ArchWiki — GDM](https://wiki.archlinux.org/title/GDM)

> **Maintenance note:** Arch Linux is rolling release. Package names, installer behavior, firmware requirements, bootloader behavior, and desktop dependencies can change. This file should be reviewed against the current ArchWiki and Arch Linux release information whenever a new installation is being documented.
