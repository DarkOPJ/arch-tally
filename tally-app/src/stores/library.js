import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { LIBRARY_DOCS } from '@/data/mock'

const STATUS_LABELS = { ready: 'Ready', processing: 'Processing', failed: 'Needs OCR' }

export const useLibraryStore = defineStore('library', () => {
  const docs = ref(LIBRARY_DOCS.map((d) => ({ ...d })))
  const filter = ref('all')
  const query = ref('')

  const visibleDocs = computed(() =>
    docs.value
      .filter((d) => filter.value === 'all' || d.st === filter.value)
      .filter((d) => !query.value || d.name.toLowerCase().includes(query.value.toLowerCase()))
      .map((d) => ({
        ...d,
        status:
          d.st === 'failed' && d.type === 'XLSX' ? 'Password protected' : STATUS_LABELS[d.st],
        dot: d.st === 'ready' ? 'var(--accent)' : 'var(--surface)',
        lineStyle: d.st === 'processing' ? 'dashed' : 'solid',
        lineColor: d.st === 'failed' ? 'var(--accent)' : 'var(--line)',
      }))
  )

  const countLabel = computed(
    () => `Showing ${visibleDocs.value.length} of ${docs.value.length + 204} documents`
  )

  function setFilter(id) {
    filter.value = id
  }
  function setQuery(q) {
    query.value = q
  }

  return { docs, filter, query, visibleDocs, countLabel, setFilter, setQuery }
})
