<template>
  <div>
    <!-- Dynamically render the chart based on the chartType prop -->
     <h4>
        {{ chartId }}:
     </h4>
    <component
      :is="chartComponent"
      :data="chartData"
      :id="chartId"
      :width="'100%'"
      :height="'400px'"
    ></component>
  </div>
</template>

<script setup>
    import { computed } from "vue";
    // import { LineChart, PieChart, ColumnChart, BarChart } from "vue-chartkick";

    // Props
    // eslint-disable-next-line no-unused-vars
    const props = defineProps({
        chartType: {
            type: String,
            required: true,
            validator: (value) => ["line", "pie", "column", "bar"].includes(value),
        },
        chartData: {
            type: Array,
            required: true,
        },
        chartId: {
            type: String,
            required: true,
        },
    });

    // Map chart type to component
    const chartComponent = computed(() => {
        const typeMap = {
            line: 'line-chart',
            pie: 'pie-chart',
            column: 'column-chart',
            bar: 'bar-chart',
        };
        return typeMap[props.chartType];
    });
</script>