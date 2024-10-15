const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }, // No gravity for top-down view
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
let player;
let cursors;

function preload() {
    // Load top-down assets
    this.load.image('background', 'assets/ground.png'); // Background asset
    this.load.spritesheet('player', 'assets/player.png', { frameWidth: 48, frameHeight: 48 }); // Player sprite
}

function create() {
    // Add background tile
    this.add.tileSprite(400, 300, 1200, 800, 'background');

    // Create collectibles in a grid

    // Create the player sprite
    player = this.physics.add.sprite(500, 300, 'player');
    player.setCollideWorldBounds(true);

    // Player animations for different directions
    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('player', { start: 3, end: 5 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 6, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 9, end: 11 }),
        frameRate: 10,
        repeat: -1
    });

    // Input for player movement
    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    // Stop the player movement initially
    player.setVelocity(0);

    while (1)
    {
        // Player movement logic
        if (cursors.left.isDown) {
            player.setVelocityX(-160);
            player.anims.play('left', true); // Play left animation
        } else if (cursors.right.isDown) {
            player.setVelocityX(160);
            player.anims.play('right', true); // Play right animation
        } else if (cursors.up.isDown) {
            player.setVelocityY(-160);
            player.anims.play('up', true); // Play up animation
        } else if (cursors.down.isDown) {
            player.setVelocityY(160);
            player.anims.play('down', true); // Play down animation
        } else {
            // When no keys are pressed, stop the animation but maintain the player's current frame
            player.anims.stop(); 
            // Optionally, you can set the player to a static frame when idle
            player.setTexture('player', 0); // Sets to the first frame, adjust as necessary
        }
    }
}
