import { ReactNode } from "react";

import { PlayCircle, Video } from "lucide-react";

interface LessonProps {
  title: string;
  duration: string;
  onPlay: () => void;
  isCurrent?: boolean;
}

export function Lesson({
  title,
  duration,
  onPlay,
  isCurrent = false,
}: LessonProps): ReactNode {
  return (
    <button
      type="button"
      onClick={onPlay}
      disabled={isCurrent}
      className="items-center grid grid-cols-[auto_1fr_auto] text-start gap-3 text-sm text-zinc-400 data-[active=true]:text-emerald-400 enabled:hover:text-zinc-100"
      data-active={isCurrent}
    >
      {isCurrent ? (
        <PlayCircle className="w-4 h-4 text-emerald-400" />
      ) : (
        <Video className="w-4 h-4 text-zinc-500" />
      )}

      <span>{title}</span>
      <span className="ml-auto font-mono text-xs text-zinc-500">
        {duration}
      </span>
    </button>
  );
}
