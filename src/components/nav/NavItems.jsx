import { Box, Button, Spacer, Stack } from "@chakra-ui/react";
import { FaShoppingBasket, FaTshirt } from "react-icons/fa";

import { NavItem } from "./NavItem";
import { useContext } from "react";
import { UserContext } from "../../shared/context/UserContext";

export const NavItems = ({ isOpen }) => {
  let { user } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    location.reload();
  };

  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
      w="full"
    >
      <Stack
        spacing={8}
        align="center"
        direction={["column", "row", "row", "column"]}
        pt={[4, 4, 2, 2]}
      >
        <NavItem to="/clothing" icon={FaTshirt}>
          Kledij
        </NavItem>
        {user.role !== "MEMBER" && (
          <NavItem to="/orders" icon={FaShoppingBasket}>
            Orders
          </NavItem>
        )}
        <Spacer />
        <Button
          borderRadius="none"
          bg="fluoPink"
          color="white"
          w={{ base: "full", md: "150px", lg: "full" }}
          _hover={{ opacity: 0.75 }}
          onClick={handleLogout}
        >
          Log uit
        </Button>
      </Stack>
    </Box>
  );
};
