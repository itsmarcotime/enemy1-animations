/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies = 100;
const enemiesArray = [];

let gameFrame = 0;

class Enemy {
    constructor() {
        this.image = new Image();
        this.image.src = 'enemy1.png';
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        // we want the speed to be between -2 and 4. The (Math.random() * 4) part generates a random number between 0 - 4 
        // while the ( - 2) part at the end tells the program to start this list from -2.
        // So now we have a random number between -2 and 4.
        this.speed = Math.random() * 4 - 2;
        // width & height of the area that is cut out of sprite image for animations
        this.spriteWidth = 293
        this.spriteHeight = 155;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeight / 2.5;
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    }

    update() {
        this.x += this.speed;
        this.y += this.speed;
        //animate sprites
        if (gameFrame % this.flapSpeed === 0) {
            //if this.frame is greater than 4 then reset back to zero otherwise increase this.frame
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }

    draw() {
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, 
            this.x, this.y, this.width, this.height);
    }
};

// const enemy1 =  new Enemy();  below is how we call multiple enemies.

for (let i = 0; i < numberOfEnemies; i++) {
    enemiesArray.push(new Enemy());

}

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // enemy1.update();
    // enemy1.draw();
    //below is how we call update and draw for each enemy.
    enemiesArray.forEach(enemy => {
        enemy.update();
        enemy.draw();
    })
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();