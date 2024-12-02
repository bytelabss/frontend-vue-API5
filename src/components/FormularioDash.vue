<template>
    <div>
      <h2>Enviar Dados</h2>
  
      <!-- Formulário de Entrada -->
      <form @submit.prevent="submitForm">
        <div>
          <label for="idUsuario">Usuário:</label>
          <select v-model="formData.idUsuario" id="idUsuario" required>
            <option value="" disabled>Selecione um usuário</option>
            <option v-for="usuario in usuarios" :key="usuario.id" :value="usuario.id">
              {{ usuario.name }}
            </option>
          </select>
        </div>
  
        <div>
          <label for="idCustomQuery">Consulta Customizada:</label>
          <select v-model="formData.idCustomQuery" id="idCustomQuery" required>
            <option value="" disabled>Selecione uma consulta</option>
            <option v-for="query in consultas" :key="query.id" :value="query.id">
              {{ query.description }}
            </option>
          </select>
        </div>
  
        <button type="submit">Enviar</button>
      </form>
  
      <!-- Exibição de status -->
      <div v-if="loading">Enviando dados...</div>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="success" class="success">Dados enviados com sucesso!</div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        formData: {
          idUsuario: null,
          idCustomQuery: null
        },
        usuarios: [], // Para armazenar a lista de usuários
        consultas: [], // Para armazenar a lista de consultas personalizadas
        loading: false,
        success: false,
        error: null
      };
    },
    created() {
      // Buscar os usuários e consultas quando o componente for criado
      this.fetchUsuarios();
      this.fetchConsultas();
    },
    methods: {
      async fetchUsuarios() {
        try {
          // Realiza a requisição GET para buscar os usuários
          const response = await axios.get("http://localhost:9090/api/usuarios", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}` // Adiciona o token JWT no cabeçalho
            }
          });
  
          // Armazena a lista de usuários no estado
          this.usuarios = response.data;
  
          console.log("Usuários carregados:", response.data);
        } catch (err) {
          console.error("Erro ao buscar usuários:", err);
          this.error = "Não foi possível carregar a lista de usuários.";
        }
      },
  
      async fetchConsultas() {
        try {
            console.log(localStorage.getItem("id"))
          // Realiza a requisição GET para buscar as consultas personalizadas
          const response = await axios.get(`http://localhost:9090/api/custom-queries/user/${localStorage.getItem("id")}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}` // Adiciona o token JWT no cabeçalho
            }
          });
  
          // Armazena a lista de consultas no estado
          this.consultas = response.data;
  
          console.log("Consultas carregadas:", response.data);
        } catch (err) {
          console.error("Erro ao buscar consultas:", err);
          this.error = "Não foi possível carregar a lista de consultas.";
        }
      },
  
      async submitForm() {
        this.loading = true;
        this.error = null;
        this.success = false;
  
        try {
          // Defina a URL do seu endpoint (ajuste conforme necessário)
          const response = await axios.post("http://localhost:9090/api/consultas/usuarios", this.formData);
  
          // Se a resposta for bem-sucedida
          this.success = true;
          console.log("Dados enviados com sucesso:", response.data);
        } catch (err) {
          // Trate erros de requisição
          this.error = "Erro ao enviar dados. Tente novamente.";
          console.error("Erro de requisição:", err);
        } finally {
          // Finaliza o estado de carregamento
          this.loading = false;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  
  .success {
    color: green;
  }
  </style>
  