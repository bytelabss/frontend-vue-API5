<template>
    <div>
        <!-- Campo para inserir o número do processo seletivo -->
        <div>
            <label for="processoSeletivo">Número do Processo Seletivo:</label>
            <input type="number" v-model="numeroProcessoSeletivo" @change="fetchData" placeholder="Digite o número do processo" />
        </div>

        <div>
            <label for="nomeProcessoSeletivo">Nome do Processo Seletivo:</label>
            <input type="text" v-model="nomeProcessoSeletivo" @change="fetchDataByName" placeholder="Digite o nome do processo" />
        </div>


        <table>
        <thead>
            <tr>
                <th @click="sortUsersString('titulovaga')">Título da Vaga</th>
                <th @click="sortUsersString('nomecandidato')">Nome do Candidato</th>
                <th @click="sortUsersString('nomeProcessoSeletivo')">Nome do Processo Seletivo</th>
            </tr>
        </thead>
        <tbody v-for="vaga in vagas" :key="vaga.titulovaga">
            <tr>
                <td>{{ vaga.titulovaga }}</td>
                <td>{{ vaga.nomecandidato }}</td>
                <td>{{ vaga.nomeProcessoSeletivo }}</td>
            </tr>
        </tbody>
    </table>
    </div>
</template>

<script>
export default {
    name: 'TabelaCandidatosPorProcessoSeletivo',
    data() {
    return {
        numeroProcessoSeletivo: '', 
        nomeProcessoSeletivo: '',
        vagas: []
    };
},
methods: {
    async fetchDataByName() {
        if (!this.nomeProcessoSeletivo) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:9090/api/fatoAvaliacoes/buscarPorNomeProcessoSeletivo?nomeProcessoSeletivo=${this.nomeProcessoSeletivo}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            this.transformData(data);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    },
        sortUsersString: function(chave) {
            console.log(chave)
            this.vagas.sort(function(a, b) {
                return a[chave].localeCompare(b[chave])
            });
        },
        async fetchData() {
            if (!this.numeroProcessoSeletivo) {
                return;
            }
            try {
                const response = await fetch(`http://localhost:9090/api/fatoAvaliacoes/candidatoProcessoSeletivo?numeroProcessoSeletivo=${this.numeroProcessoSeletivo}`);
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
    table {
        width: 100%;
        border-collapse: collapse;
    }

    th, td {
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }

    th {
        cursor: pointer;
    }

    th:hover {
        background-color: #f1f1f1;
    }
</style>
