<script setup>
import { ref } from 'vue'
import AppIcon from '../AppIcon.vue'
import { useChatStore } from '@/stores/chat'

const props = defineProps({
  data: { type: Object, required: true },
})

const chat = useChatStore()
const copied = ref(false)

function copyAnswer() {
  const text = [
    props.data.intro,
    ...props.data.drivers.map((d) => `- ${d.text}`),
  ].join('\n\n')
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      copied.value = true
      setTimeout(() => (copied.value = false), 1500)
    })
  }
}
</script>

<template>
  <article class="answer">
    <header class="answer-head">
      <span class="brand-mark">T</span>
      <strong class="tally-name">Tally</strong>
      <span class="mono retrieval">{{ data.retrieval }}</span>
    </header>

    <p class="intro">{{ data.intro }}</p>

    <div class="table-card">
      <table class="tbl attainment">
        <thead>
          <tr>
            <th>Rep</th>
            <th class="right">Quota</th>
            <th class="right">Closed won</th>
            <th class="right">Attainment</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in data.table" :key="row.rep">
            <td class="rep">{{ row.rep }}</td>
            <td class="right mono">{{ row.quota }}</td>
            <td class="right mono">{{ row.closed }}</td>
            <td class="right mono accent">{{ row.attainment }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <section class="drivers" aria-label="What drove the gap">
      <h3>What drove the gap</h3>
      <ul>
        <li v-for="(d, i) in data.drivers" :key="i">
          <span class="dash" aria-hidden="true">—</span>
          <span>
            {{ d.text }}
            <button
              type="button"
              class="cite-chip"
              :aria-label="`Show source ${d.cite}`"
              @click="chat.selectSource(d.cite)"
            >
              {{ d.cite }}
            </button>
          </span>
        </li>
      </ul>
    </section>

    <div class="answer-actions">
      <button type="button" class="action-btn" aria-label="Copy answer" title="Copy" @click="copyAnswer">
        <AppIcon :name="copied ? 'bookmark' : 'copy'" :size="15" />
      </button>
      <button type="button" class="action-btn" aria-label="Regenerate answer" title="Regenerate">
        <AppIcon name="refresh" :size="15" />
      </button>
      <button type="button" class="action-btn" aria-label="Save to report" title="Save to report">
        <AppIcon name="bookmark" :size="15" />
      </button>
    </div>

    <section class="followups" aria-label="Follow up">
      <div class="side-section-title no-pad">Follow up</div>
      <div class="pill-row">
        <button
          v-for="f in data.followups"
          :key="f"
          type="button"
          class="followup-pill"
          @click="chat.setDraft($route.params.id || 'default', f)"
        >
          {{ f }}
        </button>
      </div>
    </section>
  </article>
</template>

<style scoped>
.answer {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.answer-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.tally-name {
  font-weight: 500;
}
.retrieval {
  font-size: 12px;
  color: var(--accent);
}
.intro {
  margin: 0;
}
.intro strong {
  font-weight: 600;
}
.table-card {
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--surface);
  overflow-x: auto;
}
.attainment {
  min-width: 460px;
}
.attainment th.right,
.attainment td.right {
  text-align: right;
}
.attainment td {
  font-family: 'Geist Mono', monospace;
  font-size: 12px;
}
.attainment td.rep {
  font-family: 'Geist', system-ui, sans-serif;
  font-size: 13px;
}
.accent {
  color: var(--accent);
}
.drivers {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.drivers h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
}
.drivers ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.drivers li {
  display: flex;
  gap: 12px;
}
.dash {
  color: var(--accent);
}
.no-pad {
  padding: 0;
}
.answer-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding-top: 4px;
}
.action-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
}
.action-btn:hover {
  color: var(--text);
  border-color: var(--line-strong);
}
.followups {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 8px;
}
.pill-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.followup-pill {
  min-height: 36px;
  padding: 6px 14px;
  border: 1px solid var(--line-strong);
  border-radius: 999px;
  background: var(--surface);
  font-size: 13px;
  cursor: pointer;
  text-align: left;
}
.followup-pill:hover {
  border-color: var(--accent);
}
</style>
