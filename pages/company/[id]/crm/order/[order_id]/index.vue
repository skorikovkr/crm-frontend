<template>
  <div
    v-if="!pending && order"
    class="grid grid-cols-2"
  >
    <Panel header="Информация по заказу">
      <OrderMainInfo :order="order" />
    </Panel>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import type { Client } from '~/types/Client';
import type { Order } from '~/types/Order';

const route = useRoute();
const companyStore = useCompanyStore();
const miscStore = useMiscEnumsStore();
const { data: order, pending } = await useLaravelFetch<Order>(`/api/orders/${route.params.order_id}`);
</script>

<style>

</style>