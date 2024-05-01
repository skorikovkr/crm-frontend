<template>
  <div>
    <NuxtLayout name="crm">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: false,
  middleware: 'load-company'
})
</script>

<style>

</style>