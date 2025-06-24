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
    <main className="grid grid-rows-[1fr_auto_auto] md:grid-cols-[auto_1fr] h-screen min-h-screen bg-gray-900 text-white">
      <div className="relative pb-4 overflow-y-auto">
        <SongContext.Provider value={{ setSongToPlay }}>
          <Outlet />
        </SongContext.Provider>
      </div>
      <div>
        <AudioPlayer
          autoPlayAfterSrcChange={true}
          volume={0.5}
          src={songToPlay || undefined}
        />
      </div>
      <aside className="md:row-start-1 md:row-end-3 md:col-start-1"><MainNavigation /></aside>
    </main>
  );
}
