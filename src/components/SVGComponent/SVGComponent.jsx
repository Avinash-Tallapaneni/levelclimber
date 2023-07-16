import React, { useEffect, useState } from "react";
import "./SVGComponent.css";

const SVGComponent = ({ levels }) => {
  const [splinePaths, setSplinePaths] = useState([]);

  const updatePaths = () => {
    const updatedPaths = [];

    const divs = document.querySelectorAll("[class^='spline']");

    for (let i = 0; i < levels.length - 1; i++) {
      const div1 = divs[i];
      const div2 = divs[i + 1];
      const rect1 = div1.getBoundingClientRect();
      const rect2 = div2.getBoundingClientRect();

      let x1, y1, x2, y2;

      if (i % 2 === 0) {
        x1 = rect1.x + rect1.width;
        y1 = rect1.y + rect1.height / 2;
        x2 = rect2.x + rect2.width / 2;
        y2 = rect2.y;
      } else {
        x1 = rect1.x;
        y1 = rect1.y + rect1.height / 2;
        x2 = rect2.x + rect2.width / 2;
        y2 = rect2.y;
      }

      const cx1 = (x1 + x2) / 2;
      const cy1 = y1;
      const cx2 = x2;
      const cy2 = y2;

      const d = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;
      updatedPaths.push(d);
    }

    setSplinePaths(updatedPaths);
  };

  useEffect(() => {
    updatePaths();
    window.addEventListener("resize", updatePaths);

    return () => {
      window.removeEventListener("resize", updatePaths);
    };
  }, [levels]);

  return (
    <svg className="responsive-svg ">
      {splinePaths.map((path, index) => (
        <path
          key={index}
          d={path}
          stroke="url(#gradient)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="5,5"
          markerEnd="url(#arrowhead)"
        />
      ))}
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="10"
          refX="8"
          refY="5"
          orient="auto"
        >
          <polygon points="0 0, 10 5, 0 10" fill="#323ff0da" />
        </marker>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3284f0e3" />
          <stop offset="100%" stopColor="#323ff0da" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default SVGComponent;
