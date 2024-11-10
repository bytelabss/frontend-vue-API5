<script setup>
/*import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'*/
import { onMounted } from 'vue';
import NavBar from './components/Nav.vue'
/*import { navbarIcons } from './utils/icons'*/

// Não é necessário exportar um objeto padrão ao usar <script setup>

onMounted(() => {
    document.title = 'Recrutamento Pro4Tech';
});

</script>

<template>
  <header>
    <NavBar />
  </header>
  <main>
    <router-view />
  </main>
</template>