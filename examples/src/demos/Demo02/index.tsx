import React from "react";
import * as csm from "./index.module.css";
import { SnapAxis } from "../../../../src/index";

function randomRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const tickValues = [0, 600, 300];

for (let i = 0; i < 10; i++) {
  tickValues.push(randomRange(0, 600));
}

tickValues.sort();

const snapAxis = new SnapAxis({
  snapValues: tickValues.map((value, idx) => {
    return {
      id: `snap_${idx}`,
      value: value,
    };
  }),
});

const TickWidth = 600;
const BoxWidth = 70;

function Tick({ width, values }) {
  return (
    <div
      style={{
        width: width,
      }}
      className={csm.tick}
    >
      {values.map((value, index) => (
        <div
          key={index}
          className={csm.tickItem}
          style={{
            left: value,
          }}
        ></div>
      ))}
    </div>
  );
}

// 获取拖动box吸附组：左/中/右
function getSnapGroup(value) {
  return [value, value + BoxWidth / 2, value + BoxWidth];
}

export function Demo02() {
  const [value, setValue] = React.useState(0);
  const [disableSnap, setDisableSnap] = React.useState(false);

  const handleMouseDown = (e) => {
    const snapGroup = getSnapGroup(value);
    const updater = snapAxis.getSnapGroupUpdater(snapGroup, e.clientX, {
      distance: 5,
      disableSnap,
    });

    const handleMouseMove = (e) => {
      const result = updater(e.clientX);
      const values = result.values;
      const newValue = Math.max(0, Math.min(TickWidth, values[0]));
      setValue(newValue);
    };

    document.body.style.cursor = "move";

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  let isSnapped = false;
  let snappedValues = [];

  const snapGroup = getSnapGroup(value);
  for (let i = 0; i < snapGroup.length; i++) {
    const v = snapGroup[i];
    const result = snapAxis.checkSnapped(v);
    if (result) {
      isSnapped = true;
      snappedValues = snapAxis.getSnappedValues(v);
      break;
    }
  }

  return (
    <div className={csm.container} style={{ width: TickWidth }}>
      {isSnapped ? (
        <div className={csm.snappedLabel}>
          <div>Snapped Values:</div>
          {snappedValues.map((item) => {
            return (
              <div key={item.id}>
                id={item.id}, value={item.value}
              </div>
            );
          })}
        </div>
      ) : null}
      <div className={csm.setting}>
        <label>
          禁用吸附：
          <input
            type="checkbox"
            checked={disableSnap}
            onChange={(e) => {
              setDisableSnap(e.target.checked);
            }}
          ></input>
        </label>
      </div>

      <div className={csm.tickWarp}>
        <Tick width={TickWidth} values={tickValues}></Tick>
      </div>
      <div
        className={csm.dragBox}
        onMouseDown={handleMouseDown}
        style={{ width: BoxWidth, left: value, backgroundColor: isSnapped ? "red" : "" }}
      ></div>
    </div>
  );
}
