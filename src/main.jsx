import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import UserContextProvider from "./shared/context/UserContext.jsx";

const theme = extendTheme({
  colors: {
    fluoPink: "#FF70C5",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);
