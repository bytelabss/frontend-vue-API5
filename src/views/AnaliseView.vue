<template>
    <div class="viewBody">
        <h1 style="color: #333;">Minhas Análises</h1>

        <!-- Button to open the modal -->
        <button @click="showModal = true">Criar Nova Análise</button>

        <div>
          <table v-if="queries.length" class="queries-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Descrição</th>
                <th>Query</th>
                <th>Created At</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(query, index) in queries" :key="query.id">
                <td>{{ query.id }}</td>
                <td>{{ query.description }}</td>

                <!-- Query column with toggle for expanding/collapsing text -->
                <td>
                  <div :class="{ 'collapsed': !expandedRows[index] }">
                    {{ query.query }}
                  </div>
                  <button @click="toggleExpand(index)">
                    {{ expandedRows[index] ? 'Fechar' : 'Expandir' }}
                  </button>
                </td>

                <td>{{ query.createdAt }}</td>
                
                <td>
                  <button @click="executeQuery(query.id)">Executar Query</button>
                </td>
              </tr>
            </tbody>
          </table>
  
          <p v-else>Nenhuma query customizada encontrada.</p>
        </div>
  
        <!-- Modal Window Component -->
        <GerarDashboardCustomizado
            v-if="showModal"
            :title="'Criar Análise'"
            :isVisible="showModal"
            :selects="selectOptions"
            @close="showModal = false"
            @submitFormData="handleFormSubmit"
        />

        <!-- Render the DynamicChart after submission -->
        <div v-if="customQueryCharts.length" class="customquery-charts">
          <h3>Análises Personalizadas:</h3>
          <div v-for="(chart, index) in customQueryCharts" :key="index">
            <CustomQueryChart
              :chartType="chart.chartType"
              :chartData="chart.chartData"
              :chartId="chart.chartId"
            />
          </div>
        </div>

        <!-- Display Multiple Query Results -->
        <div v-if="queryResults.length" class="query-results">
          <h3>Query Results:</h3>
          <div v-for="(result, index) in queryResults" :key="index" class="result-section">
            <h4>Result for Query ID: {{ result.queryId }}</h4>
            <pre>{{ result.data }}</pre>
          </div>
        </div>

    </div>
</template>
  
