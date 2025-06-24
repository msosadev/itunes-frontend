import { createContext } from "react";

export const SongContext = createContext<{ setSongToPlay: (song: Record<string, any>) => void, songToPlay: any }>({
    setSongToPlay: () => {},
    songToPlay: {}
});
