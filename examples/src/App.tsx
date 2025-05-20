import * as React from "react";
import "./styles.css";
import { Demo01 } from "./demos/Demo01";
import { Demo02 } from "./demos/Demo02";

export default function App() {
  return (
    <div className="App">
      <div>
        <div>Demo1</div>
        <Demo01></Demo01>
      </div>
      <div style={{ marginTop: 20 }}>
        <div>Demo2</div>
        <Demo02></Demo02>
      </div>
    </div>
  );
}
