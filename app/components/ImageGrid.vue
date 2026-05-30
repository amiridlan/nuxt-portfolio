<script setup lang="ts">
interface GalleryPhoto {
  id?: string
  filename: string
  title: string
  alt?: string
  aspectRatio: string
}

defineProps<{
  photos: GalleryPhoto[]
}>()

const emit = defineEmits<{
  openLightbox: [photo: GalleryPhoto]
}>()

const r2BaseUrl = useRuntimeConfig().public.r2BaseUrl
const loadedMap = ref<Record<string, boolean>>({})

function setLoaded(key: string) {
  loadedMap.value[key] = true
}
</script>

<template>
  <div class="columns-1 md:columns-2 lg:columns-3 gap-4">
    <article
      v-for="photo in photos"
      :key="photo.id ?? photo.filename"
      class="break-inside-avoid-column mb-4 cursor-pointer group rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
      role="button"
      :aria-label="`Open ${photo.title} in full screen`"
      tabindex="0"
      @click="emit('openLightbox', photo)"
      @keydown.enter="emit('openLightbox', photo)"
      @keydown.space.prevent="emit('openLightbox', photo)"
    >
      <!-- Aspect-ratio container prevents CLS -->
      <div
        class="relative w-full overflow-hidden rounded bg-stone"
        :style="{ aspectRatio: photo.aspectRatio }"
      >
        <!-- Skeleton placeholder — fades out when image loads -->
        <div
          class="absolute inset-0 bg-stone transition-opacity duration-500"
          :class="loadedMap[photo.id ?? photo.filename] ? 'opacity-0 pointer-events-none' : 'animate-pulse opacity-100'"
          aria-hidden="true"
        />

        <!-- Actual image — starts transparent, fades in on load.
             The :ref callback catches images already complete in browser cache
             (the @load event fires before Vue attaches on a cached refresh). -->
        <img
          :ref="(el) => { if (el && (el as HTMLImageElement).complete) setLoaded(photo.id ?? photo.filename) }"
          :src="`${r2BaseUrl}/${photo.filename}`"
          :alt="photo.alt ?? photo.title"
          loading="lazy"
          decoding="async"
          class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:scale-[1.02] group-hover:transition-transform group-hover:duration-300"
          :class="loadedMap[photo.id ?? photo.filename] ? 'opacity-100' : 'opacity-0'"
          @load="setLoaded(photo.id ?? photo.filename)"
        />
      </div>

    </article>
  </div>
</template>
