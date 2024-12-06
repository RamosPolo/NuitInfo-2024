<template>
  <div id="jeu-eau">
    <h1>Jeu </h1>
    <div id="jeu"></div>
  </div>
</template>

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
    pixelArt: true,
};

let player;
let map;

let haut = 'Z';
let bas = 'S';
let gauche = 'Q';
let droite = 'D';

let baseSpeed = 500;
let currentSpeed = baseSpeed;
let speedDiag;
let ratio_map_vu_width = 4;
let ration_map_vu_height = 4;

let border_height;
let border_width;

let allEntities = [];
let rame = false;

let dechetGroup;

// Précharge les ressources
function preload() {
    this.load.image('map', 'images/map.png');
    this.load.image('dechet', 'images/element/dechet3.png');
    this.load.spritesheet('player', 'images/player/bateau.png', { frameWidth: 200, frameHeight: 200 });
}

// Initialise les objets de la scène
function create() {
    initMap.call(this);
    initPlayer.call(this);
    initPhysics.call(this);
    initAnimations.call(this);
    initDechets.call(this);
    setupEvents.call(this);
}

// Mets à jour la scène à chaque frame
function update() {
    updateSpeed(); // Ajuste la vitesse en fonction des déchets
    movePlayer.call(this); // Déplace le joueur
    handleCollisions.call(this); // Gère les collisions
    playAnimations(); // Joue les animations du joueur
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
    player = this.physics.add.sprite(100, 100, 'player');
    player.setScale(0.7);
    player.setCollideWorldBounds(true);
    player.setCircle(80, player.width / 2 - 80, player.height / 2 - 80);
    player.setDepth(1);
    this.cameras.main.startFollow(player);
}

// Initialise la physique
function initPhysics() {
    this.physics.world.createDebugGraphic();
    this.physics.world.debugGraphic.setAlpha(0.75);
}

// Initialise les animations
function initAnimations() {
    this.anims.create({
        key: 'ramer',
        frames: this.anims.generateFrameNumbers('player', { frames: [0, 1, 2, 3, 4, 6, 7] }),
        frameRate: 8,
        repeat: -1
    });
}

// Initialise les déchets
function initDechets() {
    dechetGroup = this.physics.add.group();
    spawndechets.call(this, 10);
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
        delay: 100,
        loop: true,
        callback: movedechets,
        callbackScope: this
    });
}

// Ajuste la vitesse du joueur en fonction du nombre de déchets
function updateSpeed() {
    const dechetCount = dechetGroup.getChildren().length;
    currentSpeed = baseSpeed * Math.max(1 - dechetCount * 0.01, 0.2); // Réduit la vitesse, minimum 20%
    speedDiag = currentSpeed * (Math.sqrt(2) / 2);
}

// Déplace le joueur en fonction des touches
function movePlayer() {
    player.setVelocity(0, 0);

    const keys = this.input.keyboard;

    if (keys.addKey(haut).isDown) {
        player.setVelocityY(-currentSpeed);
        player.setRotation(Phaser.Math.DegToRad(270));
        rame = true;
    }
    if (keys.addKey(bas).isDown) {
        player.setVelocityY(currentSpeed);
        player.setRotation(Phaser.Math.DegToRad(90));
        rame = true;
    }
    if (keys.addKey(droite).isDown) {
        player.setVelocityX(currentSpeed);
        player.setRotation(Phaser.Math.DegToRad(0));
        rame = true;
    }
    if (keys.addKey(gauche).isDown) {
        player.setVelocityX(-currentSpeed);
        player.setRotation(Phaser.Math.DegToRad(180));
        rame = true;
    }

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

// Gère les collisions
function handleCollisions() {
    this.physics.overlap(player, dechetGroup, (player, dechet) => {
        dechet.destroy();
    });
}

// Joue les animations du joueur
function playAnimations() {
    if (rame) {
        player.anims.play('ramer', true);
        rame = false;
    } else {
        player.anims.stop();
    }
}

// Ajoute des déchets sur la carte
function spawndechets(numberOfdechets) {
    for (let i = 0; i < numberOfdechets; i++) {
        let { x, y } = generateRandomPosition(allEntities, border_width, border_height);
        let dechet = dechetGroup.create(x, y, 'dechet');
        dechet.setScale(0.5);
        dechet.setCollideWorldBounds(true);
        dechet.setDepth(0);
        allEntities.push(dechet);
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
        const speed = 120;

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
