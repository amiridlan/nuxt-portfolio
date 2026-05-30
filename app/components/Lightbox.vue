<script setup lang="ts">
interface GalleryPhoto {
  id: string
  filename: string
  title: string
  alt: string
  aspectRatio: string
}

const props = defineProps<{
  photo: GalleryPhoto | null
}>()

const emit = defineEmits<{
  close: []
}>()

const r2BaseUrl = useRuntimeConfig().public.r2BaseUrl

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}

watch(
  () => props.photo,
  (val) => {
    if (val) {
      window.addEventListener('keydown', handleKeydown)
      document.body.style.overflow = 'hidden'
    } else {
      window.removeEventListener('keydown', handleKeydown)
      document.body.style.overflow = ''
    }
  },
)
</script>

<template>
  <Transition name="lightbox-fade">
    <div
      v-if="photo"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      role="dialog"
      aria-modal="true"
      :aria-label="photo.title"
      @click.self="emit('close')"
    >
      <!-- Close button -->
      <button
        class="absolute top-5 right-5 text-muted hover:text-bone transition-colors duration-200 text-3xl leading-none focus:outline-none focus-visible:ring-2 focus-visible:ring-sage rounded"
        aria-label="Close lightbox"
        @click="emit('close')"
      >
        ✕
      </button>

      <!-- Image + caption container -->
      <div class="flex flex-col items-center max-w-5xl w-full" @click.stop>
        <img
          :src="`${r2BaseUrl}/${photo.filename}`"
          :alt="photo.alt"
          class="max-h-[85vh] max-w-full object-contain rounded shadow-2xl"
        />
        <p class="mt-4 text-muted text-sm font-light tracking-widest uppercase">
          {{ photo.title }}
        </p>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 0.3s ease;
}

.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}
</style>
