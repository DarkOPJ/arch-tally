<script setup>
import { ref } from 'vue'
import AppIcon from './AppIcon.vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: 'Ask about your data…' },
  label: { type: String, default: 'Ask a question' },
  sourcesChip: { type: String, default: '' },
  attachTo: { type: String, default: '/sources' },
  rows: { type: Number, default: 2 },
  busy: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue', 'send', 'attach'])

const el = ref(null)

function onKeydown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    send()
  }
}

function send() {
  if (props.busy) return
  emit('send')
}

// Simple auto-grow
function autosize() {
  const t = el.value
  if (!t) return
  t.style.height = 'auto'
  t.style.height = Math.min(t.scrollHeight, 220) + 'px'
}

</script>

<template>
  <div class="ring-input">
    <div class="ring-input-inner">
      <label class="sr-only" for="ask-area">{{ label }}</label>
      <textarea
        id="ask-area"
        ref="el"
        :rows="rows"
        :value="modelValue"
        :placeholder="placeholder"
        @input="
          emit('update:modelValue', $event.target.value);
          autosize()
        "
        @keydown="onKeydown"
      />
      <div class="toolbar">
        <button
          type="button"
          class="tool-btn"
          aria-label="Attach file"
          title="Attach file"
          @click="emit('attach')"
        >
          <AppIcon name="clip" class="accent-icon" />
        </button>
        <button v-if="sourcesChip" type="button" class="tool-btn chip-btn">
          <AppIcon name="database" :size="14" class="accent-icon" />
          {{ sourcesChip }}
        </button>
        <span class="spacer" />
        <button
          type="button"
          class="send-btn"
          aria-label="Send"
          :disabled="busy || !modelValue.trim()"
          @click="send"
        >
          <AppIcon name="send" :stroke-width="2" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ring-input textarea {
  display: block;
  width: 100%;
  border: none;
  outline: none;
  resize: none;
  padding: 16px 16px 4px;
  background: transparent;
  font-size: 14px;
  line-height: 1.5;
  overflow-y: auto;
}
.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  padding: 8px 10px 10px 12px;
}
.tool-btn {
  height: 34px;
  min-width: 34px;
  padding: 0 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
  color: var(--muted);
  font-size: 12px;
  cursor: pointer;
}
.tool-btn:hover {
  border-color: var(--line-strong);
  color: var(--text);
}
.chip-btn {
  padding-left: 10px;
}
.accent-icon {
  color: var(--accent);
}
.spacer {
  flex: 1;
}
.send-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 9px;
  background: var(--accent-fill);
  color: var(--on-accent);
  cursor: pointer;
}
.send-btn:disabled {
  opacity: 0.5;
  cursor: default;
}
@media (max-width: 900px) {
  .tool-btn.chip-btn {
    display: none;
  }
}
</style>
