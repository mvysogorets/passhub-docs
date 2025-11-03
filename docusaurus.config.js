const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
  title: 'PassHub docs',
  tagline: 'Dinosaurs are cool',
  url: 'https://passhub.net',

  baseUrl: '/doc/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/passhub-logo-128.png',
  organizationName: 'WWPass', // Usually your GitHub org/user name.
  projectName: 'PassHub', // Usually your repo name.

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: "/",

          // Please change this to your repo.
          // editUrl: 'https://github.com/facebook/docusaurus/edit/main/website/',
        },
        gtag: {
          trackingID: 'GTM-K7WDL5R',
          anonymizeIP: true,
        },

        /*
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/main/website/blog/',
        },
        */

        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'docs',
        logo: {
          alt: 'PassHub Logo',
          src: 'img/new_ph_logo.svg',
        },
        items: [
          /*          
                    {
                      type: 'doc',
                      docId: 'intro',
                      position: 'left',
                      label: 'Tutorial',
                    },
          */

          /*
                    {to: '/blog', label: 'Blog', position: 'left'},
                    */
          {
            href: 'https://github.com/wwpass/passhub',
            html: '<img src="/doc/img/github.svg" width=24 height=24 style="margin-top:5px">',
            position: 'right',
            className: 'nav-link-github '
          },
          {
            href: 'https://twitter.com/PassHubNet',
            html: '<img src="/doc/img/twitter.svg" width=24 height=24 style="margin-top:5px">',
            position: 'right',
            className: 'nav-link-twitter'
          },
        ],
      },
      footer: {
        style: 'dark',
        /*        
                links: [
                  {
                    href: 'https://github.com/wwpass/passhub',
                    html: '<img src="img/github.svg" width=24 height=24 style="margin-top:5px">',
                    position: 'right',
                    className: 'nav-link-github '
                  },
                  {
                    href: 'https://twitter.com/PassHubNet',
                    html: '<img src="img/twitter.svg" width=24 height=24 style="margin-top:5px">',
                    position: 'right',
                    className: 'nav-link-twitter'
                  },
                ],
        */
        copyright: `Copyright © ${new Date().getFullYear()} WWPass. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['php'],
      },
    }),
});
