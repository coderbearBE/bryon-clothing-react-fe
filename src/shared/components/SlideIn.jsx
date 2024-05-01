import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Heading,
  Slide,
  Text,
  VStack,
} from "@chakra-ui/react";

export const SlideIn = ({
  isOpen,
  orderedItems,
  restAmount,
  submitOrder,
  toggle,
  totalAmount,
  userBudget,
}) => (
  <Slide in={isOpen} style={{ zIndex: 10 }}>
    <Box
      position="fixed"
      top={0}
      right={0}
      bottom={0}
      w={["300px", "300px", "500px", "750px"]}
      rounded="none"
      p="50px"
      bg="white"
      shadow="2xl"
    >
      <Heading mb={12}>Overzicht</Heading>
      <VStack w="full" alignItems="start">
        {orderedItems.length !== 0 ? (
          <>
            <Box mb={12} w="full">
              {orderedItems.map((item) => (
                <HStack key={item.id} mb={4} w="full" justify="space-between">
                  <Box>
                    <Text>
                      {item.quantity}x {item.descriptionBryon}
                    </Text>

                    <Text>
                      <b>Maat: </b>
                      {item.size}
                    </Text>
                  </Box>

                  <Text>{(item.quantity * item.price).toFixed(2)} EUR</Text>
                </HStack>
              ))}
            </Box>

            <VStack bg="lightGray" px={4} py={6} w="full">
              <HStack w="full" justify="space-between">
                <Text fontWeight="bold" fontSize="lg">
                  Totaalbedrag bestelling:
                </Text>
                <Text>{totalAmount.toFixed(2)} EUR</Text>
              </HStack>

              <HStack w="full" justify="space-between">
                <Text fontWeight="bold" fontSize="lg">
                  Jouw budget:
                </Text>
                <Text>{userBudget.toFixed(2)} EUR</Text>
              </HStack>

              <HStack w="full" justify="space-between">
                {restAmount < 0 ? (
                  <Text color="tomato" fontWeight="bold" fontSize="lg">
                    Te betalen
                  </Text>
                ) : (
                  <Text color="green" fontWeight="bold" fontSize="lg">
                    Overig budget
                  </Text>
                )}
                <Text fontWeight="bold">
                  {Math.abs(restAmount).toFixed(2)} EUR
                </Text>
              </HStack>
            </VStack>
          </>
        ) : (
          <>
            <Heading size="md">LET OP!</Heading>
            <Text>Je hebt nog geen kledij geselecteerd.</Text>
            <Text>
              Gelieve een maat en het gewenste aantal stuks te selecteren.
            </Text>
          </>
        )}
      </VStack>
      <ButtonGroup mt={12} gap={2}>
        <Button
          bg="lightGray"
          size="md"
          w={["full", "150px", "150px", "150px"]}
          borderRadius="none"
          _hover={{ opacity: 0.75 }}
          onClick={toggle}
        >
          Annuleren
        </Button>
        <Button
          bg="fluoPink"
          color="white"
          size="md"
          w={["full", "150px", "150px", "150px"]}
          borderRadius="none"
          _hover={{ opacity: 0.75 }}
          onClick={submitOrder}
          isDisabled={orderedItems.length === 0}
        >
          Bestellen
        </Button>
      </ButtonGroup>
    </Box>
  </Slide>
);
