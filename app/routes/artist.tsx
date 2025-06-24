import { useParams } from "react-router";
import { useEffect, useState } from "react";
import AlbumGrid from "~/components/AlbumsGrid";
import ArtistHero from "~/components/ArtistHero";
import SectionTitle from "~/components/SectionTitle";
import SongList from "~/components/SongList";
import PageError from "~/components/PageError";
import PageLoadingSpinner from "~/components/PageLoadingSpinner";

export default function Artist() {
  const { artistId } = useParams() as { artistId: string };
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!artistId) {
      setError("Missing artistId");
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        // Fetch artist and top songs
        const response = await fetch(`https://itunes.apple.com/lookup?id=${artistId}&entity=song&limit=10`);
        if (!response.ok) throw new Error("Failed to fetch artist");
        const songsData = await response.json();

        // Fetch albums
        const albumsResponse = await fetch(`https://itunes.apple.com/lookup?id=${artistId}&entity=album`);
        if (!albumsResponse.ok) throw new Error("Failed to fetch albums");
        const albumsData = await albumsResponse.json();

        // Fetch music video
        const videoResponse = await fetch(`https://itunes.apple.com/lookup?id=${artistId}&entity=musicVideo&limit=1`);
        if (!videoResponse.ok) throw new Error("Failed to fetch music video");
        const videoData = await videoResponse.json();

        setData({ ...songsData, albums: albumsData.results, video: videoData });
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [artistId]);

  if (loading) return <PageLoadingSpinner />;
  if (data && data.resultCount === 0) return <PageError title="Artist not found" description="No artist found with the provided ID." />;
  if (error || !data) return <PageError title="Error" description={error || "Unknown error"} />;

  const artistInfo = data.results[0];
  const topSongs = data.results.slice(1);
  const albums = data.albums.slice(1);
  const heroVideo = data.video.results?.[1]?.previewUrl;

  return (
    <div>
      <ArtistHero
        artistInfo={artistInfo}
        heroVideo={heroVideo}
      />
      <div className="wrapper">
        <SectionTitle title="Top Songs" />
        <SongList songs={topSongs} infoToShow={["collectionName", "artworkUrl100"]} />
      </div>

      <div className="mt-8 wrapper">
        <AlbumGrid
          infoToShow={["collectionName", "releaseDate"]}
          albums={albums
            .filter((album: any) => album.trackCount > 1)
            .sort((a: any, b: any) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
          }
          title="Albums & EPs"
        />
        <AlbumGrid
          infoToShow={["collectionName", "releaseDate"]}
          albums={albums
            .filter((album: any) => album.trackCount === 1)
            .sort((a: any, b: any) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
          }
          title="Singles"
        />
      </div>
    </div>
  );
}