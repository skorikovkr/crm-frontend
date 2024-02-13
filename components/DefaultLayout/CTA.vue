<script setup lang="ts">
defineProps<{
  phone: string
  schedule: string
}>()
</script>

<template>
  <div class="cta flex flex-row">
    <div class="schedule pr-4 text-gray-500 font-medium text-sm my-auto">
      <time>{{ schedule }}</time>
    </div>
    <a
      class="block text-gray-500 font-medium text-sm my-auto"
      :href="'tel:' + phone"
    >{{ phone }}</a>
  </div>
</template>