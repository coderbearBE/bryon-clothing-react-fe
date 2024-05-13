import { Center, Spinner } from "@chakra-ui/react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { MyOrderOverview } from "../components/orders";
import { ErrorFallback, PageContainer } from "../shared/components";

export default function MyOrder() {
  return (
    <>
      <PageContainer>
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
            <MyOrderOverview />
          </Suspense>
        </ErrorBoundary>
      </PageContainer>
    </>
  );
}
