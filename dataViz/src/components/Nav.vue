<script>
export default {
  name: 'NavBar'
}
</script>

<template>
  <nav>
    <div class="perfil">
      <img src="../assets/img/leleco.png" alt="Foto de perfil" class="foto-perfil">
      <span class="nome-usuario">Bem Vindo,</span>
      <span class="nome-usuario">FATEC</span>
    </div>
    <div class="paginas">
      <router-link to="/">
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
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: #554d96;
  color: #554d96;
  padding: 1rem 0.5rem;
  border-radius: 0; /* Removido o border-radius */
}

.perfil {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.foto-perfil {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.5rem;
}

.nome-usuario {
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  color: var(--branco2-pro4tech);
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
