import { Center, Spinner } from "@chakra-ui/react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { ListExport } from "../components/orders";
import { ErrorFallback } from "../shared/components";

export default function Lists() {
  return (
    <>
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
          <ListExport />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
