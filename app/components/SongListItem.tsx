import { CirclePause, CirclePlay } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router";
import { SongContext } from "~/context/SongContext";

interface Song {
  trackId: number;
  artworkUrl60: string;
  trackName: string;
  collectionName: string;
  collectionId: number;
  artistName?: string;
  artistId?: number;
  previewUrl?: string;
}

type SongListItemProps = {
  song: Song;
  infoToShow?: string[];
};

export default function SongListItem({ song, infoToShow = ["artistName", "collectionName", "artworkUrl60"] }: SongListItemProps) {
  const coverImg = infoToShow.find(info => info.includes("artworkUrl")) || null;
  const infoKeys = infoToShow.filter(info => !info.includes("artworkUrl"));
  const { setSongToPlay, songToPlay } = useContext(SongContext);
  return (
    <li className="flex items-center gap-4 py-2 px-4">
      {coverImg && song[coverImg as keyof Song] && (
        <img className="aspect-square object-cover gap-2 max-w-12 rounded-sm" src={song[coverImg as keyof Song] as string} alt={song.trackName} />
      )}
      <div className="song-info space-y-1 flex-1">
        <h6 className="text-sm line-clamp-1">{song.trackName}</h6>
        {infoKeys.map((key, index) => {
          if (key === "collectionName" && song.collectionName) {
            return <Link key={index} to={`/album/${song.collectionId}`} className="text-xs text-gray-400 line-clamp-1">{song.collectionName}</Link>;
          } else if (key === "artistName" && song.artistName) {
            return <Link key={index} to={`/artist/${song.artistId}`} className="text-xs text-gray-400 line-clamp-1">{song.artistName}</Link>;
          } else {
            return <p key={index} className="text-xs text-gray-400 line-clamp-1">{song[key as keyof Song]}</p>
          }
        })}
      </div>
      {song.previewUrl &&
        <button className="cursor-pointer" onClick={() => { setSongToPlay(song) }}>
          {songToPlay.trackId === song.trackId ? <CirclePause /> : <CirclePlay />}
        </button>}
    </li>
  );
}