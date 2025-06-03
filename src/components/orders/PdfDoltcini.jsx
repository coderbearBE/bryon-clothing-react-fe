import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import * as R from "ramda";
import { useCallback, useEffect, useState } from "react";

import { useAxios } from "../../hooks";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    lineHeight: 1.4,
  },
  title: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  thead: {
    flexDirection: 'row',
    borderBottom: '1pt solid #000',
    paddingBottom: 6,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  tbody: {
    marginBottom: 20,
  },
  tfooter: {
    marginTop: 20,
    paddingTop: 10,
    borderTop: '1pt solid #000',
  },
  row: {
    paddingVertical: 2,
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
  },
  columnLarge: {
    flex: 3,
  },
  columnSmall: {
    flex: 1.5,
  },
  flexEnd: {
    alignItems: 'flex-end',
  },
});

export const PDFDoltcini = () => {
  const [order, setOrder] = useState([]);
  const [orderTotalPrice, setOrderTotalPrice] = useState(0);
  const [costDoltcini, setCostDoltcini] = useState(113.43);

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
                  <View key={index} style={[styles.spaceBetween, { marginBottom: 6 }]}>
                    <View style={[styles.row, styles.columnLarge]}>
                      <Text>{item.productCode}</Text>
                    </View>
                    <View style={[styles.row, styles.columnSmall]}>
                      <Text>{item.price.toFixed(2)}</Text>
                    </View>

                    <View style={{ flex: 4 }}>
                      {item.ordered.map((entry, i) => (
                          <View
                              key={i}
                              style={[styles.spaceBetween, { marginLeft: 4, marginBottom: 2 }]}
                          >
                            <View style={[styles.row, styles.columnSmall]}>
                              <Text>{entry.size}</Text>
                            </View>
                            <View style={[styles.row, styles.columnSmall]}>
                              <Text>{entry.quantity}</Text>
                            </View>
                            <View style={[styles.row, styles.columnSmall]}>
                              <Text>{(item.price * entry.quantity).toFixed(2)}</Text>
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
                  <Text>Bijdrage Doltcini: {costDoltcini.toFixed(2)} EUR</Text>
                </View>
                <View style={styles.row}>
                  <Text>
                    Eindtotaal: {(costDoltcini + orderTotalPrice).toFixed(2)} EUR
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
