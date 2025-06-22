import PageError from "~/components/PageError";

export default function CatchAll() {
  return <PageError title="Page Not Found" description="The page you are looking for can't be found." />;
}