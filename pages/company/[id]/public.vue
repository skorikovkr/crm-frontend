<script lang="ts" setup>
definePageMeta({ middleware: ["load-company"] });

const companyStore = useCompanyStore();

useSeoMeta({
  title: companyStore.current?.name,
  ogTitle: companyStore.current?.name,
  description: companyStore.current?.fullName,
  ogDescription: companyStore.current?.fullName,
  ogImage: companyStore.current?.logoSrc
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