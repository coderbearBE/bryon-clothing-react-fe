import { Heading, Text } from "@chakra-ui/react";

export const ErrorFallback = ({ error }) => {
  return (
    <>
      <Heading as="h1" mb={4}>
        Oeps! Er is iets misgegaan..
      </Heading>
      <Text as="i" color="tomato" mb={4}>
        {error.message}
      </Text>
      <Text>Gelieve het bestuur te contacteren.</Text>
    </>
  );
}
