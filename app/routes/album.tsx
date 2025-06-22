import { useLoaderData } from "react-router";
import type { Route } from "./+types/album";
import { Section } from "lucide-react";
import SectionTitle from "~/components/SectionTitle";
import React from "react";
import SongListItem from "~/components/SongListItem";
import SongList from "~/components/SongList";

export async function loader({ params }: Route.LoaderArgs) {
  const { albumId } = params;
  if (!albumId) throw new Response("Missing albumId", { status: 400 });

  // First API call: fetch artist and songs
  const response = await fetch(`https://itunes.apple.com/lookup?id=${albumId}&entity=song`);
  if (!response.ok) throw new Response("Failed to fetch artist", { status: response.status });
  const albumData = await response.json();

  // Return both results
  return albumData;
}

export default function Component({
  params,
}: Route.ComponentProps) {
  const data = useLoaderData<typeof loader>();
  const albumInfo = data.results[0];
  const songs = data.results.slice(1);

  return (
    <div className="wrapper">
      <SectionTitle title={albumInfo.collectionName} />
      {songs.length > 0 ? <SongList songs={songs} /> : <p>No songs found for this album</p>}
    </div>
  );
}