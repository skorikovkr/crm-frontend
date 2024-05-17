<script lang="ts" setup>
definePageMeta({ middleware: ["load-company"] });

const companyStore = useCompanyStore();
const config = useRuntimeConfig();

useSeoMeta({
  title: companyStore.current?.name,
  ogTitle: companyStore.current?.name,
  description: companyStore.current?.description,
  ogDescription: companyStore.current?.description,
  ogImage: companyStore.current?.logo_src?.replace("public", "storage")
})
</script>

<template>
  <div class="pt-12">
    <h1 class="font-medium text-3xl mb-2">
      {{ companyStore.current?.name }}
    </h1>
    <div class="grid grid-cols-2 mb-12">
      <p class="mb-6 text-xl">
        {{ companyStore.current?.description }}
      </p>
      <img 
        :src="config.public.backendUrl + '/' + companyStore.current?.logo_src?.replace('public', 'storage')"
        class="w-full"
      >
    </div>
    <h2 class="font-medium text-2xl mb-2">
      Наше портфолио:
    </h2>
    <PhotoPortfolio />
  </div>
</template>

<style>

</style>