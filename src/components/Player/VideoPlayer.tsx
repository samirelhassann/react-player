import { ReactNode } from "react";
import ReactPlayer from "react-player";

import { Loader } from "lucide-react";

import { useCurrentVideo, useStore } from "../../store";

export function VideoPlayer(): ReactNode {
  const { next, isLoading: isPlaylistsLoading } = useStore();

  const currentVideo = useCurrentVideo();

  const handlePlayNext = () => {
    next();
  };

  return (
    <div className="flex-1 w-full bg-zinc-950 aspect-video">
      {isPlaylistsLoading ? (
        <div className="flex items-center justify-center h-full">
          <Loader className="w-6 h-6 text-zinc-400 animate-spin" />
        </div>
      ) : (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${currentVideo?.currentMusic?.videoId}`}
          width="100%"
          height="100%"
          playing={false}
          onEnded={handlePlayNext}
        />
      )}
    </div>
  );
}
