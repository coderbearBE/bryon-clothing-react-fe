import { Box, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import * as R from "ramda";
import { useCallback, useContext, useEffect, useState } from "react";

import { useAxios } from "../../hooks";
import { UserContext } from "../../shared/context/UserContext";

export const MyOrderOverview = () => {
  const [orderData, setOrderData] = useState({});
  const { post } = useAxios();
  const { user } = useContext(UserContext);

  const fetchMyOrderData = useCallback(async () => {
    const owner = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      budget: user.budget,
    };

    try {
      const myOrder = await post("/orders/current", { owner });

      setOrderData(myOrder);
    } catch (error) {
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (!R.isEmpty(user)) fetchMyOrderData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <VStack spacing={4} w="full" h="full" align="stretch">
        <Heading mb={4}>Mijn bestelling</Heading>

        {!R.isEmpty(orderData) ? (
          <>
            <Box pl={4} pb={12} w="50%">
              {orderData.products.map((product) => (
                <HStack
                  key={product.id}
                  mb={4}
                  w="full"
                  justify="space-between"
                >
                  <Box>
                    <Text>
                      {product.quantity}x {product.descriptionBryon}
                    </Text>

                    <Text>
                      <b>Maat: </b>
                      {product.size}
                    </Text>
                  </Box>

                  <Text>
                    {(product.quantity * product.price).toFixed(2)} EUR
                  </Text>
                </HStack>
              ))}
            </Box>

            <HStack pl={4} w="50%" justify="space-between">
              <Text fontWeight="bold" fontSize="lg">
                Totaalbedrag bestelling:
              </Text>

              <Text>{orderData.totalAmount.toFixed(2)} EUR</Text>
            </HStack>

            <HStack pl={4} w="50%" justify="space-between">
              <Text fontWeight="bold" fontSize="lg">
                Jouw budget:
              </Text>

              <Text>{orderData.owner.budget.toFixed(2)} EUR</Text>
            </HStack>

            <HStack pl={4} w="50%" justify="space-between">
              {orderData.restAmount < 0 ? (
                <Text color="tomato" fontWeight="bold" fontSize="lg">
                  Te betalen
                </Text>
              ) : (
                <Text color="green" fontWeight="bold" fontSize="lg">
                  Overig budget
                </Text>
              )}
              <Text fontWeight="bold">
                {Math.abs(orderData.restAmount).toFixed(2)} EUR
              </Text>
            </HStack>
          </>
        ) : (
          <Box>
            <Text mb={4}>Je heb nog geen bestelling geplaatst.</Text>
            <Text mb={4}>
              Gelieve eerst je kledij te kiezen en een bestelling te plaatsen.
            </Text>
          </Box>
        )}
      </VStack>
    </>
  );
};
