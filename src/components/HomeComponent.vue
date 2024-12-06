<template>

  <div class="bg-gray-100 flex flex-col items-center justify-center min-h-screen text-center">
    <div class="container mx-auto p-6">

      <h1 class="text-3xl font-semibold mb-8 underline">Bienvenue dans <strong> JEU DE L'EAU !</strong></h1>
      <h3 class="text-2xl font-semibold mb-8">Choisissez votre Pokémon !</h3>

      <div class="mb-12">
        <select v-model="selectedType" class="p-2 border rounded-lg">
          <option value="">Tous les Types</option>
          <option v-for="type in Object.keys(typesPokemon)" :key="type" :value="type">
            {{ type }}
          </option>
        </select>
      </div>

      <div v-if="Object.values(hoveredCards).includes(true)" class="fixed inset-0 backdrop-blur-md bg-gray-300/40 z-10">
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6">
        <div v-for="img in filteredPokemon" :key="img.img"
          class="relative w-100 h-100 cursor-pointer bg-white rounded shadow-lg transform transition-transform hover:scale-80 hover:z-10 z-0  "
          @mouseenter="hoverImage(img.img)" @mouseleave="unhoverImage(img.img)" @click="selectImage(img.img)">
          <img :src="flippedCards[img.img] || hoveredCards[img.img] ? `./img/${img.qr}` : `./img/${img.img}`"
            class="w-80 mx-auto h-80 object-contain rounded-lg">

          <div v-if="hoveredCards[img.img]"
            class="flex flex-col items-center justify-center bg-white/100 rounded-b-lg border-t my-12 ">
            <h3 class="text-lg font-bold mb-2 mt-6  text-2xl">Modificateurs</h3>
            <table class="text-sm text-gray-700 w-72">
              <thead>
                <tr class="border-b space-x-4 w-full text-2xl">
                  <th class="px-2">Vitesse</th>
                  <th class="px-2">Force</th>
                  <th class="px-2">Vie</th>
                </tr>
              </thead>
              <tbody>
                <tr class="text-xl">
                  <td class="px-2 p-4">{{ img.vitesse }}%</td>
                  <td class="px-2 p-4">{{ img.force }}%</td>
                  <td class="px-2 p-4">{{ img.vie }}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';

// Define the reactive data
const nameImg = ref([]);
const nameQr = ref([]);
const numberImg = 6;
const flippedCards = ref({});
const hoveredCards = ref({});
const selectedImage = ref('');
const pokemonStats = ref([]);
const typesPokemon = ref({});
const selectedType = ref('');
const selectedStats = ref(null);

// Filtered Pokémon based on selected type
const filteredPokemon = computed(() => {
  if (!selectedType.value) {
    return pokemonStats.value.map((pokemon, index) => ({
      ...pokemon,
      img: nameImg.value[index],
      qr: nameQr.value[index],
    }));
  }
  return typesPokemon.value[selectedType.value] || [];
});

// Group Pokémon by their types
const groupByType = () => {
  typesPokemon.value = pokemonStats.value.reduce((acc, pokemon, index) => {
    const type = pokemon.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push({
      ...pokemon,
      img: nameImg.value[index],
      qr: nameQr.value[index],
    });
    return acc;
  }, {});
};

// Fetch Pokémon image names
const fetchImageName = () => {
  for (let i = 1; i <= numberImg; i++) {
    nameImg.value.push(`${i}.png`);
    nameQr.value.push(`qr${i}.png`);
  }
};

// Fetch Pokémon stats from the JSON file
const fetchImageStats = async () => {
  try {
    const response = await fetch("./stats/stats.json");
    if (!response.ok) {
      throw new Error("Erreur de chargement des stats");
    }
    pokemonStats.value = await response.json();
    groupByType();
  } catch (error) {
    console.error("Erreur de chargement des statistiques", error);
  }
};

// Hover handler for Pokémon images
const hoverImage = (img) => {
  hoveredCards.value[img] = true;
};

// Unhover handler for Pokémon images
const unhoverImage = (img) => {
  hoveredCards.value[img] = false;
};

// Handle Pokémon image selection
const selectImage = (img) => {
  flippedCards.value[img] = !flippedCards.value[img]; // Basculer l'état "flipped"
  selectedImage.value = img.split(".png")[0]; // Extraire le nom sans l'extension

  // Trouver les statistiques associées
  const pokemonData = pokemonStats.value.find(stat => stat.id === parseInt(selectedImage.value));
  if (pokemonData) {
    selectedStats.value = pokemonData; // Stocker les statistiques du Pokémon sélectionné
  }

  // Enregistrer dans le stockage local
  localStorage.setItem("pokemonSelected", JSON.stringify({
    name: selectedImage.value,
    stats: selectedStats.value
  }));
};

// Watch for changes in selected type to reset hover and flip states
watch(selectedType, () => {
  hoveredCards.value = {};
  flippedCards.value = {};
});

// Fetch data on mount
onMounted(() => {
  fetchImageName();
  fetchImageStats();
});
</script>
