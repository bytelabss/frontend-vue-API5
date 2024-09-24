<script>
export default {
  name: 'NavBar'
}
</script>

<template>
  <div class="navbar">
<<<<<<< Updated upstream
    <div class="navbar-end">
      <router-link to="/about">About</router-link>
      <router-link to="/contact">Contact</router-link>
=======
    <div class="perfil">
      <img src="../assets/img/perfil.png" alt="Foto de perfil" class="foto-perfil">
      <span class="nome-usuario">Nicolas Cursino</span>
    </div>
    <div class="paginas">
      <router-link to="/dashboard">
        <i class="fa fa-chart-line"></i> Dashboard
      </router-link>
      <router-link to="/vagas">
        <i class="fa fa-briefcase"></i> Vagas
      </router-link>
      <router-link to="/candidatos">
        <i class="fa fa-users"></i> Candidatos
      </router-link>
      <router-link to="/analises">
        <i class="fa fa-chart-line"></i> Análises
      </router-link>
      <router-link to="/opcoes">
        <i class="fa fa-cog"></i> Opções
      </router-link>
      <router-link to="/sair">
        <i class="fa fa-sign-out-alt"></i> Sair
      </router-link>
>>>>>>> Stashed changes
    </div>
  </div>
</template>

<style>
.navbar {
  /* Estilos para a navbar */
}
.paginas {
  display: flex;
  gap: 20px; /* Espaço entre os links */
}
i {
  margin-right: 5px; /* Espaço entre o ícone e o texto */
}
</style>


<style scoped>
.navbar {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
<<<<<<< Updated upstream
  background: var(--azul3-pro4tech);
  color: var(--branco2-pro4tech);
  padding: 1rem;
  min-height: calc(100vh - 14vh);
  margin: 7vh 0;
  border-radius: var(--raio_border-default);
=======
  background: #554d96;
  color: #554d96;
  padding: 0.5rem; /* Reduzido o padding */
  width: 150px; /* Reduzido para uma largura fixa em pixels */
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  border-radius: 0 var(--raio_border-default) var(--raio_border-default) 0;
}

.perfil {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
}

.foto-perfil {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.5rem;
}

.nome-usuario {
  font-size: 0.9rem;
  text-align: center;
  color: var(--branco2-pro4tech);
>>>>>>> Stashed changes
}

.navbar-menu {
  display: flex;
  flex: 1;
  justify-content: space-between;
}

.navbar-start,
.navbar-end {
  display: flex;
<<<<<<< Updated upstream
  align-items: center;
=======
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
>>>>>>> Stashed changes
}

.paginas a {
  margin: 0.5rem 0;
  text-decoration: none;
  color: var(--branco2-pro4tech);
  font-size: 0.8rem;
  width: 100%;
  padding-left: 1rem;
  box-sizing: border-box;
}

.router-link-active {
  font-weight: bold;
}
</style>
