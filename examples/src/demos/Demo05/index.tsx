import React from "react";
import * as csm from "./index.module.css";
import { SnapAxis } from "../../../../src/index";

function randomRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getAxisXFromRect(rect) {
  return [
    {
      rectId: rect.id,
      id: `${rect.id}_x1`,
      value: rect.x,
    },
    {
      rectId: rect.id,
      id: `${rect.id}_x2`,
      value: rect.x + rect.width / 2,
    },
    {
      rectId: rect.id,
      id: `${rect.id}_x3`,
      value: rect.x + rect.width,
    },
  ];
}

function getAxisYFromRect(rect) {
  return [
    {
      rectId: rect.id,
      id: `${rect.id}_y1`,
      value: rect.y,
    },
    {
      rectId: rect.id,
      id: `${rect.id}_y2`,
      value: rect.y + rect.height / 2,
    },
    {
      rectId: rect.id,
      id: `${rect.id}_y3`,
      value: rect.y + rect.height,
    },
  ];
}

const CanvasWidth = 600;
const CanvasHeight = 300;

const rects = [];
const rectIdMap = {};

const rectCount = randomRange(5, 10);

for (let i = 0; i < rectCount; i++) {
  const rectWidth = randomRange(40, 100);
  const rectHeight = randomRange(30, 80);

  const rect = {
    id: `rect_${i}`,
    x: randomRange(0, CanvasWidth - rectWidth),
    y: randomRange(0, CanvasHeight - rectHeight),
    width: rectWidth,
    height: rectHeight,
  };

  rects.push(rect);
  rectIdMap[rect.id] = rect;
}

export function Demo05() {
  const [_, setForceUpdate] = React.useState(0);
  const nodeRef = React.useRef(null);
  const [disableSnap, setDisableSnap] = React.useState(false);
  const [currentRect, setCurrentRect] = React.useState(null);

  // 实现矩形拖动
  const handleMouseDown = (e, currentRect) => {
    setCurrentRect(currentRect);

    const axisX = [];
    const axisY = [];

    for (let i = 0; i < rects.length; i++) {
      const rect = rects[i];

      if (rect.id === currentRect.id) {
        continue;
      }

      axisX.push(...getAxisXFromRect(rect));
      axisY.push(...getAxisYFromRect(rect));
    }

    const snapAxisX = new SnapAxis({
      snapValues: axisX,
    });
    const snapAxisY = new SnapAxis({
      snapValues: axisY,
    });

    const snapUpdaterX = snapAxisX.getSnapGroupUpdater(
      getAxisXFromRect(currentRect).map((item) => item.value),
      e.clientX,
      {
        distance: 5,
        disableSnap,
      }
    );
    const snapUpdaterY = snapAxisY.getSnapGroupUpdater(
      getAxisYFromRect(currentRect).map((item) => item.value),
      e.clientY,
      {
        distance: 5,
        disableSnap,
      }
    );

    const handleMouseMove = (e) => {
      const res1 = snapUpdaterX(e.clientX);
      const res2 = snapUpdaterY(e.clientY);

      currentRect.x = res1.values[0];
      currentRect.y = res2.values[0];

      setForceUpdate((prev) => prev + 1);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      setCurrentRect(null);
    };

    document.body.style.cursor = "move";

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className={csm.container}
      style={{ width: CanvasWidth, height: CanvasHeight }}
      ref={nodeRef}
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
      {rects.map((rect) => {
        return (
          <div
            key={rect.id}
            className={csm.rect}
            style={{
              left: rect.x,
              top: rect.y,
              width: rect.width,
              height: rect.height,
              backgroundColor: currentRect?.id === rect.id ? "#cccccc" : "",
            }}
            onMouseDown={(e) => {
              handleMouseDown(e, rect);
            }}
          >
            {rect.id}
          </div>
        );
      })}
      <RenderRefLines currentRect={currentRect} />
    </div>
  );
}

function RenderRefLines({ currentRect }) {
  if (!currentRect) {
    return null;
  }

  const axisX = [];
  const axisY = [];

  for (let i = 0; i < rects.length; i++) {
    const rect = rects[i];

    axisX.push(...getAxisXFromRect(rect));
    axisY.push(...getAxisYFromRect(rect));
  }

  const snapAxisX = new SnapAxis({
    snapValues: axisX,
  });
  const snapAxisY = new SnapAxis({
    snapValues: axisY,
  });

  const cAxisX = getAxisXFromRect(currentRect);
  const cAxisY = getAxisYFromRect(currentRect);

  const xLines = [];
  for (let i = 0; i < cAxisX.length; i++) {
    const item = cAxisX[i];
    const res = snapAxisX.getSnappedValues(item.value);

    if (res.length <= 1) {
      continue;
    }

    const yAxis = [];
    for (let j = 0; j < res.length; j++) {
      const rect = rectIdMap[res[j].rectId];

      yAxis.push(...getAxisYFromRect(rect).map((item) => item.value));
    }

    xLines.push([
      {
        x: item.value,
        y: Math.min(...yAxis),
      },
      {
        x: item.value,
        y: Math.max(...yAxis),
      },
    ]);
  }

  const yLines = [];
  for (let i = 0; i < cAxisY.length; i++) {
    const item = cAxisY[i];
    const res = snapAxisY.getSnappedValues(item.value);

    if (res.length <= 1) {
      continue;
    }

    const xAxis = [];
    for (let j = 0; j < res.length; j++) {
      const rect = rectIdMap[res[j].rectId];

      xAxis.push(...getAxisXFromRect(rect).map((item) => item.value));
    }

    yLines.push([
      {
        x: Math.min(...xAxis),
        y: item.value,
      },
      {
        x: Math.max(...xAxis),
        y: item.value,
      },
    ]);
  }

  return (
    <>
      {xLines.map((line, index) => {
        return (
          <div
            key={index}
            className={csm.line}
            style={{
              left: line[0].x,
              top: line[0].y,
              width: 1,
              height: line[1].y - line[0].y,
            }}
          ></div>
        );
      })}
      {yLines.map((line, index) => {
        return (
          <div
            key={index}
            className={csm.line}
            style={{
              left: line[0].x,
              top: line[0].y,
              width: line[1].x - line[0].x,
              height: 1,
            }}
          ></div>
        );
      })}
    </>
  );
}
