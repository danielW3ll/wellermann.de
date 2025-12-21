<template>
  <div class="tags-index">
    <h1>Tags</h1>
    <div class="tags-list">
      <button
        v-for="(entry, tag) in tagsMap"
        :key="tag"
        class="tag-badge"
        @click="selectTag(tag)">
        {{ tag }}
        <span class="count">{{ entry.length }}</span>
      </button>
    </div>

    <div v-if="selectedTag" class="tag-posts">
      <h2>Posts mit „{{ selectedTag }}"</h2>
      <ul>
        <li v-for="page in tagsMap[selectedTag]" :key="page.url">
          <a :href="page.url">{{ page.frontmatter.title || page.title }}</a>
          <small class="muted"> — {{ page.frontmatter.date || '' }}</small>
          <div v-if="page.frontmatter.description || page.excerpt" class="excerpt">
            {{ page.frontmatter.description || page.excerpt }}
          </div>
        </li>
      </ul>
    </div>

    <div v-else class="hint muted">Wähle einen Tag, um zu den zugehörigen Beiträgen zu gelangen.</div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import { useData } from 'vitepress'
import { data as posts } from '../posts.data.js'

const { site, theme } = useData()

const tagsMap = computed(() => {
  const map = {}
  
  // Use posts from data loader
  const pages = posts || []
  
  pages.forEach((p) => {
    const fm = p.frontmatter || {}
    const t = fm.tags
    if (!t) return
    const tags = Array.isArray(t) ? t : [t]
    tags.forEach((tag) => {
      const key = String(tag).trim()
      if (!key) return
      if (!map[key]) map[key] = []
      map[key].push(p)
    })
  })
  
  // sort posts in each tag by date desc
  Object.keys(map).forEach((k) => {
    map[k].sort((a, b) => {
      const dateA = String(a.frontmatter?.date || '')
      const dateB = String(b.frontmatter?.date || '')
      return dateB.localeCompare(dateA)
    })
  })
  
  return map
})

const selectedTag = ref(null)

function selectTag(tag) {
  selectedTag.value = tag
  // update hash so TagBadges links can point here
  history.replaceState(null, '', `#${slug(tag)}`)
}

function slug(s) {
  return String(s)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9äöüß]+/g, '-')
    .replace(/^-|-$/g, '')
}

onMounted(() => {
  // if there's a hash like #my-tag, preselect it
  const h = (location.hash || '').replace(/^#/, '')
  if (h) {
    // find matching tag key
    const found = Object.keys(tagsMap.value).find(k => slug(k) === h)
    if (found) selectedTag.value = found
  }
})
</script>

<style scoped>
.tags-index h1 {
  margin-bottom: 0.5rem;
}
.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.tag-badge {
  padding: 0.35rem 0.6rem;
  border-radius: 999px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  cursor: pointer;
}
.tag-badge .count {
  margin-left: 0.45rem;
  opacity: 0.8;
  font-size: 0.9em;
}
.tag-posts ul {
  list-style: none;
  padding-left: 0;
}
.tag-posts li {
  margin: 0.6rem 0;
}
.muted {
  color: var(--vp-c-text-2);
}
.excerpt {
  color: var(--vp-c-text-2);
  font-size: 0.95em;
}
.hint {
  margin-top: 1rem;
}
</style>
