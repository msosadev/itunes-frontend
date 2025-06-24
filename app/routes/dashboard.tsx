import type { Route } from "./+types/home";
import MainNavigation from "~/components/MainNavigation";
import { Outlet } from "react-router";
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player'
import { useState } from "react";
import { SongContext } from "~/context/SongContext";
import { Disc } from "lucide-react";
import 'react-h5-audio-player/lib/styles.css';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

function artistPlayingInfo() {
  return (
    <div className="flex items-center gap-2">
      <div className="size-10 bg-gray-700 rounded-sm flex items-center justify-center">
        {<Disc />}
      </div>
      <div className="space-y-1">
        <p className="text-sm line-clamp-1">Song</p>
        <p className="text-xs line-clamp-1">Artist</p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [songToPlay, setSongToPlay] = useState<string | null>(null);
  const playingPlaylist = false;
  return (
    <main className="grid grid-rows-[1fr_auto_auto] md:grid-cols-[auto_1fr] h-screen min-h-screen bg-gray-900 text-white">
      <div className="relative pb-4 overflow-y-auto">
        <SongContext.Provider value={{ setSongToPlay }}>
          <Outlet />
        </SongContext.Provider>
      </div>
      <div className="relative">
        <AudioPlayer
          autoPlayAfterSrcChange={true}
          showDownloadProgress={true}
          showJumpControls={playingPlaylist}
          volume={0.5}
          src={songToPlay || undefined}
          customProgressBarSection={[
            RHAP_UI.PROGRESS_BAR,
          ]}
          customControlsSection={
            [
              artistPlayingInfo(),
              RHAP_UI.VOLUME_CONTROLS,
              RHAP_UI.MAIN_CONTROLS,
            ]
          }
        />
      </div>
      <aside className="md:row-start-1 md:row-end-3 md:col-start-1"><MainNavigation /></aside>
    </main>
  );
}
