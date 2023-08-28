/* eslint-disable @typescript-eslint/no-shadow */

import { ReactNode } from "react";

import { ChevronDown } from "lucide-react";

import * as Collapsible from "@radix-ui/react-collapsible";

import { useStore } from "../../store";
import { Lesson } from "./Lesson";

interface ModuleProps {
  moduleIndex: number;
  title: string;
  amountOfLessons: number;
}

export function Module({
  moduleIndex,
  title,
  amountOfLessons,
}: ModuleProps): ReactNode {
  const { currentMusicIndex, currentPlaylistIndex, musics, play } = useStore(
    (store) => {
      return {
        musics: store.playlists[moduleIndex].musics,
        isLoading: store.isLoading,
        currentMusicIndex: store.currentMusicIndex,
        currentPlaylistIndex: store.currentPlaylistIndex,
        play: store.play,
      };
    },
  );

  const formatedAmountOfMusics =
    amountOfLessons > 1
      ? `${amountOfLessons} musics`
      : `${amountOfLessons} music`;

  return (
    <Collapsible.Root className="group">
      <Collapsible.Trigger
        type="button"
        className="flex items-center w-full gap-3 p-4 bg-zinc-800"
      >
        <div
          className="flex items-center justify-center w-10 h-10 text-xs rounded-full bg-zinc-950 data-[isActive=true]:bg-emerald-500 data-[isActive=true]:text-zinc-950 data-[isActive=true]:font-bold"
          data-isActive={currentPlaylistIndex === moduleIndex}
        >
          {moduleIndex + 1}
        </div>

        <div className="flex flex-col gap-1 text-left">
          <strong className="text-sm">{title}</strong>
          <span className="text-xs text-zinc-400">
            {formatedAmountOfMusics}
          </span>
        </div>

        <ChevronDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform" />
      </Collapsible.Trigger>

      <Collapsible.Content>
        <nav className="relative flex flex-col gap-4 p-6">
          {musics.map((lesson, lessonIndex) => {
            const isCurrent =
              currentPlaylistIndex === moduleIndex &&
              lessonIndex === currentMusicIndex;

            return (
              <Lesson
                key={lesson.id}
                title={lesson.title}
                duration={lesson.duration}
                onPlay={() => play([moduleIndex, lessonIndex])}
                isCurrent={isCurrent}
              />
            );
          })}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
