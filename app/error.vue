<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()

function handleClear() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center gap-6 bg-ink px-4 text-center text-bone antialiased">
    <p class="text-5xl font-extralight tracking-widest text-sage">
      {{ error.statusCode }}
    </p>
    <p class="text-sm tracking-widest uppercase text-muted">
      {{ error.statusCode === 404 ? 'Page not found' : 'Something went wrong' }}
    </p>
    <button
      class="mt-2 rounded border border-line px-5 py-2 text-xs tracking-widest uppercase text-bone transition-colors duration-200 hover:border-sage hover:text-sage-light focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
      @click="handleClear"
    >
      Back to albums
    </button>
  </div>
</template>
