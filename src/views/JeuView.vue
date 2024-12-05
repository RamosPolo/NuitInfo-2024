<template>
  <div class="about">
    <JeuComponent />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script setup>

import JeuComponent from '@/components/jeu/JeuComponent.vue';

</script>