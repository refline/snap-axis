import React from "react";
import * as csm from "./index.module.css";
import { SnapAxis } from "../../../../src/index";
import { Matrix2D } from "matrix2d.js";

const lines = [
  [
    { x: 200, y: 50 },
    {
      x: 350,
      y: 50,
    },
  ],
  [
    { x: 30, y: 50 },
    {
      x: 170,
      y: 180,
    },
  ],
  [
    { x: 400, y: 180 },
    {
      x: 500,
      y: 50,
    },
  ],
];

const lineSnapAxis: {
  matrix: Matrix2D;
  snapAxis: SnapAxis;
  updater: ReturnType<SnapAxis["getSnapUpdater"]>;
  distance: number;
}[] = [];

const axisX = [];
const axisY = [];

let idx = 1;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  const mat1 = new Matrix2D();
  const [start, end] = line;

  axisX.push({
    id: `axis_${idx++}`,
    value: start.x,
  });
  axisY.push({
    id: `axis_${idx++}`,
    value: start.y,
  });
  axisX.push({
    id: `axis_${idx++}`,
    value: end.x,
  });
  axisY.push({
    id: `axis_${idx++}`,
    value: end.y,
  });

  const v1 = [end.x - start.x, end.y - start.y];
  // 基于v1计算旋转角度
  const angle = Math.atan2(v1[1], v1[0]);
  const m1 = [
    Math.cos(angle),
    Math.sin(angle),
    -Math.sin(angle),
    Math.cos(angle),
    start.x,
    start.y,
  ] as any;
  mat1.appendMatrix(m1);

  const snapAxis = new SnapAxis({
    snapValues: [
      {
        id: `snap_0`,
        value: 0,
      },
    ],
  });

  lineSnapAxis.push({
    // 线段长度
    distance: Math.sqrt(v1[0] ** 2 + v1[1] ** 2),
    matrix: mat1,
    snapAxis,
    updater: snapAxis.getSnapUpdater(0, 0, {
      // 吸附范围
      distance: 10,
    }),
  });
}

const snapAxisX = new SnapAxis({
  snapValues: axisX,
});
const snapAxisY = new SnapAxis({
  snapValues: axisY,
});
const snapUpdaterX = snapAxisX.getSnapUpdater(0, 0, {
  distance: 10,
  disableSnap: false,
});
const snapUpdaterY = snapAxisY.getSnapUpdater(0, 0, {
  distance: 10,
  disableSnap: false,
});

function drawLine(line) {
  const [start, end] = line;
  return <line x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke="black" strokeWidth="2" />;
}

function isCloseEqual(a: number, b: number, tolerance = 1e-9) {
  const diff = Math.abs(a - b);

  return diff <= tolerance;
}

const CanvasWidth = 600;
const CanvasHeight = 200;

export function Demo03() {
  const nodeRef = React.useRef(null);
  const [movePoint, setMovePoint] = React.useState({ x: 0, y: 0 });
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

    // 线段吸附
    for (let i = 0; i < lineSnapAxis.length; i++) {
      const { matrix, updater, snapAxis, distance } = lineSnapAxis[i];
      const local = matrix.clone().invert().transformPoint(point);
      const res = updater(local.y, {
        disableSnap,
      });

      if (local.x > distance || local.x < 0) {
        continue;
      }

      if (snapAxis.checkSnapped(res.value)) {
        const p = matrix.transformPoint(local.x, res.value);
        newMovePoint = p;
        break;
      }

      const p = matrix.transformPoint(local.x, res.value);
      newMovePoint = {
        x: p.x,
        y: p.y,
      };

      if (res.snapped) {
        break;
      }
    }

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

    setMovePoint(pp);
  };

  return (
    <div
      className={csm.container}
      style={{ width: CanvasWidth, height: CanvasHeight }}
      ref={nodeRef}
      onMouseMove={handleMouseMove}
    >
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
        {lines.map((line, index) => {
          return (
            <g key={index}>
              {drawLine(line)}
              {line.map((item, idx) => {
                const snapped =
                  isCloseEqual(movePoint.x, item.x) || isCloseEqual(movePoint.y, item.y);

                return (
                  <circle
                    key={idx}
                    cx={item.x}
                    cy={item.y}
                    r="5"
                    fill={snapped ? "#0000ff78" : "red"}
                  ></circle>
                );
              })}
            </g>
          );
        })}
        <circle cx={movePoint.x} cy={movePoint.y} r="5" fill="blue"></circle>
      </svg>
    </div>
  );
}
