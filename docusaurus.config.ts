import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Uniii docs',
  tagline: 'Notas de estudos',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.uniii.com.br',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/uni-salva/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Uniliva', // Usually your GitHub org/user name.
  projectName: 'uni-salva', // Usually your repo name.
  deploymentBranch : "gh-pages",
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR'],
  },
  
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Uniii Docs',
      logo: {
        alt: 'Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'developerNotesSidebar',
          position: 'left',
          label: 'Developer Notes',
        },{
          type: 'docSidebar',
          sidebarId: 'cloudNotesSidebar',
          position: 'left',
          label: 'Cloud Notes',
        },{
          type: 'docSidebar',
          sidebarId: 'devopsNotesSidebar',
          position: 'left',
          label: 'DevOps Notes',
        },
        {
          href: 'https://www.linkedin.com/in/uniliva',
          label: 'Linkedin',
          position: 'right',
        },
        {
          href: 'https://github.com/Uniliva',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [     ],
      copyright: `Copyright © ${new Date().getFullYear()} Uniii .`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
