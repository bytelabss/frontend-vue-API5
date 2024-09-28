<template>
    <div>
        <column-chart :data="chartData" :colors="['#e88700', '#3903fc', '#3903fc', '#3903fc', '#e88700', '#e88700']"></column-chart>
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
        }
    }
};
</script>
