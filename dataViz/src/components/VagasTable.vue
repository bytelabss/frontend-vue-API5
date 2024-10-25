<template>
    <div>
        <table>
        <thead>
            <tr>
                <th @click="sortData('id')"> Id</th>
                <th @click="sortData('nome')">Nome</th>
                <th @click="sortData('dataCriacao')">Data de criação</th>
                <th @click="sortData('requisitos')">Requisitos</th>
                <th @click="sortData('status')">Status</th>
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
            vagas :[],
            ordemData : Boolean
        };
    },
    async mounted() {
        await this.fetchData();
    },
    methods: {
        isArraySortedAsc: function(array, chave) {
            for (let i = 0; i < array.length - 1; i++) {
                if(chave == "dataCriacao"){
                    if (new Date(array[i + 1][chave]) > new Date(array[i][chave])) {
                        return false; // O array não está ordenado
                    }
                }
                else{
                    if(typeof array[i][chave] == "string"){
                        if (array[i + 1][chave].localeCompare(array[i][chave]) > 0) {
                            return false; // O array não está ordenado
                        } 
                    }
                    else{
                        if (array[i + 1][chave] > (array[i][chave])) {
                            return false; // O array não está ordenado
                        } //inteiro
                    }
                    
                }
            }
            return true; // O array está ordenado
        },
        sortData: function(chave) {
            if( this.isArraySortedAsc(this.vagas, chave))
            {
                if(chave == "dataCriacao"){
                    this.vagas.sort(function(a, b) {
                        return new Date(a[chave]) - new Date(b[chave])
                    });
                }  
                else{
                    this.vagas.sort(function(a, b) {
                        if(typeof a[chave] == "string"){
                            return a[chave].localeCompare(b[chave]);
                        }
                        return a[chave] - (b[chave])
                    });
                }
            }
            else{
                if(chave == "dataCriacao"){
                    this.vagas.sort(function(a, b) {
                        return new Date(b[chave]) - new Date(a[chave])
                    });
                }  
                else{
                    this.vagas.sort(function(a, b) {
                        if(typeof a[chave] == "string"){
                            return b[chave].localeCompare(a[chave])
                        }
                        return b[chave] - (a[chave])
                    });
                }
            }
            
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
