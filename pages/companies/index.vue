<template>
  <div>
    <DataTable paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" :value="organizations" tableStyle="min-width: 50rem;">
      <Column field="INN" header="ИНН" sortable></Column>
      <Column field="address" header="Адрес" sortable></Column>
      <Column field="name" header="Наименование" sortable></Column>
      <Column field="__controls" header="" :showFilterMenu="false">
        <template #body="{ data }">
            <NuxtLink :to="`/company/${data.id}/update`">
                <Button label="Редактировать" />
            </NuxtLink>
        </template>
    </Column>
    </DataTable>
    <NuxtLink to="/company/create" class="mt-4">
      <Button label="Создать новую" />
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import type { Company } from '~/types/Company';

const { data: organizations } = await useLaravelFetch<Company[]>('/api/organizations/my');

</script>

<style>

</style>