import type { Route } from "./+types/home";
import MainNavigation from "~/components/MainNavigation";
import { Link, Outlet } from "react-router";
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player'
import { useState } from "react";
import { SongContext } from "~/context/SongContext";
import { Disc } from "lucide-react";
import 'react-h5-audio-player/lib/styles.css';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "iTunes Frontend" },
    { name: "description", content: "A frontend created using various iTunes APIs" },
  ];
}

function artistPlayingInfo(songToPlay: Record<string, any>) {
  return (
    <div className="flex items-center gap-2">
      {songToPlay.artworkUrl30 ? <img src={songToPlay.artworkUrl60} className="size-11 object-cover rounded-sm" alt="Now playing" /> : <div className="size-11 bg-gray-700 rounded-sm flex items-center justify-center">{<Disc />}</div>}
      <div className="space-y-1">
        {songToPlay && Object.keys(songToPlay).length > 0 ?
        <>
          <Link to={`album/${songToPlay.collectionId}`} className="text-sm line-clamp-1">{songToPlay.trackName}</Link>
          <Link to={`artist/${songToPlay.artistId}`} className="text-xs line-clamp-1">{songToPlay.artistName}</Link>
        </>
        : <p className="text-sm">Select a song to start playing</p>}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [songToPlay, setSongToPlay] = useState<Record<string, any>>({});
  const playingPlaylist = false;
  return (
    <main className="grid grid-rows-[1fr_auto_auto] md:grid-cols-[auto_1fr] h-[100dvh] min-h-screen bg-gray-900 text-white">
      <div className="relative pb-4 overflow-y-auto overflow-x-hidden">
        <SongContext.Provider value={{ setSongToPlay, songToPlay }}>
          <Outlet />
        </SongContext.Provider>
      </div>
      <div className="relative">
        <AudioPlayer
          autoPlayAfterSrcChange={true}
          showDownloadProgress={true}
          showJumpControls={playingPlaylist}
          volume={0.5}
          src={songToPlay.previewUrl || undefined}
          customProgressBarSection={[
            RHAP_UI.PROGRESS_BAR,
          ]}
          customControlsSection={
            [
              artistPlayingInfo(songToPlay),
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
