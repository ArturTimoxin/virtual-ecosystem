export default function Herbivore() {
  this.energy = 20;
}

Herbivore.prototype.act = function(context) {
  var space = context.find(" ");
  if (this.energy > 60 && space) return { type: "reproduce", direction: space };
  var plant = context.find("*");
  if (plant) return { type: "eat", direction: plant };
  if (space) return { type: "move", direction: space };
};
