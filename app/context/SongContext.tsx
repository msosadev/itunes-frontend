import { createContext } from "react";

export const SongContext = createContext<{ setSongToPlay: (song: string) => void }>({
    setSongToPlay: () => {},
});
