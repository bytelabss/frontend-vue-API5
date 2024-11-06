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
  
          <!-- Fourth Select -->
          <div class="form-group">
            <label for="select4">Escolha o agrupamento</label>
            <select id="select4" v-model="formData.grouping">
              <option v-for="field in formData.analysisFields" :key="field" :value="field">
                {{ field }}
              </option>
            </select>
          </div>
  
          <!-- Fifth Conditional Sub-Form -->
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
  import { defineProps, defineEmits } from "vue";
  
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
  });
  
  // Options for the third select, depending on the second select's value
  const areaFieldOptions = {
    "Contratações": [
      { value: "Data de contratação", text: "Data de contratação" },
      { value: "Salário", text: "Salário" },
      { value: "Cargo", text: "Cargo" },
    ],
    "Processos Seletivos": [
      { value: "Data de início", text: "Data de início" },
      { value: "Número de candidatos", text: "Número de candidatos" },
      { value: "Status", text: "Status" },
    ],
    "Vagas": [
      { value: "Título da vaga", text: "Título da vaga" },
      { value: "Localização", text: "Localização" },
      { value: "Departamento", text: "Departamento" },
    ],
  };
  
  // Reactive option list for the third select
  const fieldOptions = ref([]);
  
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
    emit("submit", formData.value);
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
</style>