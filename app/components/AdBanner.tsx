"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdBanner({ size = "horizontal" }: { size?: "horizontal" | "square" }) {
  const insRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error(e);
    }
  }, []);

  const minHeight = size === "horizontal" ? "6rem" : "15rem";

  return (
    <ins
      ref={insRef}
      className="adsbygoogle block w-full my-4"
      style={{ display: "block", minHeight }}
      data-ad-client="ca-pub-5468583242806327"
      data-ad-slot="7470659426"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
