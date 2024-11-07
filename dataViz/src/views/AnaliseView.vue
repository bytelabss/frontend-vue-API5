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
            @submitFormData="handleFormSubmit"
        />
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import GerarDashboardCustomizado from '@/components/GerarDashboardCustomizado.vue';
  
  // Reactive variable to control modal visibility
  const showModal = ref(false);
  
  // Function to handle form submission data from the modal
  function handleFormSubmit(transformedData) {
    console.log("Form Submitted with Data:", transformedData);
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