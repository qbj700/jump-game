const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const status = document.getElementById("status");
const scoreDisplay = document.getElementById("score");

let isJumping = false;
let score = 0;
let gameOver = false;
let obstacleSpeed = 2; // seconds

// 초기 장애물 속도 적용
obstacle.style.animation = `moveObstacle ${obstacleSpeed}s linear infinite`;

document.addEventListener("keydown", function (e) {
    if (e.code === "Space") {
        jump();
    }
});

function jump() {
    if (isJumping || gameOver) return;
    isJumping = true;
    player.classList.add("jump");
    setTimeout(() => {
        player.classList.remove("jump");
        isJumping = false;
    }, 600);
}

// 충돌 및 점수 감지
let checkCollision = setInterval(function () {
    const playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
    const obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

    if (obstacleLeft < 90 && obstacleLeft > 50 && playerTop > 140) {
        status.textContent = `💥 게임 오버! 최종 점수: ${score}`;
        obstacle.style.animation = "none";
        obstacle.style.display = "none";
        gameOver = true;
        clearInterval(checkCollision);
        clearInterval(scoreLoop);
    }
}, 10);

// 점수 증가 및 난이도 조절
let scoreLoop = setInterval(function () {
    if (gameOver) return;

    const obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

    if (obstacleLeft <= 0) {
        score++;
        scoreDisplay.textContent = `점수: ${score}`;

        // 5점마다 장애물 속도 증가
        if (score % 5 === 0 && obstacleSpeed > 0.6) {
            obstacleSpeed -= 0.2;
            obstacle.style.animation = `none`; // reset animation
            void obstacle.offsetWidth; // force reflow
            obstacle.style.animation = `moveObstacle ${obstacleSpeed}s linear infinite`;
        }
    }
}, 500);
