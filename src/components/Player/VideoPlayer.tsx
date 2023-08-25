import { ReactNode } from "react";
import ReactPlayer from "react-player";

import { Loader } from "lucide-react";

import { useAppDispatch, useAppSelector } from "../../store";
import { next, useCurrentVideo } from "../../store/slices/player";

export function VideoPlayer(): ReactNode {
  const dispatch = useAppDispatch();
  const currentVideo = useCurrentVideo();
  const isCourseLoading = useAppSelector((state) => state.player.isLoading);

  const handlePlayNext = () => {
    dispatch(next());
  };

  return (
    <div className="flex-1 w-full bg-zinc-950 aspect-video">
      {isCourseLoading ? (
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
