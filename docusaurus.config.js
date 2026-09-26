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
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
          showLastUpdateTime: true,
          breadcrumbs: true,
          routeBasePath: 'docs',
        },
        blog: false,
        pages: {
          path: 'src/pages',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig: {
    image: 'img/arch-linux-handbook-social-card.svg',
    metadata: [
      {
        name: 'description',
        content: 'A professional Arch Linux installation, configuration, troubleshooting, and recovery handbook.',
      },
    ],

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
        {to: '/docs/00-introduction', label: 'Handbook', position: 'left'},
        {to: '/docs/06-installation', label: 'Installation', position: 'left'},
        {to: '/docs/10-desktop', label: 'Desktop', position: 'left'},
        {to: '/docs/11-hardware', label: 'Hardware', position: 'left'},
        {to: '/docs/12-security', label: 'Security', position: 'left'},
        {to: '/docs/13-development', label: 'Development', position: 'left'},
        {to: '/docs/99-troubleshooting', label: 'Troubleshooting', position: 'left'},
        {type: 'search', position: 'right'},
        {href: 'https://github.com/Fbi-Boy/arch-linux-handbook', label: 'GitHub', position: 'right'},
      ],
    },

    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
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
            {label: 'Introduction', to: '/docs/00-introduction'},
            {label: 'Installation', to: '/docs/06-installation'},
            {label: 'Troubleshooting', to: '/docs/99-troubleshooting'},
          ],
        },
        {
          title: 'Project',
          items: [
            {label: 'GitHub', href: 'https://github.com/Fbi-Boy/arch-linux-handbook'},
            {label: 'Contributing', to: '/docs/00-introduction/content-model'},
          ],
        },
      ],
      copyright: 'Arch Linux Handbook. Community documentation project.',
    },
  },
};

export default config;
