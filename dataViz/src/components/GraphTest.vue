<template>
  <div style="width:600px;">
    <column-chart :data="chartData"></column-chart>
  </div>
</template>


<script setup>
  import { ref } from "vue";
  import { defineProps } from "vue";

  const chartData = ref([]);

  const props = defineProps({
    chartData: Array
  });





</script>
