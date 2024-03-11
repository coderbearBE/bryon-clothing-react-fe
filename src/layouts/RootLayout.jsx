import { Grid, GridItem } from "@chakra-ui/react";
import * as R from "ramda";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { Nav } from "../components/nav";
import { UserContext } from "../shared/context/UserContext";

export default function RootLayout() {
  const { user } = useContext(UserContext);

  return (
    <>
      {R.isEmpty(user) && !localStorage.getItem("authUser") ? (
        <Navigate replace to="login" />
      ) : (
        <Grid templateColumns="repeat(6, 1fr)">
          <GridItem
            as="aside"
            colSpan={{ base: 6, lg: 1 }}
            minH={{ lg: "100vh" }}
            bg="darkerBlue"
          >
            <Nav />
          </GridItem>
          <GridItem
            as="main"
            colSpan={{ base: 6, lg: 5 }}
            bg="white"
            minH="100vh"
            p="50px"
          >
            <Outlet />
          </GridItem>
        </Grid>
      )}
    </>
  );
}
