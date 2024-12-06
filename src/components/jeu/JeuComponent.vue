<template>

    <div id="jeu-eau">
        <div id="jeu"></div>
        <div class="game-explanation">
            <h2>Explications sur le Jeu</h2>
            <p>Bienvenue dans notre jeu d'arcade ! Voici comment jouer :</p>
            <ul>
                <li>Utilisez les touches (ZQSD) pour déplacer votre personnage.</li>
                <li>Collectez les déchets en appuyant sur la touche <strong>Espace</strong> lorsqu'ils sont à portée.
                </li>
                <li>Rétablissez les courants marins avec la touche <strong>Espace</strong> plusieurs fois</li>
                <li>S'il y a trop de déchets, vous êtes ralentis !</li>
            </ul>
            <p>Bonne chance et amusez-vous bien !</p>
        </div>
    </div>
</template>

<style>
.game-explanation {
    position: absolute;
    bottom: 0;

    background-color: #f9f9f951;
    color: #1e1e1e;
    border: 1px solid #ddd;
    padding: 20px;
    margin: 20px 0;
    border-radius: 8px;
}

.game-explanation h2 {
    margin-top: 0;
}

.game-explanation ul {
    list-style-type: disc;
    padding-left: 20px;
}
</style>

<script setup>



import Phaser from 'phaser'
import { onMounted } from 'vue';

onMounted(() => {
    new Phaser.Game(config);
});

const config = {
    width: 1200,
    height: 800,
    parent: 'jeu',
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    scale: {
        mode: Phaser.Scale.FIT, // Adapte le jeu pour qu'il reste visible en entier
        autoCenter: Phaser.Scale.CENTER_BOTH // Centre automatiquement le jeu
    },
    pixelArt: true,
};

let player;
let perso;
let map;

let haut = 'Z';
let bas = 'S';
let gauche = 'Q';
let droite = 'D';

let baseSpeed = 500;
let hp_player = 100;

let currentSpeed = baseSpeed;
let speedDiag;
let ratio_map_vu_width = 4;
let ration_map_vu_height = 4;

let border_height;
let border_width;

let allEntities = [];
let rame = false;

let dechetGroup;
let courantGroup;
let magicarpGroup;

let hpBar;


// Précharge les ressources
function preload() {
    this.load.image('map', 'images/map.png');
    this.load.image('dechet', 'images/element/dechet3.png');
    this.load.image('malade', 'images/player/human-tired.png');
    this.load.image('bien', 'images/player/human-good.png');
    this.load.image('vomis', 'images/player/human-vomit.png');
    this.load.spritesheet('courant', 'images/courant.png', { frameWidth: 200, frameHeight: 200 });
    this.load.spritesheet('magicarp', 'images/element/magicarp.png', { frameWidth: 200, frameHeight: 200 });
    this.load.spritesheet('player', 'images/player/bateau.png', { frameWidth: 200, frameHeight: 200 });
}
let visibilityOverlay;

// Initialise les objets de la scène
function create() {
    initMap.call(this);
    initPlayer.call(this);
    // initPhysics.call(this);
    initAnimations.call(this);
    initDechets.call(this);
    setupEvents.call(this);
    initCourant(this);
    initMagicarp.call(this, this);

    hpBar = this.add.graphics();
    updateHPBar.call(this);

    visibilityOverlay = this.add.rectangle(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        this.cameras.main.width,
        this.cameras.main.height,
        0x000000, // Couleur noire
        0 // Opacité initiale (transparent)
    );
    visibilityOverlay.setScrollFactor(0); // Pour qu'il reste fixe par rapport à la caméra
    visibilityOverlay.setDepth(100);

    setTimeout(() => {
        document.getElementById("jeu-eau").removeChild(document.getElementsByClassName("game-explanation")[0]);
    }, 15000);

}



