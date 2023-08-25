/* eslint-disable import/no-cycle */
import { useAppSelector } from "..";

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { axiosInstance } from "../../lib/axios";
import { Playlist } from "../../model/Playlist";

export interface PlayerState {
  playlists: Playlist[];
  currentPlaylistIndex: number;
  currentMusicIndex: number;
  isLoading: boolean;
}

export const initialState: PlayerState = {
  playlists: [],
  currentPlaylistIndex: 0,
  currentMusicIndex: 0,
  isLoading: true,
};

export const loadPlaylists = createAsyncThunk("player/load", async () => {
  const response = await axiosInstance.get<{ playlists: Playlist[] }>(
    "/video-player/list",
  );

  return response.data.playlists;
});

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    start: (state, action: PayloadAction<Playlist[]>) => {
      return { ...state, playlists: action.payload };
    },

    play: (state, action: PayloadAction<[number, number]>) => {
      return {
        ...state,
        currentPlaylistIndex: action.payload[0],
        currentMusicIndex: action.payload[1],
      };
    },

    next: (state) => {
      const nextMusicIndex = state.currentMusicIndex + 1;
      const nextMusic =
        state.playlists[state.currentPlaylistIndex].musics[nextMusicIndex];

      if (nextMusic) {
        return {
          ...state,
          currentMusicIndex: state.currentMusicIndex + 1,
        };
      }

      const nextPlaylistIndex = state.currentPlaylistIndex + 1;
      const nextPlaylist = state.playlists[nextPlaylistIndex];
      const nextModuleHasAnyLesson =
        nextPlaylist && nextPlaylist.musics.length > 0;

      if (nextPlaylist && nextModuleHasAnyLesson) {
        return {
          ...state,
          currentPlaylistIndex: state.currentPlaylistIndex + 1,
          currentMusicIndex: 0,
        };
      }

      return { ...state };
    },
  },
  extraReducers(builder) {
    builder.addCase(loadPlaylists.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(loadPlaylists.fulfilled, (state, action) => {
      return {
        ...state,
        playlists: action.payload,
        isLoading: false,
      };
    });
  },
});

export const player = playerSlice.reducer;
export const { play, next, start } = playerSlice.actions;

export const useCurrentVideo = () => {
  return useAppSelector((state) => {
    if (state.player.playlists.length === 0) {
      return null;
    }

    const { currentPlaylistIndex, currentMusicIndex } = state.player;

    const currentPlaylist = state.player.playlists[currentPlaylistIndex];

    const currentMusic = currentPlaylist.musics[currentMusicIndex];

    return { currentPlaylist, currentMusic };
  });
};
