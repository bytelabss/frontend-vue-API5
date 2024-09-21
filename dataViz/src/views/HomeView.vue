<script setup>
import DashboardCard from '../components/DashboardCard.vue'
import ResumeCard from '../components/ResumeCard.vue'
</script>

<template>
  <div class="wrapper">
    <div class="resumes">
      <ResumeCard title="Canditos" resume="DDDD" />
      <ResumeCard title="Total de vagas" resume="DDDD" />
      <ResumeCard title="Candidatos por vaga" resume="DDDD" />
    </div>
    <div class="dashs">
      <DashboardCard title="ttt" description="DDDD" />
      <DashboardCard title="ttt" description="DDDD" />
    </div>
    <div class="VagasRecentes">
      <DashboardCard title="ttt" description="DDDD" />
    </div>
  </div>
</template>

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
