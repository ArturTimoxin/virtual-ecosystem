import React, { Component } from "react";
import LifeLikeWorld from "./World";
import Wall from "./Wall";
// import RandomMove from "./RandomMove";
import Herbivore from "./Herbivore";
import Grass from "./Grass";
import { plan1 } from "./startPlans";
import "./App.css";
class App extends Component {
  state = {
    world: [],
  };

  componentDidMount() {
    let world = new LifeLikeWorld(plan1, { "#": Wall, o: Herbivore, "*": Grass });
    this.setState({ world: world.getMap() });
    world.turn();
    // setInterval(() => {
    //   world.turn();
    //   this.setState({ world: world.getMap() });
    // }, 1000);
  }

  render() {
    const { world } = this.state;
    return (
      <div className="App">
        <div className="world">
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
