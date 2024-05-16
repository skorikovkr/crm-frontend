
<template>
  <div>
    <h1 class="mb-4 font-medium text-2xl">Воронка продаж</h1>
    <p>Параметры:</p>
    <div class="flex gap-2 mb-2 items-center">
      <label>От</label>
      <Calendar v-model="startDate" dateFormat="dd.mm.yy" />
      <label>До</label>
      <Calendar v-model="endDate" dateFormat="dd.mm.yy" />
      <Button label="Получить отчет" @click="handleGetReportClick" />
    </div>
    <Chart
      ref="bar"
      type="bar"
      :data="chartData" 
      :options="chartOptions"
    />
    <p class="mt-4 font-medium text-xl">
      Сумма: {{ formatCurrency(income) }}
    </p>
    <p class="mt-4 font-medium text-xl">
      Конверсия: {{ (data?.conversion * 100).toString().substring(0,4) }}%
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Chart from 'primevue/chart';

onMounted(async () => {
    chartData.value = await setChartData();
    chartOptions.value = setChartOptions();
});

const bar = ref();
const chartData = ref();
const chartOptions = ref();
const income = ref(0);
const data = ref();
const miscStore = useMiscEnumsStore();
const organizationStore = useCompanyStore();
const startDate = ref(new Date(2000, 0, 1));
const endDate = ref(new Date());

const setChartData = async () => {
    if (!organizationStore.current) return;
    const response = await $laravelFetch(`/api/organizations/${organizationStore.current.id}/reports/purchase-funnel`, {
        query: {
            start_date: startDate.value.toISOString(),
            end_date: endDate.value.toISOString()
        }
    });
    data.value = response;
    income.value = new Number(response.income);
    return {
        labels: [...response.funnel.map(s => miscStore.orderStatuses.find(s2 => s.name == s2.name).i18n), 'Проиграно'],
        datasets: [
            {
                data: [...response.funnel.map(s => s.count), response.failed_orders.count],
                backgroundColor: [...response.funnel, { name: 'Failed' }].map(s => {
                    if (s.name == "Completed") return 'rgba(0, 255, 0, 0.2)';
                    if (s.name == "Failed") return 'rgba(255, 0, 0, 0.2)';
                    return "rgba(0, 0, 255, 0.2)";
                }),
                borderWidth: 1
            }
        ]
    };
};

const handleGetReportClick = async () => {
    chartData.value = await setChartData();
    bar.value.getChart().refresh();
}

const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
}
</script>
