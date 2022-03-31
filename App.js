const canvas = document.querySelector("canvas");

const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const gravity = 1.5;
class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };

    //Velocity of blob
    this.velocity = {
      x: 0,
      y: 0,
    };

    //Dimension of blob
    this.width = 50;
    this.height = 50;
  }

  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
    //Downward gravity
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }
  }
}

class Platform extends Player {
  constructor() {
    super();
    this.position.x = 200;
    this.position.y = 300;

    this.width = 400;
    this.height = 20;
  }
}

const player = new Player();
const platform = new Platform();

const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};
player.draw();

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  platform.draw();

  if (keys.left.pressed) player.velocity.x = -10;
  else if (keys.right.pressed) player.velocity.x = 10;
  else player.velocity.x = 0;

  //Platform collision detection
  if (
    player.position.y + player.height <= platform.position.y &&
    player.position.y + player.height + player.velocity.y >=
      platform.position.y &&
    player.position.x + player.width >= platform.position.x &&
    player.position.x + player.width <= platform.position.x + platform.width
    // player.position.x + player.width <= platform.position.x &&
  ) {
    player.velocity.y = 0;
  }
}

animate();

// Arrow keys pressed for movements
document.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "ArrowUp":
      player.velocity.y -= 40;
      break;

    case "ArrowRight":
      keys.right.pressed = true;
      break;

    case "ArrowLeft":
      keys.left.pressed = true;
      break;

    default:
      break;
  }
});

// stopping movements
document.addEventListener("keyup", function (e) {
  switch (e.key) {
    case "ArrowRight":
      keys.right.pressed = false;
      break;

    case "ArrowLeft":
      keys.left.pressed = false;
      break;

    default:
      break;
  }
});
