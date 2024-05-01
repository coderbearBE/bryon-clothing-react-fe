import { Box, Image } from "@chakra-ui/react";

export const Logo = () => {
  return (
    <Box mx="auto">
      <Image
        src="/img/bryon-logo.png"
        alt="BRYON"
        p="25px"
        mb={{ base: 0, lg: "50px" }}
      />
    </Box>
  );
}
