<template>
    <div>
      <button @click="logout">Sair</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      logout() {
        // Limpar os itens do localStorage
        localStorage.removeItem("id");
        localStorage.removeItem("authToken");
  
        // Exemplo de redirecionamento para página de login ou página inicial
        this.$router.push("/login");  // Ajuste a rota conforme sua aplicação
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos personalizados para o botão de logout */
  button {
    background-color: #ff4d4f;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #ff0000;
  }
  </style>
  