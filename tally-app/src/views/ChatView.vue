<script setup>
import { ref, computed } from 'vue'
import AppShellLayout from '@/components/AppShellLayout.vue'
import AppIcon from '@/components/AppIcon.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import AskBox from '@/components/AskBox.vue'
import AnswerBlock from '@/components/chat/AnswerBlock.vue'
import SourcesPanel from '@/components/chat/SourcesPanel.vue'
import { useChatStore } from '@/stores/chat'

const chat = useChatStore()
const drawerOpen = ref(false)

const chatId = computed(() => 'current')
const draft = computed({
  get: () => chat.drafts[chatId.value] || '',
  set: (v) => chat.setDraft(chatId.value, v),
})

const sourcesChip = computed(
  () => `${chat.sourceCount} sources · Q3 2026 · West`
)

function onSend() {
  chat.ask(chatId.value, draft.value)
}
</script>

<template>
  <AppShellLayout v-model:drawer-open="drawerOpen" detailed>
    <main class="main chat-main">
      <!-- Mobile top bar -->
      <div class="mobile-bar mobile-only">
        <button type="button" class="icon-btn" aria-label="Menu" @click="drawerOpen = true">
          <AppIcon name="menu" :size="18" />
        </button>
        <span class="m-chat-title">Q3 West quota misses</span>
        <ThemeToggle />
      </div>

      <div class="chat-body">
        <div class="thread scroll-col">
          <div class="thread-inner">
            <template v-for="m in chat.messages" :key="m.id">
              <div v-if="m.role === 'user'" class="user-msg">{{ m.text }}</div>
              <div v-else-if="m.status === 'retrieving'" class="retrieving">
                <span class="brand-mark">T</span>
                <span class="mono">retrieving from {{ chat.sourceCount }} sources…</span>
              </div>
              <AnswerBlock v-else :data="m.data" />
            </template>
          </div>
        </div>

        <div class="composer-wrap">
          <div class="composer-inner">
            <AskBox
              v-model="draft"
              label="Ask about your sales data"
              placeholder="Ask about pipeline, quota, reps, accounts…"
              :sources-chip="sourcesChip"
              :busy="chat.pending"
              @send="onSend"
            />
            <p class="note">
              Answers are drawn from your indexed data and cite their sources. Check figures before
              sharing.
            </p>
          </div>
        </div>
      </div>

      <!-- Desktop sources panel -->
      <div class="desktop-only sources-wrap">
        <SourcesPanel />
      </div>

      <!-- Mobile sources toggle -->
      <button
        type="button"
        class="btn btn-sm sources-fab mobile-only"
        @click="chat.toggleSources()"
      >
        <AppIcon name="database" :size="14" />
        {{ chat.showSources ? 'Hide sources' : 'Show sources' }}
      </button>
      <div v-if="chat.showSources" class="mobile-sources mobile-only">
        <SourcesPanel />
      </div>
    </main>
  </AppShellLayout>
</template>

<style scoped>
.chat-main {
  height: 100vh;
  overflow: hidden;
  position: relative;
}
.mobile-bar {
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 16px;
  border-bottom: 1px solid var(--line);
}
.m-chat-title {
  font-weight: 600;
  font-size: 14px;
}
.chat-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.thread {
  padding: 24px 32px;
}
.thread-inner {
  max-width: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.user-msg {
  align-self: flex-end;
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 12px;
  background: var(--accent-fill);
  color: var(--on-accent);
}
.retrieving {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--accent);
}
.retrieving .mono {
  font-size: 12px;
}
.composer-wrap {
  padding: 0 32px 24px;
}
.composer-inner {
  max-width: 760px;
  margin: 0 auto;
}
.note {
  margin: 10px auto 0;
  text-align: center;
  font-size: 12px;
  color: var(--note);
}
.sources-wrap {
  flex: 1 1 320px;
  max-width: 380px;
  height: 100vh;
}
.sources-fab {
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 30;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
.mobile-sources {
  position: fixed;
  inset: 0;
  z-index: 35;
  background: var(--bg);
  flex-direction: column;
  overflow-y: auto;
}
@media (min-width: 901px) {
  .sources-fab,
  .mobile-sources {
    display: none !important;
  }
}
@media (max-width: 900px) {
  .thread {
    padding: 16px;
  }
  .composer-wrap {
    padding: 0 16px 16px;
  }
}
</style>
