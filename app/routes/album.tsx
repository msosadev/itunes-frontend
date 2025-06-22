import { useLoaderData } from "react-router";
import type { Route } from "./+types/album";
import SongList from "~/components/SongList";
import PageError from "~/components/PageError";
import useRouteCatcher from "~/hooks/useRouteCatcher";
import Badge from "~/components/Badge";
import ExplicitBadge from "~/components/ExplicitBadge";

export async function loader({ params }: Route.LoaderArgs) {
  const { albumId } = params;
  if (!albumId) throw new Response("Missing albumId", { status: 400 });

  const response = await fetch(`https://itunes.apple.com/lookup?id=${albumId}&entity=song`);
  if (!response.ok) throw new Response("Failed to fetch artist", { status: response.status });
  const albumData = await response.json();

  return albumData;
}

export default function Album() {
  const data = useLoaderData<typeof loader>();
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
              <h1 className="text-6xl/tight font-bold line-clamp-2">{albumInfo.collectionName}</h1>
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

export function ErrorBoundary() {
  const { title, description } = useRouteCatcher();
  return <PageError title={title} description={description} />;
}