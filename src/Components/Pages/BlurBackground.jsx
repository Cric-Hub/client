import React, { useEffect, useState } from "react";
import './BlurBackground.css';


const BlurBackground = () => {
  const [positions, setPositions] = useState({
    large: { x: 10, y: 0 },
    medium: { x: 10, y: 0 },
    small: { x: 10, y: 0 },
  });

  useEffect(() => {
    const radius = 650;
    const speed = 0.005;

    const directions = {
      large: { x: Math.random(), y: Math.random() },
      medium: { x: Math.random(), y: Math.random() },
      small: { x: Math.random(), y: Math.random() },
    };

    const updatePositions = () => {
      setPositions((prev) => {
        const newPositions = { ...prev };

        Object.keys(directions).forEach((key) => {
          const dir = directions[key];
          const pos = prev[key];

          newPositions[key] = {
            x: pos.x + dir.x * speed * radius,
            y: pos.y + dir.y * speed * radius,
          };

          if (Math.abs(newPositions[key].x) > radius) {
            directions[key].x *= -1;
          }
          if (Math.abs(newPositions[key].y) > radius) {
            directions[key].y *= -1;
          }
        });

        return newPositions;
      });

      requestAnimationFrame(updatePositions);
    };

    updatePositions();

    return () => cancelAnimationFrame(updatePositions); // Cleanup on unmount
  }, []);

  return (
    <div className="blur-background">
      <div
        className="blob large"
        style={{
          transform: `translate(${positions.large.x}px, ${positions.large.y}px)`,
        }}
      ></div>

      <div
        className="blob medium"
        style={{
          transform: `translate(${positions.medium.x}px, ${positions.medium.y}px)`,
        }}
      ></div>

      <div
        className="blob small"
        style={{
          transform: `translate(${positions.small.x}px, ${positions.small.y}px)`,
        }}
      ></div>
    </div>
  );
};

export default BlurBackground;
