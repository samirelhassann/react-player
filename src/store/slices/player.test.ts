import { describe, expect, it } from "vitest";

import { PlayerState, next, play, player as reducer } from "./player";

const mockedState: PlayerState = {
  playlists: [
    {
      id: "31a6883d-ee3d-48fe-a196-4c1654c66129",
      name: "Eletrônica",
      description: "Best Eletro Musics",
      order: 1,
      musics: [
        {
          id: "758b85fd-7534-451d-aeba-167db23edd62",
          playlistId: "31a6883d-ee3d-48fe-a196-4c1654c66129",
          title: "Faybl & Xuinn - Until The End",
          duration: "04:16",
          videoId: "i9jFoXPkr_Y",
          order: 1,
        },
        {
          id: "d53c174f-0dd6-40ba-bb4e-9c481b374278",
          playlistId: "31a6883d-ee3d-48fe-a196-4c1654c66129",
          title: "CloudNone, Direct & Mr FijiWiji - Stained Glass",
          duration: "02:51",
          videoId: "1CuiOvGXtps",
          order: 2,
        },
      ],
    },
    {
      id: "302550a5-3339-4687-8497-7009b3d08ff5",
      name: "Lofi",
      description: "Best Lofis ",
      order: 2,
      musics: [
        {
          id: "d955a918-dc34-49ca-bcfa-adcca33d682e",
          playlistId: "302550a5-3339-4687-8497-7009b3d08ff5",
          title: "ezio's family but it's an ambient remix",
          duration: "60:00",
          videoId: "dhBtlVfFdBw",
          order: 1,
        },
      ],
    },
  ],
  currentPlaylistIndex: 0,
  currentMusicIndex: 0,
  isLoading: false,
};

describe("Given the player slice", () => {
  it("should be able to play", () => {
    const state = reducer(mockedState, play([1, 2]));

    expect(state.currentPlaylistIndex).toEqual(1);
    expect(state.currentMusicIndex).toEqual(2);
  });

  it("should be able to play next lesson automatically", () => {
    const state = reducer(mockedState, next());

    expect(state.currentPlaylistIndex).toEqual(0);
    expect(state.currentMusicIndex).toEqual(1);
  });

  it("should be able to play next module automatically", () => {
    const state = reducer({ ...mockedState, currentMusicIndex: 1 }, next());

    expect(state.currentPlaylistIndex).toEqual(1);
    expect(state.currentMusicIndex).toEqual(0);
  });

  it("should not go to next lesson when there are not classes remaining", () => {
    const state = reducer(
      { ...mockedState, currentPlaylistIndex: 1, currentMusicIndex: 1 },
      next(),
    );

    expect(state.currentPlaylistIndex).toEqual(1);
    expect(state.currentMusicIndex).toEqual(1);
  });
});
