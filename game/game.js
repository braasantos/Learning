const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 800,
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
let collectible;
let walls;

// Maze layout: 1 represents wall, 0 represents path
// Adjusted to fit within a 1000x600 game area
const maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

// Wall size in pixels
const wallSize = 40;

function preload() {
    // Load top-down assets
    this.load.image('background', 'assets/ground.png'); // Background asset
    this.load.image('wall', 'assets/wall.png'); // Wall asset
    this.load.image('collect', 'assets/collect.png'); // Collectible asset
    this.load.spritesheet('player', 'assets/player.png', { frameWidth: 48, frameHeight: 48 }); // Player sprite
}

function create() {
    // Add background tile
    this.add.tileSprite(400, 300, 1400, 1000, 'background');

    // Create walls based on the maze layout
    walls = this.physics.add.staticGroup();

    for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
            if (maze[row][col] === 1) {
                // Create a wall at the specified position
                walls.create(col * wallSize + wallSize / 2, row * wallSize + wallSize / 2, 'wall').setScale(1).refreshBody();
            }
        }
    }

    // Create the player sprite in a position within the maze
    player = this.physics.add.sprite(100, 100, 'player'); // Start the player at (100, 100)
    player.setCollideWorldBounds(true);

    // Enable collision between player and walls
    this.physics.add.collider(player, walls);

    // Create initial collectible
    collectible = spawnCollectible(this);

    // Player animations for different directions
    createPlayerAnimations.call(this);

    // Input for player movement
    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    // Stop the player movement initially
    player.setVelocity(0);

    // Player movement logic
    handlePlayerMovement();

    // Check for collision with collectible
    if (collectible && Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), collectible.getBounds())) {
        console.log("EATEN");
        collectible.destroy();
        collectible = spawnCollectible(this); // Spawn a new collectible
    }
}

// Helper Functions

function spawnCollectible(scene) {
    let position;
    let validPosition = false;

    while (!validPosition) {
        position = {
            x: getRandomNumber(),
            y: getRandomNumber()
        };
        validPosition = isPositionValid(scene, position);
    }

    return scene.physics.add.sprite(position.x, position.y, 'collect');
}

function isPositionValid(scene, position) {
    const playerBounds = player.getBounds();
    const collectibleBounds = new Phaser.Geom.Rectangle(position.x, position.y, 32, 32); // Assuming the collectible size is 32x32
    const isWithinBounds = position.x >= 0 && position.x <= scene.game.config.width && position.y >= 0 && position.y <= scene.game.config.height;
    const isNotOverlapping = !Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, collectibleBounds);
    const wallsBounds = walls.getChildren().map(wall => wall.getBounds());

    const isNotOverlappingWithWalls = wallsBounds.every(wallBound => !Phaser.Geom.Intersects.RectangleToRectangle(wallBound, collectibleBounds));

    return isWithinBounds && isNotOverlapping && isNotOverlappingWithWalls;
}

function createPlayerAnimations() {
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
}

function handlePlayerMovement() {
    document.addEventListener('keydown', function(event)
    {
        if (event.key === 'ArrowUp')
        {
            player.setVelocityY(-300);
           player.anims.play('up', true);
        }
        else if (event.key === 'ArrowDown')
        {
            player.setVelocityY(300);
            player.anims.play('down', true);
        }
        else if (event.key === 'ArrowLeft')
        {
            player.setVelocityX(-300);
            player.anims.play('left', true);
        }
        else if (event.key === 'ArrowRight')
        {
            player.setVelocityX(300);
            player.anims.play('right', true);
        }
        else
            player.anims.stop();
    })

}

function getRandomNumber() {
    return Math.floor(Math.random() * (21)) * wallSize + wallSize / 2; // Generates random positions based on wall size
}
