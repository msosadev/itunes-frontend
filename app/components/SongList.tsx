import SongListItem from "~/components/SongListItem";
import React from "react";

export default function SongList({ songs, infoToShow = ["artistName", "collectionName", "artworkUrl60"] }: { songs: any[], infoToShow?: any[] }) {
    if (!songs || songs.length === 0) return null;

    return (
        <ul className="bg-gray-800 rounded-lg">
            {songs.map((song, idx) => (
                <React.Fragment key={song.trackId || idx}>
                    <SongListItem song={song} infoToShow={infoToShow} />
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