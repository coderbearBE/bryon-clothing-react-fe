import { Box, Center, Heading, Text } from "@chakra-ui/react";

export default function NotFound() {
  return (
    <Center mt="250px">
      <Box>
        <Heading as="h1" size="4xl" color="white" align="center">
          404
        </Heading>
        <Text color="white" align="center">
          Deze pagina bestaat niet
        </Text>
      </Box>
    </Center>
  );
}
