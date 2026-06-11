"use client";

import { useCallback, useRef, useState } from "react";

/**
 * Plotly's WebGL (gl3d) scenes size their canvas once at mount and do not
 * follow later container resizes, so a chart mounted mid-layout (or on a
 * small screen) stays clipped. Attach the returned ref to the chart's
 * container and pass the measured width as a `key` on <Plot> so the chart
 * remounts whenever the container width actually changes.
 */
export function usePlotContainerWidth() {
  const [width, setWidth] = useState(0);
  const observerRef = useRef<ResizeObserver | null>(null);

  const ref = useCallback((el: HTMLDivElement | null) => {
    observerRef.current?.disconnect();
    observerRef.current = null;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const next = Math.round(entries[0].contentRect.width);
      if (next > 0) setWidth(next);
    });
    observer.observe(el);
    observerRef.current = observer;
  }, []);

  return { ref, width };
}
