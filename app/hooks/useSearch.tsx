export async function useSearch(terms: string, limit?: number) {
    const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(terms)}&limit=${limit || 25}&entity=musicArtist,musicTrack,album`);
    if (!response.ok) throw new Response("Failed to fetch artist", { status: response.status });
    const data = await response.json();
    
    return data;
}