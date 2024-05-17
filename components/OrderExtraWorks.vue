<template>
  <div>
    <div class="flex gap-2 pb-2">
      <label class="self-center">Наименование</label>
      <InputText v-model="name" />
      <label class="self-center">Сумма</label>
      <InputNumber v-model="price" />
      <Button
        label="Добавить"
        class="ml-6"
        @click="handleAddExtraWorkClick"
      />
    </div>
    <DataTable
      :value="extraWorks"
    >
      <Column
        field="name"
        header="Наименование"
      />
      <Column
        field="price"
        header="Сумма"
      >
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.price) }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script lang="ts" setup>
import type { ExtraWork } from '~/types/ExtraWork';
import { formatCurrency } from '~/utils/formatCurrency.ts';

const extraWorks = defineModel<ExtraWork[]>();
const name = ref<string>('');
const price = ref<number>(0);

const handleAddExtraWorkClick = () => {
  extraWorks.value?.push({
    name: name.value,
    price: price.value
  });
  name.value = '';
  price.value = 0;
}
</script>

<style>

</style>