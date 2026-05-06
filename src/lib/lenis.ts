// src/lib/lenis.ts
import Lenis from "lenis";

let instance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return instance;
}

export function createLenis(): Lenis {
  if (instance) instance.destroy();
  instance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  return instance;
}

export function destroyLenis() {
  instance?.destroy();
  instance = null;
}
