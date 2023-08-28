import { ReactNode } from "react";

import { MessageCircle } from "lucide-react";

import { useCurrentVideo, useStore } from "../../store";

export function Header(): ReactNode {
  const isLoading = useStore((store) => store.isLoading);

  const currentVideo = useCurrentVideo();

  if (isLoading) {
    return (
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="w-64 h-4 rounded bg-zinc-800 animate-pulse" />
          <div className="w-32 h-4 rounded bg-zinc-800 animate-pulse" />
        </div>
        <div className="w-40 h-8 rounded bg-zinc-800 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">
          {currentVideo?.currentMusic.title}
        </h1>
        <span className="text-sm text-zinc-400">
          {currentVideo?.currentPlaylist.name}
        </span>
      </div>

      <button
        type="button"
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white rounded bg-violet-500 hover:bg-violet-600"
      >
        <MessageCircle size={16} className="" />
        Leave your feedback
      </button>
    </div>
  );
}
