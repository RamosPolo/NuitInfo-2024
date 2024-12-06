<script setup>
import { ref } from 'vue';
import HomeComponent from '../components/HomeComponent.vue'
import JeuComponent from '@/components/jeu/JeuComponent.vue';
import modalComponent from '@/components/modal/modalComponent.vue';

const activePlaying = ref(false)
const activeModal = ref(false)

const popModal = () => {
  activeModal.value = true;
}

const startGame = () => {
  activeModal.value = false;
  activePlaying.value = true
};
</script>

<template>
  <main>
    <JeuComponent v-if="activePlaying" />
    <HomeComponent @popModal="popModal" v-else-if="!activeModal" />
    <modalComponent @startGame="startGame" v-else-if="activeModal" />

  </main>
</template>
