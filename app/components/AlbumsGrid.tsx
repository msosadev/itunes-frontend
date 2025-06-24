import { Link } from "react-router";
import SectionTitle from "./SectionTitle";

export default function AlbumGrid({ albums, title, infoToShow }: { albums: any[], title: string, infoToShow?: any[] }) {
    if (!albums || albums.length === 0) return;

    return (
        <div className="space-y-4">
            <SectionTitle title={title} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {albums.map((album, idx) => (

                    <div key={album.collectionId || idx} className="bg-gray-800 rounded-lg p-4 flex items-center gap-3">
                        <img src={album.artworkUrl100} alt={album.collectionName} className="rounded-lg size-20" />
                        <div>
                            {infoToShow && infoToShow.map((key, index) => {
                                let value = album[key];
                                if (key === "collectionName" || key === "name") return <Link to={`/album/${album.collectionId || album.id}`} key={index} className="text-white text-md line-clamp-2">{album.collectionName || album.name}</Link>;
                                if (key === "releaseDate") {
                                    const year = new Date(value).getFullYear();
                                    value = year;
                                }
                                if (key === "artistName") return <Link to={`/artist/${album.artistId}`} key={index} className="text-gray-400 text-sm line-clamp-1">{value}</Link>

                                if (key === "mainGenre") value = album.genres[0].name;
                                if (!value) return null;
                                return <p key={index} className="text-gray-400 text-sm line-clamp-1">{value}</p>
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}