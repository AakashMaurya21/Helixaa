import React, { useState } from "react";
import {
  Dna,
  Search,
  LayoutTemplate,
  Brush,
  ChartColumn,
  HeartPlus,
  Upload
} from "lucide-react";

const tools = [
  { id: "search", label: "Search", icon: Search },
  { id: "icons", label: "Icons", icon: Dna },
  { id: "template", label: "Template", icon: LayoutTemplate },
  { id: "brush", label: "Brush", icon: Brush },
  { id: "graphs", label: "Graphs", icon: ChartColumn },
  { id: "favorites", label: "Favorites", icon: HeartPlus },
  { id: "uploads", label: "Uploads", icon: Upload },
];

export default function Toolbar() {
  const [activeTool, setActiveTool] = useState("select");

  return (
    <div className="h-screen w-20 bg-white border-r border-gray-200 flex flex-col items-center py-3 gap-3">
      {tools.map(({ id, label, icon: Icon }) => {
        const isActive = activeTool === id;

        return (
          <button
            key={id}
            onClick={() => setActiveTool(id)}
            className={`
              w-16 py-2 flex flex-col items-center rounded-lg
              transition-all duration-150
              ${
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-100"
              }
            `}
          >
            <Icon size={18} strokeWidth={2} />
            <span className="mt-1 text-[11px] font-medium">
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
