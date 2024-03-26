<script setup lang="ts">
</script>

<template>
  <div class="layout-container relative min-h-[100vh] flex flex-col">
    <DefaultLayoutHeader />
    <main class="flex-1 mx-auto w-full max-w-3xl h-full px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <slot />
    </main>
    <DefaultLayoutFooter />
  </div>
</template>