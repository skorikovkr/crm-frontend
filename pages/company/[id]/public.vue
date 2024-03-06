<script lang="ts" setup>
import type { Company } from '~/types/Company';

const route = useRoute();

const { data } = await useFetch<Company>(`/api/company/${route.params.id}`);

if (!data) {
  showError({
    statusCode: 404,
    statusMessage: 'Организация не найдена.'
  })
}

const companyStore = useCompanyStore();
companyStore.current = data.value;

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