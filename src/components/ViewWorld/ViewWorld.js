import React, { Component } from "react";
import World from "../../interface/World";
import Wall from "../../interface/entities/Wall";
import Herbivore from "../../interface/entities/Herbivore";
import Predator from "../../interface/entities/Predator";
import Grass from "../../interface/entities/Grass";
import { mediumPlan } from "../../startPlanesWorld";
class ViewWorld extends Component {
  state = {
    world: [],
    worldObj: {},
    titleStartBtn: "Start",
    infoWorld: {},
  };

  componentDidMount() {
    this.createWorld();
  }

  createWorld = () => {
    let world = new World(mediumPlan, { "#": Wall, o: Herbivore, "*": Grass, "@": Predator });
    this.setState({ worldObj: world, world: world.getMapInfo().output, infoWorld: world.getMapInfo().countOfEntities });
  };

  restartWorld = () => {
    clearInterval(this.state.timerId);
    this.createWorld();
    this.setState({ titleStartBtn: "Start" });
  };

  startStopBtn = () => {
    if (this.state.titleStartBtn === "Pause") {
      clearInterval(this.state.timerId);
      this.setState({ titleStartBtn: "Continue" });
    } else {
      let timerId = setInterval(() => {
        this.state.worldObj.turn();
        this.setState({
          world: this.state.worldObj.getMapInfo().output,
          infoWorld: this.state.worldObj.getMapInfo().countOfEntities,
        });
      }, 300);
      this.setState({ timerId: timerId, titleStartBtn: "Pause" });
    }
  };

  nextStep = () => {
    this.state.worldObj.turn();
    this.setState({
      world: this.state.worldObj.getMapInfo().output,
      infoWorld: this.state.worldObj.getMapInfo().countOfEntities,
    });
  };

  render() {
    const { world, titleStartBtn, infoWorld } = this.state;
    return (
      <div className="viewWorld">
        <div className="wrapperButtons">
          <button id="btnStart-Pause" onClick={this.startStopBtn}>
            {titleStartBtn}
          </button>
          <button id="btnNextStep" onClick={this.nextStep}>
            Next Step
          </button>
          <button id="btnRestart" onClick={this.restartWorld}>
            Restart
          </button>
        </div>
        <div className="wrapperInfoWorld">
          <div className="columnInfoWorld">
            <div className="infoCount">{`Grass (*): ${infoWorld["*"]}`}</div>
            <div className="infoCount">{`Herbivores (o): ${infoWorld["o"]}`}</div>
          </div>
          <div className="columnInfoWorld">
            <div className="infoCount">{`Predators (@): ${infoWorld["@"]}`}</div>
            <div className="infoCount">{`Walls (#): ${infoWorld["#"]}`}</div>
          </div>
        </div>
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

export default ViewWorld;
