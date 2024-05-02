<template>
  <div>
    <DataTable
      paginator
      :rows="5"
      :rows-per-page-options="[5, 10, 20, 50]"
      :value="organizations"
      table-style="min-width: 50rem;"
      class="z-0"
    >
      <Column
        field="INN"
        class="w-[33%]"
        header="ИНН"
        sortable
      />
      <Column
        field="address"
        class="w-[33%]"
        header="Адрес"
        sortable
      />
      <Column
        field="name"
        class="w-[33%]"
        header="Наименование"
        sortable
      />
      <Column
        field="__controls"
        class="w-[120px]"
        header=""
        :show-filter-menu="false"
      >
        <template #body="{ data }">
          <div class="flex gap-2">
            <NuxtLink :to="`/company/${data.id}/crm/update`">
              <Button>
                <i class="pi pi-pen-to-square" />
              </Button>
            </NuxtLink>
            <NuxtLink :to="`/company/${data.id}/crm`">
              <Button>
                <i class="pi pi-eye" />
              </Button>
            </NuxtLink>
          </div>
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