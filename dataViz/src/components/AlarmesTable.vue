<template>
    <div>
        <table>
        <thead>
            <tr>
                <th>Nome</th>
                <th>Tem alarme?</th>
                <th>Ignorar até</th>
                <th>Limite mínimo</th>
                <th>Limite máximo</th>
            </tr>
        </thead>
        <tbody v-for="alarme in alarmes" :key="alarme.id">
            <tr>
                <td>{{ alarme.name }}</td>
                <td>{{ alarme.hasAlarm }}</td>
                <td>{{ alarme.ignoreUntil }}</td>
                <td>{{ alarme.minLimit }}</td>
                <td>{{ alarme.maxLimit }}</td>
            </tr>
        </tbody>
    </table>
    </div>
</template>

<script>

export default {
    name: 'TabelaAlarmes',
    data() {
        return {
            alarmes :[],
        };
    },
    async mounted() {
        await this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                const response = await fetch('http://localhost:9090/api/graficos/alarmesAtivos');
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
            this.alarmes = data;
        }
    }
};
</script>

<style scoped>

    .titulo {
        text-align: center;
        font-size: 24px;
        color: #333;
    }

    .titulo:hover {
        background-color: var(--hover);
        border-radius: calc(var(--raio_border-default) / 2);
    }

</style>
