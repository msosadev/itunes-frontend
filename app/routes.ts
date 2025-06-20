import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    route("/", "routes/dashboard.tsx", [
        index("routes/home.tsx"),
        route("search", "routes/search.tsx"),
        route("artist/:artistId", "routes/artist.tsx"),
        route("album/:albumId", "routes/album.tsx"),
    ]),
    route("*", "routes/catchall.tsx")
] satisfies RouteConfig;