<script setup>
/*import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'*/
import NavBar from './components/Nav.vue'
/*import { navbarIcons } from './utils/icons'*/

// Não é necessário exportar um objeto padrão ao usar <script setup>
</script>

<template>
  <header>
    <NavBar />
  </header>
  <main>
    <router-view />
  </main>
</template>