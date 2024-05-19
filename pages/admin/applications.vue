<template>
  <div>
    <DataTable
      v-if="! pending"
      v-model:filters="filters"
      paginator
      data-key="id"
      filter-display="row"
      :rows="10"
      :global-filter-fields="['name', 'phone', 'email']"
      :rows-per-page-options="[5, 10, 20, 50]"
      :value="applications"
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
      <template #empty>Не найдено заявок.</template>
      <Column
        field="name"
        header="ФИО"
        sortable
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Поиск..." />
        </template>
      </Column>
      <Column
        field="phone"
        header="Номер телефона"
        sortable
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Поиск..." />
        </template>
      </Column>
      <Column
        field="email"
        header="Электронная почта"
        sortable
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Поиск..." />
        </template>
      </Column>
      <Column
        field="__controls"
        header=""
        :show-filter-menu="false"
      >
        <template #body="{ data }">
          <div class="flex gap-1">
            <Button
              icon="pi pi-check"
              @click="() => handleApplictionClick(data)"
            />
            <Button icon="pi pi-trash" severity="danger" />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script lang="ts" setup>
import { FilterMatchMode } from 'primevue/api';

definePageMeta({
  layout: 'index-page'
});

const { data: applications, pending } = useLaravelFetch(`/api/applications`);
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    phone: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    email: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
});
const handleApplictionClick = (data: any) => {

};
</script>

<style>

</style>