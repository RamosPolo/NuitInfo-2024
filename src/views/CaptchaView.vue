<template>
  <div id="captcha">
    <h2>Éclatez les intrus Pokémon</h2>
    <div class="pokemon-grid">
      <div 
        v-for="pokemon in pokemonList" 
        :key="pokemon.id" 
        class="pokemon"
        @click="handleClick(pokemon)"
      >
        <img 
          :src=getPokemonImage(pokemon.name) 
          :alt="pokemon.name" 
          :class="{ clicked: clickedPokemon.includes(pokemon.id) }" 
        />
        <p>{{ pokemon.name }}</p>
      </div>
    </div>
    <button @click="submitCaptcha" :disabled="!isComplete">Valider</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      captchaId: '', // ID du captcha
      pokemonList: [], // Liste des Pokémon fournie par le serveur
      clickedPokemon: [], // IDs des Pokémon cliqués
      intruderCount: 0 // Nombre total d'intrus
    };
  },
  computed: {
    isComplete() {
      return this.clickedPokemon.length === this.intruderCount;
    }
  },
  methods: {
    // Charger les données du serveur
    async loadCaptcha() {
      // const response = await fetch('/api/generate-captcha'); // Remplace par l'URL réelle
      // const data = await response.json();
      const data = {
        "captcha_id": "12345",
        "pokemon_list": [
          { "name": "magicarpe", "type": "valid", "id": 1 },
          { "name": "magicarpe", "type": "valid", "id": 2 },
          { "name": "nemo", "type": "intruder", "id": 3 },
          { "name": "magicarpe", "type": "valid", "id": 4 },
          { "name": "nemo", "type": "intruder", "id": 5 }
        ]
}
      this.captchaId = data.captcha_id;
      this.pokemonList = data.pokemon_list;
      this.intruderCount = data.pokemon_list.filter(p => p.type === 'intruder').length;
    },
    // Gérer les clics
    handleClick(pokemon) {
      if (!this.clickedPokemon.includes(pokemon.id)) {
        this.clickedPokemon.push(pokemon.id);
      }
    },
    // Récupérer l'image d'un Pokémon (mocked pour l'exemple)
    getPokemonImage(name) {
      return `/images/${name}.jpg`;
    },
    // Envoyer les données au serveur
    async submitCaptcha() {
      const response = await fetch('/api/verify-captcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          captcha_id: this.captchaId,
          clicked_ids: this.clickedPokemon
        })
      });
      const result = await response.json();
      if (result.success) {
        alert('CAPTCHA réussi !');
      } else {
        alert('CAPTCHA échoué. Essayez encore.');
      }
    }
  },
  mounted() {
    this.loadCaptcha();
  }
};
</script>

<style>
#captcha {
  text-align: center;
}
.pokemon-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}
.pokemon {
  cursor: pointer;
  text-align: center;
}
.pokemon img {
  width: 100px;
  height: 100px;
  border: 2px solid transparent;
  transition: 0.3s;
}
.pokemon img.clicked {
  border-color: red;
  transform: scale(1.1);
}
button {
  margin-top: 20px;
  padding: 10px 20px;
}
</style>