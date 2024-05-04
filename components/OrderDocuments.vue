<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-between">
      <h3 class="mr-2 font-medium">
        <i class="pi pi-file mr-4"></i> Файл калькулятора
      </h3>
      <a target="_blank" class="block" :href="config.public.backendUrl + `/order/${props.order.id}/download/calculator-file`">
        <Button icon="pi pi-download" />
      </a>
    </div>

    <div class="flex justify-between">
      <h3 class="mr-2 font-medium">
        <i class="pi pi-file mr-4"></i> Смета
      </h3>
      <a target="_blank" class="block">
        <Button icon="pi pi-download" />
      </a>
    </div>

    <div class="flex justify-between">
      <h3 class="mr-2 font-medium">
        <i class="pi pi-file mr-4"></i> Счет на оплату
      </h3>
      <a target="_blank" class="block">
        <Button icon="pi pi-download" />
      </a>
    </div>
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