import React, { Component } from "react";
import ViewWorld from "./components/ViewWorld/ViewWorld";
import WorldSettings from "./components/WorldSettings/WorldSettings";
import { largePlan, mediumPlan, smallPlan } from "./startPlanesWorld";
import "./App.css";

class App extends Component {
  state = {
    showViewWorld: false,
    turnDelay: 300,
    sizeWorld: mediumPlan,
  };

  toggleShowViewWorld = () => {
    this.setState({ showViewWorld: !this.state.showViewWorld });
  };

  setValue = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  changeSizeWorld = e => {
    console.log(e.target.value);
    switch (e.target.value) {
      case "largePlan": {
        this.setState({ sizeWorld: largePlan });
        break;
      }
      case "mediumPlan": {
        this.setState({ sizeWorld: mediumPlan });
        break;
      }
      case "smallPlan": {
        this.setState({ sizeWorld: smallPlan });
        break;
      }
      default: {
        return;
      }
    }
  };

  render() {
    const { showViewWorld, turnDelay, sizeWorld } = this.state;
    return (
      <div className="App">
        <h1>Virtual Ecosystem</h1>
        {showViewWorld ? (
          <ViewWorld toggleShowViewWorld={this.toggleShowViewWorld} turnDelay={turnDelay} sizeWorld={sizeWorld} />
        ) : (
          <WorldSettings
            toggleShowViewWorld={this.toggleShowViewWorld}
            setValue={this.setValue}
            changeSizeWorld={this.changeSizeWorld}
            defaultTurnDelay={turnDelay}
            defaultSizeWorld={sizeWorld}
          />
        )}
      </div>
    );
  }
}

export default App;
