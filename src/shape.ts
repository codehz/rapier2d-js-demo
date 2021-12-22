import {
  Ball,
  CoefficientCombineRule,
  type Collider,
  ColliderDesc,
  type RigidBody,
  RigidBodyDesc,
  Vector,
  World,
} from "./loader.ts";

import { type ColorInit, toHexColor } from "./color.ts";

export interface Renderable {
  readonly render: (ctx: CanvasRenderingContext2D) => void;
}

export interface Physical {
  appendTo(world: World): void;
  removeFrom(world: World): void;
}

export class WallMap implements Renderable, Physical {
  readonly width: number;
  readonly walls: Array<Vector[]> = [];
  #body!: RigidBody;
  constructor(width: number) {
    this.width = width;
  }

  addLines(...lines: Vector[]) {
    this.walls.push(lines);
  }

  readonly render = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = "white";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = this.width;
    for (const wall of this.walls) {
      ctx.beginPath();
      for (const { x, y } of wall) {
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  };

  appendTo(world: World): void {
    this.#body = world.createRigidBody(RigidBodyDesc.newStatic());
    for (const wall of this.walls) {
      const n = wall.length;
      let last = wall[0];
      for (let i = 1; i < n; i++) {
        const curr = wall[i];
        const mid = [(last.x + curr.x) / 2, (last.y + curr.y) / 2] as const;
        const rot = Math.atan2(last.x - curr.x, last.y - curr.y);
        const half =
          Math.sqrt((last.x - curr.x) ** 2 + (last.y - curr.y) ** 2) / 2;
        const desc = ColliderDesc.capsule(half, this.width / 2)
          .setTranslation(...mid)
          .setRotation(-rot)
          .setRestitutionCombineRule(CoefficientCombineRule.Max);
        world.createCollider(desc, this.#body.handle);
        last = curr;
      }
    }
  }
  removeFrom(world: World): void {
    world.removeRigidBody(this.#body);
  }
}

export class Circle implements Renderable, Physical {
  #color: string;
  density: number;
  #initial_translation: Vector;
  #initial_radius: number;
  #body!: RigidBody;
  #collider!: Collider;
  get color() {
    return this.#color;
  }
  set color(value: ColorInit) {
    this.#color = toHexColor(value);
  }
  get translation() {
    return this.#body.translation();
  }
  set translation(value: Vector) {
    this.#body.setTranslation(value, true);
  }
  get radius() {
    return this.#collider.radius();
  }
  set radius(value: number) {
    this.#collider.setShape(new Ball(value));
  }
  constructor(
    translation: Vector,
    radius: number,
    color: ColorInit = "#FFFFFF",
    density: number = Math.PI,
  ) {
    this.#initial_translation = translation;
    this.#initial_radius = radius;
    this.#color = toHexColor(color);
    this.density = density;
  }
  render = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = this.#color;
    ctx.beginPath();
    const { x, y } = this.translation;
    ctx.arc(x, y, this.radius, 0, 2 * Math.PI, false);
    ctx.fill();
  };
  appendTo(world: World): void {
    this.#body = world.createRigidBody(
      RigidBodyDesc.newDynamic()
        .setTranslation(
          this.#initial_translation.x,
          this.#initial_translation.y,
        )
        .setCcdEnabled(true),
    );
    const desc = ColliderDesc.ball(this.#initial_radius)
      .setDensity(this.density)
      .setRestitution(0.8);
    this.#collider = world.createCollider(desc, this.#body.handle);
  }
  removeFrom(world: World): void {
    world.removeRigidBody(this.#body);
  }
}
