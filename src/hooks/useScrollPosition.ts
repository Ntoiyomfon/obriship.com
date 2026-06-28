"use client";

import { useEffect, useState } from "react";

export function useScrollPosition(threshold = 400) {
  const [hasPassedThreshold, setHasPassedThreshold] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setHasPassedThreshold(window.scrollY > threshold);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return hasPassedThreshold;
}
