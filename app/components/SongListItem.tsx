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
  infoToShow?: string[];
};

export default function SongListItem({ song, infoToShow = ["artistName", "collectionName", "artworkUrl60"] }: SongListItemProps) {
  const coverImg = infoToShow.find(info => info.includes("artworkUrl")) || null;
  const infoKeys = infoToShow.filter(info => !info.includes("artworkUrl"));
  return (
    <li className="grid grid-cols-[auto_1fr] items-center gap-4 p-2">
      {coverImg && song[coverImg as keyof Song] && (
        <img className="aspect-square object-cover gap-2 max-w-12 rounded-sm" src={song[coverImg as keyof Song] as string} alt={song.trackName} />
      )}
      <div className="song-info space-y-1">
        <h6 className="text-sm line-clamp-1">{song.trackName}</h6>
        {infoKeys.map((key, index) => {
          if (key === "collectionName" && song.collectionName) {
            return <a key={index} href={`/album/${song.collectionId}`} className="text-xs text-gray-400 line-clamp-1">{song.collectionName}</a>;
          } else if (key === "artistName" && song.artistName) {
            return <a key={index} href={`/artist/${song.artistId}`} className="text-xs text-gray-400 line-clamp-1">{song.artistName}</a>;
          } else {
            return <p key={index} className="text-xs text-gray-400 line-clamp-1">{song[key as keyof Song]}</p>
          }
        })}
      </div>
    </li>
  );
}