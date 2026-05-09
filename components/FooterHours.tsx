"use client";

import { useEffect, useState } from "react";
import { ClockIcon } from "@/components/Icons";
import { footerWeeklyHours } from "@/data/site";

export default function FooterHours() {
  const [todayWeekday, setTodayWeekday] = useState<number | null>(null);

  useEffect(() => {
    setTodayWeekday(new Date().getDay());
  }, []);

  return (
    <ul className="mt-4 space-y-1.5 text-sm">
      {footerWeeklyHours.map((entry) => {
        const isToday = todayWeekday !== null && entry.weekday === todayWeekday;
        return (
          <li
            key={entry.name}
            className={`flex items-start gap-2 rounded-xl px-3 py-2 transition-colors ${
              isToday
                ? "bg-primary/25 ring-1 ring-primary/50 text-bright"
                : "text-soft"
            }`}
          >
            <ClockIcon size={14} className={`mt-0.5 shrink-0 ${isToday ? "text-leaf" : "text-muted"}`} />
            <span className="min-w-0 flex-1">
              <span className={`block font-semibold ${isToday ? "text-bright" : "text-bright/90"}`}>
                {entry.name}
              </span>
              <span className={`block text-xs ${isToday ? "text-bright/90" : "text-muted"}`}>{entry.hours}</span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
