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
    // Initialise le jeu lorsque le composant est monté
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

let ratio_map_vu_width = 4; // map.width/config.width
let ration_map_vu_height = 4; // map.height/config.height

let speed = 400;
let speed_diag = speed * (Math.sqrt(2) / 2); // règle de trigo pour le déplacement

let border_height;
let border_width;


let allEntities = []; // liste des pos de chaque entité


let rame = false;


let dechetGroup;


let cursors;
    

function preload() {
    this.load.image('map', 'images/map.png');
    this.load.image('dechet', 'images/element/dechet3.png');

    this.load.spritesheet('player', 'images/player/bateau.png', { frameWidth: 200, frameHeight: 200 });
}

function create() {
    // Création de la map
    map = this.add.image(config.width * ratio_map_vu_width / 2, config.height * ration_map_vu_height / 2, 'map');

    // Création des variables de bordures de la map
    border_height = map.height;
    border_width = map.width;

    // Création du joueur
    player = this.physics.add.sprite(100, 100, 'player');
    player.setScale(0.7);
    player.setCollideWorldBounds(true);
    player.setCircle(80, player.width / 2 - 80, player.height / 2 - 80);
    player.setDepth(1);

    // Création des bordures de la carte
    this.physics.world.setBounds(0, 0, border_width, border_height);

    // Création de la caméra
    this.cameras.main.setBounds(0, 0, border_width, border_height);
    this.cameras.main.startFollow(player);

    // Création des touches directionnelles
    cursors = this.input.keyboard.createCursorKeys();

    // Activation du débogage des collisions
    this.physics.world.createDebugGraphic();
    this.physics.world.debugGraphic.setAlpha(0.75);

    // Création du groupe de dechets
    dechetGroup = this.physics.add.group();

    spawndechets.call(this, 50);
    //création deux dechets tout les 5 secondes
    this.time.addEvent({
        delay: 5000,
        loop: true,
        callback: spawndechets,
        callbackScope: this,
        args: [2]
    });

    // Déplace les dechets toutes les 100ms
    this.time.addEvent({
        delay: 100,
        loop: true,
        callback: movedechets,
        callbackScope: this
    });

    // Creation des annimations
    this.anims.create({
      key: 'ramer',
      frames: this.anims.generateFrameNumbers('player', { frames: [0, 1, 2, 3, 4,6,7,] }),
      frameRate: 8,
      repeat: -1
    });

}

// Fonction de mise à jour à chaque frame
function update() {
    movePlayer.call(this); // Déplace le joueur

    // Gérer les collisions entre le joueur et les dechets
    this.physics.overlap(player, dechetGroup, (player, dechet) => {
        dechet.destroy(); // Supprimer le dechet
    });

    // animation du joueur
    if(rame){
        player.anims.play('ramer', true)
        rame = false
    }else{
        player.anims.play('ramer', false)
    }
}

// Déplacement du joueur
function movePlayer() {
    // Réinitialisation de la vitesse
    player.setVelocityX(0);
    player.setVelocityY(0);

    // Déplacement haut/bas/gauche/droite
    if (this.input.keyboard.addKey(haut).isDown) {
        player.setVelocity(0, -speed);
        player.setRotation(Phaser.Math.DegToRad(270)); // Rotation vers le haut
        rame = true;
    }
    if (this.input.keyboard.addKey(bas).isDown) {
        player.setVelocity(0, speed);
        player.setRotation(Phaser.Math.DegToRad(90)); // Rotation vers le bas
        rame = true;
    }
    if (this.input.keyboard.addKey(droite).isDown) {
        player.setVelocity(speed, 0);
        player.setRotation(Phaser.Math.DegToRad(0)); // Rotation vers la droite
        rame = true;
    }
    if (this.input.keyboard.addKey(gauche).isDown) {
        player.setVelocity(-speed, 0);
        player.setRotation(Phaser.Math.DegToRad(180)); // Rotation vers la gauche
        rame = true;
    }
    
    // Déplacement diagonal
    if (this.input.keyboard.addKey(gauche).isDown && this.input.keyboard.addKey(haut).isDown) {
        player.setVelocity(-speed_diag, -speed_diag);
        player.setRotation(Phaser.Math.DegToRad(225)); // Rotation diagonale gauche-haut
    }
    if (this.input.keyboard.addKey(droite).isDown && this.input.keyboard.addKey(haut).isDown) {
        player.setVelocity(speed_diag, -speed_diag);
        player.setRotation(Phaser.Math.DegToRad(315)); // Rotation diagonale droite-haut
    }
    if (this.input.keyboard.addKey(gauche).isDown && this.input.keyboard.addKey(bas).isDown) {
        player.setVelocity(-speed_diag, speed_diag);
        player.setRotation(Phaser.Math.DegToRad(135)); // Rotation diagonale gauche-bas
    }
    if (this.input.keyboard.addKey(droite).isDown && this.input.keyboard.addKey(bas).isDown) {
        player.setVelocity(speed_diag, speed_diag);
        player.setRotation(Phaser.Math.DegToRad(45)); // Rotation diagonale droite-bas
    }
  }


// Fonction pour faire spawn des dechets aléatoires
function spawndechets(numberOfdechets) {
    for (let i = 0; i < numberOfdechets; i++) {
        let { x, y } = generateRandomPosition(allEntities, border_width, border_height); // Trouver une position aléatoire

        // Créer le dechet à la position générée
        let dechet = dechetGroup.create(x, y, 'dechet');
        dechet.setScale(0.5); // Ajuster la taille du dechet
        dechet.setCollideWorldBounds(true); // Empêcher le dechet de sortir des limites du monde
        dechet.setDepth(0); // Placer le dechet sous le joueur (peut être ajusté si nécessaire)

        // Ajouter le dechet à la liste des entités
        allEntities.push(dechet);
    }
}

// Fonction pour générer une position aléatoire sans collision avec d'autres entités
function generateRandomPosition(existingEntities, borderWidth, borderHeight) {
    let isColliding = true;
    let x, y;

    while (isColliding) {
        isColliding = false;
        x = Phaser.Math.Between(0, borderWidth);
        y = Phaser.Math.Between(0, borderHeight);

        for (const entity of existingEntities) {
            const distance = Phaser.Math.Distance.Between(x, y, entity.x, entity.y);
            if (distance < entity.displayWidth) {
                isColliding = true;
                break;
            }
        }
    }

    return { x, y };
}

// Fonction pour mettre à jour la position des dechets
function movedechets() {
    dechetGroup.getChildren().forEach(dechet => {
        // Déplacer chaque dechet dans une direction aléatoire
        let direction = Phaser.Math.Between(0, 3); // 0 = haut, 1 = bas, 2 = gauche, 3 = droite
        let speed = 120; // Vitesse du mouvement

        switch (direction) {
            case 0: // Haut
                dechet.setVelocityY(-speed);
                break;
            case 1: // Bas
                dechet.setVelocityY(speed);
                break;
            case 2: // Gauche
                dechet.setVelocityX(-speed);
                break;
            case 3: // Droite
                dechet.setVelocityX(speed);
                break;
        }
    });
}

</script>