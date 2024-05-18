<template>
  <div>
    <DataTable
      v-model:filters="filters"
      paginator
      data-key="id"
      filter-display="row"
      :rows="10"
      :global-filter-fields="['name', 'client.name']"
      :rows-per-page-options="[5, 10, 20, 50]"
      :value="orders"
      
      table-style="min-width: 50rem;"
    >
      <template #header>
        <div class="flex justify-content-end">
          <IconField iconPosition="left">
            <InputIcon>
              <i class="pi pi-search mr-2" />
            </InputIcon>
            <InputText v-model="filters['global'].value" placeholder="Поиск..." />
          </IconField>
        </div>
      </template>
      <template #empty>Не найдено заказов.</template>
      <Column
        field="name"
        header="Наименование"
        sortable
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Поиск..." />
        </template>
      </Column>
      <Column
        field="client.name"
        header="Клиент"
        sortable
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Поиск..." />
        </template>
      </Column>
      <Column
        field="order_status_id"
        header="Статус"
      >
        <template #body="slotProps">
          <StatusTag
            :order="slotProps.data"
          />
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <Dropdown v-model="filterModel.value" option-value="id" option-label="i18n" @change="filterCallback()" :options="miscEnum.orderStatuses" placeholder="Выберите" class="p-column-filter" style="min-width: 12rem" :showClear="true">
            <template #option="slotProps">
              <p>{{ slotProps.option.i18n }}</p>
            </template>
            <template #value="slotProps">
              <p class="h-5">{{ miscEnum.orderStatuses?.find(s => s.id == slotProps.value)?.i18n ?? '' }}</p>
            </template>
          </Dropdown>
        </template>
      </Column>
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
import { FilterMatchMode } from 'primevue/api';

const selectedOrder = defineModel<Order|null>('selectedOrder');

const props = defineProps<{
  organizationId?: string|number
}>();

const orders = ref<Order[]>([]);
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    'client.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    order_status_id: { value: null, matchMode: FilterMatchMode.EQUALS }
});
const miscEnum = useMiscEnumsStore();

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