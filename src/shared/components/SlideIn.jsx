import { Box, Button, Slide } from "@chakra-ui/react";

export const SlideIn = ({ isOpen, toggle }) => {
  return (
    <Slide in={isOpen} style={{ zIndex: 10 }}>
      <Box
        position="fixed"
        top={0}
        right={0}
        bottom={0}
        w={["300px", "300px", "500px", "750px"]}
        rounded="none"
        p="50px"
        bg="tomato"
        color="white"
        shadow="2xl"
      >
        This is a box
        <Button onClick={toggle}>Ok</Button>
      </Box>
    </Slide>
  );
}
