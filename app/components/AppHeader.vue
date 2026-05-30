<script setup lang="ts">
const config = useRuntimeConfig()
const instagramUrl = config.public.instagramUrl
const websiteUrl = config.public.websiteUrl

const navLinks = [
  { label: 'Portfolio', to: '/#albums' },
  { label: 'Equipment', to: '/#equipment' },
  { label: 'Contact', to: '/#contact' },
]
</script>

<template>
  <header class="border-b border-line">
    <div class="max-w-6xl mx-auto px-4 h-24 grid grid-cols-[auto_1fr_auto] items-center gap-3">
      <!-- Instagram — left bookend -->
      <a
        :href="instagramUrl"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit our Instagram profile"
        class="inline-flex h-11 w-11 items-center justify-center -ml-2 rounded text-muted transition-colors duration-200 hover:text-sage-light focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
      >
        <IconInstagram class="h-5 w-5" />
      </a>

      <!-- Wordmark + nav — center -->
      <div class="flex flex-col items-center justify-center">
        <NuxtLink
          to="/"
          class="text-lg font-light tracking-[0.3em] uppercase text-bone whitespace-nowrap rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
        >
          AMIR IDLAN
        </NuxtLink>
        <nav aria-label="Primary">
          <ul class="flex items-center gap-4 sm:gap-7">
            <li v-for="link in navLinks" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="text-[12px] tracking-[0.15em] uppercase text-muted transition-colors duration-200 hover:text-sage-light rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Website — right bookend -->
      <a
        :href="websiteUrl"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit our website"
        class="inline-flex h-11 w-11 items-center justify-center -mr-2 rounded text-muted transition-colors duration-200 hover:text-sage-light focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
      >
        <IconWebsite class="h-5 w-5" />
      </a>
    </div>
  </header>
</template>
