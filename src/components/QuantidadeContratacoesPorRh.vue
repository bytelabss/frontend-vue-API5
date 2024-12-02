<template>
  <div>
    <h1 class="titulo">Quantidade de Contratações por Participante RH</h1>

    <div class="filtros">
      <div class="filtro-item">
        <label for="mesInicial">Mês Inicial:</label>
        <select id="mesInicial" v-model="mesInicial" @change="fetchData">
          <option v-for="mes in meses" :key="mes.numero" :value="mes.numero">
            {{ mes.numero }}
          </option>
        </select>
      </div>

      <div class="filtro-item">
        <label for="anoInicial">Ano Inicial:</label>
        <select id="anoInicial" v-model="anoInicial" @change="fetchData">
          <option v-for="ano in anos" :key="ano.numero" :value="ano.numero">
            {{ ano.numero }}
          </option>
        </select>
      </div>

      <div class="filtro-item">
        <label for="mesFinal">Mês Final:</label>
        <select id="mesFinal" v-model="mesFinal" @change="fetchData">
          <option v-for="mes in meses" :key="mes.numero" :value="mes.numero">
            {{ mes.numero }}
          </option>
        </select>
      </div>

      <div class="filtro-item">
        <label for="anoFinal">Ano Final:</label>
        <select id="anoFinal" v-model="anoFinal" @change="fetchData">
          <option v-for="ano in anos" :key="ano.numero" :value="ano.numero">
            {{ ano.numero }}
          </option>
        </select>
      </div>
    </div>

    <div>
      <pie-chart :data="chartData" :colors="['#00b7a3', '#019cbb', '#3a6aaa']" :donut="true"></pie-chart>
    </div>

    <div class="export-buttons">
      <button @click="exportExcel">XLSX</button>
      <button @click="exportPdf">PDF</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuantidadeContratacoesPorRh",
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
        const response = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/fatoContratacoes/quantidadeContratacoesRH?mesInicial=${this.mesInicial}&anoInicial=${this.anoInicial}&mesFinal=${this.mesFinal}&anoFinal=${this.anoFinal}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        this.transformData(data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    },
    transformData(data) {
      this.chartData = data.map(item => [item.cargo, item.totalContratacoes]);
    },
    async exportExcel() {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/excel/participantesRH`, {
          method: 'GET',
        });
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'ParticipantesRH.xlsx';
        link.click();
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Erro ao exportar Excel:', error);
      }
    },
    async exportPdf() {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/pdf/participantesRH`, {
          method: 'GET',
        });
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'ParticipantesRH.pdf';
        link.click();
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Erro ao exportar PDF:', error);
      }
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

.export-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.export-buttons button {
  margin: 0 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
