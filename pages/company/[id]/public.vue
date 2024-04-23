<script lang="ts" setup>
definePageMeta({ middleware: ["load-company"] });

const companyStore = useCompanyStore();

useSeoMeta({
  title: companyStore.current?.name,
  ogTitle: companyStore.current?.name,
  description: companyStore.current?.description,
  ogDescription: companyStore.current?.description,
  ogImage: companyStore.current?.logo_src?.replace("public", "storage")
})
</script>

<template>
  <div>
    <h1>PUBLIC</h1>
    <p>{{ companyStore.current?.name }}</p>
  </div>
</template>

<style>

</style>