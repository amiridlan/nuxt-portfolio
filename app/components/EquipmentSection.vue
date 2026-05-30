<script setup lang="ts">
interface EquipmentItem {
  name: string
  detail?: string
}

interface EquipmentGroup {
  category: string
  items: EquipmentItem[]
}

defineProps<{
  groups: EquipmentGroup[]
}>()
</script>

<template>
  <section id="equipment" class="scroll-mt-20" aria-labelledby="equipment-heading">
    <header class="mb-10 text-center">
      <h2
        id="equipment-heading"
        class="text-xl font-light tracking-[0.3em] uppercase text-bone"
      >
        Equipment
      </h2>
    </header>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div
        v-for="group in groups"
        :key="group.category"
        class="rounded border border-line bg-stone p-6"
      >
        <h3 class="text-xs font-medium tracking-widest uppercase text-sage-light">
          {{ group.category }}
        </h3>
        <ul class="mt-4 space-y-3">
          <li
            v-for="item in group.items"
            :key="item.name"
            class="text-sm font-light text-bone"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
