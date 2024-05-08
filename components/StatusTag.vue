<template>
  <Tag 
    :value="miscStore.orderStatuses?.find(s => s.id == order.order_status_id)?.i18n ?? '-'" 
    :severity="getSeverity(order)" 
  />
</template>

<script lang="ts" setup>
import type { Order } from '~/types/Order';

const props = defineProps<{
    order: Order
}>();

const miscStore = useMiscEnumsStore();

const getSeverity = (order: Order) => {
  const status = miscStore.orderStatuses?.find(s => s.id == order.order_status_id)?.name
  switch (status) {
    case 'Completed':
      return 'success';
    case 'Canceled':
      return 'danger';
    default:
      return 'info';
  }
};
</script>

<style>

</style>