// Mets à jour la scène à chaque frame
function update() {
    updateSpeed(); // Ajuste la vitesse en fonction des déchets
    movePlayer.call(this); // Déplace le joueur
    handleCollisions.call(this); // Gère les collisions
    playAnimations(); // Joue les animations du joueur
    updateHPBar()

    if (hp_player < 50) {
        // Augmente l'opacité progressivement lorsque les PV sont bas
        visibilityOverlay.setAlpha((50 - hp_player) / 50); // Alpha entre 0 (transparent) et 1 (opaque)
    } else {
        // Rend l'overlay invisible si les PV sont restaurés
        visibilityOverlay.setAlpha(0);
    }

    perso.x = player.x;
    perso.y = player.y - 15;

    if (hp_player <= 0) {
        handlePlayerDeath.call(this);
    }

    changeDesign.call(this);
}

// function change le desing du perso en fonction de sa vie
function changeDesign() {
    if (hp_player < 10) {
        perso.setTexture('vomis');
    } else if (hp_player < 40) {
        perso.setTexture('malade');
    } else if (hp_player < 80) {
        perso.setTexture('bien');
    }
}


function updateHPBar() {
    const barWidth = 100; // Largeur de la barre
    const barHeight = 10; // Hauteur de la barre
    const x = player.x - barWidth / 2;
    const y = player.y - 100; // Position au-dessus du joueur

    hpBar.clear();
    hpBar.fillStyle(0x808080, 1); // Couleur de fond (gris)
    hpBar.fillRect(x, y, barWidth, barHeight); // Dessine la barre de fond
    hpBar.fillStyle(0xff0000, 1); // Couleur des PV (rouge)
    hpBar.fillRect(x, y, (hp_player / 100) * barWidth, barHeight); // Dessine les PV restants
}

// Initialise la map et ses paramètres
function initMap() {
    map = this.add.image(config.width * ratio_map_vu_width / 2, config.height * ration_map_vu_height / 2, 'map');
    border_height = map.height;
    border_width = map.width;
    this.physics.world.setBounds(0, 0, border_width, border_height);
    this.cameras.main.setBounds(0, 0, border_width, border_height);
}

// Initialise le joueur
function initPlayer() {
    perso = this.add.image(100, 100, 'bien');
    perso.setScale(0.5);
    perso.setDepth(2);
    player = this.physics.add.sprite(100, 100, 'player');
    player.setScale(0.7);
    player.setCollideWorldBounds(true);
    player.setCircle(80, player.width / 2 - 80, player.height / 2 - 80);
    player.setDepth(1);
    this.cameras.main.startFollow(player);
}

// Initialise la physique
// function initPhysics() {
//     this.physics.world.createDebugGraphic();
//     this.physics.world.debugGraphic.setAlpha(0.75);
// }

