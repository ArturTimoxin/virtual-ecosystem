import { directions, randomElement } from "./RandomMove";
import { charFromElement } from "./World"; // AAAAAAAAAAAAAAAAAAAA
export default function View(world, vector) {
  this.world = world;
  this.vector = vector;
}
// look - вычисляем координаты на которые мы пытаемся посмотреть
// если находимя внутри сетки то получаем символ соответсвующий элементу находящемуся там
// для координат снаружи сетки, говорим что там стена т.к. без окружающих стен существа не смогут сойти с края
View.prototype.look = function(dir) {
  // console.log(this.vector);
  // console.log(dir);
  // console.log(this.vector.plus(directions[dir]));
  let target = this.vector.plus(directions[dir]);
  // console.log(this.world.grid.get(target)); // TODO: ??? Some problem
  // console.log(charFromElement(this.world));
  if (this.world.grid.isInside(target)) {
    return charFromElement(this.world.grid.get(target));
  } else {
    return "#";
  }
};
View.prototype.findAll = function(ch) {
  var found = [];
  for (var dir in directions) if (this.look(dir) === ch) found.push(dir);
  return found;
};
View.prototype.find = function(ch) {
  var found = this.findAll(ch);
  if (found.length === 0) return null;
  return randomElement(found);
};
