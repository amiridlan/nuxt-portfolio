<script setup lang="ts">
// Dark Japandi shell: ink background, bone text, shared header + footer.
// Pages render inside the <slot />.
</script>

<template>
  <div class="min-h-screen flex flex-col bg-ink text-bone antialiased">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
