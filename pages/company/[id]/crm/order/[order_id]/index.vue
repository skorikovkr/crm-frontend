<template>
  <div v-if="!pending && order">
    <div class="mb-6">
      <h1 class="font-semibold text-2xl mb-6">
        Заказ {{ order.name }}
      </h1>
      <Card
        :pt="{
          content: 'py-0 px-6'
        }"
      >
        <template #content>
          <StatusStepper
            :active-status="miscStore.orderStatuses?.find(s => s.id == order?.order_status_id)?.name"
          />
        </template>
      </Card>
    </div>
    <div
      class="grid grid-cols-2"
    >
      <Panel header="Информация по заказу">
        <OrderMainInfo :order="order" />
      </Panel>
    </div>
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