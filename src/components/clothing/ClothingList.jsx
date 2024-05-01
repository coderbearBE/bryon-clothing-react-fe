import {
  Box,
  Button,
  HStack,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  useToast,
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
  const [totalAmount, setTotalAmount] = useState(0);
  const [restAmount, setRestAmount] = useState(0);

  const { get, post } = useAxios();
  const { user } = useContext(UserContext);
  const { data: clothingItems } = useSWR(
    "/products",
    async (path) => await get(path),
    { suspense: true }
  );
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm();

  const toast = useToast();

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

  useEffect(() => {
    if (currentOrderItems.length !== 0) {
      let amount = 0;
      for (const item of currentOrderItems) {
        amount = amount + item.quantity * item.price;
      }

      setTotalAmount(amount);

      const rest = user.budget - amount;
      setRestAmount(rest);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentOrderItems]);

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

  const handleOrderOverview = (formData) => {
    const formDataWithSizeAndQuantity = Object.entries(formData).filter(
      (entry) => !R.isEmpty(entry[1].size) && entry[1].quantity !== 0
    );

    const orderList = transformFormData(formDataWithSizeAndQuantity);
    setCurrentOrderItems(orderList);

    toggleSlideIn();
  };

  const handleOrderSubmit = async () => {
    const owner = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      budget: user.budget,
    };

    const order = {
      owner,
      year: new Date().getFullYear(),
      products: currentOrderItems,
      totalAmount,
      restAmount,
    };

    try {
      await post("/orders", order);

      toast({
        title: "Bedankt voor je bestelling!",
        status: "success",
        duration: 5000,
        position: "bottom-left",
        variant: "left-accent",
      });
    } catch (error) {
      toast({
        title: "Je hebt al een bestelling gemaakt voor dit jaar.",
        status: "error",
        duration: 5000,
        position: "bottom-left",
        variant: "left-accent",
      });
    }

    reset();
    toggleSlideIn();
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleOrderOverview)}>
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
                  <Input
                    type="number"
                    w="80px"
                    focusBorderColor="blackAlpha.300"
                    placeholder="0 - 15"
                    _placeholder={{ color: "blackAlpha.900" }}
                    {...register(`${item.productCode}.quantity`, {
                      min: 0,
                      max: 15,
                      value: 0,
                      valueAsNumber: true,
                    })}
                  />
                </HStack>
              </Stack>
            </div>
          ))}

          {!R.isEmpty(errors) && (
            <Box
              as="p"
              px={4}
              py={2}
              bg="red.100"
              color="red.500"
              border="2px"
              borderColor="red.500"
              fontSize="large"
              fontStyle="italic"
              fontWeight="bold"
            >
              Vul een getal tussen 0 en 15 in
            </Box>
          )}

          <Box>
            <Button
              type="submit"
              bg="fluoPink"
              color="white"
              size="md"
              w={["full", "150px", "150px", "150px"]}
              mt={6}
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
        submitOrder={handleOrderSubmit}
        totalAmount={totalAmount}
        restAmount={restAmount}
        userBudget={user.budget}
      />
    </>
  );
};
