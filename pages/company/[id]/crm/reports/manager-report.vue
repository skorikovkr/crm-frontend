<template>
  <div>
    <h1 class="mb-4 font-medium text-2xl">
      Эффективность менеджеров
    </h1>
    <p>Параметры:</p>
    <div class="flex gap-2 mb-2 items-center">
      <label>От</label>
      <Calendar
        v-model="startDate"
        date-format="dd.mm.yy"
      />
      <label>До</label>
      <Calendar
        v-model="endDate"
        date-format="dd.mm.yy"
      />
      <Button
        label="Получить отчет"
        @click="handleGetReportClick"
      />
    </div>
    <DataTable :value="report.rows">
      <Column header="Менеджер" field="manager">
        <template #body="slotProps">
          {{ slotProps.data.manager.name }}
        </template>
      </Column>
      <Column header="Сделок" field="deals_number">
        <template #body="slotProps">
          {{ slotProps.data.deals_number }}
        </template>
      </Column>
      <Column header="Сумма" field="sum">
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.sum) }}
        </template>
      </Column>
      <Column field="loses" header="Потери">
        <template #body="slotProps">
          {{ slotProps.data.loses }}%
        </template>
      </Column>
      <Column field="conversion" header="Конверсия">
        <template #body="slotProps">
          {{ slotProps.data.conversion }}%
        </template>
      </Column>

      <ColumnGroup type="footer">
        <Row>
          <Column footer="Итого:" footerStyle="text-align:right" />
          <Column :footer="report.total.deals_number.toString()" />
          <Column :footer="formatCurrency(report.total.sum)" />
          <Column :footer="report.total.loses.toString() + '%'" />
          <Column :footer="report.total.conversion.toString() + '%'" />
        </Row>
      </ColumnGroup>
    </DataTable>
  </div>
</template>

<script lang="ts" setup>
const startDate = ref(new Date(2024, 0, 1));
const endDate = ref(new Date());
const report = ref({
  rows: [{
    manager: {
      id: 0,
      name: 'manager 1'
    },
    deals_number: 4,
    sum: 43573,
    loses: 25,
    conversion: 50
  }, {
    manager: {
      id: 1,
      name: 'manager 2'
    },
    deals_number: 6,
    sum: 58630,
    loses: 16.7,
    conversion: 66.7,
  }],
  total: {
    deals_number: 10,
    sum: 101203,
    loses: 20,
    conversion: 60,
  }
});

const handleGetReportClick = async () => {
  //TODO: request
}
</script>

<style>

</style>