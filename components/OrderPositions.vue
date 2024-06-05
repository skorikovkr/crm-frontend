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
      >
        <template #body="slotProps">
          <div class="flex flex-col">
            <div>
              {{ slotProps.data.name }}
            </div>
            <div class="flex gap-2">
              <div v-for="property in (slotProps.data.properties ?? []).filter(v => v.name == 'width' || v.name == 'length' || v.name == 'pack').map(v => {
                if (v.name == 'width') return { name: 'Ширина', value: v.value + 'мм' };
                if (v.name == 'length') return { name: 'Длина', value: v.value + 'мм' };
                if (v.name == 'pack') return { name: 'Упаковка', value: v.value };
              })" class="font-medium">
                {{ property.name }}: {{ property.value }}
              </div>
            </div>
          </div>
        </template>
      </Column>
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