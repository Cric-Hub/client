import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    // RAF function to update Lenis on each frame
    function raf(time) {
      lenis.raf(time); 
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf); // Start the animation loop

    // Clean up Lenis on unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;