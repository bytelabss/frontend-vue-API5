<template>
    <div>
        <table>
        <thead>
            <tr>
                <th @click="sortUsersInteiro('id')"> Id</th>
                <th @click="sortUsersString('nome')">Nome</th>
                <th @click="sortDataCriacao('dataCriacao')">Data de criação</th>
                <th @click="sortUsersString('requisitos')">Requisitos</th>
                <th @click="sortUsersString('status')">Status</th>
            </tr>
        </thead>
        <tbody v-for="vaga in vagas" :key="vaga.id">
            <tr>
                <td>{{ vaga.id }}</td>
                <td>{{ vaga.nome }}</td>
                <td>{{ vaga.dataCriacao }}</td>
                <td>{{ vaga.requisitos }}</td>
                <td>{{ vaga.status }}</td>
            </tr>
        </tbody>
    </table>
    </div>
</template>

<script>
export default {
    name: 'TabelaVagas',
    data() {
        return {
            vagas :[
            ]
        };
    },
    async mounted() {
        await this.fetchData();
        console.log(this.vagas)
    },
    methods: {
        sortUsersString: function(chave) {
            console.log(chave)
            this.vagas.sort(function(a, b) {
                return a[chave].localeCompare(b[chave])
            });
        },
        sortDataCriacao: function(chave) {
            console.log(chave)
            this.vagas.sort(function(a, b) {
                return b[chave].localeCompare(a[chave])
            });
        },
        sortUsersInteiro: function(chave) {
            console.log(chave)
            this.vagas.sort(function(a, b) {
                return a[chave]-b[chave]
            });
        },
        async fetchData() {
            try {
                const response = await fetch('http://localhost:9090/api/vagas');
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
            this.vagas = data;
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
