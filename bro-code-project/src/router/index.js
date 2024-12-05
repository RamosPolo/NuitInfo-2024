import { createRouter, createWebHistory } from 'vue-router';
import GameTcha from '../game-tcha/Index-tcha.vue';
import JeuDeLeau from '../jeu-de-l-eau/Index-jeu.vue';
import QrCode from '../qr-code/Index-qr.vue';
import Credits from '../credits/Index-credits.vue';

const routes = [
    { path: '/', redirect: '/game-tcha' },
    { path: '/game-tcha', component: GameTcha },
    { path: '/jeu-de-l-eau', component: JeuDeLeau },
    { path: '/qr-code', component: QrCode },
    { path: '/credits', component: Credits },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
