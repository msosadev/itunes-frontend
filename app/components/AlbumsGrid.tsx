export default function AlbumCarousel({ albums, title }: { albums: any[], title: string }) {
    return (
        <div className="space-y-4">
            <h3 className="text-lg">{title}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {albums.map((album) => (
                    <div key={album.collectionId} className="bg-gray-800 rounded-lg p-4">
                        <img src={album.artworkUrl100} alt={album.collectionName} className="w-full h-auto rounded-lg mb-2" />
                        <a href={`album/${album.collectionId}`} className="text-white text-md line-clamp-2">{album.collectionName}</a>
                        <p className="text-gray-400 text-sm">{album.artistName}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}