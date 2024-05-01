import { Box } from "@chakra-ui/react";
import { HiMenu, HiX } from "react-icons/hi";

export const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={["block", "none", "none", "none"]} onClick={toggle}>
      {isOpen ? <HiX /> : <HiMenu />}
    </Box>
  );
}
