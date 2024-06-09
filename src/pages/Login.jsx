import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  FormControl,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { HiLockClosed, HiMail } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { UserContext } from "../shared/context/UserContext";

export default function Login() {
  const { login } = useContext(UserContext);
  const [loginError, setLoginError] = useState("");
  const [show, setShow] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();

  const loginSchema = z.object({
    email: z.string().email({ message: "Gebruik een correct email adres" }),
    password: z
      .string()
      .min(5, { message: "Wachtwoord moet minstens 5 tekens lang zijn" }),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const toggleShow = () => setShow(!show);

  const handleLogin = async (userLogin) => {
    try {
      setIsLoggingIn(true);
      await login(userLogin);
      setIsLoggingIn(false);

      return navigate("/clothing");
    } catch (error) {
      setLoginError(error.message);
    }
  };

  return (
    <Center h="100vh" bg="darkerBlue">
      <Card shadow="2xl" bg="gray.50" m="15px">
        <CardBody>
          <VStack spacing="40px" align="stretch">
            <Box>
              <Image
                src="/img/bryon-logo.png"
                alt="BRYON"
                objectFit="contain"
                p="25px"
                bg="gray.300"
              />
            </Box>

            {loginError && <Text color="tomato">{loginError}</Text>}

            <form onSubmit={handleSubmit(handleLogin)}>
              <VStack spacing="25px">
                <FormControl>
                  <InputGroup size="sm">
                    <InputLeftElement pointerEvents="none" color="gray.300">
                      <Icon as={HiMail} />
                    </InputLeftElement>
                    <Input
                      {...register("email")}
                      type="text"
                      placeholder="Email"
                    />
                  </InputGroup>
                  {errors.email && (
                    <Text as="p" color="tomato" mt="5px">
                      {errors.email?.message}
                    </Text>
                  )}
                </FormControl>

                <FormControl>
                  <InputGroup size="sm">
                    <InputLeftElement pointerEvents="none" color="gray.300">
                      <Icon as={HiLockClosed} />
                    </InputLeftElement>
                    <Input
                      {...register("password")}
                      type={show ? "text" : "password"}
                      placeholder="Paswoord"
                    />
                    <InputRightElement w="4.5rem">
                      <Button
                        borderRadius="none"
                        size="sm"
                        h="1.5rem"
                        mr="3px"
                        bg="fluoPink"
                        color="white"
                        _hover={{ opacity: 0.75 }}
                        onClick={toggleShow}
                      >
                        {show ? "Verberg" : "Toon"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {errors.password && (
                    <Text as="p" color="tomato" mt="5px">
                      {errors.password?.message}
                    </Text>
                  )}
                </FormControl>

                <Button
                  type="submit"
                  borderRadius="none"
                  bg="fluoPink"
                  color="white"
                  w="full"
                  _hover={{ opacity: 0.75 }}
                  isDisabled={isLoggingIn}
                >
                  Login
                </Button>
              </VStack>
            </form>
          </VStack>
        </CardBody>
      </Card>
    </Center>
  );
}
