<template>
    <div>
        <h1 style="color: #333;">Minhas Análises</h1>
        <!-- Button to open the modal -->
        <button @click="showModal = true">Open Modal</button>
  
        <!-- Modal Window Component -->
        <GerarDashboardCustomizado
            v-if="showModal"
            :title="'Criar Análise'"
            :isVisible="showModal"
            :selects="selectOptions"
            @close="showModal = false"
            @submit="handleFormSubmit"
        />
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import GerarDashboardCustomizado from '@/components/GerarDashboardCustomizado.vue';
  
  // Reactive variable to control modal visibility
  const showModal = ref(false);
  
  // Define select options for the modal, each with label and options
  const selectOptions = [
    {
      label: "Escolha o modelo de visualização:",
      options: [
        { value: "coluna", text: "Gráfico de colunas" },
        { value: "barra", text: "Gráfico de barras" },
        { value: "pizza", text: "Gráfico de pizza" },
      ],
    },
    {
      label: "Escolha o campo a ser analisado:",
      options: [
        { value: "carrot", text: "Vagas" },
        { value: "broccoli", text: "Processos Seletivos" },
        { value: "spinach", text: "Candidatos" },
      ],
    },
    {
      label: "Choose a Protein",
      options: [
        { value: "chicken", text: "Chicken" },
        { value: "tofu", text: "Tofu" },
        { value: "beef", text: "Beef" },
      ],
    },
    {
      label: "Choose a Beverage",
      options: [
        { value: "water", text: "Water" },
        { value: "juice", text: "Juice" },
        { value: "soda", text: "Soda" },
      ],
    },
  ];
  
  // Function to handle form submission data from the modal
  function handleFormSubmit(formData) {
    console.log("Form Submitted with Data:", formData);
    // Process form data as needed, e.g., save it, send it to an API, etc.
  }
  </script>
  
  <style scoped>
  /* Basic styling */
  button {
    padding: 10px 15px;
    font-size: 16px;
    cursor: pointer;
    background-color: #554d96;
    color: white;
  }
  </style>