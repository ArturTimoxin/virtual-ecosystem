import React from "react";

export default function CustomizeWorld(props) {
  const {
    setCustomizeSettingsWorld,
    setCustomMapValue,
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
  } = props;
  return (
    <div className="customizeWorld">
      <h2>World customization settings</h2>
      <form onSubmit={setCustomizeSettingsWorld}>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="widthMap">Width Map</label>
              <input
                type="number"
                min="15"
                defaultValue={widthMap}
                id="widthMap"
                className="form-control"
                name="widthMap"
                placeholder="Enter size width"
                onChange={setCustomMapValue}
              />
              <small className="form-text text-muted">Width must be greater or equal 15</small>
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label htmlFor="heightMap">Height Map</label>
              <input
                type="number"
                min="15"
                defaultValue={heightMap}
                id="heightMap"
                className="form-control"
                name="heightMap"
                placeholder="Enter size height"
                onChange={setCustomMapValue}
              />
              <small className="form-text text-muted">Height must be greater or equal 15</small>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="countHerbivores">Count Herbivores</label>
            <input
              type="number"
              id="countHerbivores"
              className="form-control"
              name="countHerbivores"
              defaultValue={countHerbivores}
              onChange={setCustomMapValue}
            />
            <small className="form-text text-muted">Initial count of herbivores on the map</small>
          </div>
          <div className="col">
            <label htmlFor="initialEnergyHerbivore">Initial Herbivore energy</label>
            <input
              type="number"
              min="10"
              id="initialEnergyHerbivore"
              className="form-control"
              name="initialEnergyHerbivore"
              defaultValue={initialEnergyHerbivore}
              onChange={setCustomMapValue}
            />
            <small className="form-text text-muted">
              Minimal initial energy of Herbivore must be greater or equal 10
            </small>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label htmlFor="countPredators">Count Predators</label>
            <input
              type="number"
              id="countPredators"
              className="form-control"
              defaultValue={countPredators}
              name="countPredators"
              onChange={setCustomMapValue}
            />
            <small className="form-text text-muted">Initial count of Predators on the map</small>
          </div>
          <div className="col">
            <label htmlFor="initialEnergyPredators">Initial Predator energy</label>
            <input
              type="number"
              min="10"
              id="initialEnergyPredators"
              className="form-control"
              name="initialEnergyPredators"
              defaultValue={initialEnergyPredators}
              onChange={setCustomMapValue}
            />
            <small className="form-text text-muted">
              Minimal initial energy of Predator must be greater or equal 10
            </small>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label htmlFor="countGrass">Count Grass</label>
            <input
              type="number"
              id="countGrass"
              className="form-control"
              name="countGrass"
              defaultValue={countGrass}
              onChange={setCustomMapValue}
            />
            <small className="form-text text-muted">Initial count of Grass on the map</small>
          </div>
          <div className="col">
            <label htmlFor="initialEnergyGrass">Initial Grass energy</label>
            <input
              type="number"
              min="3"
              id="initialEnergyGrass"
              className="form-control"
              name="initialEnergyGrass"
              defaultValue={initialEnergyGrass}
              onChange={setCustomMapValue}
            />
            <small className="form-text text-muted">
              Minimal initial energy of Predator must be greater or equal 3
            </small>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label htmlFor="countWalls">Count Walls</label>
            <input
              type="number"
              id="countWalls"
              className="form-control"
              name="countWalls"
              defaultValue={countWalls}
              onChange={setCustomMapValue}
            />
            <small className="form-text text-muted">Count of Walls on the map</small>
          </div>
          <div className="col">
            <div className="form-group">
              <label htmlFor="turnDelay">Turn Delay (in milliseconds):</label>
              <input
                type="number"
                min="50"
                id="turnDelay"
                className="form-control"
                name="turnDelay"
                defaultValue={turnDelay}
                placeholder="Enter a world change delay"
                onChange={setCustomMapValue}
              />
              <small className="form-text text-muted">Time turn delay must be greater or equal 50 miliseconds</small>
            </div>
          </div>
        </div>
        <input className="btn btn-primary" type="submit" value="Create World" />
      </form>
    </div>
  );
}
