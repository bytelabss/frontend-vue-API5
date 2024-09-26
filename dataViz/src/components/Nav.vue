<script>
export default {
  name: 'NavBar'
}
</script>

<template>
  <div class="navbar">
    <div class="paginas">
      <router-link to="/about">About</router-link>
      <router-link to="/contact">Contact</router-link>
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
  align-items: center;
}

.navbar-item {
  margin-right: 1rem;
}

.router-link-active {
  font-weight: bold;
}
</style>
