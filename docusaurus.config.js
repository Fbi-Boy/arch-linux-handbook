import {themes as prismThemes} from 'prism-react-renderer';

const config = {
  title: 'Arch Linux Handbook',
  tagline: 'Install. Configure. Understand. Recover.',
  favicon: 'img/favicon.svg',
  url: 'https://fbi-boy.github.io',
  baseUrl: '/arch-linux-handbook/',
  organizationName: 'Fbi-Boy',
  projectName: 'arch-linux-handbook',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  markdown: {hooks: {onBrokenMarkdownLinks: 'throw'}},

  i18n: {defaultLocale: 'en', locales: ['en']},

  presets: [
    ['classic', {
      docs: {
        sidebarPath: './sidebars.js',
        showLastUpdateTime: true,
        breadcrumbs: true,
        routeBasePath: 'docs',
      },
      blog: false,
      pages: {path: 'src/pages'},
      theme: {customCss: './src/css/custom.css'},
    }],
  ],

  themeConfig: {
    image: 'img/arch-linux-handbook-social-card.svg',
    metadata: [{
      name: 'description',
      content: 'A professional Arch Linux installation, configuration, troubleshooting, and recovery handbook.',
    }],
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
      disableSwitch: false,
    },
    navbar: {
      title: 'Arch Linux Handbook',
      logo: {
        alt: 'Arch Linux Handbook',
        src: 'img/logo.svg',
        srcDark: 'img/logo-dark.svg',
        href: '/arch-linux-handbook/',
      },
      items: [
        {to: '/docs/introduction/00-introduction', label: 'Handbook', position: 'left'},
        {to: '/docs/installation/06-installation', label: 'Installation', position: 'left'},
        {
          type: 'dropdown',
          label: 'Guides',
          position: 'left',
          items: [
            {to: '/docs/desktop/10-desktop', label: 'Desktop'},
            {to: '/docs/hardware/11-hardware', label: 'Hardware'},
            {to: '/docs/security/12-security', label: 'Security'},
            {to: '/docs/development/13-development', label: 'Development'},
          ],
        },
        {to: '/docs/troubleshooting/99-troubleshooting', label: 'Recovery', position: 'left'},
        {type: 'search', position: 'right'},
        {href: 'https://github.com/Fbi-Boy/arch-linux-handbook', label: 'GitHub', position: 'right'},
      ],
    },
    docs: {
      sidebar: {hideable: true, autoCollapseCategories: true},
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Handbook',
          items: [
            {label: 'Introduction', to: '/docs/introduction/00-introduction'},
            {label: 'Installation', to: '/docs/installation/06-installation'},
            {label: 'Troubleshooting', to: '/docs/troubleshooting/99-troubleshooting'},
          ],
        },
        {
          title: 'Project',
          items: [
            {label: 'GitHub', href: 'https://github.com/Fbi-Boy/arch-linux-handbook'},
            {label: 'Quality loop', to: '/docs/introduction/contributor-quality-loop'},
          ],
        },
      ],
      copyright: 'Arch Linux Handbook. Community documentation project.',
    },
  },
};

export default config;
