import { useLoaderData } from "react-router";
import type { Route } from "./+types/artist";
import SongListItem from "~/components/SongListItem";
import React from "react";
import AlbumCarousel from "~/components/AlbumsGrid";
import ArtistHero from "~/components/ArtistHero";

export async function loader({ params }: Route.LoaderArgs) {
  const { artistId } = params;
  if (!artistId) throw new Response("Missing artistId", { status: 400 });

  // First API call: fetch artist and songs
  const response = await fetch(`https://itunes.apple.com/lookup?id=${artistId}&entity=song&limit=10`);
  if (!response.ok) throw new Response("Failed to fetch artist", { status: response.status });
  const songsData = await response.json();

  // Example: Second API call, e.g., fetch artist's albums
  const albumsResponse = await fetch(`https://itunes.apple.com/lookup?id=${artistId}&entity=album`);
  if (!albumsResponse.ok) throw new Response("Failed to fetch albums", { status: albumsResponse.status });
  const albumsData = await albumsResponse.json();

  const videoResponse = await fetch(`https://itunes.apple.com/lookup?id=${artistId}&entity=musicVideo&limit=1`);
  if (!videoResponse.ok) throw new Response("Failed to fetch music video", { status: videoResponse.status });
  const videoData = await videoResponse.json();

  // Return both results
  return { ...songsData, albums: albumsData.results, video: videoData };
}

export default function Artist() {
  const data = useLoaderData<typeof loader>();
  const artistInfo = data.results[0];
  const topSongs = data.results.slice(1);
  const albums = data.albums.slice(1);
  const heroVideo = data.video.results[1].previewUrl;

  return (
    <div>
      <ArtistHero
        artistInfo={artistInfo}
        heroVideo={heroVideo}
      />
      <div className="wrapper">
        <h2 className="my-4">Top Songs</h2>
        <ul className="bg-gray-800 rounded-lg">
          {topSongs.map((song: any, idx: number) => (
            <React.Fragment key={song.trackId}>
              <SongListItem song={song} />
              {idx < topSongs.length - 1 && (
                <li>
                  <hr className="border-gray-600 my-1" />
                </li>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>

      <div className="mt-8 wrapper">
        <AlbumCarousel albums={albums} title="Discography" />
      </div>
    </div>
  );
}