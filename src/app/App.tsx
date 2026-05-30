import { RouterProvider } from "./router-exports";
import { router } from "./routes";

export default function App() {
  return <RouterProvider router={router} />;
}
