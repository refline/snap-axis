import React from "react";
import * as csm from "./index.module.css";
import { SnapAxis } from "../../../../src/index";

function randomRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const CanvasWidth = 600;
const CanvasHeight = 300;

const points = [];

const pointCount = randomRange(10, 50);

for (let i = 0; i < pointCount; i++) {
  points.push({
    id: `point_${i}`,
    x: randomRange(0, CanvasWidth),
    y: randomRange(0, CanvasHeight),
  });
}

const axisX = [];
const axisY = [];

for (let i = 0; i < points.length; i++) {
  const point = points[i];

  axisX.push({
    id: `${point.id}_x`,
    value: point.x,
  });
  axisY.push({
    id: `${point.id}_y`,
    value: point.y,
  });
}

const snapAxisX = new SnapAxis({
  snapValues: axisX,
});
const snapAxisY = new SnapAxis({
  snapValues: axisY,
});
const snapUpdaterX = snapAxisX.getSnapUpdater(0, 0, {
  distance: 5,
  disableSnap: false,
});
const snapUpdaterY = snapAxisY.getSnapUpdater(0, 0, {
  distance: 5,
  disableSnap: false,
});

function isCloseEqual(a: number, b: number, tolerance = 1e-9) {
  const diff = Math.abs(a - b);

  return diff <= tolerance;
}

export function Demo04() {
  const nodeRef = React.useRef(null);
  const [position, setPosition] = React.useState({ x: 300, y: 150 });
  const [disableSnap, setDisableSnap] = React.useState(false);

  const browserToViewport = (x, y) => {
    const node = nodeRef.current;
    return { x: x - node.getBoundingClientRect().left, y: y - node.getBoundingClientRect().top };
  };

  const handleMouseMove = (e) => {
    const point = browserToViewport(e.clientX, e.clientY);

    let newMovePoint: {
      x: number;
      y: number;
    } = null;

    const pp = newMovePoint || point;

    // 水平、垂直方向吸附优先级高
    const res1 = snapUpdaterX(pp.x, {
      disableSnap,
    });
    const res2 = snapUpdaterY(pp.y, {
      disableSnap,
    });

    pp.x = res1.value;
    pp.y = res2.value;

    setPosition(pp);
  };

  const snappedX = snapAxisX.getSnappedValues(position.x) || [];
  const snappedY = snapAxisY.getSnappedValues(position.y) || [];

  return (
    <div
      className={csm.container}
      style={{ width: CanvasWidth, height: CanvasHeight }}
      ref={nodeRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        document.body.style.cursor = "none";
      }}
      onMouseLeave={() => {
        document.body.style.cursor = "";
      }}
    >
      {snappedX.length || snappedY.length ? (
        <div className={csm.snappedLabel}>
          <div>Snapped Values:</div>
          {[...snappedX, ...snappedY].map((item) => {
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

      <svg width={CanvasWidth} height={CanvasHeight}>
        {points.map((item, idx) => {
          const snapped = isCloseEqual(position.x, item.x) || isCloseEqual(position.y, item.y);
          let fillColor = snapped ? "blue" : "red";

          if (isCloseEqual(position.x, item.x) && isCloseEqual(position.y, item.y)) {
            fillColor = "green";
          }

          return <circle key={idx} cx={item.x} cy={item.y} r="3" fill={fillColor}></circle>;
        })}
        <rect
          x={position.x - 5}
          y={position.y - 5}
          width={10}
          height={10}
          fill="#00000000"
          stroke={"#0000ff"}
          strokeWidth={1}
        ></rect>
        <line
          x1={0}
          y1={position.y}
          x2={position.x - 5}
          y2={position.y}
          stroke={"#0000ff"}
          strokeWidth={1}
        ></line>
        <line
          x1={position.x + 5}
          y1={position.y}
          x2={CanvasWidth}
          y2={position.y}
          stroke={"#0000ff"}
          strokeWidth={1}
        ></line>
        <line
          x1={position.x}
          y1={0}
          x2={position.x}
          y2={position.y - 5}
          stroke={"#0000ff"}
          strokeWidth={1}
        ></line>
        <line
          x1={position.x}
          y1={position.y + 5}
          x2={position.x}
          y2={CanvasHeight}
          stroke={"#0000ff"}
          strokeWidth={1}
        ></line>
      </svg>
    </div>
  );
}
