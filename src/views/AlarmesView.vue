<script setup>
import AlarmesTable from '@/components/AlarmesTable.vue';
</script>

<template>
  <div class="wrapper">
    <h1 class="titulo">Alarmes ativos</h1>
    <div class="row">
      <div class="graph"><AlarmesTable/></div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  padding: 1.5rem 3rem ;
}
.titulo {
        text-align: center;
        font-size: 24px;
        color: #333;
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
