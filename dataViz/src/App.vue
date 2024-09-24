<script setup>
import NavBar from './components/Nav.vue'
import 'font-awesome/css/font-awesome.css';

</script>

<template>
  <nav>
    <NavBar />
  </nav>
  <body>
    <router-view />
  </body>
</template>
