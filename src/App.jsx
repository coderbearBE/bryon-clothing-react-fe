import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "./pages/Login";
import RootLayout from "./layouts/RootLayout";
import Clothing from "./pages/Clothing";
import NotFound from "./pages/NotFound";
import Orders from "./pages/Orders";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="login" element={<Login />} />
      <Route path="/" element={<RootLayout />}>
        <Route path="clothing" index element={<Clothing />} />
        <Route path="orders" element={<Orders />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
