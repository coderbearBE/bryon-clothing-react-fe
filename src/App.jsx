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
import Orders from "./pages/Orders";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="login" element={<Login />} />
      <Route path="/" element={<RootLayout />}>
        <Route path="clothing" index element={<Clothing />} />
        <Route path="order" element={<MyOrder />} />
        <Route
          path="orders"
          element={
            <AuthorizedRoute>
              <Orders />
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
