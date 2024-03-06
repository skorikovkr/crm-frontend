<script setup lang="ts">
</script>

<template>
  <div class="layout-container relative min-h-[100vh] flex flex-col">
    <DefaultLayoutHeader />
    <main class="w-full flex-1">
      <slot />
    </main>
    <DefaultLayoutFooter />
  </div>
</template>