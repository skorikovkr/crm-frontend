<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-between">
      <h3 class="mr-2 font-medium">
        <i class="pi pi-file mr-4" /> Файл калькулятора
      </h3>
      <a
        target="_blank"
        class="block"
        :href="config.public.backendUrl + `/order/${props.order.id}/download/calculator-file`"
      >
        <Button icon="pi pi-download" />
      </a>
    </div>

    <div class="flex justify-between">
      <h3 class="mr-2 font-medium">
        <i class="pi pi-file mr-4" /> Смета
      </h3>
      <div class="flex gap-2">
        <a
          target="_blank"
          class="block"
        >
          <Button icon="pi pi-upload" />
        </a>
        <a
          target="_blank"
          class="block"
        >
          <Button icon="pi pi-download" />
        </a>
      </div>
    </div>

    <div class="flex justify-between">
      <h3 class="mr-2 font-medium">
        <i class="pi pi-file mr-4" /> Счет на оплату (клиент)
      </h3>
      <a
        target="_blank"
        class="block"
      >
        <Button icon="pi pi-download" />
      </a>
    </div>

    <div class="flex justify-between">
      <h3 class="mr-2 font-medium">
        <i class="pi pi-file mr-4" /> Счет на оплату (мебельная фабрика)
      </h3>
      <a
        target="_blank"
        class="block"
      >
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