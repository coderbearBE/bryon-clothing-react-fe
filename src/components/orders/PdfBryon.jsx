import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import * as R from "ramda";
import { useCallback, useEffect, useState } from "react";

import { useAxios } from "../../hooks";

const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    marginVertical: 50,
    paddingHorizontal: 40,
  },
  spaceBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  flexEnd: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  row: {
    paddingVertical: 4,
    flexDirection: "row",
  },
  columnSmall: { flex: 0.75 },
  columnLarge: { flex: 3 },
  header: { marginBottom: 24 },
  thead: {
    paddingHorizontal: 6,
    paddingVertical: 12,
    backgroundColor: "#161F32",
    color: "#fff",
    display: "flex",
  },
  tbody: {
    paddingHorizontal: 6,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#161F32",
  },
  tfooter: {
    marginVertical: 12,
  },
});

export const PDFBryon = () => {
  const [orderList, setOrderList] = useState([]);
  const { get } = useAxios();

  const fetchBryonOrders = useCallback(async () => {
    try {
      const response = await get("/orders/all");

      setOrderList(response);
    } catch (error) {
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchBryonOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!R.isEmpty(orderList) ? (
        <Document>
          {orderList.map(({ id, owner, products, restAmount, totalAmount }) => (
            <Page key={id} size="A4" style={styles.page}>
              <View style={styles.header}>
                <View style={styles.spaceBetween}>
                  <Text>
                    {owner.firstname.toUpperCase()}{" "}
                    {owner.lastname.toUpperCase()}
                  </Text>
                  <Text>{owner.email}</Text>
                </View>
              </View>
              <View style={[styles.thead, styles.spaceBetween]}>
                <View style={styles.columnLarge}>
                  <Text>Beschrijving</Text>
                </View>
                <View style={styles.columnSmall}>
                  <Text>Maat</Text>
                </View>
                <View style={styles.columnSmall}>
                  <Text>Prijs (EUR)</Text>
                </View>
                <View style={styles.columnSmall}>
                  <Text>Aantal</Text>
                </View>
                <View style={styles.columnSmall}>
                  <Text>Totaal (EUR)</Text>
                </View>
              </View>
              <View style={styles.tbody}>
                {products.map((product) => (
                  <View key={product.id} style={styles.spaceBetween}>
                    <View style={[styles.row, styles.columnLarge]}>
                      <Text>{product.descriptionBryon}</Text>
                    </View>
                    <View style={[styles.row, styles.columnSmall]}>
                      <Text>{product.size}</Text>
                    </View>
                    <View style={[styles.row, styles.columnSmall]}>
                      <Text>{product.price.toFixed(2)}</Text>
                    </View>
                    <View style={[styles.row, styles.columnSmall]}>
                      <Text>{product.quantity}</Text>
                    </View>
                    <View style={[styles.row, styles.columnSmall]}>
                      <Text>
                        {(product.price * product.quantity).toFixed(2)}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
              <View style={styles.tfooter}>
                <View style={styles.flexEnd}>
                  <View style={styles.row}>
                    <Text>Totaal: {totalAmount.toFixed(2)} EUR</Text>
                  </View>
                  <View style={styles.row}>
                    <Text>Budget: {owner.budget.toFixed(2)} EUR</Text>
                  </View>
                  <View style={styles.row}>
                    <Text>
                      {restAmount < 0 ? "Te betalen" : "Overig budget"}:{" "}
                      {Math.abs(restAmount).toFixed(2)} EUR
                    </Text>
                  </View>
                </View>
              </View>
            </Page>
          ))}
        </Document>
      ) : (
        <Document>
          <Page>
            <Text>EMPTY</Text>
          </Page>
        </Document>
      )}
    </>
  );
};
