/* 
  Трава начинает со случайного уровня энергии от 3 до 7, чтобы она не
  размножалась в один ход. Когда растение достигает энергии 15, а рядом
  есть пустая клетка – она размножается в неё. Если она не может
  размножится, то просто растёт, пока не достигнет энергии 20.
*/

export default function Grass() {
  this.energy = 3 + Math.random() * 4;
}

Grass.prototype.act = function(context) {
  if (this.energy > 15) {
    let space = context.find(" ");
    if (space) return { type: "reproduce", direction: space };
  }
  if (this.energy < 20) return { type: "grow" };
};
