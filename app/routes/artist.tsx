import { useLoaderData } from "react-router";
import type { Route } from "./+types/artist";
import SongListItem from "~/components/SongListItem";

export async function loader({ params }: Route.LoaderArgs) {
  const { artistId } = params;
  if (!artistId) throw new Response("Missing artistId", { status: 400 });
  const response = await fetch(`https://itunes.apple.com/lookup?id=${artistId}&entity=song&limit=10`);
  
  if (!response.ok) throw new Response("Failed to fetch artist", { status: response.status });
  const data = await response.json();
  return data; // this will be available in your component via useLoaderData()
}
export default function Component({
  params,
}: Route.ComponentProps) {
  const data = useLoaderData<typeof loader>();
  const artistInfo = data.results[0];
  const topSongs = data.results.slice(1);

  return (
    <div className="wrapper">
      <img src={topSongs[0].artworkUrl100} alt={artistInfo.artistName} />
      <h1>{artistInfo.artistName}</h1>
      <h1>{artistInfo.primaryGenreName}</h1>
      <a href={artistInfo.artistLinkUrl}>iTunes</a>
      <h2>Top Songs</h2>
      <ul className="bg-gray-800 rounded-lg">
        {topSongs.map((song: any, idx: number) => (
          <>
        <SongListItem song={song} />
        {idx < topSongs.length - 1 && (
          <li>
            <hr className="border-gray-600 my-1" />
          </li>
        )}
          </>
        ))}
      </ul>
    </div>
  );
}