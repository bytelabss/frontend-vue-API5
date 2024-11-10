<template>
    <div>
        <h1 class="titulo">Tempo Médio de Contratação por Vaga</h1>
        <div>
            <column-chart :data="chartData" :colors="['#e88700', '#3903fc', '#3903fc', '#3903fc', '#e88700', '#e88700']"></column-chart>
        </div>
        <div class="export-buttons">
            <button @click="exportExcel">XLSX</button>
            <button @click="exportPdf">PDF</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TempoMedioDeContratacaoPorVaga',
    data() {
        return {
            chartData: []
        };
    },
    async mounted() {
        await this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                const response = await fetch('http://localhost:9090/api/fatoContratacoes/tempo-medio-por-vaga');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                this.transformData(data);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        },
        transformData(data) {
            this.chartData = Object.entries(data);
        },
        async exportExcel() {
            try {
                const response = await fetch('http://localhost:9090/api/excel/vagas', {
                    method: 'GET',
                });
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'vagas.xlsx';
                link.click();
                URL.revokeObjectURL(url);
            } catch (error) {
                console.error('Erro ao exportar Excel:', error);
            }
        },
        async exportPdf() {
            try {
                const response = await fetch('http://localhost:9090/api/pdf/vagas', {
                    method: 'GET',
                });
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'vagas.pdf';
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
