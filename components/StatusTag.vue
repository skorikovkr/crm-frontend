<template>
  <Tag 
    :value="miscStore.orderStatuses?.find(s => s.id == order?.order_status_id ?? statusId)?.i18n ?? '-'" 
    :severity="getSeverity(order)" 
  />
</template>

<script lang="ts" setup>
import type { Order } from '~/types/Order';

const props = defineProps<{
    order?: Order,
    statusId?: number
}>();

const miscStore = useMiscEnumsStore();

const getSeverity = (order?: Order) => {
  let status = null;
  if (order)
    status = miscStore.orderStatuses?.find(s => s.id == order.order_status_id)?.name;
  else
    status = miscStore.orderStatuses?.find(s => s.id == props.statusId)?.name;
  switch (status) {
    case 'Completed':
      return 'success';
    case 'Canceled':
      return 'danger';
    case 'Failed':
      return 'danger';
    default:
      return 'info';
  }
};
</script>

<style>

</style>