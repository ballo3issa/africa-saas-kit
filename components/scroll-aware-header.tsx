"use client";

import { type ReactNode, useEffect, useState } from "react";

type ScrollAwareHeaderProps = {
  children: ReactNode;
  className: string;
};

export function ScrollAwareHeader({
  children,
  className,
}: ScrollAwareHeaderProps) {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    let animationFrame = 0;

    const updateHeader = () => {
      animationFrame = 0;
      setIsCompact(window.scrollY > 20);
    };

    const handleScroll = () => {
      if (animationFrame === 0) {
        animationFrame = window.requestAnimationFrame(updateHeader);
      }
    };

    updateHeader();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <header
      className={className}
      data-scroll-state={isCompact ? "compact" : "top"}
    >
      {children}
    </header>
  );
}
