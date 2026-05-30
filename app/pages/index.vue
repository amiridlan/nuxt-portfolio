<script setup lang="ts">
import albumData from '~/data/albums.json'
import equipmentData from '~/data/equipment.json'

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

interface EquipmentGroup {
  category: string
  items: { name: string; detail?: string }[]
}

const albums = albumData as Album[]
const equipment = equipmentData as EquipmentGroup[]
const config = useRuntimeConfig()

useSeoMeta({
  title: 'Photography Portfolio — Albums',
  description: 'A curated collection of landscape and travel photography, organised into albums.',
  ogTitle: 'Photography Portfolio — Albums',
  ogDescription: 'A curated collection of landscape and travel photography, organised into albums.',
  ogImage: `${config.public.r2BaseUrl}/${albums[0]?.cover ?? ''}`,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Photography Portfolio — Albums',
  twitterDescription: 'A curated collection of landscape and travel photography, organised into albums.',
  twitterImage: `${config.public.r2BaseUrl}/${albums[0]?.cover ?? ''}`,
})
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-12">
    <header class="mb-10 text-center">
      <h1 class="text-2xl font-light tracking-[0.3em] uppercase text-bone">
        PORTFOLIO
      </h1>
    </header>

    <section id="albums" class="scroll-mt-20" aria-label="Photo albums">
      <AlbumGrid :albums="albums" />
    </section>

    <div class="mt-24">
      <EquipmentSection :groups="equipment" />
    </div>

    <div class="mt-24">
      <ContactSection />
    </div>
  </div>
</template>
