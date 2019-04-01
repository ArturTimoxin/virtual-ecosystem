import React, { Component } from "react";
import ViewWorld from "./components/ViewWorld/ViewWorld";
import CustomizeWorld from "./components/CustomizeWorld/CustomizeWorld";
import "./App.css";

class App extends Component {
  state = {
    showViewWorld: false,
    widthMap: 20,
    heightMap: 20,
    countHerbivores: 15,
    initialEnergyHerbivore: 20,
    countPredators: 10,
    initialEnergyPredators: 20,
    countGrass: 30,
    initialEnergyGrass: 4,
    countWalls: 5,
    turnDelay: 300,
  };

  toggleShowViewWorld = () => {
    this.setState({ showViewWorld: !this.state.showViewWorld });
  };

  setCustomizeSettingsWorld = e => {
    e.preventDefault();
    console.log(this.state);
    this.toggleShowViewWorld();
  };

  setCustomMapValue = e => {
    this.setState({ [e.target.name]: Number(e.target.value) });
  };

  render() {
    const {
      showViewWorld,
      widthMap,
      heightMap,
      countHerbivores,
      initialEnergyHerbivore,
      countPredators,
      initialEnergyPredators,
      countGrass,
      initialEnergyGrass,
      countWalls,
      turnDelay,
    } = this.state;
    return (
      <div className="App">
        <h1>Virtual Ecosystem</h1>
        {showViewWorld ? (
          <ViewWorld toggleShowViewWorld={this.toggleShowViewWorld} />
        ) : (
          <CustomizeWorld
            setCustomizeSettingsWorld={this.setCustomizeSettingsWorld}
            setCustomMapValue={this.setCustomMapValue}
            widthMap={widthMap}
            heightMap={heightMap}
            countHerbivores={countHerbivores}
            initialEnergyHerbivore={initialEnergyHerbivore}
            countPredators={countPredators}
            initialEnergyPredators={initialEnergyPredators}
            countGrass={countGrass}
            initialEnergyGrass={initialEnergyGrass}
            countWalls={countWalls}
            turnDelay={turnDelay}
          />
        )}
      </div>
    );
  }
}

export default App;
