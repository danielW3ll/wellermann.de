// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import TagBadges from './components/TagBadges.vue'
import TagsIndex from './components/TagsIndex.vue'
import './style.css'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,

  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // Render Tag badges at the bottom of doc content
      'doc-after': () => h(TagBadges)
    })
  },
  enhanceApp({ app, router, siteData }) {
    // Register tag index component so it can be used in markdown
    app.component('TagsIndex', TagsIndex)
  }
}
