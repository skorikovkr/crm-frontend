<template>
  <div>
    <DataTable
      paginator
      :rows="5"
      :rows-per-page-options="[5, 10, 20, 50]"
      :value="organizations"
      table-style="min-width: 50rem;"
    >
      <Column
        field="INN"
        header="ИНН"
        sortable
      />
      <Column
        field="address"
        header="Адрес"
        sortable
      />
      <Column
        field="name"
        header="Наименование"
        sortable
      />
      <Column
        field="__controls"
        header=""
        :show-filter-menu="false"
      >
        <template #body="{ data }">
          <NuxtLink :to="`/company/${data.id}/update`">
            <Button label="Редактировать" />
          </NuxtLink>
        </template>
      </Column>
    </DataTable>
    <NuxtLink
      to="/company/create"
      class="mt-4"
    >
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