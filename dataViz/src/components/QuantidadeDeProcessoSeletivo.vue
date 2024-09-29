<template>
  <div>
    <h1 class="titulo">Quantidade de Contratações por Processo Seletivo</h1>

    <div class="filtros">
        <div class="filtro-item">
          <label for="mesInicial">Mês Inicial:</label>
          <select v-model="mesInicial" @change="fetchData">
            <option v-for="mes in meses" :key="mes.numero" :value="mes.numero">
              {{ mes.numero }}
            </option>
          </select>
        </div>
  
        <div class="filtro-item">
          <label for="anoInicial">Ano Inicial:</label>
          <select v-model="anoInicial" @change="fetchData">
            <option v-for="ano in anos" :key="ano.numero" :value="ano.numero">
              {{ ano.numero }}
            </option>
          </select>
        </div>
  
        <div class="filtro-item">
          <label for="mesFinal">Mês Final:</label>
          <select v-model="mesFinal" @change="fetchData">
            <option v-for="mes in meses" :key="mes.numero" :value="mes.numero">
              {{ mes.numero }}
            </option>
          </select>
        </div>
  
        <div class="filtro-item">
          <label for="anoFinal">Ano Final:</label>
          <select v-model="anoFinal" @change="fetchData">
            <option v-for="ano in anos" :key="ano.numero" :value="ano.numero">
              {{ ano.numero }}
            </option>
          </select>
        </div>
      </div>
    <bar-chart :data="chartData" :colors="['#019cbb', '#3a6aaa', '#019cbb']"></bar-chart>  
  </div>
</template>

<script>
export default {
  name: 'QuantidadeDeProcessoSeletivo',
  data() {
      return {
        chartData: [],
        mesInicial: 1,
        anoInicial: 2024,
        mesFinal: 12,
        anoFinal: 2024,
        meses: [
          { numero: 1 },
          { numero: 2 },
          { numero: 3 },
          { numero: 4 },
          { numero: 5 },
          { numero: 6 },
          { numero: 7 },
          { numero: 8 },
          { numero: 9 },
          { numero: 10 },
          { numero: 11 },
          { numero: 12 }
        ],
        anos: [
          { numero: 2023 },
          { numero: 2024 },
          { numero: 2025 }
        ]
      };
    },

  async mounted() {
      await this.fetchData();
  },
  methods: {
      async fetchData() {
          try {
              const dataInicial = `${this.anoInicial}-${this.mesInicial.toString().padStart(2, '0')}-01T00:00:00`;
              const dataFinal = `${this.anoFinal}-${this.mesFinal.toString().padStart(2, '0')}-01T00:00:00`;
              const url = `http://localhost:9090/api/fatoContratacoes/quantidade?inicio=${dataInicial}&fim=${dataFinal}`;
              
              const response = await fetch(url);
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              const data = await response.json();
              console.log(data);
              this.transformData(data);
          } catch (error) {
              console.error('Erro ao buscar dados:', error);
          }
      },
      transformData(data) {
          this.chartData = data.map(item => [item.nome, item.quantidade]);
      }
  }
};

</script>

<style scoped>

.titulo {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.filtros {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.filtro-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.filtros label {
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
}

.filtros select {
  padding: 5px;
  font-size: 16px;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
}
</style>
