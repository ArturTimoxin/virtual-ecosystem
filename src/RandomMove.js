import Vector from "./Vector";

export const directions = {
  // возможныне направления существа (одна клетка вокруг него)
  n: new Vector(0, -1),
  ne: new Vector(1, -1),
  e: new Vector(1, 0),
  se: new Vector(1, 1),
  s: new Vector(0, 1),
  sw: new Vector(-1, 1),
  w: new Vector(-1, 0),
  nw: new Vector(-1, -1),
};

export function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export default function RandomMove() {
  // возвращает массив свойств объекта, из которых выбирается случайный (случайное направление)
  this.direction = randomElement(Object.keys(directions));
}
