import { Flex } from "@chakra-ui/react";

export const ClothingContainer = ({ children }) => {
  return (
    <Flex direction="column" aligng="stretch" wrap="wrap" bg="lightGray" p={8}>
      {children}
    </Flex>
  );
};
