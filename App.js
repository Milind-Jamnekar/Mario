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
      this.velocity.x = 0;
    }
  }
}

const player = new Player();
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

  if (keys.left.pressed) player.velocity.x -= 10;
  else if (keys.right.pressed) player.velocity.x += 10;
  else player.velocity.x = 0;
}

animate();

document.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "ArrowUp":
      player.velocity.y -= 30;
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
