import * as React from "react";
import "./styles.css";
import { Demo01 } from "./demos/Demo01";
import { Demo02 } from "./demos/Demo02";
import { Demo03 } from "./demos/Demo03";
import { Demo04 } from "./demos/Demo04";

export default function App() {
  return (
    <div className="App">
      <div>
        <div>基础轴吸附</div>
        <Demo01></Demo01>
      </div>
      <div style={{ marginTop: 20 }}>
        <div>矩形拖动吸附</div>
        <Demo02></Demo02>
      </div>
      <div style={{ marginTop: 20 }}>
        <div>线段吸附</div>
        <Demo03></Demo03>
      </div>
      <div style={{ marginTop: 20 }}>
        <div>锚点吸附</div>
        <Demo04></Demo04>
      </div>
    </div>
  );
}