// Initialise les animations
function initAnimations() {
    this.anims.create({
        key: 'ramer',
        frames: this.anims.generateFrameNumbers('player', { frames: [0, 1] }),
        frameRate: 8,
        repeat: -1
    });
    this.anims.create({
        key: 'courant',
        frames: this.anims.generateFrameNumbers('courant', { frames: [0, 1, 2, 3, 4, 6, 7, 8, 9] }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'magicarp',
        frames: this.anims.generateFrameNumbers('magicarp', { frames: [0, 1] }),
        frameRate: 8,
        repeat: -1
    });
}

function spawnMagicarp(numberOfMagicarp) {
    for (let i = 0; i < numberOfMagicarp; i++) {
        let { x, y } = generateRandomPosition(allEntities, border_width, border_height);
        let magicarp = magicarpGroup.create(x, y, 'magicarp');
        magicarp.setScale(0.5);
        magicarp.setCircle(50, magicarp.width / 2 - 50, magicarp.height / 2 - 50);
        magicarp.setDepth(0);
        magicarp.play('magicarp');
        allEntities.push(magicarp);

        // Déplace les magicarp
        this.tweens.add({
            targets: magicarp,
            x: Phaser.Math.Between(0, this.cameras.main.width),
            y: Phaser.Math.Between(0, this.cameras.main.height),
            duration: 5000,
            ease: 'Linear',
            repeat: -1,
            yoyo: true
        });
    }
}

// Initialise les magicarp
function initMagicarp(scene) {
    magicarpGroup = scene.physics.add.group();
    spawnMagicarp.call(scene, 10);
}


// Initialise les déchets
function initDechets() {
    dechetGroup = this.physics.add.group();
    spawndechets.call(this, 15);
}

// Initialise les courant
function initCourant(scene) {
    courantGroup = scene.physics.add.group();
    spawncourants.call(scene, 30);
}

// Configure les événements
function setupEvents() {
    this.time.addEvent({
        delay: 5000,
        loop: true,
        callback: spawndechets,
        callbackScope: this,
        args: [2]
    });

    this.time.addEvent({
        delay: 50,
        loop: true,
        callback: movedechets,
        callbackScope: this
    });
}

// Ajuste la vitesse du joueur en fonction du nombre de déchets
function updateSpeed() {
    const dechetCount = dechetGroup.getChildren().length;
    currentSpeed = baseSpeed * Math.max(1 - dechetCount * 0.02, 0.2); // Réduit la vitesse, minimum 20%
    speedDiag = currentSpeed * (Math.sqrt(2) / 2);
}

// Déplace le joueur en fonction des touches
function movePlayer() {
    player.setVelocity(0, 0);

    const keys = this.input.keyboard;

    // Mouvement vers le haut
    if (keys.addKey(haut).isDown) {
        hp_player -= 0.03;
        player.setVelocityY(-currentSpeed);
        player.setRotation(Phaser.Math.DegToRad(270));
        rame = true;
    }

    // Mouvement vers le bas
    if (keys.addKey(bas).isDown) {
        hp_player -= 0.03;
        player.setVelocityY(currentSpeed);
        player.setRotation(Phaser.Math.DegToRad(90));
        rame = true;
    }

    // Mouvement vers la droite
    if (keys.addKey(droite).isDown) {
        hp_player -= 0.03;
        player.setVelocityX(currentSpeed);
        player.setRotation(Phaser.Math.DegToRad(0));
        rame = true;
    }

    // Mouvement vers la gauche
    if (keys.addKey(gauche).isDown) {
        hp_player -= 0.03;
        player.setVelocityX(-currentSpeed);
        player.setRotation(Phaser.Math.DegToRad(180));
        rame = true;
    }

    // Gérer les mouvements diagonaux (si vous en avez besoin)
    handleDiagonalMovement(keys);
}


// Gère le déplacement diagonal
function handleDiagonalMovement(keys) {
    if (keys.addKey(gauche).isDown && keys.addKey(haut).isDown) {
        player.setVelocity(-speedDiag, -speedDiag);
        player.setRotation(Phaser.Math.DegToRad(225));
    }
    if (keys.addKey(droite).isDown && keys.addKey(haut).isDown) {
        player.setVelocity(speedDiag, -speedDiag);
        player.setRotation(Phaser.Math.DegToRad(315));
    }
    if (keys.addKey(gauche).isDown && keys.addKey(bas).isDown) {
        player.setVelocity(-speedDiag, speedDiag);
        player.setRotation(Phaser.Math.DegToRad(135));
    }
    if (keys.addKey(droite).isDown && keys.addKey(bas).isDown) {
        player.setVelocity(speedDiag, speedDiag);
        player.setRotation(Phaser.Math.DegToRad(45));
    }
}

let progressBar;
let progress = 0;
let currentCourant = null;

// Gère les collisions
function handleCollisions() {
    // Collision avec un déchet
    this.input.keyboard.on('keydown-SPACE', () => {
        if (!currentCourant) {
            // Vérifie si le joueur est proche d'un déchet
            dechetGroup.children.iterate((dechet) => {
                if (
                    Phaser.Math.Distance.Between(player.x, player.y, dechet.x, dechet.y) < 50
                ) {
                    dechet.destroy();
                    hp_player += 3; // Augmente les PV
                    updateHPBar(); // Met à jour la barre de PV
                }
            });
        }
    });

    // Collision avec un courant
    this.physics.overlap(player, courantGroup, (player, courant) => {
        if (!currentCourant) {
            currentCourant = courant;
            showProgressBar.call(this);
            this.input.keyboard.on('keydown-SPACE', handleSpacePress, this);
        }
    });
}

// Fonction qui gère la mort du joueur
function handlePlayerDeath() {

    // Ajoute un fond gris
    const graphics = this.add.graphics();
    graphics.setDepth(100);
    graphics.fillStyle(0x000000, 1); // Couleur grise
    graphics.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);

    // Affiche un message de fin de jeu
    const gameOverText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Game Over', {
        fontSize: '64px',
        fill: '#fff'
    });
    gameOverText.setOrigin(0.5, 0.5);
    gameOverText.setDepth(101);

    // Arrête toutes les animations et interactions
    this.physics.pause();
    player.anims.stop();

    // Désactive les entrées du joueur
    this.input.keyboard.enabled = false;

    // Détruit tous les objets du jeu
    dechetGroup.clear(true, true);
    courantGroup.clear(true, true);
    player.destroy();
    perso.destroy();

}

