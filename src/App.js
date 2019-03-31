import React, { Component } from "react";
import ViewWorld from "./components/ViewWorld/ViewWorld";
import CustomizeWorld from "./components/CustomizeWorld/CustomizeWorld";
import "./App.css";

class App extends Component {
  state = {
    showViewWorld: true,
  };

  toggleShowViewWorld = () => {
    this.setState({ showViewWorld: !this.state.showViewWorld });
  };

  render() {
    const { showViewWorld } = this.state;
    return (
      <div className="App">
        <h1>Virtual Ecosystem</h1>
        {showViewWorld ? <ViewWorld /> : <CustomizeWorld />}
      </div>
    );
  }
}

export default App;
