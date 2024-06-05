import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { AuthorizedRoute } from "./components/routing/";
import RootLayout from "./layouts/RootLayout";
import Clothing from "./pages/Clothing";
import Login from "./pages/Login";
import MyOrder from "./pages/MyOrder";
import NotFound from "./pages/NotFound";
import Lists from "./pages/Lists";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="login" element={<Login />} />
      <Route path="/" element={<RootLayout />}>
        <Route path="clothing" index element={<Clothing />} />
        <Route path="order" element={<MyOrder />} />
        <Route
          path="lists"
          element={
            <AuthorizedRoute>
              <Lists />
            </AuthorizedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
