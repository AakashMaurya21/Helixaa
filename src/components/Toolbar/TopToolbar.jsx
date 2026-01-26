import React, { useState, useRef, useEffect } from "react";
import {
  Minus,
  Square,
  Circle,
  Type,
  Maximize2,
  PaintBucket,
  Download,
  ChevronDown
} from "lucide-react";

import { Sketch } from "@uiw/react-color";

/* ───────────────────────── */
/* Click outside hook        */
/* ───────────────────────── */
function useClickOutside(ref, onClose, isActive) {
  useEffect(() => {
    if (!isActive) return;

    function handler(e) {
      if (!ref.current) return;
      if (ref.current.contains(e.target)) return;
      onClose();
    }

    // Delay attaching listener until AFTER open click finishes
    const timeout = setTimeout(() => {
      document.addEventListener("click", handler);
    }, 0);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("click", handler);
    };
  }, [ref, onClose, isActive]);
}



/* ───────────────────────── */
/* Topbar                    */
/* ───────────────────────── */
export default function Topbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [canvasColor, setCanvasColor] = useState("#ffffff");

  return (
    <div className="min-h-16 w-full bg-white border-b border-gray-200 flex items-center px-4 gap-3">

      {/* App name */}
      <span className="font-semibold text-gray-800 whitespace-nowrap">
        BioRender JS
      </span>

      <Divider />

      {/* File name */}
      <span className="text-sm text-gray-600 truncate max-w-[160px] cursor-default">
        Untitled Diagram
      </span>

      <Divider />

      {/* Tools */}
      <ToolbarButton icon={Minus} label="Line" />

      <Dropdown
        id="shapes"
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        icon={Square}
        label="Shapes"
        items={[
          { icon: Square, label: "Rectangle" },
          { icon: Circle, label: "Circle" }
        ]}
      />

      <ToolbarButton icon={Type} label="Text" />

      <Divider />

      {/* Canvas size */}
      <Dropdown
        id="canvas-size"
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        icon={Maximize2}
        label="Canvas Size"
        items={[
          { label: "A4 – Portrait" },
          { label: "A4 – Landscape" },
          { label: "1080 × 1080" },
          { label: "1920 × 1080" }
        ]}
      />

      {/* Canvas color picker */}
      <CanvasColorPicker
        open={openMenu === "canvas-color"}
        onOpen={() => setOpenMenu("canvas-color")}
        onClose={() => setOpenMenu(null)}
        color={canvasColor}
        onChange={setCanvasColor}
      />

      <div className="flex-1" />

      {/* Export */}
      <button className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
        <Download size={16} />
        Export
      </button>
    </div>
  );
}

/* ───────────────────────── */
/* Reusable components       */
/* ───────────────────────── */

function ToolbarButton({ icon: Icon, label }) {
  return (
    <button
      title={label}
      className="h-8 px-2 flex items-center gap-1 rounded-md text-gray-600 hover:bg-gray-100"
    >
      <Icon size={16} />
      <span className="text-sm">{label}</span>
    </button>
  );
}

function Divider() {
  return <div className="w-px h-6 bg-gray-200" />;
}

function Dropdown({ id, icon: Icon, label, items, openMenu, setOpenMenu }) {
  const ref = useRef(null);
  const isOpen = openMenu === id;

  useClickOutside(ref, () => setOpenMenu(null));

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpenMenu(isOpen ? null : id)}
        className="h-8 px-2 flex items-center gap-1 rounded-md text-gray-600 hover:bg-gray-100"
      >
        <Icon size={16} />
        <span className="text-sm">{label}</span>
        <ChevronDown size={14} />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-10 w-48 bg-white border border-gray-200 rounded-md shadow-md z-50">
          {items.map((item, i) => (
            <div
              key={i}
              className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
            >
              {item.icon && <item.icon size={14} />}
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CanvasColorPicker({ open, onOpen, onClose, color, onChange }) {
  const ref = useRef(null);

  useClickOutside(ref, onClose, open);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={(e) => {
          e.stopPropagation(); // EXTRA safety
          open ? onClose() : onOpen();
        }}
        className="h-8 px-2 flex items-center gap-1 rounded-md text-gray-600 hover:bg-gray-100"
      >
        <PaintBucket size={16} />
        <span className="text-sm">Canvas Color</span>
        <div
          className="w-4 h-4 rounded border"
          style={{ backgroundColor: color }}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-10 z-50 bg-white border border-gray-200 rounded-md shadow-md">
          <Sketch
            color={color}
            onChange={(c) => onChange(c.hex)}
          />
        </div>
      )}
    </div>
  );
}

