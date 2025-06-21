import type { Route } from "./+types/home";
import MainNavigation from "~/components/MainNavigation";
import { Outlet } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Dashboard() {
  return <>
  <MainNavigation />
  <main className="pb-24">
    <Outlet />
  </main>
  </>;
}
