import Vector from "./Vector";

export default function Grid(width, height) {
  this.space = new Array(width * height); // одномерный массив (пространство)
  this.width = width;
  this.height = height;
}
Grid.prototype.isInside = function(vector) {
  return vector.x >= 0 && vector.x < this.width && vector.y >= 0 && vector.y < this.height; // проверка на то входит ли в границы массива запрашиваемое значение
};
Grid.prototype.get = function(vector) {
  return this.space[vector.x + this.width * vector.y]; //доступ к элементам двумерного массива который мнимо двумерный
};
Grid.prototype.set = function(vector, value) {
  this.space[vector.x + this.width * vector.y] = value; // установка значения массива
};
Grid.prototype.forEach = function(f, context) {
  for (var y = 0; y < this.height; y++) {
    for (var x = 0; x < this.width; x++) {
      var value = this.space[x + y * this.width];
      if (value != null) f.call(context, value, new Vector(x, y)); // вывываем функцию для каждого элемента сетки
    }
  }
};
