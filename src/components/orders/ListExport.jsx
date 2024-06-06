import { DownloadIcon } from "@chakra-ui/icons";
import { Button, Heading, HStack } from "@chakra-ui/react";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { PDFBryon } from "./PdfBryon";
import { PDFDoltcini } from "./PdfDoltcini";

export const ListExport = () => (
  <>
    <Heading mb={12}>Download lijsten</Heading>
    <HStack w="50%">
      <PDFDownloadLink document={<PDFBryon />} fileName="orders_bryon.pdf">
        <Button
          leftIcon={<DownloadIcon />}
          bg="fluoPink"
          color="white"
          size="md"
          mr={8}
          w={["full", "200px", "200px", "200px"]}
          borderRadius="none"
          _hover={{ opacity: 0.75 }}
        >
          BCT orders
        </Button>
      </PDFDownloadLink>
      <PDFDownloadLink document={<PDFDoltcini />} fileName="order_doltcini.pdf">
        <Button
          leftIcon={<DownloadIcon />}
          bg="fluoPink"
          color="white"
          size="md"
          w={["full", "200px", "200px", "200px"]}
          borderRadius="none"
          _hover={{ opacity: 0.75 }}
        >
          Doltcini
        </Button>
      </PDFDownloadLink>
    </HStack>
  </>
);
