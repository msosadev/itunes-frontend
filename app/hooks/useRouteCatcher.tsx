import { isRouteErrorResponse, useRouteError } from "react-router";

export default function useRouteCatcher() {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    return { title: "Resource not found", description: error.data };
  } else {
    return { title: "Unexpected Error", description: error instanceof Error ? error.message : String(error) }
  };
}