const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const dino = {
    x: 50,
    y: 125,
    width: 50,
    height: 50,
    speed: 5,
    jumping: false
};

const obstacle = {
    x: 600,
    y: 125,
    width: 30,
    height: 30,
    speed: 7
};

function drawDino() {
    ctx.fillStyle = 'green';
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
}

function drawObstacle() {
    ctx.fillStyle = 'red';
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

function updateObstacle() {
    obstacle.x -= obstacle.speed;
    if (obstacle.x < -obstacle.width) {
        obstacle.x = 600;
    }
}

//First loop created
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawDino();
    updateObstacle();
    drawObstacle();

    requestAnimationFrame(loop);
}

//New loop created
function gameLoop() {
    // Limpiar el lienzo
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar el dinosaurio
    drawDino();

    // Actualizar el obstáculo
    updateObstacle();

    // Dibujar el obstáculo
    drawObstacle();

    // Verificar si hay colisión
    if (checkCollision()) {
        console.log('¡Choque!');
    }

    // Solicitar la próxima animación de cuadro
    requestAnimationFrame(gameLoop);
}

function checkCollision() {
    const dinoLeft = dino.x;
    const dinoRight = dino.x + dino.width;
    const dinoTop = dino.y;
    const dinoBottom = dino.y + dino.height;

    const obstacleLeft = obstacle.x;
    const obstacleRight = obstacle.x + obstacle.width;
    const obstacleTop = obstacle.y;
    const obstacleBottom = obstacle.y + obstacle.height;

    if (
        dinoLeft < obstacleRight &&
        dinoRight > obstacleLeft &&
        dinoTop < obstacleBottom &&
        dinoBottom > obstacleTop
    ) {
        return true;
    }

    return false;
}

//loop();

// Iniciar el bucle de juego
gameLoop();