// Affiche la barre de progression
function showProgressBar() {
    progressBar = this.add.graphics();
    updateProgressBar.call(this);
}

// Met à jour la barre de progression
function updateProgressBar() {
    const barWidth = 200; // Largeur de la barre de progression
    const barHeight = 20; // Hauteur de la barre de progression
    const x = player.x - barWidth / 2;
    const y = player.y - 100;

    progressBar.clear();
    progressBar.fillStyle(0x808080, 1); // Couleur grise pour la barre de progression
    progressBar.fillRect(x, y, barWidth, barHeight); // Dessine la barre de progression grise
    progressBar.fillStyle(0x00ff00, 1); // Couleur verte pour la progression
    progressBar.fillRect(x, y, (progress / 100) * barWidth, barHeight); // Remplit la barre de progression
}

// Gère les pressions sur la touche espace
function handleSpacePress() {
    if (currentCourant) {
        progress += 10; // Ajuste la valeur selon vos besoins
        updateProgressBar.call(this);

        if (progress >= 100) {
            currentCourant.destroy();
            progressBar.destroy();
            hp_player += 8; // Ajoute 1 PV lorsque le courant est réparé
            progress = 0;
            currentCourant = null;
            this.input.keyboard.off('keydown-SPACE', handleSpacePress, this);
        }
    }
}




// Joue les animations du joueur
function playAnimations() {
    if (rame) {
        player.anims.play('ramer', true);
        rame = false;
    } else {
        player.anims.stop();
    }

    courantGroup.getChildren().forEach(courant => {
        courant.anims.play('courant', true);
    });
}

// Ajoute des déchets sur la carte
function spawndechets(numberOfdechets) {
    for (let i = 0; i < numberOfdechets; i++) {
        let { x, y } = generateRandomPosition(allEntities, border_width, border_height);
        let dechet = dechetGroup.create(x, y, 'dechet');
        dechet.setScale(0.5);
        dechet.setCircle(50, dechet.width / 2 - 50, dechet.height / 2 - 50);
        dechet.setDepth(0);
        allEntities.push(dechet);
        hp_player -= 1;
    }
}

// Ajoute des courants sur la carte
function spawncourants(numberOfdechets) {
    for (let i = 0; i < numberOfdechets; i++) {
        let { x, y } = generateRandomPosition(allEntities, border_width, border_height);
        let courant = courantGroup.create(x, y, 'courant');
        courant.setScale(0.8);
        courant.body.setSize(courant.width, courant.height * 0.6);
        courant.setDepth(0);
        allEntities.push(courant);
        hp_player -= 1;
    }
}

// Génère une position aléatoire
function generateRandomPosition(existingEntities, borderWidth, borderHeight) {
    let x, y;
    let isColliding;

    do {
        x = Phaser.Math.Between(0, borderWidth);
        y = Phaser.Math.Between(0, borderHeight);
        isColliding = existingEntities.some(entity => Phaser.Math.Distance.Between(x, y, entity.x, entity.y) < entity.displayWidth);
    } while (isColliding);

    return { x, y };
}

// Déplace les déchets
function movedechets() {
    dechetGroup.getChildren().forEach(dechet => {
        const direction = Phaser.Math.Between(0, 3);
        const speed = 60;

        switch (direction) {
            case 0:
                dechet.setVelocityY(-speed);
                break;
            case 1:
                dechet.setVelocityY(speed);
                break;
            case 2:
                dechet.setVelocityX(-speed);
                break;
            case 3:
                dechet.setVelocityX(speed);
                break;
        }
    });
}
</script>
