<script>
export default {
  name: 'NavBar'
}
</script>

<template>
  <div class="navbar">
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
    </div>
    <div class="sair">
      <router-link to="/sair">
        <i class="fa fa-sign-out-alt"></i> Sair
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: #554d96;
  color: #554d96;
  padding: 1rem 0.5rem;
  width: 200px;
  height: 100vh;
  position: fixed;  
  top: 0;
  left: 0;
  margin: 0;
  border-radius: 0; /* Removido o border-radius */
}

.perfil {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.foto-perfil {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.5rem;
}

.nome-usuario {
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  color: var(--branco2-pro4tech);
  margin-bottom: 1rem;
}

.paginas {
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
}

.paginas a {
  margin: 0.5rem 0;
  text-decoration: none;
  color: var(--branco2-pro4tech);
  font-size: 1rem;
  font-weight: 500;
  padding: 0.7rem 1rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  transition: all 0.3s;
  border-radius: 40px; /* Adicionado border-radius para arredondar as bordas */
}

.paginas a:hover {
  background-color: #ffffff;
  color: #000000;
  transform: translateX(5px);
}

.paginas i {
  margin-right: 12px;
  width: 20px;
  text-align: center;
  font-size: 1.1rem;
  transition: color 0.3s;
}

.paginas a:hover i {
  color: #000000;
}

.sair {
  margin-top: auto;
  width: 100%;
}

.sair a {
  margin: 0.5rem 0;
  text-decoration: none;
  color: var(--branco2-pro4tech);
  font-size: 1rem;
  font-weight: 500;
  padding: 0.7rem 1rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  transition: all 0.3s;
  border-radius: 40px;
}

.sair a:hover {
  background-color: #ffffff;
  color: #000000;
  transform: translateX(5px);
}

.sair i {
  margin-right: 12px;
  width: 20px;
  text-align: center;
  font-size: 1.1rem;
  transition: color 0.3s;
}

.sair a:hover i {
  color: #000000;
}

.router-link-active {
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 40px; /* Adicionado border-radius para arredondar as bordas */
}

.router-link-active:hover {
  background-color: #ffffff;
  color: #000000;
}
</style>
