<script setup>
import { useChatStore } from '@/stores/chat'

const chat = useChatStore()
</script>

<template>
  <aside v-if="chat.showSources" aria-label="Sources" class="sources-panel">
    <div class="panel-head">
      <h2>Sources</h2>
      <span class="mono count">{{ chat.sources.length }} retrieved</span>
    </div>

    <button
      v-for="s in chat.sources"
      :key="s.n"
      type="button"
      class="source-card"
      :class="{ active: chat.activeSource === s.n }"
      @click="chat.selectSource(s.n)"
    >
      <span class="source-top">
        <span class="cite-chip num">{{ s.n }}</span>
        <span class="file-name">{{ s.file }}</span>
        <span class="mono score">{{ s.score }}</span>
      </span>
      <span class="loc">{{ s.loc }}</span>
      <span class="mono snippet">{{ s.snippet }}</span>
    </button>

    <RouterLink to="/document" class="btn open-doc">
      Open selected in document viewer
    </RouterLink>

    <div class="panel-foot">
      <div class="foot-row">
        <span>Retrieval</span><span class="mono">hybrid · top-k 12</span>
      </div>
      <div class="foot-row">
        <span>Index updated</span><span class="mono">2h ago</span>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sources-panel {
  flex: 1 1 320px;
  max-width: 100%;
  border-left: 1px solid var(--line);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  background: var(--bg);
}
.panel-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.panel-head h2 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
}
.count {
  font-size: 12px;
  color: var(--muted);
}
.source-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  text-align: left;
  padding: 14px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--surface);
  cursor: pointer;
}
.source-card.active {
  border-color: var(--accent);
  background: var(--accent-soft);
}
.source-top {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}
.num {
  cursor: default;
}
.file-name {
  font-weight: 500;
  font-size: 13px;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.score {
  font-size: 11px;
  color: var(--muted);
}
.loc {
  font-size: 12px;
  color: var(--muted);
}
.snippet {
  font-size: 12px;
  line-height: 1.6;
  padding: 10px;
  border: 1px dashed var(--line-strong);
  border-radius: 6px;
}
.open-doc {
  height: 40px;
  border-color: var(--accent);
  font-size: 13px;
  color: var(--text);
  width: 100%;
}
.panel-foot {
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 12px;
  color: var(--muted);
}
.foot-row {
  display: flex;
  justify-content: space-between;
}
@media (max-width: 900px) {
  .sources-panel {
    border-left: none;
    border-top: 1px solid var(--line);
  }
}
</style>
