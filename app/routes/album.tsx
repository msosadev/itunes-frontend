import { useParams } from "react-router";
import { useEffect, useState } from "react";
import SongList from "~/components/SongList";
import PageError from "~/components/PageError";
import Badge from "~/components/Badge";
import ExplicitBadge from "~/components/ExplicitBadge";
import PageLoadingSpinner from "~/components/PageLoadingSpinner";

export default function Album() {
  const { albumId } = useParams() as { albumId: string };
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!albumId) {
      setError("Missing albumId");
      setLoading(false);
      return;
    }
    fetch(`https://itunes.apple.com/lookup?id=${albumId}&entity=song`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch album");
        return res.json();
      })
      .then(setData)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [albumId]);

  if (loading) return <PageLoadingSpinner />;
  if (data && data.resultCount === 0) return <PageError title="Album not found" description="No album found with the provided ID." />;
  if (error || !data) return <PageError title="Error" description={error || "Unknown error"} />;

  const albumInfo = data.results[0];
  const songs = data.results.slice(1);
  const albumYear = new Date(albumInfo.releaseDate).getFullYear();

  return (
    <div>
      <div className="mb-6 bg-gray-800 border-b pb-8 pt-10 border-gray-700">
        <div className="flex items-start gap-4 wrapper">
          <img
            className="size-24 rounded-lg"
            src={albumInfo.artworkUrl100}
            alt={albumInfo.collectionName}
          />
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-x-3">
              <h1 className="text-4xl/tight font-bold line-clamp-2">{albumInfo.collectionName}</h1>
              {albumInfo.primaryGenreName && <Badge label={albumInfo.primaryGenreName} />}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-gray-400">{albumYear}</p>
              {albumInfo.collectionExplicitness === "explicit" && <ExplicitBadge />}
            </div>
          </div>
        </div>
      </div>
      <div className="wrapper">
        {songs.length > 0 ? <SongList infoToShow={["artistName"]} songs={songs} /> : <p>No songs found for this album</p>}
      </div>
    </div>
  );
}