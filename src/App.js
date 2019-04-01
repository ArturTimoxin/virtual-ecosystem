import React, { Component } from "react";
import ViewWorld from "./components/ViewWorld/ViewWorld";
import CustomizeWorld from "./components/CustomizeWorld/CustomizeWorld";
import "./App.css";

/* 
  TODO: Необходимо доработать:
  1. Случайную генерацию карты с заданым количеством сущностей.
  2. Установку начального значения энергии для каждого из существ.
*/

class App extends Component {
  state = {
    showViewWorld: false,
    widthMap: 60,
    heightMap: 30,
    countHerbivores: 15,
    initialEnergyHerbivore: 20,
    countPredators: 10,
    initialEnergyPredators: 20,
    countGrass: 30,
    initialEnergyGrass: 4,
    countWalls: 5,
    turnDelay: 300,
    planMap: [],
  };

  toggleShowViewWorld = () => {
    this.setState({ showViewWorld: !this.state.showViewWorld });
  };

  setCustomizeSettingsWorld = e => {
    e.preventDefault();
    const { widthMap, heightMap, countHerbivores, countPredators, countGrass, countWalls } = this.state;
    this.createMap(widthMap, heightMap, countHerbivores, countPredators, countGrass, countWalls);
    this.toggleShowViewWorld();
  };

  setCustomMapValue = e => {
    this.setState({ [e.target.name]: Number(e.target.value) });
  };

  createMap = (widthMap, heightMap, countHerbivores, countPredators, countGrass, countWalls) => {
    let map = [];
    let countHerbivoresOnMap = 0,
      countPredatorsOnMap = 0,
      countGrassOnMap = 0,
      countWallsOnMap = 0;
    for (let y = 0; y < heightMap; y++) {
      let tmpString = "";
      if (y === 0 || y === heightMap - 1) {
        map[y] = tmpString.padEnd(widthMap, "#");
        continue;
      }
      for (let x = 0; x < widthMap; x++) {
        if (x === 0 || x === widthMap - 1) {
          tmpString += "#";
        } else {
          switch (Math.floor(Math.random() * 5)) {
            case 1: {
              if (countGrassOnMap <= countGrass - 1) {
                tmpString += "*";
                countGrassOnMap++;
              } else {
                tmpString += " ";
              }
              break;
            }
            case 2: {
              if (countHerbivoresOnMap <= countHerbivores - 1) {
                tmpString += "o";
                countHerbivoresOnMap++;
              } else {
                tmpString += " ";
              }
              break;
            }
            case 3: {
              if (countPredatorsOnMap <= countPredators - 1) {
                tmpString += "@";
                countPredatorsOnMap++;
              } else {
                tmpString += " ";
              }
              break;
            }
            case 4: {
              if (countWallsOnMap <= countWalls - 1) {
                tmpString += "#";
                countWallsOnMap++;
              } else {
                tmpString += " ";
              }
              break;
            }
            default: {
              tmpString += " ";
            }
          }
        }
      }
      map[y] = tmpString;
    }
    // TODO: Сделать проверку на соответствие количества сущностей на карте
    this.setState({ planMap: map });
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
      planMap,
    } = this.state;
    return (
      <div className="App">
        <h1>Virtual Ecosystem</h1>
        {showViewWorld ? (
          <ViewWorld toggleShowViewWorld={this.toggleShowViewWorld} planMap={planMap} />
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
