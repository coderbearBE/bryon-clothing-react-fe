import {
  Box,
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
import * as R from "ramda";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

import { useAxios } from "../../hooks";
import { SlideIn } from "../../shared/components";
import { UserContext } from "../../shared/context/UserContext";
import {
  accessorySizes,
  shoeSizes,
  sizes,
  underwearSizes,
} from "../../shared/constants";

export const ClothingList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredClothingItems, setFilteredClothingItems] = useState([]);
  const [currentOrderItems, setCurrentOrderItems] = useState([]);

  const { get } = useAxios();
  const { user } = useContext(UserContext);
  const { data: clothingItems } = useSWR(
    "/products",
    async (path) => await get(path),
    { suspense: true }
  );
  const { handleSubmit, register } = useForm();

  useEffect(() => {
    if (clothingItems.length !== 0) {
      setFilteredClothingItems(
        clothingItems.filter(
          (item) => R.isNil(item.retailFor) || item.retailFor === user.gender
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clothingItems]);

  const toggleSlideIn = () => setIsOpen(!isOpen);

  const renderSelectOptions = (item) => {
    switch (item.clothingType) {
      case "ACCESSORY":
        return (
          <>
            {accessorySizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </>
        );
      case "FOOTWEAR":
        return (
          <>
            {shoeSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </>
        );
      case "UNDERWEAR":
        return (
          <>
            {underwearSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </>
        );
      default:
        return (
          <>
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </>
        );
    }
  };

  const transformFormData = (formData) => {
    let order = [];
    for (const item of formData) {
      const orderedItem = clothingItems.find(
        (clothingItem) => clothingItem.productCode === item[0]
      );
      order = [...order, { ...orderedItem, ...item[1] }];
    }

    return order;
  };

  const handleOrderSubmit = (formData) => {
    const formDataWithSizeAndQuantity = Object.entries(formData).filter(
      (entry) => !R.isEmpty(entry[1].size) && entry[1].quantity !== "0"
    );

    const orderList = transformFormData(formDataWithSizeAndQuantity);
    setCurrentOrderItems(orderList);

    toggleSlideIn();
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleOrderSubmit)}>
        <VStack spacing={4} w="full" h="full" align="stretch">
          <Heading mb={4}>Kledij Bryon (Doltcini)</Heading>

          {filteredClothingItems.map((item) => (
            <div key={item.id}>
              <Stack
                direction={["column", "column", "row", "row"]}
                justifyContent="space-between"
              >
                <Text>{item.descriptionBryon}</Text>
                <HStack justifyContent="space-between">
                  <Text w="120px" fontWeight="bold" mr={8}>
                    {item.price.toFixed(2)} EUR
                  </Text>
                  <Select
                    w="120px"
                    placeholder="Maat.."
                    {...register(`${item.productCode}.size`)}
                  >
                    {renderSelectOptions(item)}
                  </Select>

                  <NumberInput
                    defaultValue={0}
                    min={0}
                    max={15}
                    precision={0}
                    size="sm"
                    maxW={16}
                    {...register(`${item.productCode}.quantity`)}
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
          <Box>
            <Button
              type="submit"
              bg="fluoPink"
              color="white"
              size="md"
              w={["full", "150px", "150px", "150px"]}
              mt={12}
              borderRadius="none"
              _hover={{ opacity: 0.75 }}
            >
              Bevestigen
            </Button>
          </Box>
        </VStack>
      </form>

      <SlideIn
        isOpen={isOpen}
        toggle={toggleSlideIn}
        orderedItems={currentOrderItems}
      />
    </>
  );
};
