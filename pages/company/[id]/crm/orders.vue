<template>
  <div>
    <NuxtLink :to="`/company/${companyStore.current?.id}/crm/order/create`">
      <Button label="Создать заказ" />
    </NuxtLink>
    <div class="mt-2">
      <OrderPicker
        v-model:selected-order="order"
        :organization-id="companyStore.current?.id"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Order } from '~/types/Order';

const companyStore = useCompanyStore();
const order = ref<Order|null>(null);
</script>

<style>

</style>