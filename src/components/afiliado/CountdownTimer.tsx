"use client";

import { useEffect, useState } from "react";

export function CountdownTimer() {
  const [time, setTime] = useState({
    hours: 4,
    minutes: 6,
    seconds: 54,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 4, minutes: 6, seconds: 54 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="flex items-start justify-center gap-2 pt-4 pb-2">
      <TimerBlock value={formatNumber(time.hours)} label="HORAS" />
      <span className="text-2xl font-bold mt-2 text-foreground/80">:</span>
      <TimerBlock value={formatNumber(time.minutes)} label="MIN" />
      <span className="text-2xl font-bold mt-2 text-foreground/80">:</span>
      <TimerBlock value={formatNumber(time.seconds)} label="SEG" />
    </div>
  );
}

function TimerBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="bg-foreground text-background rounded-lg w-14 h-14 flex items-center justify-center shadow-lg">
        <span className="text-2xl font-bold font-mono leading-none">
          {value}
        </span>
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wide opacity-80">
        {label}
      </span>
    </div>
  );
}
