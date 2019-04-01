import React from "react";
import { largePlan, mediumPlan, smallPlan } from "../../startPlanesWorld";

export default function WorldSettings(props) {
  return (
    <div className="customizeWorld">
      <h2>World settings</h2>
      <div className="form-group">
        <label htmlFor="turnDelay">Turn Delay (in milliseconds):</label>
        <input
          type="number"
          min="50"
          id="turnDelay"
          className="form-control"
          name="turnDelay"
          defaultValue={props.defaultTurnDelay}
          placeholder="Enter a world change delay"
          onChange={props.setValue}
        />
      </div>
      <div className="wrapperMapSizeSetting">
        <div>Choose the size of the world: </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="sizeWorld"
            id="largeWorld"
            value="largePlan"
            onChange={props.changeSizeWorld}
            defaultChecked={props.defaultSizeWorld === largePlan ? "checked" : ""}
          />
          <label className="form-check-label" htmlFor="inlineRadio1">
            Large
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="sizeWorld"
            id="mediumWorld"
            value="mediumPlan"
            onChange={props.changeSizeWorld}
            defaultChecked={props.defaultSizeWorld === mediumPlan ? "checked" : ""}
          />
          <label className="form-check-label" htmlFor="inlineRadio2">
            Medium
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="sizeWorld"
            id="smallWorld"
            value="smallPlan"
            onChange={props.changeSizeWorld}
            defaultChecked={props.defaultSizeWorld === smallPlan ? "checked" : ""}
          />
          <label className="form-check-label" htmlFor="inlineRadio3">
            Small
          </label>
        </div>
      </div>
      <button className="btn btn-primary" onClick={props.toggleShowViewWorld}>
        Create World
      </button>
    </div>
  );
}
