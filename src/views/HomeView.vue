<script setup>
import TempoMedioDeContratacaoPorVaga from '@/components/TempoMedioDeContratacaoPorVaga.vue';
import QuantidadeContratacoesPorRh from '@/components/QuantidadeContratacoesPorRh.vue';
import TempoMedioPorProcessoSeletivo from '@/components/TempoMedioPorProcessoSeletivo.vue';
import QuantidadeDeProcessoSeletivo from '@/components/QuantidadeDeProcessoSeletivo.vue';
</script>

<template>
  <div class="wrapper">
    <div class="row">
      <div class="graph"><TempoMedioDeContratacaoPorVaga/></div>
      <div class="graph"><QuantidadeContratacoesPorRh/></div>
    </div>
    <div class="row">
      <div class="graph"><TempoMedioPorProcessoSeletivo /></div>
      <div class="graph"><QuantidadeDeProcessoSeletivo/></div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  padding: 1.5rem 3rem ;
}

.row {
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  flex-direction: row;
  margin-bottom: 2rem;
  justify-content: center;
}

.graph {
  flex: 1;
  min-width: 420px;
  padding: 2rem;
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


@media (max-width: 680px) {
  .wrapper {
    padding: 1rem ;
  }

  .row {
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    flex-direction: row;
    margin-bottom: 0;
  }

  .graph {
    flex: 1;
    min-width: 420px;
    padding: 0;
    margin-bottom: 3rem;
  }
}
</style>
