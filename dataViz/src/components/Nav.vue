<script>
export default {
  name: 'NavBar'
}
</script>

<template>
  <div class="navbar">
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
    </div>
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--vt-c-black);
  color: var(--branco2-pro4tech);
  padding: 1rem;
  min-height: calc(100vh - 7vh);

  margin: 3vh;
  border-radius: var(--raio_border-default);
}

.paginas {
  display: flex;
  flex-direction: column;
  align-items: start;
}

.navbar-item {
  margin-right: 1rem;
}

.router-link-active {
  font-weight: bold;
}
</style>
