<template>
  <div id="app">
    <nav>
      <router-link to="/game-tcha">Captcha game</router-link>
      <router-link to="/jeu-de-l-eau">Jeu de l'eau</router-link>
      <router-link to="/credits">Page de crédits</router-link>
      <router-link to="/qr-code">Page de qr code</router-link>
    </nav>
    <router-view />
  </div>
</template>
<script setup lang="ts">
</script>
