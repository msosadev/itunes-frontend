import { useEffect, useState } from "react";
import AlbumGrid from "~/components/AlbumsGrid";
import PageLoadingSpinner from "~/components/PageLoadingSpinner";

async function getTopEntities(entity: string) {
  const url = `https://rss.applemarketingtools.com/api/v2/us/music/most-played/10/${entity}.json`;
  // Proxy to avoid cors errors, usable only in testing
  const response = await fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`);
  if (!response.ok) throw new Response("Failed to fetch artist", { status: response.status });
  const data = await response.json();

  return data;
}

export default function Home() {
  const [topAlbums, setTopAlbums] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const albumData = await getTopEntities("albums");
        setTopAlbums(albumData.feed.results);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  if (topAlbums.length === 0) return <PageLoadingSpinner />
  return (
    <div className="wrapper">
      {topAlbums && <AlbumGrid title="Top Albums" infoToShow={["name", "artistName", "mainGenre"]} albums={topAlbums} />}
    </div>
  );
}
