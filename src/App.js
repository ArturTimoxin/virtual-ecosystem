import React, { Component } from "react";
import World from "./World";
import Wall from "./Wall";
import Herbivore from "./Herbivore";
import Predator from "./Predator";
import Grass from "./Grass";
import "./App.css";
class App extends Component {
  state = {
    world: [
      "############################",
      "#      #    #             ##",
      "#                          #",
      "#     o          #####     #",
      "##          #   #    ##    #",
      "###            ##     #    #",
      "#           ###      #     #",
      "#   ####                   #",
      "#   ##                     #",
      "#    #          @      ### #",
      "#    #                     #",
      "############################",
    ],
  };

  componentDidMount() {
    let world = new World(this.state.world, { "#": Wall, o: Herbivore, "*": Grass, "@": Predator });
    this.setState({ world: world.getMap() });
    setInterval(() => {
      world.turn();
      this.setState({ world: world.getMap() });
    }, 300);
  }

  render() {
    const { world } = this.state;
    return (
      <div className="App">
        <div id="world">
          {world.map((string, i) => {
            return (
              <div className="string" key={i}>
                {string}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
