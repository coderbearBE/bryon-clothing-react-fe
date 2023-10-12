import { HStack, Icon, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export const NavItem = ({ children, icon, to }) => {
  const activeColor = "#F7F0F0";

  return (
    <NavLink
      to={to}
      style={({ isActive }) => {
        return {
          color: isActive ? activeColor : "white",
          boxShadow: isActive ? `0 2px 0 ${activeColor}` : "",
        };
      }}
    >
      <HStack spacing={2} alignItems="baseline" w="full">
        <Icon as={icon} />
        <Text display="block" fontSize="lg" fontWeight="semibold">
          {children}
        </Text>
      </HStack>
    </NavLink>
  );
};
