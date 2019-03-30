export default function Predator() {
  this.energy = 20;
}

Predator.prototype.act = function(context) {
  let space = context.find(" ");
  if (this.energy > 60 && space) return { type: "reproduce", direction: space };
  let animal = context.find("o");
  if (animal) return { type: "eat", direction: animal };
  if (space) return { type: "move", direction: space };
};
