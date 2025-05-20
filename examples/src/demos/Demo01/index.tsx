import React from "react";
import * as csm from "./index.module.css";
import { SnapAxis } from "../../../../src/index";

function randomRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const tickValues = [0, 600, 300];

for (let i = 0; i < 30; i++) {
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

export function Demo01() {
  const [value, setValue] = React.useState(0);
  const [disableSnap, setDisableSnap] = React.useState(false);

  const handleMouseDown = (e) => {
    const updater = snapAxis.getSnapUpdater(value, e.clientX, {
      distance: 5,
      disableSnap,
    });

    const handleMouseMove = (e) => {
      const result = updater(e.clientX);
      const newValue = Math.max(0, Math.min(TickWidth, result.value));
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

  const isSnapped = snapAxis.checkSnapped(value);
  const snappedValues = snapAxis.getSnappedValues(value); // 吸附对齐后的刻度值

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
        className={csm.dragLine}
        style={{ left: value, backgroundColor: isSnapped ? "red" : "" }}
      >
        <div className={csm.dragHandle} onMouseDown={handleMouseDown}></div>
      </div>
    </div>
  );
}
