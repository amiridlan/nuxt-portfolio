<script setup lang="ts">
const config = useRuntimeConfig()
const instagramUrl = config.public.instagramUrl
const websiteUrl = config.public.websiteUrl
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-line mt-24">
    <div class="max-w-6xl mx-auto px-4 py-10 flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
      <p class="text-xs tracking-widest uppercase text-muted">
        &copy; {{ year }} AMIR IDLAN
      </p>

      <nav class="flex items-center gap-2" aria-label="Social links">
        <a
          :href="instagramUrl"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit our Instagram profile"
          class="inline-flex h-11 w-11 items-center justify-center rounded text-muted transition-colors duration-200 hover:text-sage-light focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
        >
          <IconInstagram class="h-5 w-5" />
        </a>
        <a
          :href="websiteUrl"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit our website"
          class="inline-flex h-11 w-11 items-center justify-center rounded text-muted transition-colors duration-200 hover:text-sage-light focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
        >
          <IconWebsite class="h-5 w-5" />
        </a>
      </nav>
    </div>
  </footer>
</template>
