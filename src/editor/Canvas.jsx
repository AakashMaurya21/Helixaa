import React, { useRef, useState, useEffect } from "react";
import { Stage, Layer, Rect, Circle, Text } from "react-konva";

export default function Canvas() {
  const stageRef = useRef();
  const [elements, setElements] = useState([
    { id: 1, type: 'text', x: 40, y: 30, text: "BioRender JS", fontSize: 22 },
    { id: 2, type: 'rect', x: 100, y: 100, width: 200, height: 120, fill: "#4f46e5", draggable: true }
  ]);
  
  // Set up drag and drop for the canvas
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    
    const handleDragOver = (e) => {
      e.preventDefault();
    };
    
    const handleDrop = (e) => {
      e.preventDefault();
      const type = e.dataTransfer.getData("text/plain");
      const pos = stage.getPointerPosition();
      
      if (!pos) return;
      
      const x = pos.x;
      const y = pos.y;
      
      const newElement = {
        id: Date.now(),
        type,
        x,
        y
      };
      
      // Set default properties based on type
      switch(type) {
        case 'rect':
          newElement.width = 100;
          newElement.height = 80;
          newElement.fill = "#4f46e5";
          break;
        case 'circle':
          newElement.radius = 40;
          newElement.fill = "#10b981";
          break;
        case 'text':
          newElement.text = "New Text";
          newElement.fontSize = 16;
          break;
        default:
          break;
      }
      
      setElements([...elements, newElement]);
    };
    
    // Add event listeners to the stage's container
    const container = stage.container();
    if (container) {
      container.addEventListener('dragover', handleDragOver);
      container.addEventListener('drop', handleDrop);
    }
    
    // Cleanup event listeners
    return () => {
      if (container) {
        container.removeEventListener('dragover', handleDragOver);
        container.removeEventListener('drop', handleDrop);
      }
    };
  }, [elements]);
  
  const renderElement = (element) => {
    switch(element.type) {
      case 'rect':
        return (
          <Rect
            key={element.id}
            x={element.x}
            y={element.y}
            width={element.width}
            height={element.height}
            fill={element.fill}
            draggable
          />
        );
      case 'circle':
        return (
          <Circle
            key={element.id}
            x={element.x}
            y={element.y}
            radius={element.radius}
            fill={element.fill}
            draggable
          />
        );
      case 'text':
        return (
          <Text
            key={element.id}
            x={element.x}
            y={element.y}
            text={element.text}
            fontSize={element.fontSize}
            draggable
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <Stage 
      width={1200} 
      height={800}
      ref={stageRef}
    >
      <Layer>
        {elements.map(renderElement)}
      </Layer>
    </Stage>
  );
}
