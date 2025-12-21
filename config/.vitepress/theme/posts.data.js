import { createContentLoader } from 'vitepress'

export default createContentLoader('**/*.md', {
  includeSrc: false,
  render: false,
  excerpt: false,
  transform(rawData) {
    return rawData
      .filter(page => page.frontmatter && page.frontmatter.tags)
      .map(page => ({
        title: page.frontmatter.title || '',
        url: page.url,
        frontmatter: page.frontmatter,
        excerpt: page.frontmatter.description || page.excerpt || ''
      }))
      .sort((a, b) => {
        const dateA = String(a.frontmatter.date || '')
        const dateB = String(b.frontmatter.date || '')
        return dateB.localeCompare(dateA)
      })
  }
})
