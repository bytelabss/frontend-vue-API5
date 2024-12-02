<template>
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal">
        <h2>{{ title }}</h2>
        <form @submit.prevent="handleSubmit" class="form-layout">

        <!-- Left Section: Chart Details -->

          <div class="form-section">
            <h3>Detalhes do Dashboard</h3>
            <!-- Visualization Model -->
            <div class="form-group">
              <label for="select1">Escolha o modelo de visualização</label>
              <select id="select1" v-model="formData.visualizationModel">
                <option value="column">Gráfico de colunas</option>
                <option value="bar">Gráfico de barras</option>
                <option value="pie">Gráfico de pizza</option>
                <option value="line">Gráfico de linha</option>
              </select>
            </div>
            <!-- Chart Labels -->
            <div class="form-group">
              <label for="chartLabels">Nomes das Colunas/Barras/Linhas</label>
              <input
                id="chartLabels"
                type="text"
                v-model="formData.chartLabels"
                placeholder="Digite os nomes separados por vírgula"
              />
            </div>
          </div>

        <!-- Right Section: Query Details -->

          <div class="form-section">

            <h3>Detalhes da Análise</h3>

            <!-- Second Select -->
            <div class="form-group">
              <label for="select2">Escolha a área a ser analisada</label>
              <select id="select2" v-model="formData.analysisArea" @change="updateFieldsOptions">
                <option value="Contratações">Contratações</option>
                <option value="Processos Seletivos">Processos Seletivos</option>
                <option value="Vagas">Vagas</option>
                <option value="Avaliações">Avaliações</option>
              </select>
            </div>
    
            <!-- Third Multiple-Select -->
            <div class="form-group">
              <label for="select3">Escolha os campos de análise</label>
              <div class="condition">
                <select id="select3" v-model="formData.analysisField1">
                  <option v-for="option in fieldOptions" :key="option.value" :value="option.value">
                    {{ option.text }}
                  </option>
                </select>
                <p>Por</p>
                <select id="select4" v-model="formData.analysisField2">
                  <option v-for="option in fieldOptions" :key="option.value" :value="option.value" :disabled="option.value === formData.analysisField1">
                    {{ option.text }}
                  </option>
                </select>
              </div>
            </div>
    
            <!-- Fourth Conditional Sub-Form -->
            <div class="form-group">
              <label>Crie uma condição, caso queira:</label>
              <div class="condition">
                <select v-model="formData.conditionField">
                  <option v-for="field in analysisFieldsSelected" :key="field" :value="field">
                    {{ field }}
                  </option>
                </select>
                <select v-model="formData.conditionOperator">
                  <option value="==">Igual</option>
                  <option value="<">Menor</option>
                  <option value="<=">Menor ou igual</option>
                  <option value=">">Maior</option>
                  <option value=">=">Maior ou igual</option>
                  <option value="LIKE">LIKE</option>
                </select>
                <input type="text" v-model="formData.conditionValue" placeholder="Enter condition value" />
              </div>
            </div>
    
            <!-- Fifth Select -->
            <div class="form-group">
              <label for="select6">Escolha o campo de ordenação</label>
              <select id="select6" v-model="formData.sortField">
                <option v-for="field in analysisFieldsSelected" :key="field" :value="field">
                  {{ field }}
                </option>
              </select>
            </div>
    
            <!-- Sixth Select -->
            <div class="form-group">
              <label for="select7">Escolha a direção de ordenação</label>
              <select id="select7" v-model="formData.sortDirection">
                <option value="Ascendent">Ascendent</option>
                <option value="Descendent">Descendent</option>
              </select>
            </div>

            <!-- Description Text Field -->
            <div class="form-group">
              <label for="description">Description</label>
              <input
                  id="description"
                  type="text"
                  v-model="formData.description"
                  placeholder="Escreva a descrição da sua análise."
              />
            </div>
    
            <!-- Form Buttons -->
            <div class="button-group">
              <button type="submit">Submit</button>
              <button type="button" @click="closeModal">Close</button>
            </div>

          </div>

        </form>
      </div>
    </div>
</template>
  
<script setup>
  import { computed } from "vue";
