import type { Route } from "./+types/artist";

export async function loader({ params }: Route.LoaderArgs) {
  //                           ^? { teamId: string }
}

export default function Component({
  params,
}: Route.ComponentProps) {
  return (
    <div>
      <h1>Artist</h1>
      <p>Artist ID: {params.artistId}</p>
    </div>
  );
}