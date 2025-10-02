import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "../things",
  title: "Daniel Wellermann",
  description: `
  Internetpräsenz von Daniel Wellermann, BIM-Koordinator und Entwickler aus Velen. Experte für DESITE MD/VDC Manager, IFC, BIM-Prozesse, Softwareentwicklung im Bauwesen, Linux, Open Source, 3D-Druck und Home-Server-Infrastruktur.
  `,
  lang: "de-DE",
  appearance: "force-dark",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    ['meta', { name: 'og:image:width', content: '1200' }],
    ['meta', { name: 'og:image:height', content: '630' }],
    ['meta', { name: 'og:image:type', content: 'image/png' }],
    ['meta', { name: 'og:site_name', content: 'wellermann.de' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@D_Wellermann' }],
    ['meta', { name: 'twitter:creator', content: '@D_Wellermann' }]

  ],
  transformHead: (ctx) => {
    console.log('Frontmatter:', ctx.description, ctx.title)
    // Add custom meta tags based on page frontmatter
    const tags = []

    // Only add description tags if description exists
    if (ctx.description) {
      tags.push(['meta', { name: 'description', content: ctx.description }])
      tags.push(['meta', { property: 'og:description', content: ctx.description }])
      tags.push(['meta', { name: 'twitter:description', content: ctx.description }])
    }

    // Only add title tags if title exists
    if (ctx.title) {
      const title = ctx.title
      tags.push(['meta', { property: 'og:title', content: title }])
      tags.push(['meta', { name: 'twitter:title', content: title }])
    }

    return tags
  },
  sitemap: {
    hostname: 'https://wellermann.de',
  },
  themeConfig: {
    footer: {
      message: 'Released under the MIT License.',
      copyright: '2012-now © Daniel Wellermann'
    },
    lastUpdated: {
      text: 'Zuletzt aktualisiert',
      dateStyle: 'full',
      timeStyle: 'medium'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      // Use trailing slash and activeMatch so this nav item stays active
      // for any route under /docs/
      { text: 'Docs', link: '/docs', activeMatch: '/docs/' },
      // Same for projects
      { text: 'Projects', link: '/projects', activeMatch: '/projects/' }
    ],

    sidebar: {
      '/docs/': [
        {
          text: 'Server/Cloud',
          collapsed: false,
          items: [
            { text: 'LXC Setup', link: '/docs/LXC_Setup' },

          ]
        },
        {
          text: 'Scripting',
          collapsed: false,
          items: [
            { text: 'WebApp Deploy Script', link: '/docs/WebApp_Deploy_Script' },
          ]
        }
      ],
      '/projects/': [
        {
          text: 'Projekte',

          items: [
            { text: 'Coming Soon...', link: '/projects/coming-soon' },

          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/wellermann/' },
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
      { icon: 'instagram', link: 'https://www.instagram.com/daniel.wellermann/' },
      { icon: 'facebook', link: 'https://www.facebook.com/wellermann.daniel' },


    ]
  }
})
