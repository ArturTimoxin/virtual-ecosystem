//для того чтобы изменить логику существования существ необходимо переопределить метод letAct
// чтобы не уничтожать старый используем наследование
// Новый letAct передаёт работу по совершению действий в разные функции, хранящиеся в объекте actionTypes.
import World from "./World";
import View from "./View";
import { elementFromChar } from "./World";
function LifelikeWorld(map, legend) {
  World.call(this, map, legend);
}
LifelikeWorld.prototype = Object.create(World.prototype);

let actionTypes = Object.create(null);

// Рост всегда успешен и добавляет половину единицы к энергетическому
// уровню растения.

actionTypes.grow = function(critter) {
  critter.energy += 0.5;
  return true;
};

/*
    1. Предоставляет ли действие допустимое направление (checkDestination)
    2. Если не предоставляет, или в том направлении не пустой участок или у существа не хватает энергии 
        - move возвращает false, т.о. показывая что действие не состоялось. 
    3. Если все ок, двигаем существо и возвращаем энергию.
*/

actionTypes.move = function(critter, vector, action) {
  let dest = this.checkDestination(action, vector);
  if (dest == null || critter.energy <= 1 || this.grid.get(dest) != null) return false;
  critter.energy -= 1;
  this.grid.set(vector, null);
  this.grid.set(dest, critter);
  return true;
};

// при поедании существом другого существа либо травы, соседняя клетка должна содержать энергию
// если действие подтверждается (true), тогда энергия съеденного переходит к едоку, а жертва удаляется из сетки.

actionTypes.eat = function(critter, vector, action) {
  let dest = this.checkDestination(action, vector);
  let atDest = dest != null && this.grid.get(dest);
  if (!atDest || atDest.energy == null) return false;
  critter.energy += atDest.energy;
  this.grid.set(dest, null);
  return true;
};

// размножение отнимает в 2 раза больше энергии чем есть у новорожденного.
// переменная baby - гипотетический отпрыск, с помощью которого проверяем хватает ли у его родителя энергии для его рождения
// если хватает, то ребенок перемещается на соседнюю клетку а энергия родителя тратится

actionTypes.reproduce = function(critter, vector, action) {
  let baby = elementFromChar(this.legend, critter.originChar);
  let dest = this.checkDestination(action, vector);
  if (dest == null || critter.energy <= 2 * baby.energy || this.grid.get(dest) != null) return false;
  critter.energy -= 2 * baby.energy;
  this.grid.set(dest, baby);
  return true;
};

LifelikeWorld.prototype.letAct = function(critter, vector) {
  let action = critter.act(new View(this, vector));
  let handled = action && action.type in actionTypes && actionTypes[action.type].call(this, critter, vector, action);
  if (!handled) {
    critter.energy -= 0.2;
    if (critter.energy <= 0) this.grid.set(vector, null);
  }
};