<script setup>
  import { onMounted, ref } from "vue";
  import GerarDashboardCustomizado from '@/components/GerarDashboardCustomizado.vue';
  import axios from "axios";
  import CustomQueryChart from "@/components/CustomQueryChart.vue";
  
  // Reactive variable to control modal visibility
  const showModal = ref(false);
  const queryResults = ref([]); // Array to store results of multiple executed queries
  const queries = ref([]); // Store the fetched query data
  const expandedRows = ref([]); // Track expanded state for each row
  const customQueryCharts = ref([]);
  
  onMounted(() => {
    axios
    .get(`${import.meta.env.VITE_BASE_API_URL}/custom-queries/user/${localStorage.getItem("id")}`)
    .then((response) => {
      console.log('get de todas as queries: ', response.data);

      queries.value = response.data.map((item) => ({
        id: item.id,
        query: item.query,
        description: item.description,
        createdAt: item.createdAt,
        visualizationModel: item.visualizationModel
      }));
      // Initialize expanded state for each row
      expandedRows.value = new Array(queries.value.length).fill(false);
    })
    .catch((error) => {
      console.error('Error fetching queries:', error);
    });
  });

  // Toggle expand/collapse for a row
  function toggleExpand(index) {
    expandedRows.value[index] = !expandedRows.value[index];
  }

  function transformResponseToChartData(responseData) {
    // Check the first object in the array to determine its structure
    if (responseData.length === 0) {
      return [];
    }

    const sampleObject = responseData[0];

    // Check for specific keys to decide the mapping strategy
    if (sampleObject.idProcessoSeletivo && sampleObject.quantidade) {

      // Map for `idProcessoSeletivo` and `quantidade` structure
      const chartDataMap = new Map();

      responseData.forEach((item) => {
        const name = item.idProcessoSeletivo.nome;
        const quantidade = item.quantidade;

        if (chartDataMap.has(name)) {
          // Sum up the quantities for duplicate names
          chartDataMap.set(name, chartDataMap.get(name) + quantidade);
        } else {
          chartDataMap.set(name, quantidade);
        }
      });

      return Array.from(chartDataMap.entries());

    } else if (sampleObject.idVaga && sampleObject.tempoMedio) {

      // Map for `idVaga` and `tempoMedio` structure
      const chartDataMap = new Map();

      responseData.forEach((item) => {
        const name = item.idVaga.tituloVaga;
        const quantidade = item.tempoMedio;

        if (chartDataMap.has(name)) {
          // Sum up the quantities for duplicate names
          chartDataMap.set(name, chartDataMap.get(name) + quantidade);
        } else {
          chartDataMap.set(name, quantidade);
        }
      });

      return Array.from(chartDataMap.entries());

    } else {
      // Fallback: Default transformation
      return responseData.map((item) => Object.values(item));
    }
  }

  // Function to handle form submission data from the modal
  function handleFormSubmit({ transformedData, visualizationModel }) {
    console.log("Form Submitted with Data:", transformedData);
    // Process form data as needed, e.g., save it, send it to an API, etc.

    axios
    .post(`${import.meta.env.VITE_BASE_API_URL}/custom-queries`, transformedData)
    .then((response) => {
      // Handle the successful response
      console.log('Query customizada inserida no banco com sucesso! ', response.data);

      // You can also store the response data in a variable or handle it as needed
      // Example: display the results on the page or store in a ref
      const newQuery = response.data;
      const customQueryURL = `${import.meta.env.VITE_BASE_API_URL}/custom-queries/${newQuery.id}/results`;
      // Add logic here to handle the returned data, like updating state or displaying it

      // Update the queries table immediately with the new query data
      queries.value.unshift({
        id: newQuery.id,
        query: transformedData.query,
        description: transformedData.description,
        createdAt: newQuery.createdAt,
      });

      // Add a new expanded state for the added query
      expandedRows.value.unshift(false);      

      axios.get(customQueryURL)
      .then((response) => {

        console.log('Resultado da query customizada: ', response.data);

        const chartData = transformResponseToChartData(response.data);
        console.log('ChartData array gerado: ', chartData)

        // RENDERIZAR RESULTADO EM JSON NA PÁGINA PARA TESTES 
        // queryResults.value.unshift({
        //     queryId: newQuery.id,
        //     data: response.data
        //   });

        customQueryCharts.value.push({
          chartType: visualizationModel || "pie", // Default to "pie" if not specified
          chartData: chartData, // Default data
          chartId: `chart-${customQueryCharts.value.length + 1}`, // Unique ID for the chart
        });
      })
      .catch((error) => {
        console.error('Erro ao executar a custom query: ', error);
      });

    })
    .catch((error) => {
      // Handle any errors from the request
      console.error('Erro ao postar a query customizada: ', error);
    });

  }

  // Function to execute an individual query from the table
  function executeQuery(queryId) {
    const customQueryURL = `${import.meta.env.VITE_BASE_API_URL}/custom-queries/${queryId}/results`;
    const customQueryInfoURL = `${import.meta.env.VITE_BASE_API_URL}/custom-queries/${queryId}`;
    

    axios.get(customQueryInfoURL).then((response) => {

      const queryInfo = response.data
      const visualizationModel = queryInfo.visualizationModel;

      axios
        .get(customQueryURL)
        .then((response) => {
          console.log(`Resultado da query com ID ${queryId}: `, response.data);
  
          const chartData = transformResponseToChartData(response.data);
          console.log('ChartData array gerado: ', chartData)
          
          // RENDERIZAR RESULTADO EM JSON NA PÁGINA PARA TESTES 
          // queryResults.value.unshift({
          //   queryId,
          //   data: response.data
          // });
  
          console.log('visualizationModel: ', visualizationModel);
  
          console.log('queryInfo: ', queryInfo);
  
          customQueryCharts.value.push({
            chartType: visualizationModel || "pie", // Default to "pie" if not specified
            chartData: chartData, // Default data
            chartId: `chart-${customQueryCharts.value.length + 1}`, // Unique ID for the chart
          });
        })
        .catch((error) => {
          console.error(`Erro ao executar a query com ID ${queryId}: `, error);
        });

    });

    
  }

</script>
  
<style scoped>

  .viewBody {
    margin: 0 auto;
    padding-top: 30px;
    /* display: flex; */
    justify-content: center;
    align-items: center;
    min-height: 100vh; /* Full viewport height */
    text-align: center;
    flex-direction: column;
  };

  button {
    padding: 10px 15px;
    font-size: 16px;
    cursor: pointer;
    background-color: #554d96;
    color: white;
  }

  .query-results {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    background-color: #f9f9f9;
  }

  .queries-table {
    width: 90%;
    border-collapse: collapse;
    margin: 20px auto;
  }

  .queries-table th,
  .queries-table td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }

  .queries-table th {
    background-color: #f4f4f4;
  }

  .queries-table td div.collapsed {
    max-height: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .queries-table td button {
    margin-top: 5px;
    padding: 4px 8px;
    cursor: pointer;
  }

  .result-section {
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    background-color: #f1f1f1;
  }
</style>