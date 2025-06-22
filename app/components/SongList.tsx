import SongListItem from "~/components/SongListItem";
import React from "react";

export default function SongList({ songs, showArtist = false }: { songs: any[], showArtist?: boolean }) {
    if (!songs || songs.length === 0) {
        return <p className="text-gray-500">No songs available</p>;
    }

    return (
        <ul className="bg-gray-800 rounded-lg">
            {songs.map((song, idx) => (
                <React.Fragment key={song.trackId}>
                    <SongListItem song={song} showArtist={showArtist} />
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