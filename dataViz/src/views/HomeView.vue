<script setup>
import TempoMedioDeContratacaoPorVaga from '@/components/TempoMedioDeContratacaoPorVaga.vue';
import QuantidadeContratacoesPorRh from '@/components/QuantidadeContratacoesPorRh.vue';
</script>

<template>
  <div class="wrapper">
    <TempoMedioDeContratacaoPorVaga/>
    </div>
    <div class="wrapper">
    <QuantidadeContratacoesPorRh/>
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
