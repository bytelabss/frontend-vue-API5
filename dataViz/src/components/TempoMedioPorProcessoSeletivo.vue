<template>
    <div>
        <h1 class="titulo">Tempo Médio de Contratação por Processo Seletivo</h1>
        <column-chart :data="chartData" :colors="['#3903fc', '#e88700', '#3903fc']"></column-chart>
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
                const response = await fetch('http://localhost:9090/api/fatoContratacoes?inicio=2023-01-04T00:00:00&fim=2024-01-30T00:00:00');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                this.transformData(data);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        },
        //transforma array de objetos recebido como data do back em um único objeto
        transformData(data) {
            this.chartData = data.reduce((acc, curr) => {
                acc[curr.nome] = curr.tempo_medio;
                return acc;
            }, {});
            console.log(this.chartData);
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

</style>
