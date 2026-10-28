<script setup>
import { computed } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'

const props = defineProps({
  detailed: { type: Boolean, default: false },
  drawerOpen: { type: Boolean, required: true },
})
const emit = defineEmits(['update:drawerOpen'])
const open = computed({
  get: () => props.drawerOpen,
  set: (v) => emit('update:drawerOpen', v),
})
</script>

<template>
  <div class="app-shell">
    <AppSidebar :detailed="detailed" :open="open" @close="open = false" />
    <div
      class="drawer-backdrop"
      :class="{ show: open }"
      aria-hidden="true"
      @click="open = false"
    />
    <slot />
  </div>
</template>

<style scoped>
.app-shell > :deep(aside) {
  flex: 0 0 auto;
}
</style>
