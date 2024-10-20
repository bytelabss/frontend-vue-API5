<template>
    <div style="padding: 20px; background-color: #f9f9f9; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
      <h1 style="text-align: center; color: #333; font-family: 'Arial', sans-serif;">Relatórios</h1> <!-- Centraliza o título -->
      <div style="text-align: center;"> <!-- Centraliza os botões -->
        <button @click="exportToExcel" style="margin: 10px; padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">Exportar para Excel</button>
        <br /> <!-- Adiciona quebra de linha -->
        <button @click="exportToPDF" style="margin: 10px; padding: 10px 20px; background-color: #2196F3; color: white; border: none; border-radius: 5px; cursor: pointer;">Exportar para PDF</button>
      </div>
    </div>
</template>
  
  <script>
  import axios from 'axios';
  
  export default {
    methods: {
      async exportToExcel() {
        try {
          const response = await axios.get('http://localhost:9090/api/excel/relatorios', {
            responseType: 'blob', // Importante para download de arquivos
          });
  
          const url = 'http://localhost:9090/api/excel/relatorios'; // URL original para download
          const link = document.createElement('a');
          link.href = url; // Usar a URL original
          link.setAttribute('download', 'dados.xlsx'); // Nome do arquivo
          document.body.appendChild(link);
          link.click();
          link.remove();
        } catch (error) {
          console.error('Erro ao exportar para Excel:', error);
        }
      },
      
      async exportToPDF() {
        try {
          const response = await axios.get('http://localhost:9090/api/pdf/export/pdf/zip', {
            responseType: 'blob',
          });
  
          const url = 'http://localhost:9090/api/pdf/export/pdf/zip'; // URL original para download
          const link = document.createElement('a');
          link.href = url; // Usar a URL original
          link.setAttribute('download', 'dados.pdf'); // Nome do arquivo
          document.body.appendChild(link);
          link.click();
          link.remove();
        } catch (error) {
          console.error('Erro ao exportar para PDF:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos do componente */
  </style>  
