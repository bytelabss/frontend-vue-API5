<script setup>
import FormularioCadastroUsuario from '@/components/CadastroUsuario.vue';
</script>

<template>
  <div class="wrapper">
    <h1 class="titulo">Cadastro de Usuários</h1>
    <FormularioCadastroUsuario />
  </div>
</template>

<style scoped>
.wrapper {
  padding: 2rem;
  max-width: 800px;
  margin: auto;
}

.titulo {
  text-align: center;
  font-size: 24px;
  margin-bottom: 2rem;
}
</style>
