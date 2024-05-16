<template>
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
</template>

<script lang="ts" setup>
import Galleria from 'primevue/galleria';

const config = useRuntimeConfig();
const companyStore = useCompanyStore();

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

<style>

</style>