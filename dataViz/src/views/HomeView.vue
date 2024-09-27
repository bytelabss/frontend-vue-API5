<template>
  <!-- <div class="wrapper">
    <div class="resumes">
      <ResumeCard title="Canditos" resume="DDDD" />
      <ResumeCard title="Total de vagas" resume="DDDD" />
      <ResumeCard title="Candidatos por vaga" resume="DDDD" />
    </div>
    <div class="dashs">
      <DashboardCard title="ttt" description="DDDD" />
      <GraphTest :data="chartData"></GraphTest>
    </div>
    <div class="VagasRecentes">
      <DashboardCard title="ttt" description="DDDD" />
    </div>
  </div> -->

  <GraphTest></GraphTest>

</template>

<script setup>
  import DashboardCard from '../components/DashboardCard.vue'
  import ResumeCard from '../components/ResumeCard.vue'
  import GraphTest from '../components/GraphTest.vue'
  import { onMounted, ref, computed } from 'vue';
  import apiClient from '@/api/client';

  // const chartData = ref([]);

  // const plainChartData = computed(() => [...chartData.value]);

  // const transformData = (data) => {

  //   const transformedEntries = Object.entries(data).map(([key, value]) => {
  //     return [key, value];
  //   });

  //   chartData.value = transformedEntries;

  //   console.log("new chartdata: ", chartData.value);

    
  // };

  // console.log("plain: ", plainChartData);

  // const fetchDataTempoMedio = async () => {

  //   console.log("function fired");

  //   try {
  //     const response = await fetch('http://localhost:9090/api/fatoContratacoes/tempo-medio-por-vaga');
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     console.log("response: ", response);
  //     const data = await response.json();
  //     console.log("data: ", data );
  //     transformData(data);
  //   } catch (error) {
  //     console.error("Erro ao pegar dados pela API: ", error)
  //   }
  // };

  // onMounted(() => {
  //   console.log("onmounted");
  //   fetchDataTempoMedio();
  // });

</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  overflow: hidden;
}

.resumes {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}

.dashs {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
}

.VagasRecentes {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
</style>
