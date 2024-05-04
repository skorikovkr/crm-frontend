<template>
  <div class="flex justify-between">
    <h3 class="mr-2 font-medium">
      <i class="pi pi-file mr-4"></i> Файл калькулятора
    </h3>
    <a target="_blank" class="block" :href="config.public.backendUrl + `/order/${props.order.id}/download/calculator-file`">
      <Button icon="pi pi-download" />
    </a>
  </div>
</template>

<script lang="ts" setup>
import type { Order } from '~/types/Order';

const config = useRuntimeConfig();
const props = defineProps<{
  order: Order
}>();

</script>

<style>

</style>