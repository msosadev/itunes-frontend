import SectionTitle from "./SectionTitle";

export default function AlbumGrid({ albums, title }: { albums: any[], title: string }) {
    return (
        <div className="space-y-4">
            <SectionTitle title={title} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {albums.map((album) => (
                    <div key={album.collectionId} className="bg-gray-800 rounded-lg p-4 flex items-center gap-3">
                        <img src={album.artworkUrl100} alt={album.collectionName} className="rounded-lg size-20" />
                        <div>
                            <a href={`/album/${album.collectionId}`} className="text-white text-md line-clamp-2">{album.collectionName}</a>
                            <p className="text-gray-400 text-sm">{album.artistName}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}