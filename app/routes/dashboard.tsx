import type { Route } from "./+types/home";
import MainNavigation from "~/components/MainNavigation";
import { Outlet } from "react-router";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useState } from "react";
import { SongContext } from "~/context/SongContext";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Dashboard() {
  const [songToPlay, setSongToPlay] = useState<string | null>(null);
  return (
    <main className="flex min-h-screen bg-gray-900 text-white">
      <MainNavigation />
      <div className="pb-24 md:pb-0 flex-1 relative">
        <SongContext.Provider value={{ setSongToPlay }}>
          <Outlet />
        </SongContext.Provider>
        <div className="fixed bottom-23 inset-x-0 px-2 max-w-full w-full md:sticky md:bottom-0 md:p-4">
          <AudioPlayer
            autoPlayAfterSrcChange={true}
            volume={0.5}
            src={songToPlay || undefined}
          />
        </div>
      </div>
    </main>
  );
}
