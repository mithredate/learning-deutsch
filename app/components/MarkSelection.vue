<script setup lang="ts">
import { useUnklar } from '~/composables/useUnklar'
import { episodeById } from '~/data/hoeren'

/**
 * The one control that turns „I didn't understand that" into a note, from
 * anywhere in the app: select text, tap once. Lives in `app.vue`, so it works
 * on a card, in a transcript, in tonight's instructions alike.
 *
 * Two details that decide whether it works at all on a phone:
 *
 * 1. The selected text is captured on `selectionchange`, *before* any tap. A
 *    tap on a button clears the selection first, so reading `getSelection()`
 *    inside the click handler would reliably return an empty string.
 * 2. Hiding is delayed. iOS fires an empty `selectionchange` as the finger goes
 *    down, which would remove the button in the instant it is being pressed.
 */
const { add, hydrate } = useUnklar()

const pending = ref('')
const visible = ref(false)
const saved = ref(false)
let hideTimer: ReturnType<typeof setTimeout> | undefined

const route = useRoute()

/** Where the word was met — useful in the report, and it costs nothing to record. */
const quelle = computed(() => {
  const p = route.path.replace(/\/$/, '')
  if (p.endsWith('/sprechen')) return 'Sprechen'
  if (p.endsWith('/kalender')) return 'Kalender'
  const ep = p.match(/\/hoeren\/([^/]+)$/)?.[1]
  if (ep) return `Hören · ${episodeById(ep)?.title ?? ep}`
  if (p.endsWith('/hoeren')) return 'Hören'
  return 'Tageskarte'
})

function onSelectionChange() {
  const text = (window.getSelection()?.toString() ?? '').replace(/\s+/g, ' ').trim()
  clearTimeout(hideTimer)

  // A whole paragraph is a mis-tap, not a word you didn't understand.
  if (text.length > 0 && text.length <= 300) {
    pending.value = text
    visible.value = true
    saved.value = false
    return
  }
  // Grace period: the empty selection may just be the press that is about to
  // hit this button.
  hideTimer = setTimeout(() => (visible.value = false), 400)
}

onMounted(() => {
  hydrate()
  document.addEventListener('selectionchange', onSelectionChange)
})
onUnmounted(() => {
  clearTimeout(hideTimer)
  document.removeEventListener('selectionchange', onSelectionChange)
})

function mark() {
  clearTimeout(hideTimer)
  if (!pending.value) return
  add(pending.value, quelle.value)
  saved.value = true
  window.getSelection()?.removeAllRanges()
  setTimeout(() => (visible.value = false), 1100)
}

const shown = computed(() => (pending.value.length > 24 ? pending.value.slice(0, 24) + '…' : pending.value))
</script>

<template>
  <Transition name="pop">
    <div
      v-if="visible && pending"
      class="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4"
    >
      <button
        type="button"
        class="flex max-w-full items-center gap-2 rounded-full border px-4 py-2.5 text-[0.85rem] shadow-lg"
        :class="saved
          ? 'border-good bg-good-wash font-semibold text-good'
          : 'border-accent bg-surface text-accent'"
        :style="{ boxShadow: 'var(--shadow)' }"
        @pointerdown.prevent
        @click="mark"
      >
        <span v-if="saved">✓ gemerkt — kommt in den Bericht</span>
        <template v-else>
          <span>🔖 nicht verstanden:</span>
          <span class="min-w-0 truncate font-semibold">{{ shown }}</span>
        </template>
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.pop-enter-active,
.pop-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: translateY(0.5rem);
}
</style>
