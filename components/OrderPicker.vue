<template>
  <div>
    <DataTable
      paginator
      :rows="5"
      :rows-per-page-options="[5, 10, 20, 50]"
      :value="orders"
      table-style="min-width: 50rem;"
    >
      <Column
        field="name"
        header="Наименование"
        sortable
      />
      <Column
        field="client.name"
        header="Клиент"
        sortable
      />
      <Column
        field="version"
        header="Версия"
        sortable
      />
      <Column
        field="__controls"
        header=""
        :show-filter-menu="false"
      >
        <template #body="{ data }">
          <Button
            label="Выбрать"
            @click="() => handleClientClick(data)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script lang="ts" setup>
import type { Order } from '~/types/Order';

const selectedOrder = defineModel<Order|null>('selectedOrder');

const props = defineProps<{
  organizationId?: string|number
}>();

const orders = ref<Order[]>([]);

const refresh = async () => {
  orders.value = await $laravelFetch<Order[]>(`/api/organizations/${props.organizationId}/orders`);
};

const handleClientClick = (order: Order) => {
  selectedOrder.value = order;
}

defineExpose({
  refresh
});

await refresh();
</script>

<style>

</style>