<template>
    <div v-if="counter === 0"
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-custom-blue text-black p-6 rounded-2xl shadow-2xl flex flex-col w-full max-w-[800px] sm:max-w-[700px] md:max-w-[600px] 2xl:max-w-[800px]">
        <h1 class="text-3xl font-bold mb-4">Bienvenue, jeune Protecteur des Océans !</h1>
        <h3 class="text-2xl mb-4">
            Tu es sur le point d’embarquer dans une aventure avec ton pokémon où chaque action dans les océans aura une
            répercussion
            directe sur ton personnage. Les océans sont le cœur de la vie, mais leurs épreuves testeront ta résilience.
        </h3>
        <p class="text-2xl mb-2">Voici ce que tu dois savoir avant de plonger :</p>
        <ul class="list-disc pl-6 space-y-2">
            <li class="text-2xl">
                Les <strong class="text-cyan-800">courants marins</strong>, perturbés par les <strong>vagues</strong>,
                affectent la <span class="text-red-500">circulation sanguine</span> de ton personnage.
            </li>
            <li class="text-2xl">
                Les <strong class="text-green-400">déchets</strong> flottant dans l'eau réduisent la <span
                    class="text-lime-300">photosynthèse</span>, impactant tes <span
                    class="text-yellow-300">poumons</span> et ton souffle vital.
            </li>
            <li class="text-2xl">
                Les <strong class="text-gray-300">bateaux</strong>, en prélevant les ressources marines, déséquilibrent
                la <span class="text-purple-500">faune marine</span>, mettant en péril les cellules essentielles à ton
                équilibre.
            </li>
        </ul>
        <p class="text-2xl mt-4">
            Seras-tu capable de relever les défis et préserver l’harmonie entre l’océan et ton personnage ? La mer
            t’appelle… plonge dans l’aventure et défie les tempêtes du destin !
        </p>
        <!-- Bouton Jouer -->
        <div class="mt-6 flex justify-center">
            <button @click="startGame"
                class="bg-cyan-500 text-white font-bold py-2 px-6 rounded-2xl shadow-md hover:bg-cyan-600 transition duration-300  text-4xl">
                Jouer
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { defineEmits } from 'vue';

const emit = defineEmits();
const counter = ref(0);

onMounted(() => {
    const storedCounter = localStorage.getItem('modalCounter');
    if (storedCounter) {
        counter.value = parseInt(storedCounter);
    }
    if (counter.value === 1) {
        startGame();
    } else {
        localStorage.setItem('modalCounter', '1');
    }
});

function startGame() {
    localStorage.setItem('modalCounter', '1');
    counter.value = 1;
    emit('startGame');

}
</script>
