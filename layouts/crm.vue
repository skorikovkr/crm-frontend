<script setup lang="ts">
</script>

<template>
  <div class="layout-container relative min-h-[100vh] flex flex-col">
    <DefaultLayoutHeader />
    <div class="flex-1 flex h-full">
      <aside class="border-r-[1px] border-surface-200 w-[250px]">
        aside
      </aside>
      <main class="mx-auto w-full h-full px-4 sm:px-6 p-8">
        <slot />
      </main>
    </div>
    <DefaultLayoutFooter />
  </div>
</template>