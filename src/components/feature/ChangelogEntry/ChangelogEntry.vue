<script lang="ts" setup>
import { IChangelogList } from '@/types/general'
import { marked } from 'marked'

const props = defineProps({
  entry: {
    type: Object as () => IChangelogList,
    required: true
  }
})

const { translate, getLanguage } = useTranslator()

const markdownBody = computed(() => {
  if (!props.entry.body) return null
  return marked(props.entry.body)
})
</script>

<template>
  <div>
    <div class="flex items-center gap-3 mb-3">
      <div class="rounded px-2 py-1" :class="[`changelogColors--${entry.type}`]">
        {{ translate(entry.type) }}
      </div>
      <div class="text-slate-500">
        {{ new Date(entry.changelogCreatedAt).toLocaleDateString(getLanguage()) }}
      </div>
    </div>
    <h2 class="text-xl font-medium mb-4">
      {{ entry.title }}
    </h2>
    <div
      v-if="markdownBody"
      class="richTextContent richTextContent--changelog"
      v-html="markdownBody"
    />
  </div>
</template>
