import { Center, Spinner } from "@chakra-ui/react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { ClothingContainer, ClothingList } from "../components/clothing";
import { ErrorFallback } from "../shared/components";

export default function Clothing() {
  return (
    <>
      <ClothingContainer>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense
            fallback={
              <Center>
                <Spinner
                  size="lg"
                  thickness="3px"
                  emptyColor="gray.100"
                  color="fluoPink"
                />
              </Center>
            }
          >
            <ClothingList />
          </Suspense>
        </ErrorBoundary>
      </ClothingContainer>
    </>
  );
}
