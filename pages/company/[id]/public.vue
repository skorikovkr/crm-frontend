<script lang="ts" setup>
import Galleria from 'primevue/galleria';
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

const responsiveOptions = ref([
    {
        breakpoint: '1300px',
        numVisible: 4
    },
    {
        breakpoint: '575px',
        numVisible: 1
    }
]);
</script>

<template>
  <div class="pt-12">
    <h1 class="font-medium text-3xl mb-2">{{ companyStore.current?.name }}</h1>
    <div class="grid grid-cols-2 mb-12">
      <p class="mb-6 text-xl">
        {{ companyStore.current?.description }}
      </p>
      <img 
        :src="config.public.backendUrl + '/' + companyStore.current?.logo_src?.replace('public', 'storage')" class="w-full"
      >
    </div>
    <h2 class="font-medium text-2xl mb-2">Наше портфолио:</h2>
    <Galleria :value="companyStore.current?.portfolio" :responsiveOptions="responsiveOptions" :numVisible="5">
      <template #item="slotProps">
        <img
          :src="config.public.backendUrl + '/' + slotProps.item.image_src?.replace('public', 'storage')"
          :style="{
            width: '100%', 
            display: 'block'
          }"
        >
      </template>
      <template #thumbnail="slotProps">
        <img
          :src="config.public.backendUrl + '/' + slotProps.item.image_src?.replace('public', 'storage')"
          :style="{
            height: '150px', 
            display: 'block'
          }"
        >
      </template>
      <template #caption="slotProps">
        <div class="text-xl mb-2 font-bold">{{ slotProps.item.description }}</div>
      </template>
    </Galleria>
  </div>
</template>

<style>

</style>