<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppIcon from './AppIcon.vue'
import ThemeToggle from './ThemeToggle.vue'
import { useChatStore } from '@/stores/chat'
import { USER } from '@/data/mock'

defineProps({
  // Chat view shows the extended sidebar (search, in-chat files, user row)
  detailed: { type: Boolean, default: false },
  open: { type: Boolean, default: false },
})
const emit = defineEmits(['close'])

const route = useRoute()
const chat = useChatStore()
const search = ref('')

const NAV = [
  { to: '/chat', label: 'Chats', icon: 'chat', match: /^\/chat/ },
  { to: '/sources', label: 'Browse sources', icon: 'folder', match: /^\/sources/ },
  { to: '/library', label: 'Library', icon: 'file', match: /^\/library/ },
  { to: '/connections', label: 'Connections', icon: 'database', match: /^\/connections/ },
  { to: '/settings', label: 'Settings', icon: 'gear', match: /^\/settings/ },
]

const filteredHistory = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return chat.chatHistory
  return chat.chatHistory
    .map((g) => ({ ...g, items: g.items.filter((i) => i.title.toLowerCase().includes(q)) }))
    .filter((g) => g.items.length)
})

// Close the mobile drawer on navigation
watch(
  () => route.fullPath,
  () => emit('close')
)
</script>

<template>
  <aside class="side" :class="{ open }" aria-label="Primary">
    <div class="side-top">
      <div class="brand">
        <RouterLink to="/chat" class="brand-left" @click="emit('close')">
          <span class="brand-mark">T</span>
          <span class="brand-name">Tally</span>
        </RouterLink>
        <ThemeToggle />
      </div>
      <RouterLink to="/new" class="btn new-chat-btn" active-class="active-new">
        <AppIcon name="plus" /> New chat
      </RouterLink>
      <label v-if="detailed" class="search-field">
        <AppIcon name="search" :size="15" />
        <input
          v-model="search"
          type="search"
          placeholder="Search chats"
          aria-label="Search chats"
        />
      </label>
    </div>

    <nav aria-label="Main" class="nav-col">
      <RouterLink
        v-for="item in NAV"
        :key="item.to"
        :to="item.to"
        class="nav-link"
        :class="{ active: item.match.test(route.path) && !(item.to === '/chat' && route.path === '/new') }"
      >
        <AppIcon :name="item.icon" /> {{ item.label }}
      </RouterLink>
    </nav>

    <nav v-if="filteredHistory.length" aria-label="Chats" class="nav-col">
      <template v-for="group in filteredHistory" :key="group.group">
        <div class="side-section-title" :class="{ spaced: group.group !== 'Today' }">
          {{ group.group }}
        </div>
        <RouterLink
          v-for="c in group.items"
          :key="c.id"
          :to="`/chat/${c.id}`"
          class="hist-link"
          :class="{ current: route.path === `/chat/${c.id}` }"
        >
          {{ c.title }}
        </RouterLink>
      </template>
    </nav>

    <div v-if="detailed" class="in-chat-files">
      <div class="files-head">
        <div class="side-section-title no-pad">In this chat</div>
        <RouterLink to="/sources" class="add-files">Add files</RouterLink>
      </div>
      <div v-for="f in chat.contextFiles" :key="f.name" class="file-row">
        <span>{{ f.name }}</span>
        <span class="mono file-meta">{{ f.meta }}</span>
      </div>
    </div>

    <div v-if="detailed" class="user-row">
      <span class="avatar">{{ USER.initials }}</span>
      <span class="user-info">
        <span class="user-name">{{ USER.name }}</span>
        <span class="user-role">{{ USER.role }}</span>
      </span>
    </div>
  </aside>
</template>

<style scoped>
.side-top {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.brand {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px 0 8px;
}
.brand-left {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--text);
}
.brand-name {
  font-weight: 600;
  font-size: 15px;
  letter-spacing: -0.01em;
}
.new-chat-btn {
  height: 40px;
  border-color: var(--line-strong);
  color: var(--text);
}
.new-chat-btn.active-new {
  border-color: var(--accent);
}
.nav-col {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.spaced {
  padding-top: 16px;
}
.no-pad {
  padding: 0;
}
.hist-link {
  display: block;
  padding: 8px 10px;
  border: 1px solid transparent;
  border-radius: 8px;
  text-decoration: none;
  color: var(--muted);
}
.hist-link:hover {
  color: var(--text);
  background: var(--side-active);
}
.hist-link.current {
  border-color: var(--accent);
  font-weight: 500;
  color: var(--text);
}
.in-chat-files {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.files-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0 8px 8px;
}
.add-files {
  font-size: 12px;
}
.file-row {
  display: flex;
  justify-content: space-between;
  padding: 6px 10px;
  min-width: 0;
}
.file-row span:first-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.file-meta {
  font-size: 12px;
  color: var(--muted);
  flex: 0 0 auto;
  margin-left: 8px;
}
.user-info {
  display: flex;
  flex-direction: column;
  line-height: 1.3;
  min-width: 0;
}
.user-name {
  font-weight: 500;
}
.user-role {
  font-size: 12px;
  color: var(--muted);
}
</style>
