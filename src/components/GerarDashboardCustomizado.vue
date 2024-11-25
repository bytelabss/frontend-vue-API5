<template>
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal">
        <h2>{{ title }}</h2>
        <form @submit.prevent="handleSubmit">
          <!-- First Select -->
          <div class="form-group">
            <label for="select1">Escolha o modelo de visualização</label>
            <select id="select1" v-model="formData.visualizationModel">
              <option value="Gráfico de colunas">Gráfico de colunas</option>
              <option value="Gráfico de barras">Gráfico de barras</option>
              <option value="Gráfico de pizza">Gráfico de pizza</option>
              <option value="Tabela">Tabela</option>
            </select>
          </div>
  
          <!-- Second Select -->
          <div class="form-group">
            <label for="select2">Escolha a área a ser analisada</label>
            <select id="select2" v-model="formData.analysisArea" @change="updateFieldsOptions">
              <option value="Contratações">Contratações</option>
              <option value="Processos Seletivos">Processos Seletivos</option>
              <option value="Vagas">Vagas</option>
            </select>
          </div>
  
          <!-- Third Multiple-Select -->
          <div class="form-group">
            <label for="select3">Escolha os campos de análise</label>
            <select id="select3" v-model="formData.analysisFields" multiple>
              <option v-for="option in fieldOptions" :key="option.value" :value="option.value">
                {{ option.text }}
              </option>
            </select>
          </div>
  
          <!-- Fourth Conditional Sub-Form -->
          <div class="form-group condition">
            <label>Escolha a condição</label>
            <select v-model="formData.conditionField">
              <option v-for="field in formData.analysisFields" :key="field" :value="field">
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

          <!-- Fifth Select -->
          <!-- <div class="form-group">
            <label for="select4">Escolha o agrupamento</label>
            <select id="select4" v-model="formData.grouping">
              <option v-for="field in formData.analysisFields" :key="field" :value="field">
                {{ field }}
              </option>
            </select>
          </div> -->
  
          <!-- Sixth Select -->
          <div class="form-group">
            <label for="select6">Escolha o campo de ordenação</label>
            <select id="select6" v-model="formData.sortField">
              <option v-for="field in formData.analysisFields" :key="field" :value="field">
                {{ field }}
              </option>
            </select>
          </div>
  
          <!-- Seventh Select -->
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
        </form>
      </div>
    </div>
</template>
  
<script setup>
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
    analysisArea: "",
    analysisFields: [],
    grouping: "",
    conditionField: "",
    conditionOperator: "",
    conditionValue: "",
    sortField: "",
    sortDirection: "",
    description: "",
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
        default:
        fromValue = "fatec.bytelabss.api.models.FatoContratacoes"; // Or handle this case appropriately if needed
    }

    return {
        query: {
            fields: formData.value.analysisFields,
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
    };
  };
  
  // Update field options based on the selected analysis area
  function updateFieldsOptions() {
    fieldOptions.value = areaFieldOptions[formData.value.analysisArea] || [];
    // Reset related fields when area changes
    formData.value.analysisFields = [];
    formData.value.grouping = "";
    formData.value.conditionField = "";
    formData.value.sortField = "";
  }
  
  // Handle form submission
  function handleSubmit() {
    const transformedData = transformData();
    emit("submitFormData", transformedData);
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
    overflow: auto;
    padding: 20px;
  }
  
  .modal {
    background-color: #554d96;
    padding: 20px;
    border-radius: 5px;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    width: 100%;
    box-sizing: border-box;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .condition {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  
  .button-group {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }

  label {
    color: white;
  }
</style>