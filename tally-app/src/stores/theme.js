import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const KEY = 'tally-theme'

export const useThemeStore = defineStore('theme', () => {
  const stored = typeof window !== 'undefined' ? localStorage.getItem(KEY) : null
  const theme = ref(stored === 'dark' ? 'dark' : 'light')

  const isDark = computed(() => theme.value === 'dark')
  const themeClass = computed(() => (isDark.value ? 't-dark' : 't-light'))
  const toggleLabel = computed(() =>
    isDark.value ? 'Switch to light theme' : 'Switch to dark theme'
  )

  function apply() {
    const el = document.documentElement
    el.classList.toggle('t-dark', isDark.value)
    el.classList.toggle('t-light', !isDark.value)
  }

  function toggle() {
    theme.value = isDark.value ? 'light' : 'dark'
    try {
      localStorage.setItem(KEY, theme.value)
    } catch (e) {
      /* private mode */
    }
    apply()
  }

  apply()

  return { theme, isDark, themeClass, toggleLabel, toggle, apply }
})
