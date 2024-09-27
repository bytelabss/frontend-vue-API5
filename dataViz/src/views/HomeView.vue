<template>
  <div class="wrapper">
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
  </div>

</template>

<script setup>
  import DashboardCard from '../components/DashboardCard.vue'
  import ResumeCard from '../components/ResumeCard.vue'
  import GraphTest from '../components/GraphTest.vue'
  import { onMounted, ref } from 'vue';
  import apiClient from '@/api/client';

  const chartData = ref([]);

  const transformData = (data) => {
    chartData.value = Object.entries(data)
  };

  const fetchDataTempoMedio = async () => {

    console.log("function fired");

    try {
      const response = await apiClient.get("/fatoContratacoes/tempo-medio-por-vaga");
      transformData(response.data);
    } catch (error) {
      console.error("Erro ao pegar dados pela API: ", error)
    }
  };

  onMounted(() => {
    console.log("onmounted");
    fetchDataTempoMedio();
    console.log(chartData);
  });

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
