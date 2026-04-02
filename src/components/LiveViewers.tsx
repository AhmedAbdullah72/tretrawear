import { useState, useEffect } from "react";
import { Eye } from "lucide-react";

interface LiveViewersProps {
  handle: string;
}

const getBaseViewers = (handle: string): number => {
  let hash = 0;
  for (let i = 0; i < handle.length; i++) {
    hash = ((hash << 5) - hash) + handle.charCodeAt(i);
    hash |= 0;
  }
  return 8 + (Math.abs(hash) % 18); // 8–25
};

export const LiveViewers = ({ handle }: LiveViewersProps) => {
  const [viewers, setViewers] = useState(() => getBaseViewers(handle));

  useEffect(() => {
    setViewers(getBaseViewers(handle));

    const interval = setInterval(() => {
      setViewers(prev => {
        const delta = Math.random() < 0.5 ? -1 : 1;
        const next = prev + delta;
        const base = getBaseViewers(handle);
        return Math.max(base - 5, Math.min(base + 8, next));
      });
    }, 4000 + Math.random() * 3000);

    return () => clearInterval(interval);
  }, [handle]);

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-accent/50 rounded-lg border border-border">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
      </span>
      <Eye className="h-3.5 w-3.5 text-muted-foreground" />
      <span className="font-body text-xs text-muted-foreground">
        <strong className="text-foreground">{viewers}</strong> people viewing this right now
      </span>
    </div>
  );
};
