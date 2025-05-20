import * as React from "react";
import "./styles.css";
import { Demo01 } from "./demos/Demo01";
import { Demo02 } from "./demos/Demo02";
import { Demo03 } from "./demos/Demo03";
import { Demo04 } from "./demos/Demo04";
import { Demo05 } from "./demos/Demo05";
import pkg from "../../package.json";

export default function App() {
  return (
    <div className="App">
      <div>
        <div className="demoTitle">基础轴吸附</div>
        <Demo01></Demo01>
      </div>
      <div style={{ marginTop: 20 }}>
        <div className="demoTitle">矩形吸附(左中右对齐)</div>
        <Demo02></Demo02>
      </div>
      <div style={{ marginTop: 20 }}>
        <div className="demoTitle">编辑吸附</div>
        <Demo05></Demo05>
      </div>
      <div style={{ marginTop: 20 }}>
        <div className="demoTitle">锚点吸附</div>
        <Demo04></Demo04>
      </div>
      <div style={{ marginTop: 20 }}>
        <div className="demoTitle">线段吸附</div>
        <Demo03></Demo03>
      </div>
      <div style={{ marginTop: 20, paddingBottom: 50 }}>
        <a href="https://github.com/refline/snap-axis" target="_blank">
          snap-axis v{pkg.version}
        </a>
      </div>
    </div>
  );
}
