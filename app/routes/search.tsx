import { Guitar, Loader, SearchIcon } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { Link } from "react-router";
import AlbumGrid from "~/components/AlbumsGrid";
import SectionTitle from "~/components/SectionTitle";
import SongList from "~/components/SongList";
import { useSearch } from "~/hooks/useSearch";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const inputId = useId();

  async function searchHandler() {
    const trimmedSearch = searchTerm.trim();
    if (!trimmedSearch) return;

    setLoading(true);
    let searchResults;
    try {
      searchResults = await useSearch(trimmedSearch, 25);
    } catch (error) {
      console.error("Error during search:", error);
      setLoading(false);
      setError(true);
      return;
    }
    
    setError(false);
    setLoading(false);
    setSearchPerformed(true);
    setResults(searchResults.results || []);
  }

  useEffect(() => {
    if (searchTerm.trim() === "") return;
    const searchTimeout = setTimeout(() => {
      if (searchTerm.trim()) {
        searchHandler();
      } else {
        setResults([]);
        setSearchPerformed(false);
      }
    }, 1000);
    return () => clearTimeout(searchTimeout);

  }, [searchTerm]);

  return (
    <div className="wrapper mt-10 space-y-4">
      <h1 className="text-3xl font-bold">Search</h1>
      <div className={`flex flex-col gap-4 p-0.5 magic-gradient after:opacity-0 has-[input:focus]:after:opacity-100 rounded-lg transition-opacity ${loading ? "opacity-50 pointer-events-none" : ""}  `}>
        <form
          className="bg-gray-700 rounded-md flex items-center relative z-[1] justify-center w-full"
          onSubmit={e => {
            e.preventDefault();
            searchHandler();
          }}
        >
          <label className="mx-4" htmlFor={inputId}><SearchIcon /></label>
          <input
            onChange={e => setSearchTerm(e.target.value)}
            value={searchTerm}
            id={inputId}
            type="text"
            className="w-full h-full p-4 pl-0 outline-0"
            placeholder="Search for artists, albums, or songs"
          />
        </form>
      </div>
      {error && <p className="text-red-300">An error occurred while searching. Please try again.</p>}
      <Loader className={`animate-spin mx-auto text-gray-500 ${loading ? "block" : "hidden"}`} />
      {results.length > 0 && (
        <div className="mt-4">
          {results.filter(result => result.wrapperType === "artist").length > 0 && (
            <div>
              <SectionTitle title={`Artists`} />
              <ul className="space-y-2">
                {results.filter(result => result.wrapperType === "artist").map((result, index) => (
                  <li className="flex gap-2 items-center" key={index}>
                    <Guitar width={20} className="text-gray-400" />
                    <Link to={`/artist/${result.artistId}`}>{result.artistName}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <AlbumGrid infoToShow={["artistName", "releaseDate"]} albums={results.filter(result => result.wrapperType === "collection")} title="Albums" />
          {results.filter(result => result.wrapperType === "track").length > 0 && (
            <div>
              <SectionTitle title={`Songs`} />
              <SongList songs={results.filter(result => result.wrapperType === "track")} />
            </div>
          )}
        </div>
      )}
      {results.length === 0 && searchPerformed && <p className="text-gray-500">No results found.</p>}
    </div>
  );
}