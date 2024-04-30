<template>
  <div>
    <DataTable
      v-model:filters="filters"
      paginator
      :rows="5"
      :rows-per-page-options="[5, 10, 20, 50]"
      :value="clients"
      filter-display="row"
      table-style="min-width: 50rem;"
    >
      <Column field="name" filterField="name" header="ФИО" sortable></Column>
      <Column field="phone" filterField="phone" header="Телефон" sortable></Column>
      <Column field="email" filterField="email" header="Почта" sortable></Column>
      <Column field="__controls" header="" :showFilterMenu="false">
        <template #body="{ data }">
          <Button label="Выбрать" @click="() => handleClientClick(data)" />
        </template>
      </Column>
    </DataTable>
    <Button label="Добавить клиента" />
    <Button label="REFRESH" @click="refresh" />
  </div>
</template>

<script lang="ts" setup>
import type { Client } from '~/types/Client';
import { FilterMatchMode } from 'primevue/api';

const selectedClient = defineModel<Client|null>('selectedClient');

const props = defineProps<{
  organizationId?: string|number
}>();

const clients = ref<Client[]>([]);
const filters = ref({
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  phone: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});

const refresh = async () => {
  clients.value = await $laravelFetch<Client[]>(`/api/organizations/${props.organizationId}/clients`);
};

const handleClientClick = (client: Client) => {
  selectedClient.value = client;
}

</script>

<style>

</style>