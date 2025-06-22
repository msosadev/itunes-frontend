import SongListItem from "~/components/SongListItem";
import React from "react";

export default function SongList({ songs }: { songs: any[] }) {
  return (
    <ul className="bg-gray-800 rounded-lg">
      {songs.map((song, idx) => (
        <React.Fragment key={song.trackId}>
          <SongListItem song={song} />
          {idx < songs.length - 1 && (
            <li>
              <hr className="border-gray-600 my-1" />
            </li>
          )}
        </React.Fragment>
      ))}
    </ul>
  );
}