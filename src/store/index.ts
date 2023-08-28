import { create } from "zustand";

import { axiosInstance } from "../lib/axios";
import { Playlist } from "../model/Playlist";

export interface PlayerState {
  playlists: Playlist[];
  currentPlaylistIndex: number;
  currentMusicIndex: number;
  isLoading: boolean;

  play: (moduleAndLessonIndex: [number, number]) => void;
  next: () => void;
  load: () => void;
}

export const useStore = create<PlayerState>((set, get) => {
  return {
    playlists: [],
    currentPlaylistIndex: 0,
    currentMusicIndex: 0,
    isLoading: false,

    load: async () => {
      set({ isLoading: true });

      const response = await axiosInstance.get<{ playlists: Playlist[] }>(
        "/video-player/list",
      );

      set({
        playlists: response.data.playlists,
        isLoading: false,
      });

      return response.data.playlists;
    },

    play: (moduleAndLessonIndex: [number, number]) => {
      const [playListIndex, musicIndex] = moduleAndLessonIndex;

      set({
        currentPlaylistIndex: playListIndex,
        currentMusicIndex: musicIndex,
      });
    },

    next: () => {
      const { currentMusicIndex, currentPlaylistIndex, playlists } = get();

      const nextMusicIndex = currentMusicIndex + 1;
      const nextMusic = playlists[currentPlaylistIndex].musics[nextMusicIndex];

      if (nextMusic) {
        set({
          currentMusicIndex: currentMusicIndex + 1,
        });
      }

      const nextPlaylistIndex = currentPlaylistIndex + 1;
      const nextPlaylist = playlists[nextPlaylistIndex];
      const nextModuleHasAnyLesson =
        nextPlaylist && nextPlaylist.musics.length > 0;

      if (nextPlaylist && nextModuleHasAnyLesson) {
        set({
          currentPlaylistIndex: currentPlaylistIndex + 1,
          currentMusicIndex: 0,
        });
      }
    },
  };
});

export const useCurrentVideo = () => {
  return useStore((state) => {
    if (state.playlists.length === 0) {
      return null;
    }

    const { currentPlaylistIndex, currentMusicIndex } = state;

    const currentPlaylist = state.playlists[currentPlaylistIndex];

    const currentMusic = currentPlaylist.musics[currentMusicIndex];

    return { currentPlaylist, currentMusic };
  });
};
