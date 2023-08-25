import { ReactNode, useEffect } from "react";

import { Playlist } from "../../model/Playlist";
import { useAppDispatch, useAppSelector } from "../../store";
import { loadPlaylists } from "../../store/slices/player";
import { Header } from "./Header";
import { Module } from "./Module";
import { VideoPlayer } from "./VideoPlayer";

export function Player(): ReactNode {
  const dispatch = useAppDispatch();
  const isCourseLoading = useAppSelector((state) => state.player.isLoading);

  const playlists = useAppSelector((state) => {
    return state.player.playlists;
  });

  useEffect(() => {
    dispatch(loadPlaylists());
  }, [dispatch]);

  if (isCourseLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-zinc-950 text-zinc-50">
        <div className="flex w-[1100px] flex-col gap-6">
          <Header />

          <main className="relative flex overflow-hidden border rounded-lg shadow border-zinc-800 bg-zinc-900 pr-80">
            <VideoPlayer />

            <aside className="absolute top-0 bottom-0 right-0 overflow-y-scroll border-l divide-y-2 w-80 divide-zinc-900 border-zinc-800 bg-zinc-900 scrollbar-thin scrollbar-track-zinc-900 scrollbar-thumb-zinc-800">
              {playlists?.map((playlist: Playlist, index) => (
                <Module
                  key={playlist.name}
                  moduleIndex={index}
                  title={playlist.name}
                  amountOfLessons={playlist.musics.length}
                />
              ))}
            </aside>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-zinc-950 text-zinc-50">
      <div className="flex w-[1100px] flex-col gap-6">
        <Header />

        <main className="relative flex overflow-hidden border rounded-lg shadow border-zinc-800 bg-zinc-900 pr-80">
          <VideoPlayer />

          {isCourseLoading ? (
            <></>
          ) : (
            <aside className="absolute top-0 bottom-0 right-0 overflow-y-scroll border-l divide-y-2 w-80 divide-zinc-900 border-zinc-800 bg-zinc-900 scrollbar-thin scrollbar-track-zinc-900 scrollbar-thumb-zinc-800">
              {playlists?.map((playlist: Playlist, index) => (
                <Module
                  key={playlist.name}
                  moduleIndex={index}
                  title={playlist.name}
                  amountOfLessons={playlist.musics.length}
                />
              ))}
            </aside>
          )}
        </main>
      </div>
    </div>
  );
}
