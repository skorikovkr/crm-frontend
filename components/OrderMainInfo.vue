<template>
  <div class="flex flex-col gap-4">
    <div class="order-main-info_row grid grid-cols-2 items-center">
      <div class="font-medium">
        Дата создания
      </div>
      <div>{{ new Date(order.created_at).toLocaleDateString() }}</div>
    </div>

    <div
      v-if="order.version_of"
      class="order-main-info_row grid grid-cols-2 items-center"
    >
      <div class="font-medium">
        Является версией заказа
      </div>
      <div>
        <NuxtLink 
          :to="`/company/${companyStore.current?.id}/crm/order/${order.version_of}`"
          class="underline text-blue-700 visited:text-blue-900"
        >
          Перейти на оригинал
        </NuxtLink>
      </div>
    </div>

    <div class="order-main-info_row grid grid-cols-2 items-center">
      <div class="font-medium">
        Сумма
      </div>
      <span>{{ formatCurrency(order.positions.total_price) }} <i class="italic text-gray-400">(получено: {{ formatCurrency(clientPriceRemain) }})</i></span>
    </div>

    <div class="order-main-info_row grid grid-cols-2 items-center">
      <div class="font-medium">
        Сумма (МФ)
      </div>
      <div>
        <span v-if="order.ffprice">{{ formatCurrency(order.ffprice) }} <i class="italic text-gray-400">(осталось: {{ formatCurrency(ffpriceRemain) }})</i></span>
        <span v-else> - </span>
      </div>
    </div>

    <div class="order-main-info_row grid grid-cols-2 items-center">
      <div class="font-medium">
        Статус
      </div>
      <div>
        <StatusTag
          :order="order"
        />
      </div>
    </div>

    <div class="order-main-info_row grid grid-cols-2 items-center">
      <div class="font-medium">
        Адрес
      </div>
      <div>{{ order.address }}</div>
    </div>

    <div
      v-if="!pending && client"
      class="order-main-info_row grid grid-cols-2 items-center"
    >
      <div class="font-medium">
        Клиент
      </div>
      <div>
        <NuxtLink
          class="underline text-blue-700 visited:text-blue-900"
        >
          {{ client.name }}
        </NuxtLink>
      </div>
    </div>

    <div
      v-if="!pending && client"
      class="order-main-info_row grid grid-cols-2 items-center"
    >
      <div class="font-medium">
        Телефон
      </div>
      <div>
        <a :href="`tel:${client.phone}`"> {{ client.phone }}</a>
      </div>
    </div>

    <div
      v-if="!pending && client"
      class="order-main-info_row grid grid-cols-2 items-center"
    >
      <div class="font-medium">
        E-mail
      </div>
      <div>
        <a :href="`mailto:${client.email}`"> {{ client.email }}</a>
      </div>
    </div>

    <div
      class="order-main-info_row grid grid-cols-2 items-center"
    >
      <div class="font-medium">
        Тип калькулятора
      </div>
      <div>
        {{ miscStore.calculators?.find(c => c.id == order.calculator_id)?.i18n ?? '-' }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Client } from '~/types/Client';
import type { Order } from '~/types/Order';

const props = defineProps<{
    order: Order
}>();

const companyStore = useCompanyStore();
const miscStore = useMiscEnumsStore();
const { data: client, pending } = await useLaravelFetch<Client>(`/api/clients/${props.order.client_id}`);

const statusName = (statusId :number|string) => {
  return miscStore.orderStatuses?.find(s => s.id == statusId)?.name;
};

const statusNumber = computed(() => {
  const name = statusName(props.order.order_status_id);
  switch (name) {
    case "Saved":
        return 1;
    case "InProgress":
        return 2;
    case "WaitForClientPreOrder":
        return 3;
    case "SendOrderToFF":
        return 4;
    case "WaitPreOrderFF":
        return 5;
    case "WaitForDetailsDeliveryFF":
        return 6;
    case "WaitForPayOtherHalfForFF":
        return 7;
    case "Production":
        return 8;
    case "WaitForClientPayOtherHalf":
        return 9;
    case "ReadyForShipment":
        return 10;
    case "Completed":
        return 11;
  }
  return -1;   
});

const ffpriceRemain = computed(() => {
  let ratio = 1;
  if (statusNumber.value > 5)
    ratio -= 0.5;
  if (statusNumber.value > 7)
    ratio -= 0.5;
  return (props.order.ffprice ?? 0) * ratio;
});

const clientPriceRemain = computed(() => {
  let ratio = 0;
  if (statusNumber.value > 3)
    ratio += 0.5;
  if (statusNumber.value > 9)
    ratio += 0.5;
  return (props.order.positions.total_price ?? 0) * ratio;
});
</script>

<style>

</style>