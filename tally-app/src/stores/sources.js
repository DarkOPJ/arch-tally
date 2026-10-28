import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { BROWSE_FILES, INGEST_STAGES } from '@/data/mock'

export const useSourcesStore = defineStore('sources', () => {
  const files = ref(BROWSE_FILES.map((f) => ({ ...f, checked: f.status === 'Indexed' })))
  const selectedConnection = ref('Shared drive')
  const phase = ref('select') // 'select' | 'ingest'
  const stages = ref(INGEST_STAGES)
  let timer = null

  const chosen = computed(() => files.value.filter((f) => f.checked))
  const allSelected = computed(() => files.value.every((f) => f.checked))
  const selDetail = computed(() => {
    const totalKb = chosen.value.reduce((a, f) => a + f.kb, 0)
    const mb = (totalKb / 1024).toFixed(1)
    const indexed = chosen.value.filter((f) => f.status === 'Indexed').length
    return `${mb} MB · ${indexed} already in library, ${chosen.value.length - indexed} new`
  })

  function toggleFile(id) {
    const f = files.value.find((x) => x.id === id)
    if (f) f.checked = !f.checked
  }

  function toggleAll() {
    const target = !allSelected.value
    files.value.forEach((f) => (f.checked = target))
  }

  function clearSelection() {
    files.value.forEach((f) => (f.checked = false))
  }

  /** Simulate incremental ingestion progress per file. */
  function startIngest() {
    if (!chosen.value.length) return
    phase.value = 'ingest'
    const jobs = chosen.value.map((f) => ({
      id: f.id,
      name: f.name,
      type: f.type,
      pct: f.status === 'Indexed' ? 100 : 8,
      stage: f.status === 'Indexed' ? 'Ready' : 'Reading…',
    }))
    ingestJobs.value = jobs
    clearInterval(timer)
    timer = setInterval(() => {
      let done = true
      for (const j of ingestJobs.value) {
        if (j.pct >= 100) continue
        done = false
        j.pct = Math.min(100, j.pct + 7 + Math.floor(Math.random() * 10))
        j.stage =
          j.pct >= 100 ? 'Ready' : j.pct > 75 ? 'Embedding…' : j.pct > 40 ? 'Chunking…' : 'Reading…'
      }
      if (done) clearInterval(timer)
    }, 350)
  }

  const ingestJobs = ref([])
  const readyCount = computed(() => ingestJobs.value.filter((j) => j.pct >= 100).length)

  function backToSelect() {
    clearInterval(timer)
    phase.value = 'select'
  }

  function setConnection(name) {
    selectedConnection.value = name
  }

  return {
    files,
    selectedConnection,
    phase,
    stages,
    ingestJobs,
    readyCount,
    chosen,
    allSelected,
    selDetail,
    toggleFile,
    toggleAll,
    clearSelection,
    startIngest,
    backToSelect,
    setConnection,
  }
})
