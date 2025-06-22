import { useLoaderData } from "react-router";
import type { Route } from "./+types/album";
import SectionTitle from "~/components/SectionTitle";
import SongList from "~/components/SongList";
import PageError from "~/components/PageError";
import useRouteCatcher from "~/hooks/useRouteCatcher";

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

  return (
    <div className="wrapper">
      <SectionTitle title={albumInfo.collectionName} />
      {songs.length > 0 ? <SongList showArtist={true} songs={songs} /> : <p>No songs found for this album</p>}
    </div>
  );
}

export function ErrorBoundary() {
  const { title, description } = useRouteCatcher();
  return <PageError title={title} description={description} />;
}