import { ReactNode } from "react";

import { MessageCircle } from "lucide-react";

export function Player(): ReactNode {
  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
      <div className="flex w-[1100px] flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold">Redux concepts</h1>
            <span className="text-sm text-zinc-400">Module 01</span>
          </div>

          <button
            type="button"
            className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600"
          >
            <MessageCircle size={16} className="" />
            Leave your feedback
          </button>
        </div>

        <main className="relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow">
          <div className="flex-1">Video</div>

          <aside className="w-80 border-l border-zinc-800 bg-zinc-900 h-[600px]" />
        </main>
      </div>
    </div>
  );
}
