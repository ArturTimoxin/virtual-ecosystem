/* 
    World объект принимает массив строк, представляющих собой сетку мира
    и объект legend  - сообзает что значит каждый из 
    сиволов карты (он содержит конструктор для всех сиволов кроме пробела) 
*/

import Grid from "./Grid";
import Vector from "./Vector";
import { directions } from "./RandomMove";
import View from "./View";
// создаётся экземпляр нужного типа, находя конструетор сивола и применяя к нему new
export function elementFromChar(legend, ch) {
  if (ch === " ") return null;
  let element = new legend[ch]();
  element.originChar = ch; //  свойство originChar - из какого символа элемент был создан изначально.
  return element;
}

// превразает в пустую строку если

export function charFromElement(element) {
  //   if (element == null) return " ";
  //   else return element.originChar;
  return element === null ? "  " : element.originChar;
}

export default function World(plan, legend) {
  let grid = new Grid(plan[0].length, plan.length);
  this.grid = grid;
  this.legend = legend;
  plan.forEach((line, y) => {
    for (let x = 0; x < line.length; x++) grid.set(new Vector(x, y), elementFromChar(legend, line[x]));
  });
}
// строим сетку мира
World.prototype.getMap = function() {
  let output = [];
  for (let y = 0; y < this.grid.height; y++) {
    let tmpString = "";
    for (let x = 0; x < this.grid.width; x++) {
      let element = this.grid.get(new Vector(x, y));
      tmpString += charFromElement(element);
    }
    output[y] = tmpString;
  }
  return output; // возвращает строку мира
};

/* 
    turn -метод шага, даёт существам возможность действовать
    обходит методом forEach (определенным выше) сетку и ищет объекты у которых есть метод act, 
    который он и вызывает c параметром объектом action, 
    который производит действие если оно допустимо (для тех у кого оно есть).
    Чтобы предостварить случай того что существа могут перейти на клетку которая еще 
    не обыла обработана во время вызова функции forEach, т.о дадим им возможность сдвинуться еще раз.
    Таким образом необходимо хранить массив объектов (acted) существ которые уже сделали свой шаг, 
    и игнорировать их при повторном проходе. 
*/

World.prototype.turn = function() {
  let acted = [];
  this.grid.forEach((critter, vector) => {
    if (critter.act && acted.indexOf(critter) === -1) {
      acted.push(critter);
      this.letAct(critter, vector);
    }
  }, this); // this - для правильного доступа к this во время внутренней функии
};

// letAct - логика движения существ
/* 
    Если тип действия не “move”, оно игнорируется. Если “move”, и если у него
    есть свойство direction, ссылающееся на допустимое направление, и если
    клетка в этом направлении пустует (null), мы назначаем клетке, где только
    что было существо, null, и сохраняем существо в клетке назначения.
*/

World.prototype.letAct = function(critter, vector) {
  // просим существо действовать с объектом view который  знает про мир и потожение существа в мире
  // метод act возвращает какое либо действие
  // console.log(this);
  // this сейчас это объект мира, в котором производятся действия
  let action = critter.act(new View(this, vector)); // TODO: Here is problem

  if (action && action.type === "move") {
    let dest = this.checkDestination(action, vector);
    if (dest && this.grid.get(dest) === null) {
      this.grid.set(vector, null);
      this.grid.set(dest, critter);
    }
  }
};

World.prototype.checkDestination = function(action, vector) {
  if (directions.hasOwnProperty(action.direction)) {
    let dest = vector.plus(directions[action.direction]);
    if (this.grid.isInside(dest)) return dest;
  }
};
