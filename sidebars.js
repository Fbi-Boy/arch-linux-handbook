const sidebar = [
  {
    type: 'category',
    label: 'Start Here',
    collapsed: false,
    items: [
      '00-introduction',
      '00-introduction/architecture',
      '00-introduction/content-model',
      '00-introduction/references',
      '00-introduction/roadmap',
    ],
  },
  {
    type: 'category',
    label: 'Installation',
    collapsed: false,
    items: [
      '01-preparation',
      '02-installation-media',
      '03-boot',
      '04-network',
      '05-storage',
      '06-installation',
      '06-installation/01-installation-runbook',
      '06-installation/02-installation-decision-tree',
      '06-installation/03-verification-checklist',
      '07-system-configuration',
      '08-bootloader',
    ],
  },
  {
    type: 'category',
    label: 'Post-Install',
    items: [
      '10-desktop',
      '11-hardware',
      '12-security',
      '13-development',
      '14-dual-boot',
      '15-maintenance',
    ],
  },
  {
    type: 'category',
    label: 'Troubleshooting & Recovery',
    items: [
      '99-troubleshooting',
      '99-troubleshooting/boot',
      '99-troubleshooting/network',
      '99-troubleshooting/package-manager',
      '99-troubleshooting/display',
      '99-troubleshooting/recovery',
    ],
  },
];

export default {handbook: sidebar};