import { ref } from "vue";
  
  // eslint-disable-next-line no-unused-vars
  const props = defineProps({
    title: {
      type: String,
      default: "Modal Title",
    },
    isVisible: {
      type: Boolean,
      required: true,
    },
  });
  
  const emit = defineEmits(["submit", "close"]);
  
  // Initialize formData with fields for each select
  const formData = ref({
    visualizationModel: "",
    chartLabels: "",
    analysisArea: "",
    analysisField1: "",
    analysisField2: "",
    grouping: "",
    conditionField: "",
    conditionOperator: "",
    conditionValue: "",
    sortField: "",
    sortDirection: "",
    description: "",
  });

  const analysisFieldsSelected = computed(() => {
    return [formData.value.analysisField1, formData.value.analysisField2].filter(Boolean);
  });
  
  // Options for the third select, depending on the second select's value
  const areaFieldOptions = {
    "Contratações": [
      { value: "quantidade", text: "Quantidade" },
      { value: "idTempo", text: "Tempo" },
      { value: "tempoMedio", text: "Tempo Médio" },
      { value: "idProcessoSeletivo", text: "Processo Seletivo" },
      { value: "idVaga", text: "Vaga" },
    ],
    "Processos Seletivos": [
      { value: "nome", text: "Nome" },
      { value: "status", text: "Status" },
      { value: "criadoPor", text: "Criado Por" },
      { value: "inicioProcessoSeletivo", text: "Data de Início" },
      { value: "fimProcessoSeletivo", text: "Data de Fim" },
    ],
    "Vagas": [
      { value: "tituloVaga", text: "Título da vaga" },
      { value: "numeroPosicoes", text: "Número de Posições" },
      { value: "requisitosVaga", text: "Requisitos" },
      { value: "estado", text: "Status" },
    ],
    "Avaliações": [
      { value: "pontuacao", text: "Pontuação" },
      { value: "idTempo", text: "Tempo" },
      { value: "idVaga", text: "Vaga" },
      { value: "idCriterio", text: "Critério" },
      { value: "idCandidato", text: "Candidatos" }
    ]
  };
  
  // Reactive option list for the third select
  const fieldOptions = ref([]);

  const transformData = () => {
    // Determine the "from" value based on the selected analysis area
    let fromValue;
    switch (formData.value.analysisArea) {
        case "Contratações":
        fromValue = "fatec.bytelabss.api.models.FatoContratacoes";
        break;
        case "Processos Seletivos":
        fromValue = "fatec.bytelabss.api.models.DimProcessoSeletivo";
        break;
        case "Vagas":
        fromValue = "fatec.bytelabss.api.models.DimVaga";
        break;
        case "Avaliações":
        fromValue = "fatec.bytelabss.api.models.FatoAvaliacoes";
        break;
        default:
        fromValue = "fatec.bytelabss.api.models.FatoContratacoes"; // Or handle this case appropriately if needed
    }

    return {
        query: {
            fields: analysisFieldsSelected.value,
            from: fromValue,
            conditions: [
                {
                field: formData.value.conditionField,
                operator: formData.value.conditionOperator,
                value: formData.value.conditionValue || "0", // Default if input is empty
                },
            ],
            limit: 10, // Adjust if dynamic limits are needed
            groupBy: null,// formData.value.grouping ? [formData.value.grouping] : [],
            orderByField: formData.value.sortField,
            orderByDirection: formData.value.sortDirection === "Ascendent" ? "ASC" : "DESC",
        },
        description: formData.value.description || "Analise", // Default if description is empty
        visualizationModel: formData.value.visualizationModel
    };
  };
  
  // Update field options based on the selected analysis area
  function updateFieldsOptions() {
    fieldOptions.value = areaFieldOptions[formData.value.analysisArea] || [];
    // Reset related fields when area changes
    formData.value.grouping = "";
    formData.value.conditionField = "";
    formData.value.sortField = "";
  }
  
  // Handle form submission
  function handleSubmit() {
    const transformedData = transformData();
    emit("submitFormData", {
      transformedData,
      visualizationModel: formData.value.visualizationModel
    });
    closeModal();
  }
  
  // Close the modal
  function closeModal() {
    emit("close");
  }
</script>
  
<style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    /* overflow: auto; */
    padding: 20px;
  }
  
  .modal {
    background-color: #554d96;
    padding: 20px;
    border-radius: 5px;
    width: 70%;
    max-height: 90vh;
    overflow-y: auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  .modal-title {
    text-align: center;
    color: white;
  }

  .form-layout {
    display: flex;
    justify-content: space-between;
  }

  .form-section {
    width: 48%;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .condition {
    display: flex;
    gap: 10px;
  }
  
  .button-group {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 15px;
  }

  label {
    color: white;
  }
</style>