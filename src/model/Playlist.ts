import { Music } from "./Music";

export interface Playlist {
  id: string;
  name: string;
  order: number;
  description: string;
  musics: Music[];
}
