"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function PageVisitTracker() {
  const pathname = usePathname();
  const last = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || pathname === last.current) return;
    last.current = pathname;

    const payload = JSON.stringify({ path: pathname });
    const url = "/api/track";

    try {
      if (typeof navigator.sendBeacon === "function") {
        const blob = new Blob([payload], { type: "application/json" });
        if (navigator.sendBeacon(url, blob)) return;
      }
    } catch {
      /* fall through */
    }

    void fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true
    }).catch(() => {});
  }, [pathname]);

  return null;
}
