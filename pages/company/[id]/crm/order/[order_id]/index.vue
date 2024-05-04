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
          size="small"
          label="Отменить заказ"
          @click="handleCancelButtonClick"
        />
        <Button
          v-show="nextButtonLabel"
          size="small"
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
      class="grid grid-cols-2 mb-6 gap-4"
    >
      <Panel header="Информация по заказу">
        <OrderMainInfo :order="order" />
      </Panel>
      <Panel header="Документы" class="bg-white">
        <OrderDocuments :order="order" />
      </Panel>
    </div>
    <Panel header="Состав заказа">
      <h2 class="font-semibold text-xl mb-2">
        Доп. услуги
      </h2>
      <OrderExtraWorks
        v-model="extraWorks"
        class="mb-2"
      />
      <h2 class="font-semibold text-xl mb-2">
        Позиции
      </h2>
      <OrderPositions
        :positions="order.positions.positions"
      />
    </Panel>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import type { Client } from '~/types/Client';
import type { ExtraWork } from '~/types/ExtraWork';
import type { Order } from '~/types/Order';

const route = useRoute();
const companyStore = useCompanyStore();
const miscStore = useMiscEnumsStore();
const { data: order, pending, refresh } = await useLaravelFetch<Order>(`/api/orders/${route.params.order_id}`);
const extraWorks = ref<ExtraWork[]>(order.value?.positions.extra_works ?? []);

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
        await $laravelFetch(`/api/orders/${order.value.id}/cost-estimate`, {
            method: 'POST',
            body: {
              extra_works: extraWorks.value
            }
        });
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