<template>
  <div v-if="shouldShowTags" class="tag-badges">
    <a
      v-for="tag in tags"
      :key="tag"
      :href="`/tags#${slug(tag)}`"
      class="tag-badge"
    >
      {{ tag }}
    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'

const { frontmatter } = useData()
const route = useRoute()

// Make tags reactive - recompute when route/frontmatter changes
const tags = computed(() => {
  const fm = frontmatter?.value || frontmatter
  const rawTags = fm?.tags || []
  return Array.isArray(rawTags) ? rawTags : []
})

// Don't show tags on the tags index page itself
const shouldShowTags = computed(() => {
  return tags.value.length > 0 && !route.path.includes('/tags')
})

function slug(s) {
  return String(s)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9äöüß]+/g, '-')
    .replace(/^-|-$/g, '')
}
</script>

<style scoped>
.tag-badges {
  margin: 0.5rem 0 1rem;
}
.tag-badge {
  display: inline-block;
  margin-right: 0.5rem;
  margin-bottom: 0.25rem;
  padding: 0.25rem 0.55rem;
  border-radius: 999px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 0.85em;
  text-decoration: none;
  border: 1px solid var(--vp-c-divider);
}
.tag-badge:hover {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}
</style>
