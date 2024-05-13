import { Flex } from "@chakra-ui/react";

export const PageContainer = ({ children }) => {
  return (
    <Flex direction="column" align="stretch" wrap="wrap" bg="lightGray" p={8}>
      {children}
    </Flex>
  );
};
