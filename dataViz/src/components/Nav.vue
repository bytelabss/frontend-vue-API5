<script>
export default {
  name: 'NavBar'
}
</script>

<template>
  <nav>
    <div class="PIWrapper">
      <img class="ProfileImage" src="../assets/puppy.jpg" alt="Logo" />
    </div>
    <div class="paginas">
      <!-- <router-link to="/dash">Dashboard</router-link> -->
      <router-link to="/">Dashboard</router-link>
      <!-- <router-link to="/vacancies">Vagas</router-link> -->
      <router-link to="/">Vagas</router-link>
      <!-- <router-link to="/candidates">Candidatos</router-link> -->
      <router-link to="/">Candidatos</router-link>
      <!-- <router-link to="/analytics">Análises</router-link> -->
      <router-link to="/">Análises</router-link>
      <!-- <router-link to="/options">Opções</router-link> -->
      <router-link to="/">Opções</router-link>
    </div>
    <div class="sair">
      <router-link to="/login">Sair</router-link>
    </div>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: var(--azul1-pro4tech);
  padding: 1rem;
  min-height: calc(100vh - 7vh);
  margin: 3vh;
  border-radius: var(--raio_border-default);
}

.PIWrapper {
  width: 100%;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ProfileImage {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border-color: aliceblue;
  border-width: 2px;
}

.paginas {
  height: 100%;
  margin: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.sair {
  height: 100%;
  margin: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sair a {
  color: red;
}
</style>
