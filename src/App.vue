<script setup>
/*import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'*/
import { onMounted } from 'vue';
import NavBar from './components/Nav.vue'
import { useRoute } from 'vue-router'; // Importando useRoute do Vue Router
/*import { navbarIcons } from './utils/icons'*/

// Não é necessário exportar um objeto padrão ao usar <script setup>
onMounted(() => {
    document.title = 'Recrutamento Pro4Tech';
});

const route = useRoute();

</script>

<template>
  <header>
    <NavBar v-if="route.name !== 'login'" />
  </header>
  <main>
    <router-view />
  </main>
</template>