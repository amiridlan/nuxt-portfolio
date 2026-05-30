<script setup lang="ts">
const config = useRuntimeConfig()
const contactEmail = config.public.contactEmail
const instagramUrl = config.public.instagramUrl
const websiteUrl = config.public.websiteUrl

// Show a clean handle/host instead of the full URL.
const instagramHandle = computed(() => {
  const trimmed = instagramUrl.replace(/\/+$/, '')
  const handle = trimmed.split('/').pop() ?? ''
  return handle ? `@${handle}` : instagramUrl
})

const websiteLabel = computed(() => websiteUrl.replace(/^https?:\/\//, '').replace(/\/+$/, ''))
</script>

<template>
  <section id="contact" class="scroll-mt-20" aria-labelledby="contact-heading">
    <header class="mb-10 text-center">
      <h2
        id="contact-heading"
        class="text-xl font-light tracking-[0.3em] uppercase text-bone"
      >
        Contact
      </h2>
    </header>

    <ul class="mx-auto flex max-w-md flex-col divide-y divide-line overflow-hidden rounded border border-line bg-stone">
      <li>
        <a
          :href="`mailto:${contactEmail}`"
          class="flex items-center justify-between gap-4 px-6 py-4 text-sm transition-colors duration-200 hover:bg-stone-light focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-inset"
        >
          <span class="text-xs tracking-widest uppercase text-muted">Email</span>
          <span class="font-light text-bone">{{ contactEmail }}</span>
        </a>
      </li>
      <li>
        <a
          :href="instagramUrl"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit our Instagram profile"
          class="flex items-center justify-between gap-4 px-6 py-4 text-sm transition-colors duration-200 hover:bg-stone-light focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-inset"
        >
          <span class="flex items-center gap-2 text-xs tracking-widest uppercase text-muted">
            <IconInstagram class="h-4 w-4" /> Instagram
          </span>
          <span class="font-light text-bone">{{ instagramHandle }}</span>
        </a>
      </li>
      <li>
        <a
          :href="websiteUrl"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit our website"
          class="flex items-center justify-between gap-4 px-6 py-4 text-sm transition-colors duration-200 hover:bg-stone-light focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-inset"
        >
          <span class="flex items-center gap-2 text-xs tracking-widest uppercase text-muted">
            <IconWebsite class="h-4 w-4" /> Website
          </span>
          <span class="font-light text-bone">{{ websiteLabel }}</span>
        </a>
      </li>
    </ul>
  </section>
</template>
