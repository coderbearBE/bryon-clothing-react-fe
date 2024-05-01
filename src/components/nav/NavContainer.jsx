import { Flex } from "@chakra-ui/react";

export const NavContainer = ({ children }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      px={3}
      bg="darkerBlue"
      color="white"
    >
      {children}
    </Flex>
  );
};
