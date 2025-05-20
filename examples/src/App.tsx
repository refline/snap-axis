import * as React from "react";
import "./styles.css";
import { Basic01 } from "./demos/Basic01";
import { Basic02 } from "./demos/Basic02";

export default function App() {
  return (
    <div className="App">
      <div>
        <Basic01></Basic01>
      </div>
      <div style={{ marginTop: 20 }}>
        <Basic02></Basic02>
      </div>
    </div>
  );
}
