import {
  Button,
  HStack,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

import { useAxios } from "../../hooks";
import { SlideIn } from "../../shared/components";
import { sizes } from "../../shared/constants/enums";

export const ClothingList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState({});
  
  const { get } = useAxios();
  const {data: clothingItems} = useSWR(
    '/products',
    async (path) => await get(path),
    { suspense: true, }
  );
  const { handleSubmit, register } = useForm();

  const toggleSlideIn = () => setIsOpen(!isOpen);

  const handleOrderSubmit = (orderData) => {
    console.log("Order preview (keys)", Object.keys(orderData));
    console.log("Order preview (values)", Object.values(orderData));
    console.log("Order preview (entries)", Object.entries(orderData));
    const filtered = Object.entries(orderData).filter(
      (entry) => entry[1] !== "0"
    );
    console.log(filtered);
    console.log("clothingItems", clothingItems);
    // TODO setCurrentOrder and pass it to SlideIn component
    toggleSlideIn();
  };
  
  return (
    <>
      <form onSubmit={handleSubmit(handleOrderSubmit)}>
        <VStack spacing={4} w="full" h="full" align="stretch">
          <Heading>ClothingList</Heading>

          {clothingItems.map((item) => (
            <div key={item.id}>
              <Stack
                direction={["column", "column", "row", "row"]}
                justifyContent="space-between"
              >
                <Text>
                  {item.description_bryon} {item.additional_info}
                </Text>
                <HStack justifyContent="space-between">
                  <Text w="120px" fontWeight="bold" mr={8}>
                    {item.price} EUR
                  </Text>
                  <Select
                    w="120px"
                    placeholder="Maat.."
                    {...register(`${item.id}.size`)}
                  >
                    {sizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </Select>

                  <NumberInput
                    defaultValue={0}
                    min={0}
                    max={15}
                    precision={0}
                    size="sm"
                    maxW={16}
                    {...register(`${item.id}.quantity`)}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper>+</NumberIncrementStepper>
                      <NumberDecrementStepper>-</NumberDecrementStepper>
                    </NumberInputStepper>
                  </NumberInput>
                </HStack>
              </Stack>
            </div>
          ))}
          <Button
            type="submit"
            bg="fluoPink"
            color="white"
            size="md"
            w={["full", "150px", "150px", "150px"]}
            borderRadius="none"
            _hover={{ opacity: 0.75 }}
          >
            Bevestigen
          </Button>
        </VStack>
      </form>

      <SlideIn isOpen={isOpen} toggle={toggleSlideIn} />
    </>
  );
}
