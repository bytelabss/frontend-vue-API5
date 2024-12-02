<script setup>
import { ref } from 'vue';

const name = ref('');
const password = ref('');
const authorizations = ref('');
const feedback = ref('');

async function cadastrarUsuario() {
  if (!name.value || !password.value || !authorizations.value) {
    feedback.value = 'Preencha todos os campos!';
    return;
  }

  try {
    
    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:9090/api/usuarios', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}` 
    },
    body: JSON.stringify({
            name: name.value,
            password: password.value,
            authorizations: authorizations.value
        })
        });

    if (response.ok) {
      feedback.value = 'Usuário cadastrado com sucesso!';
      limparCampos();
    } else {
      feedback.value = 'Erro ao cadastrar usuário!';
    }
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    feedback.value = 'Erro na conexão com o servidor!';
  }
}

function limparCampos() {
  name.value = '';
  password.value = '';
  authorizations.value = '';
}
</script>

<template>
  <form @submit.prevent="cadastrarUsuario" class="formulario">
    <label for="name">name:</label>
    <input id="name" v-model="name" type="text" placeholder="Digite o name do usuário" required />

    <label for="password">password:</label>
    <input id="password" v-model="password" type="password" placeholder="Digite a password do usuário" required />

    <label for="authorizations">Permissão:</label>
    <select id="authorizations" v-model="authorizations" required>
      <option value="" disabled>Selecione uma permissão</option>
      <option value="Admin">Administrador</option>
      <option value="Usuário Comum">Usuário Comum</option>
    </select>

    <button type="submit" class="botao">Cadastrar</button>

    <p class="feedback" v-if="feedback">{{ feedback }}</p>
  </form>
</template>

<style scoped>
.formulario {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

input, select {
  padding: 0.5rem;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.botao {
  padding: 0.75rem;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-transform: uppercase;
}

.botao:hover {
  background-color: #0056b3;
}

.feedback {
  margin-top: 1rem;
  text-align: center;
  font-size: 16px;
  color: #ff0000;
}
</style>
