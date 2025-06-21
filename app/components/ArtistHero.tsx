import React from "react";
import heroFallback from "../assets/artist-hero-fallback.jpg";
import { ExternalLink } from "lucide-react";
import Badge from "./Badge";

interface ArtistHeroProps {
  artistInfo: {
    artistName: string;
    primaryGenreName: string;
    artistLinkUrl: string;
  };
  heroVideo: string;
}

const ArtistHero: React.FC<ArtistHeroProps> = ({ artistInfo, heroVideo }) => {
  if (!artistInfo || !artistInfo.artistName) {
    return null; // Handle case where artist info is not available
  }
  return (
    <div className="relative h-[500px]">
      <div className="z-[2] absolute inset-x-0 wrapper bottom-6 flex items-start gap-4">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-6xl font-bold line-clamp-2">{artistInfo.artistName}</h1>
            <Badge label={artistInfo.primaryGenreName} />
          </div>
          <a target="blank" className="flex items-center gap-1" href={artistInfo.artistLinkUrl}>iTunes Page <ExternalLink width={16} height={16} /></a>
        </div>
      </div>
      <div className="overlay absolute inset-0 z-[1] bg-gradient-to-t from-black to-transparent"></div>
      {heroVideo ?
        <video autoPlay muted loop src={heroVideo} className="absolute inset-0 w-full h-full object-cover"></video>
        :
        <img className="w-full h-full object-cover" src={heroFallback} alt="Artist hero" />
      }
    </div>
  );
};

export default ArtistHero;