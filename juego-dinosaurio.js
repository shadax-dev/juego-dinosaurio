const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Definir una variable para controlar la velocidad del dinosaurio
const dinoSpeed = 5;

// Definir el objeto del dinosaurio
const dino = {
    x: 50,
    y: 125,
    width: 50,
    height: 50,
    speed: 5,
    jumping: false
};

// Definir el objeto del obstáculo
const obstacle = {
    x: 600,
    y: 125,
    width: 30,
    height: 50,
    speed: 7
};

// Definir el objeto del suelo
const ground = {
    x: 0,
    y: 200,
    width: canvas.width,
    height: 50
};

// Dibujar el dinosaurio
function drawDino() {
    ctx.fillStyle = 'green';
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
}

// Dibujar el obstáculo
function drawObstacle() {
    ctx.fillStyle = 'red';
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

// Generador de obstáculos
function updateObstacle() {
    obstacle.x -= obstacle.speed;

    if (obstacle.x + obstacle.width < 0) {
        obstacle.x = canvas.width + Math.random() * canvas.width;
        obstacle.y = ground.y - obstacle.height - Math.random() * 50;
        obstacle.speed = Math.floor(Math.random() * 4) + 1; // velocidad aleatoria entre 1 y 4
    }
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

// Verificar si hay colisión
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

// Función para mover al dinosaurio hacia arriba
function moveUp() {
    dino.y -= dinoSpeed;
}

// Función para manejar los eventos de teclado
function handleKeyDown(event) {
    switch (event.code) {
        case "ArrowUp":
            moveUp();
            break;
    }
}

// Agregar un event listener a la ventana para manejar los eventos de teclado
window.addEventListener("keydown", handleKeyDown);

// Iniciar el bucle de juego
gameLoop();