class Predator {
  constructor() {
    this.energy = 20;
  }

  act(context) {
    let space = context.find(" ");
    if (this.energy > 60 && space) return { type: "reproduce", direction: space };
    let animal = context.find("o");
    if (animal) return { type: "eat", direction: animal };
    if (space) return { type: "move", direction: space };
  }
}

export default Predator;
