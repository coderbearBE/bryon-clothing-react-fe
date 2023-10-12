import { useState } from "react";

import { Logo } from "./Logo";
import { MenuToggle } from "./MenuToggle";
import { NavContainer } from "./NavContainer";
import { NavItems } from "./NavItems";

export const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavContainer>
      <Logo />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <NavItems isOpen={isOpen} />
    </NavContainer>
  );
};
