<script>
export default {
  name: 'NavBar'
}
</script>

<template>
  <div class="navbar">
    <div class="navbar-end">
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
  background: var(--azul3-pro4tech);
  color: var(--branco2-pro4tech);
  padding: 1rem;
  min-height: calc(100vh - 14vh);
  margin: 7vh 0;
  border-radius: var(--raio_border-default);
}

.navbar-menu {
  display: flex;
  flex: 1;
  justify-content: space-between;
}

.navbar-start,
.navbar-end {
  display: flex;
  align-items: center;
}

.navbar-item {
  margin-right: 1rem;
}

.router-link-active {
  font-weight: bold;
}
</style>
