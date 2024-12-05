<script setup>
// Importation d'AOS
  import { onMounted, onBeforeUnmount } from 'vue';
  import AOS from 'aos';
  import 'aos/dist/aos.css';

  // Initialisation d'AOS lors du montage du composant
  onMounted(() => {
    AOS.init({
      duration: 1200, // Durée de l'animation
      offset: 200,    // Décalage avant que l'animation ne se déclenche
    });
  });

  // Rafraîchissement d'AOS lorsqu'il y a une mise à jour dans le composant
  onBeforeUnmount(() => {
    AOS.refresh();
  });
</script>

<template>

  <div class="space"></div>
  <div class="quare-1" data-aos="flip-up"></div>
  <div class="space"></div>
  <div class="quare-2" data-aos="fade-up"></div>
  <div class="space"></div>
  <div class="space"></div>
  <div class="space"></div>

</template>

<style scoped>
.space{
  height: 100vh;
}
.quare-1{
  height: 400px;
  width: 500px;
  background: red;
}

.quare-2{
  height: 400px;
  width: 500px;
  background: blue;
}
</style>
