<script setup lang="ts">
interface GalleryPhoto {
  id: string
  filename: string
  title: string
  alt: string
  aspectRatio: string
}

interface Album {
  id: string
  slug: string
  title: string
  description: string
  cover: string
  photos: GalleryPhoto[]
}

defineProps<{
  albums: Album[]
}>()

const r2BaseUrl = useRuntimeConfig().public.r2BaseUrl
const loadedMap = ref<Record<string, boolean>>({})

function setLoaded(id: string) {
  loadedMap.value[id] = true
}
</script>

<template>
  <ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <li v-for="album in albums" :key="album.id">
      <NuxtLink
        :to="`/albums/${album.slug}`"
        class="group block rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
      >
        <!-- 3:4 cover — aspect-ratio prevents CLS -->
        <div class="relative w-full overflow-hidden rounded bg-stone aspect-[3/4]">
          <!-- Skeleton placeholder -->
          <div
            class="absolute inset-0 bg-stone transition-opacity duration-500"
            :class="loadedMap[album.id] ? 'opacity-0 pointer-events-none' : 'animate-pulse opacity-100'"
            aria-hidden="true"
          />

          <img
            :src="`${r2BaseUrl}/${album.cover}`"
            :alt="`Cover image for ${album.title}`"
            loading="lazy"
            decoding="async"
            class="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:scale-[1.02] group-hover:transition-transform group-hover:duration-300"
            :class="loadedMap[album.id] ? 'opacity-100' : 'opacity-0'"
            @load="setLoaded(album.id)"
          />
        </div>

        <!-- Caption -->
        <div class="mt-3 flex items-baseline justify-between gap-3">
          <h2 class="text-sm font-light tracking-wide text-bone transition-colors duration-200 group-hover:text-sage-light">
            {{ album.title }}
          </h2>
          <span class="shrink-0 text-xs tracking-widest uppercase text-muted">
            {{ album.photos.length }} {{ album.photos.length === 1 ? 'photo' : 'photos' }}
          </span>
        </div>
      </NuxtLink>
    </li>
  </ul>
</template>
