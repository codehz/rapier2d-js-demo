import { Camera, ctx } from "./canvas.ts";
import { Circle, WallMap } from "./shape.ts";
import { World } from "./loader.ts";

let camera = new Camera();
camera.start();
camera.size = 20;
camera.origin = { x: 10, y: 10 };

// @ts-ignore
window.camera = camera;

let world = new World({ x: 0.0, y: 10 });

const map = new WallMap(0.25);
map.addLines(
  { x: 2, y: 2 },
  { x: 2, y: 18 },
  { x: 18, y: 15 },
  { x: 18, y: 2 },
);
map.addLines(
  { x: 5, y: 10 },
  { x: 15, y: 11 },
);
map.appendTo(world);

const balls: Circle[] = [];

{
  const ball = new Circle({ x: 10, y: 5 }, 0.5, 0x00FF00);
  ball.appendTo(world);
  balls.push(ball);
}

camera.on("click", (pos) => {
  const ball = new Circle(pos, 0.5, 0xFF00FF);
  ball.appendTo(world);
  balls.push(ball);
});

let gameLoop = () => {
  world.step();
  camera.apply();
  map.render(ctx);
  for (const ball of balls) {
    ball.render(ctx);
  }

  requestAnimationFrame(gameLoop);
};

gameLoop();
