import { Avatar, Flex, Text } from "@chakra-ui/react";
import { useContext } from "react";

import { UserContext } from "../../shared/context/UserContext";

export const Profile = () => {
  const { user } = useContext(UserContext);

  return (
    <Flex m={2} justifyContent="end" alignItems="center">
      <Text>{user?.budget?.toFixed(2)} EUR</Text>
      <Text ml={8} fontWeight="bold">
        {user.firstname} {user.lastname}
      </Text>
      <Avatar ml={2} bg="darkerBlue" />
    </Flex>
  );
};
