import React from "react";
export default function Toolbar() {
  return (
    <div
      style={{
        width: 80,
        borderRight: "1px solid #ddd",
        padding: 10,
        display: "flex",
        flexDirection: "column",
        gap: 10
      }}
    >
      <div
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData("text/plain", "rect");
          e.dataTransfer.effectAllowed = "copy";
        }}
        style={{
          width: 50,
          height: 50,
          backgroundColor: "#4f46e5",
          cursor: "grab",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}
        title="Rectangle"
      >
        <div style={{ width: 30, height: 20, backgroundColor: "white", borderRadius: "2px" }} />
      </div>
      <div
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData("text/plain", "circle");
          e.dataTransfer.effectAllowed = "copy";
        }}
        style={{
          width: 50,
          height: 50,
          backgroundColor: "#10b981",
          borderRadius: "50%",
          cursor: "grab",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}
        title="Circle"
      >
        <div style={{ width: 25, height: 25, backgroundColor: "white", borderRadius: "50%" }} />
      </div>
      <div
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData("text/plain", "text");
          e.dataTransfer.effectAllowed = "copy";
        }}
        style={{
          width: 50,
          height: 50,
          backgroundColor: "#f59e0b",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "grab",
          color: "white",
          fontWeight: "bold",
          borderRadius: "4px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}
        title="Text"
      >
        T
      </div>
    </div>
  );
}
