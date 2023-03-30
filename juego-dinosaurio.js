const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const dinoImage = new Image();
dinoImage.crossOrigin = 'anonymous'; // Establecer la propiedad crossOrigin
dinoImage.src = 'dinosaurio.png';
dinoImage.onload = function () {
    // Comenzar el bucle del juego
    gameLoop();
}

// Definir el objeto del dinosaurio
const dino = {
    x: 50,
    y: canvas.height - 50,
    width: 50,
    height: 50,
    speed: 5,
    jumping: false,
    img: dinoImage
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

// Gravedad
const gravity = 0.35;

// Dibujar el bloque dinosaurio
function drawBlockDino() {
    ctx.fillStyle = 'green';
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
}

// Dibujar el dinosaurio
function drawDino() {
    ctx.drawImage(dino.img, dino.x, dino.y, dino.width, dino.height);
}

// Dibujar el obstáculo
function drawObstacle() {
    ctx.fillStyle = 'red';
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

function getDinoPixels() {
    const pixels = [];

    const imgData = ctx.getImageData(dino.x, dino.y, dino.width, dino.height);

    for (let i = 0; i < imgData.data.length; i += 4) {
        const r = imgData.data[i];
        const g = imgData.data[i + 1];
        const b = imgData.data[i + 2];
        const a = imgData.data[i + 3];

        if (r === 0 && g === 128 && b === 0 && a === 255) {
            pixels.push(1);
        } else {
            pixels.push(0);
        }
    }

    return pixels;
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

// Bucle de juego
function gameLoop() {
    // Limpiar el lienzo
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Actualizar la velocidad y la posición vertical del dinosaurio si está saltando
    if (dino.jumping) {
        dino.speed += gravity;
        dino.y += dino.speed;

        // Si el dinosaurio ha llegado al suelo, detener el salto
        if (dino.y + dino.height > ground.y) {
            dino.y = ground.y - (dino.height * 2);
            dino.jumping = false;
            dino.speed = 0;
        }
    }

    // Dibujar el dinosaurio
    drawBlockDino();

    // Actualizar el obstáculo
    updateObstacle();

    // Dibujar el obstáculo
    drawObstacle();

    // Verificar si hay colisión
    if (checkBlockCollision()) {
        console.log('¡Choque!');
    }

    // Solicitar la próxima animación de cuadro
    requestAnimationFrame(gameLoop);
}

// Verificar si hay colisión
function checkCollision() {
    const dinoPixels = getDinoPixels();

    const obstacleLeft = obstacle.x;
    const obstacleRight = obstacle.x + obstacle.width;
    const obstacleTop = obstacle.y;
    const obstacleBottom = obstacle.y + obstacle.height;

    for (let i = 0; i < dinoPixels.length; i++) {
        const row = Math.floor(i / dino.width);
        const col = i % dino.width;

        if (dinoPixels[i] === 1 && col + dino.x < obstacleRight && col + dino.x > obstacleLeft && row + dino.y < obstacleBottom && row + dino.y > obstacleTop) {
            resetGame();
            return true;
        }
    }

    return false;
}

// Verificar si hay colisión cuando es bloque dinosaurio
function checkBlockCollision() {
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
        resetGame();
        return true;
    }

    return false;
}

// Función que hace que el dinosaurio salte
function moveUp() {
    // Solo permite saltar si el dinosaurio no está saltando actualmente
    if (!dino.jumping) {
        dino.jumping = true;
        dino.speed = -10; // Establecer la velocidad inicial del salto
    }
}

// Función que resetea el juego
function resetGame() {
    // Reiniciar la posición del dinosaurio
    dino.x = 50;
    dino.y = canvas.height - 50;

    // Reiniciar la posición del obstáculo
    obstacle.x = 600;
    obstacle.y = 125;

    // Reiniciar la velocidad del dinosaurio
    dino.speed = 5;
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