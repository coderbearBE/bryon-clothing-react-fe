import { Flex } from "@chakra-ui/react";

export const ClothingContainer = ({ children }) => {
  return (
    <Flex
      direction="column"
      aligng="stretch"
      wrap="wrap"
      bg="white"
      borderRadius="md"
      p={8}
      boxShadow="2xl"
    >
      {children}
    </Flex>
  );
}
