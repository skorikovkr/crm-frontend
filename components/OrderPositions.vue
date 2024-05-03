<template>
  <div>
    <DataTable
      paginator
      :rows="5"
      :rows-per-page-options="[5, 10, 20, 50]"
      :value="positions"
      table-style="min-width: 50rem;"
    >
      <Column
        field="name"
        header="Наименование"
        sortable
      />
      <Column
        field="price"
        header="Цена"
        sortable
      >
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.price) }}
        </template>
      </Column>
      <Column
        field="amount"
        header="Кол-во"
        sortable
      />
      <Column
        field="unit"
        header="Ед."
        sortable
      />
    </DataTable>
  </div>
</template>

<script lang="ts" setup>
import type { OrderPosition } from '~/types/OrderPosition';
import { formatCurrency } from '~/utils/formatCurrency.ts';

const props = defineProps<{
  positions: OrderPosition[]
}>();

</script>

<style>

</style>