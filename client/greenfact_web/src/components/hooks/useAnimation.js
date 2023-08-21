import { useEffect } from "react";

const subscribers = new Set();

function animate() {
  subscribers.forEach((fn) => fn());
  requestAnimationFrame(animate);
}

export const useAnimations = (callback) => {
  useEffect(() => {
    subscribers.add(callback);

    // If it's the first subscriber, start the animation loop
    if (subscribers.size === 1) {
      requestAnimationFrame(animate);
    }

    return () => {
      subscribers.delete(callback);

      // If no subscribers remain, stop the animation loop
      if (subscribers.size === 0) {
        // Optional: You can store the request ID and cancel the animation frame here if needed
      }
    };
  }, [callback]);
};
