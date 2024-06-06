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
    alignItems: "flex-start",
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
  title: {
    fontSize: 16,
    marginBottom: 12,
  },
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
    marginHorizontal: 12,
  },
});

export const PDFDoltcini = () => {
  const [order, setOrder] = useState([]);
  const [orderTotalPrice, setOrderTotalPrice] = useState(0);

  const { get } = useAxios();

  const fetchDoltciniOrder = useCallback(async () => {
    try {
      const response = await get("/orders/totals");
      setOrder(response);

      let sum = 0;
      for (const entry of response) {
        for (const { quantity } of entry.ordered) {
          sum = sum + entry.price * quantity;
        }
      }
      setOrderTotalPrice(sum);
    } catch (error) {
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchDoltciniOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!R.isEmpty(order) ? (
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.title}>
              <Text>DOLTCINI</Text>
            </View>

            <View style={[styles.thead, styles.spaceBetween]}>
              <View style={styles.columnLarge}>
                <Text>Beschrijving</Text>
              </View>
              <View style={styles.columnSmall}>
                <Text>Prijs (EUR)</Text>
              </View>
              <View style={styles.columnSmall}>
                <Text>Maat</Text>
              </View>
              <View style={styles.columnSmall}>
                <Text>Aantal</Text>
              </View>
              <View style={styles.columnSmall}>
                <Text>Totaal (EUR)</Text>
              </View>
            </View>

            <View style={styles.tbody}>
              {order.map((item, index) => (
                <View key={index} style={styles.spaceBetween}>
                  <View style={[styles.row, styles.columnLarge]}>
                    <Text>{item.productCode}</Text>
                  </View>
                  <View style={[styles.row, styles.columnSmall]}>
                    <Text>{item.price.toFixed(2)}</Text>
                  </View>
                  <View style={{ flex: 2.25 }}>
                    {item.ordered.map((entry, index) => (
                      <View
                        key={index}
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <View style={[styles.row, styles.columnSmall]}>
                          <Text>{entry.size}</Text>
                        </View>
                        <View style={[styles.row, styles.columnSmall]}>
                          <Text>{entry.quantity}</Text>
                        </View>
                        <View style={[styles.row, styles.columnSmall]}>
                          <Text>
                            {(item.price * entry.quantity).toFixed(2)}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.tfooter}>
              <View style={styles.flexEnd}>
                <View style={styles.row}>
                  <Text>
                    Totaal bestelling: {orderTotalPrice.toFixed(2)} EUR
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text>Bijdrage Doltcini: 50.00 EUR</Text>
                </View>
                <View style={styles.row}>
                  <Text>
                    Eindtotaal: {(50 + orderTotalPrice).toFixed(2)} EUR
                  </Text>
                </View>
              </View>
            </View>
          </Page>
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
