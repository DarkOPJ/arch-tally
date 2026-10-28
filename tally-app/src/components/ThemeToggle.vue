<script setup>
import { useThemeStore } from '@/stores/theme'
import AppIcon from './AppIcon.vue'

const theme = useThemeStore()
</script>

<template>
  <button
    type="button"
    class="icon-btn"
    :aria-label="theme.toggleLabel"
    :title="theme.toggleLabel"
    @click="theme.toggle()"
  >
    <AppIcon :name="theme.isDark ? 'sun' : 'moon'" />
  </button>
</template>
