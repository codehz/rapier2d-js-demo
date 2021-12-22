import type { Vector } from "./loader.ts";
import Emitter from "./emitter.ts";

export const canvas = document.querySelector("canvas")!;
export const ctx = canvas.getContext("2d", {
  alpha: false,
  desynchronized: true,
  colorSpace: "srgb",
  willReadFrequently: false,
})!;
export function withContext(cb: (ctx: CanvasRenderingContext2D) => void) {
  ctx.save();
  cb(ctx);
  ctx.restore();
}
export class Camera extends Emitter<{ click: Vector }> {
  #origin: Vector = { x: 0, y: 0 };
  #size: number = 30;
  #matrix: DOMMatrix = new DOMMatrix();
  get origin() {
    return this.#origin;
  }
  set origin(value: Vector) {
    this.#origin = value;
    this.#recalc();
  }
  get size() {
    return this.#size;
  }
  set size(value: number) {
    this.#size = value;
    this.#recalc();
  }
  #recalc() {
    const scale = Math.min(canvas.width, canvas.height) / this.#size;
    const matrix = new DOMMatrix();
    // move to center
    matrix.translateSelf(canvas.width / 2, canvas.height / 2);
    // scale to fit canvas
    matrix.scaleSelf(scale, scale);
    // move the origin
    matrix.translateSelf(-this.#origin.x, -this.#origin.y);
    this.#matrix = matrix;
  }
  #fit = () => {
    canvas.width = canvas.clientWidth * devicePixelRatio;
    canvas.height = canvas.clientHeight * devicePixelRatio;
    this.#recalc();
  };
  #click = ({ x, y }: MouseEvent) => {
    const pos = this.#matrix.inverse().transformPoint({
      x: x * devicePixelRatio,
      y: y * devicePixelRatio,
    });
    this.emit("click", pos);
  };
  apply() {
    ctx.resetTransform();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(this.#matrix);
  }
  start() {
    window.addEventListener("resize", this.#fit);
    this.#fit();
    canvas.addEventListener("click", this.#click);
  }
  stop() {
    window.removeEventListener("resize", this.#fit);
  }
}
