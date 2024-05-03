<template>
  <div v-if="!pending && order">
    <div class="mb-6">
      <div class="flex items-center mb-6 gap-4">
        <h1 class="font-semibold text-2xl">
          Заказ {{ order.name }}
        </h1>
        <Button
          v-show="nextButtonLabel"
          severity="danger" 
          label="Отменить заказ"
          @click="handleCancelButtonClick"
        />
        <Button
          v-show="nextButtonLabel"
          :label="nextButtonLabel ?? ''"
          @click="handleNextButtonClick"
        />
      </div>
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
      class="grid grid-cols-2 mb-6"
    >
      <Panel header="Информация по заказу">
        <OrderMainInfo :order="order" />
      </Panel>
    </div>
    <Panel header="Состав заказа">
      <OrderPositions
        :positions="order.positions.positions"
      />
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
const { data: order, pending, refresh } = await useLaravelFetch<Order>(`/api/orders/${route.params.order_id}`);

const nextButtonLabel = computed(() => {
  const statusName = miscStore.orderStatuses?.find(s => s.id == order.value?.order_status_id)?.name;
  switch (statusName) {
    case "Saved":
        return "Подтвердить эту версию";
    case "InProgress":
        return "Смета согласована";
    case "WaitForClientPreOrder":
        return "Предоплата получена";
    case "Production":
        return "Ожидание полной оплаты";
    case "WaitForClientPayOtherHalf":
        return "Оплата получена";
    case "ReadyForShipment":
        return "Заказ доставлен";
  }
  return null;
})

const handleNextButtonClick = async () => {
  if (!order.value) return;
  const statusName = miscStore.orderStatuses?.find(s => s.id == order.value?.order_status_id)?.name;
  try {
    switch (statusName) {
      case "Saved":
        await $laravelFetch(`/api/orders/${order.value.id}/approve`, {
            method: 'POST'
        });
        break;
      case "InProgress":
        break;
      case "WaitForClientPreOrder":
        break;
      case "Production":
        break;
      case "WaitForClientPayOtherHalf":
        break;
      case "ReadyForShipment":
        break;
    }
  } catch (error) {
    console.log(error);
  }
  await refresh();
}

const handleCancelButtonClick = async () => {
    if (!order.value) return;
    try {
      await $laravelFetch(`/api/orders/${order.value.id}/cancel`, {
        method: 'POST'
      });
    } catch (error) {
      console.log(error);
    }
    await refresh();
}
</script>

<style>

</style>