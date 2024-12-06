<template>
  <div id="jeu-eau">
    <div id="jeu"></div>
    <div class="game-explanation">
        <h2>Explication du Jeu</h2>
        <p>Bienvenue dans notre jeu d'arcade ! Voici comment jouer :</p>
        <ul>
          <li>Utilisez les touches (ZQSD) pour déplacer votre personnage.</li>
          <li>Collectez les déchets en appuyant sur la touche <strong>Espace</strong> lorsqu'ils sont à portée.</li>
          <li>Rétablissez les courants marin avec la touche <strong>Espace</strong> plusieurs fois</li>
          <li>Si il y a trop de dechet vous etes ralenti !</li>
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
let courantGroup;

// Précharge les ressources
function preload() {
    this.load.image('map', 'images/map.png');
    this.load.image('dechet', 'images/element/dechet3.png');
    this.load.spritesheet('courant', 'images/courant.png', { frameWidth: 200, frameHeight: 200 });
    this.load.spritesheet('player', 'images/player/bateau.png', { frameWidth: 200, frameHeight: 200 });
}

// Initialise les objets de la scène
function create() {
    initMap.call(this);
    initPlayer.call(this);
    //initPhysics.call(this);
    initAnimations.call(this);
    initDechets.call(this);
    setupEvents.call(this);
    initCourant(this); 
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
}

// Initialise les déchets
function initDechets() {
    dechetGroup = this.physics.add.group();
    spawndechets.call(this, 10);
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

let progressBar;
let progress = 0;
let currentCourant = null;

// Gère les collisions
function handleCollisions() {
    this.physics.overlap(player, dechetGroup, (player, dechet) => {
        if (!currentCourant) {
            this.input.keyboard.on('keydown-SPACE', () => {
            dechet.destroy();
        });
        }
    });

    this.physics.overlap(player, courantGroup, (player, courant) => {
        if (!currentCourant) {
            currentCourant = courant;
            showProgressBar.call(this);
            this.input.keyboard.on('keydown-SPACE', handleSpacePress, this);
        }
    });
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
        progress += 10; // Ajustez la valeur selon vos besoins
        updateProgressBar.call(this);

        if (progress >= 100) {
            currentCourant.destroy();
            progressBar.destroy();
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
