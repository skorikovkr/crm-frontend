<template>
  <div
    v-if="!pending && order"
    class="grid grid-cols-2"
  >
    <Panel header="Информация по заказу">
      <div class="flex flex-col gap-2">
        <div class="order-main-info_row grid grid-cols-2">
          <div class="font-medium">Дата создания</div>
          <div>{{ new Date(order.created_at).toLocaleDateString() }}</div>
        </div>
        <div class="order-main-info_row grid grid-cols-2">
          <div class="font-medium">Сумма</div>
          <div>{{ order.positions.total_price }} руб.</div>
        </div>
        <div class="order-main-info_row grid grid-cols-2">
          <div class="font-medium">Статус</div>
          <div>
            <StatusTag
              :order="order"
            />
          </div>
        </div>
      </div>
    </Panel>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import type { Order } from '~/types/Order';

const route = useRoute();
const companyStore = useCompanyStore();
const miscStore = useMiscEnumsStore();
const { data: order, pending } = await useLaravelFetch<Order>(`/api/orders/${route.params.order_id}`);

console.log(order.value);

</script>

<style>

</style>