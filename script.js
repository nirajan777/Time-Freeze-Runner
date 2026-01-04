const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let keys = {};
let timeMoving = false;

const player = {
  x: 50, y: 300, w: 30, h: 30,
  vy: 0, speed: 3
};

const enemy = {
  x: 400, y: 300, w: 30, h: 30,
  dir: 1
};

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

function update() {
  timeMoving = keys["ArrowRight"] || keys["ArrowLeft"] || keys["ArrowUp"];

  if (keys["ArrowRight"]) player.x += player.speed;
  if (keys["ArrowLeft"]) player.x -= player.speed;
  if (keys["ArrowUp"] && player.y === 300) player.vy = -8;

  // gravity
  player.vy += 0.4;
  player.y += player.vy;
  if (player.y > 300) {
    player.y = 300;
    player.vy = 0;
  }

  // enemy moves only if time is moving
  if (timeMoving) {
    enemy.x += enemy.dir * 2;
    if (enemy.x < 300 || enemy.x > 700) enemy.dir *= -1;
  }

  // collision
  if (
    player.x < enemy.x + enemy.w &&
    player.x + player.w > enemy.x &&
    player.y < enemy.y + enemy.h &&
    player.y + player.h > enemy.y
  ) {
    alert("Game Over");
    location.reload();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "cyan";
  ctx.fillRect(player.x, player.y, player.w, player.h);

  ctx.fillStyle = "red";
  ctx.fillRect(enemy.x, enemy.y, enemy.w, enemy.h);
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
