const sidebar = [
  {
    type: 'category',
    label: 'Start Here',
    collapsed: false,
    items: [
      'introduction/00-introduction',
      'introduction/architecture',
      'introduction/content-model',
      'introduction/references',
      'introduction/roadmap',
    ],
  },
  {
    type: 'category',
    label: 'Installation',
    collapsed: false,
    items: [
      'preparation/01-preparation',
      'installation-media/02-installation-media',
      'boot/03-boot',
      'network/04-network',
      'storage/05-storage',
      'installation/06-installation',
      'installation/installation-runbook',
      'installation/installation-decision-tree',
      'installation/verification-checklist',
      'system-configuration/07-system-configuration',
      'bootloader/08-bootloader',
    ],
  },
  {
    type: 'category',
    label: 'Post-Install',
    items: [
      'desktop/10-desktop',
      'hardware/11-hardware',
      'security/12-security',
      'development/13-development',
      'dual-boot/14-dual-boot',
      'maintenance/15-maintenance',
    ],
  },
  {
    type: 'category',
    label: 'Troubleshooting & Recovery',
    items: [
      'troubleshooting/99-troubleshooting',
      'troubleshooting/boot',
      'troubleshooting/network',
      'troubleshooting/package-manager',
      'troubleshooting/display',
      'troubleshooting/recovery',
    ],
  },
];
export default {handbook: sidebar};
