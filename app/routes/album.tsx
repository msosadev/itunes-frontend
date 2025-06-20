import type { Route } from "./+types/album";

export async function loader({ params }: Route.LoaderArgs) {
  //                           ^? { teamId: string }
}

export default function Component({
  params,
}: Route.ComponentProps) {
  return (
    <div>
      <h1>Album</h1>
      <p>Album ID: {params.albumId}</p>
    </div>
  );
}