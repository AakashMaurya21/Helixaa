import React from "react";
import Canvas from "./Canvas";
import Toolbar from "../components/Toolbar/Toolbar";

export default function EditorShell() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Toolbar />
      <Canvas />
    </div>
  );
}
