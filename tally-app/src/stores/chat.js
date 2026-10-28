import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { ANSWER, SOURCES, CHAT_CONTEXT_FILES, CHAT_HISTORY } from '@/data/mock'

let nextMsgId = 100

/**
 * Chat store. `ask()` simulates retrieval + answer generation against the
 * mock corpus; replace the setTimeout block with a real API call later.
 */
export const useChatStore = defineStore('chat', () => {
  const messages = ref([
    { id: 1, role: 'user', text: ANSWER.question },
    { id: 2, role: 'assistant', status: 'done', data: ANSWER },
  ])
  const drafts = ref({}) // per-chat draft input
  const activeSource = ref(1)
  const showSources = ref(true)
  const chatHistory = ref(CHAT_HISTORY)
  const contextFiles = ref(CHAT_CONTEXT_FILES)
  const pending = ref(false)

  const sources = computed(() => SOURCES)
  const sourceCount = computed(() => SOURCES.length)

  function setDraft(chatId, text) {
    drafts.value[chatId] = text
  }

  function selectSource(n) {
    activeSource.value = n
    showSources.value = true
  }

  function toggleSources() {
    showSources.value = !showSources.value
  }

  function ask(chatId, question) {
    const q = (question || '').trim()
    if (!q || pending.value) return
    pending.value = true
    messages.value.push({ id: nextMsgId++, role: 'user', text: q })
    const placeholder = { id: nextMsgId++, role: 'assistant', status: 'retrieving' }
    messages.value.push(placeholder)
    setDraft(chatId, '')

    // Simulated retrieval latency — swap for fetch('/api/chat', …)
    setTimeout(() => {
      const idx = messages.value.findIndex((m) => m.id === placeholder.id)
      if (idx !== -1) {
        messages.value[idx] = {
          id: placeholder.id,
          role: 'assistant',
          status: 'done',
          data: { ...ANSWER, question: q },
        }
      }
      pending.value = false
    }, 1400)
  }

  return {
    messages,
    drafts,
    activeSource,
    showSources,
    chatHistory,
    contextFiles,
    pending,
    sources,
    sourceCount,
    setDraft,
    selectSource,
    toggleSources,
    ask,
  }
})
