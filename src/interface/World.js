import Grid from "./Grid";
import Vector from "./Vector";
import { actionTypes } from "./actionTypes";
import { directions } from "./RandomMove";
import View from "./View";

class World {
  constructor(plan, legend) {
    let grid = new Grid(plan[0].length, plan.length);
    this.grid = grid;
    this.legend = legend;
    plan.forEach((line, y) => {
      for (let x = 0; x < line.length; x++) grid.set(new Vector(x, y), elementFromChar(legend, line[x]));
    });
  }

  getMapInfo() {
    let dataMap = {
      output: [],
      countOfEntities: {},
    };
    for (let key in this.legend) {
      dataMap.countOfEntities[key] = 0;
    }
    for (let y = 0; y < this.grid.height; y++) {
      let tmpString = "";
      for (let x = 0; x < this.grid.width; x++) {
        let element = this.grid.get(new Vector(x, y));
        tmpString += charFromElement(element);
        if (element && element.originChar) {
          dataMap.countOfEntities[element.originChar]++;
        }
      }
      dataMap.output[y] = tmpString;
    }
    return dataMap;
  }

  /* 
    turn - метод шага, даёт существам возможность действовать
    обходит методом forEach (определенным выше) сетку и ищет объекты у которых есть метод act, 
    который он и вызывает c параметром объектом action, 
    который производит действие если оно допустимо (для тех у кого оно есть).
    Чтобы предостварить случай того что существа могут перейти на клетку которая еще 
    не обыла обработана во время вызова функции forEach необходимо хранить массив объектов (acted) существ которые уже сделали свой шаг, 
    и игнорировать их при повторном проходе, тем самым запретить одному 
    существу осущетвлять 2 действия за один вызов метода turn()
*/

  turn() {
    let acted = [];
    this.grid.forEach((critter, vector) => {
      if (critter.act && acted.indexOf(critter) === -1) {
        acted.push(critter);
        this.letAct(critter, vector);
      }
    }, this); // для правильного доступа к this в функции (в контексте World)
  }

  // letAct - вызывает функции по совершению действий передавая в них параметры,

  letAct(critter, vector) {
    let action = critter.act(new View(this, vector));
    let handled = action && action.type in actionTypes && actionTypes[action.type].call(this, critter, vector, action);
    if (!handled) {
      critter.energy -= 0.2;
      if (critter.energy <= 0) this.grid.set(vector, null);
    }
  }

  checkDestination(action, vector) {
    if (directions.hasOwnProperty(action.direction)) {
      var dest = vector.plus(directions[action.direction]);
      if (this.grid.isInside(dest)) return dest;
    }
  }
}

export function elementFromChar(legend, ch) {
  if (ch === " ") return null;
  let element = new legend[ch](); // создаётся экземпляр нужного типа, находя конструетор символа и применяя к нему new
  element.originChar = ch;
  return element;
}

export function charFromElement(element) {
  return element === null ? " " : element.originChar;
}

export default World;
