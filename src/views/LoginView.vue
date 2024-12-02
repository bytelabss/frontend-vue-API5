<script>
export default {
  name: "Login",
  data() {
    return {
      nome: "",
      senha: "",
      erro: ""
    };
  },
  methods: {
    async logar() {
        if (!nome || !senha) {
            erro = 'Por favor, preencha todos os campos.';
            return;
        }
      try {
        console.log(`${import.meta.env.VITE_BASE_API_URL}/login`);
        const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/login`, {
            headers: {
                'Content-Type': 'application/json' // Definindo o tipo de conteúdo como JSON
            },
            method: 'POST',
            body: JSON.stringify({
                name: this.nome,     // Enviando o nome
                password: this.senha // Enviando a senha
            })
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data.token);
          localStorage.setItem('authToken', data.token);
          localStorage.setItem('id', data.id);
          this.erro = '';  
          this.$router.push('/');
        } 
        else {
          const data = await response.json();
          this.erro = data.message || 'Erro ao tentar logar.'; 
        }
        
      } catch (error) {
        console.error('Erro ao logar:', error);
        this.erro = 'Erro ao tentar se conectar. Tente novamente mais tarde.';
      }
    },
  }
};
</script>

<template>
  <div class="wrapper">
    <h1 class="titulo">Login</h1>
    <div class="form-container">
      <form @submit.prevent="logar">
        <div class="input-group">
          <label for="nome">Nome</label>
          <input 
            type="text" 
            id="nome" 
            v-model="nome" 
            placeholder="Digite seu nome" 
            required
          />
        </div>

        <div class="input-group">
          <label for="senha">Senha</label>
          <input 
            type="password" 
            id="senha" 
            v-model="senha" 
            placeholder="Digite sua senha" 
            required
          />
        </div>

        <div v-if="erro" class="erro-message">{{ erro }}</div>

        <button type="submit" class="btn-submit">Entrar</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  padding: 1.5rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.titulo {
  text-align: center;
  font-size: 24px;
  color: #333;
  margin-bottom: 2rem;
}

.form-container {
  width: 100%;
  max-width: 400px;
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.input-group {
  margin-bottom: 1.5rem;
}

.input-group label {
  font-size: 14px;
  color: #333;
  margin-bottom: 0.5rem;
  display: block;
}

.input-group input {
  width: 100%;
  padding: 0.8rem;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.input-group input:focus {
  outline: none;
  border-color: #4caf50;
}

.erro-message {
  color: red;
  font-size: 14px;
  margin-bottom: 1rem;
}

.btn-submit {
  width: 100%;
  padding: 1rem;
  background-color: #4caf50;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-submit:hover {
  background-color: #45a049;
}
</style>
