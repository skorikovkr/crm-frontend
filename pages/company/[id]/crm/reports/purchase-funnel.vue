
<template>
  <div>
    <h1 class="mb-4 font-medium text-2xl">Воронка продаж</h1>
    <Chart
      type="bar" 
      :data="chartData" 
      :options="chartOptions"
    />
    <p class="mt-4 font-medium text-2xl">
      Сумма: {{ formatCurrency(income) }}
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

const chartData = ref();
const chartOptions = ref();
const income = ref(0);
const miscStore = useMiscEnumsStore();
const organizationStore = useCompanyStore();

const setChartData = async () => {
    if (!organizationStore.current) return;
    const data = await $laravelFetch(`/api/organizations/${organizationStore.current.id}/reports/purchase-funnel`, {
        query: {
            start_date: new Date(2000, 0, 1).toISOString(),
            end_date: new Date().toISOString()
        }
    });
    income.value = new Number(data.income);
    return {
        labels: [...data.funnel.map(s => miscStore.orderStatuses.find(s2 => s.name == s2.name).i18n), 'Проиграно'],
        datasets: [
            {
                data: [...data.funnel.map(s => s.count), data.failed_orders.count],
                backgroundColor: [...data.funnel, { name: 'Failed' }].map(s => {
                    if (s.name == "Completed") return 'rgba(0, 255, 0, 0.2)';
                    if (s.name == "Failed") return 'rgba(255, 0, 0, 0.2)';
                    return "rgba(0, 0, 255, 0.2)";
                }),
                borderWidth: 1
            }
        ]
    };
};
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
