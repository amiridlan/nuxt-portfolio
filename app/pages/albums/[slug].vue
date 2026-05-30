<script setup lang="ts">
import albumData from '~/data/albums.json'

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

const albums = albumData as Album[]
const route = useRoute()
const config = useRuntimeConfig()

const album = albums.find((a) => a.slug === route.params.slug)

if (!album) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Album not found',
    fatal: true,
  })
}

// Non-null after the guard above.
const currentAlbum = album as Album

const selectedPhoto = ref<GalleryPhoto | null>(null)

function openLightbox(photo: GalleryPhoto) {
  selectedPhoto.value = photo
}

function closeLightbox() {
  selectedPhoto.value = null
}

useSeoMeta({
  title: `${currentAlbum.title} — Photography Portfolio`,
  description: currentAlbum.description,
  ogTitle: `${currentAlbum.title} — Photography Portfolio`,
  ogDescription: currentAlbum.description,
  ogImage: `${config.public.r2BaseUrl}/${currentAlbum.cover}`,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: `${currentAlbum.title} — Photography Portfolio`,
  twitterDescription: currentAlbum.description,
  twitterImage: `${config.public.r2BaseUrl}/${currentAlbum.cover}`,
})
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-12">
    <!-- Back to albums -->
    <NuxtLink
      to="/"
      class="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-muted transition-colors duration-200 hover:text-sage-light rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
    >
      <span aria-hidden="true">&larr;</span> All albums
    </NuxtLink>

    <header class="mt-8 mb-12 text-center">
      <h1 class="text-2xl font-light tracking-[0.3em] uppercase text-bone">
        {{ currentAlbum.title }}
      </h1>
      <p class="mx-auto mt-4 max-w-xl text-sm font-light leading-relaxed text-muted">
        {{ currentAlbum.description }}
      </p>
    </header>

    <ImageGrid :photos="currentAlbum.photos" @open-lightbox="openLightbox" />

    <Lightbox :photo="selectedPhoto" @close="closeLightbox" />
  </div>
</template>
