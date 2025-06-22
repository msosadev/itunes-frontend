interface Song {
  artworkUrl60: string;
  trackName: string;
  collectionName: string;
  collectionId: number;
  artistName?: string;
  artistId?: number;
}

type SongListItemProps = {
  song: Song;
  showArtist?: boolean;
};

export default function SongListItem({ song, showArtist = false }: SongListItemProps) {
  return (
    <li className="grid grid-cols-[auto_1fr] items-center gap-4 p-2">
      <img className="aspect-square object-cover gap-2 max-w-12 rounded-sm" src={song.artworkUrl60} alt={song.trackName} />
      <div className="song-info space-y-1">
        <h6 className="text-sm line-clamp-1">{song.trackName}</h6>
        <a href={`/album/${song.collectionId}`} className="text-xs text-gray-400 line-clamp-1">{song.collectionName}</a>
        {showArtist && song.artistName && <a href={`/artist/${song.artistId}`} className="text-xs text-gray-400 line-clamp-1">{song.artistName}</a>}
      </div>
    </li>
  );
}