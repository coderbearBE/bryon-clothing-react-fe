import { Flex } from "@chakra-ui/react";

export default function NavContainer({ children }) {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg="blue.300"
      color="white"
    >
      {children}
    </Flex>
  );
}
