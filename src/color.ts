export type ColorInit = number | string;

export function toHexColor(init: ColorInit): string {
  if (typeof init == "number") {
    return "#" + init.toString(16).padStart(6, "0");
  } else {
    return init;
  }
}
