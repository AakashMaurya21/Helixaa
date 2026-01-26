import React from "react";
import Canvas from "./Canvas";
import Toolbar from "../components/Toolbar/SideToolbar";
import Topbar from "../components/Toolbar/TopToolbar";

export default function EditorShell() {
  return (
   <div className="h-screen w-screen flex flex-col">
      
      {/* Top toolbar */}
      <Topbar />

      {/* Main area */}
      <div className="flex flex-1">
        <Toolbar />
        <Canvas />
      </div>

    </div>
  );
}
