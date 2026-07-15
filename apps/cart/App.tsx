import { cartStore, useCartStore } from '@gronxb-super-app/store';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { styles } from './styles';

function formatMoney(value: number) {
  return `$${value.toFixed(2)}`;
}

export default function App() {
  const cartSnapshot = useCartStore();
  const [ordered, setOrdered] = useState(false);
  const subtotal = cartSnapshot.subtotal;
  const hasItems = cartSnapshot.lines.length > 0;

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      testID="cart-screen"
    >
      <Text style={styles.title}>Your cart</Text>
      <Text style={styles.subtitle}>
        Review the details before this order leaves the neighborhood shop.
      </Text>

      {hasItems ? (
        <>
          <View style={styles.items}>
            {cartSnapshot.lines.map((item) => (
              <View key={item.id} style={styles.cartRow}>
                <View
                  style={[styles.productArt, { backgroundColor: item.color }]}
                >
                  <Text style={styles.productMark}>{item.mark}</Text>
                </View>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.lineTotal}>
                    {formatMoney(item.price * item.quantity)}
                  </Text>
                  <View style={styles.stepper}>
                    <Pressable
                      accessibilityLabel={`${item.quantity === 1 ? 'Remove' : 'Decrease'} ${item.name}`}
                      accessibilityRole="button"
                      onPress={() => {
                        setOrdered(false);
                        cartStore.decrementItem(item.id);
                      }}
                      style={({ pressed }) => [
                        styles.stepButton,
                        pressed && styles.pressed,
                      ]}
                      testID={`decrease-${item.id}`}
                    >
                      <Text style={styles.stepLabel}>-</Text>
                    </Pressable>
                    <Text
                      accessibilityLabel={`${item.name} quantity ${item.quantity}`}
                      style={styles.quantity}
                      testID={`quantity-${item.id}`}
                    >
                      {item.quantity}
                    </Text>
                    <Pressable
                      accessibilityLabel={`Increase ${item.name} quantity`}
                      accessibilityRole="button"
                      onPress={() => {
                        setOrdered(false);
                        cartStore.incrementItem(item.id);
                      }}
                      style={({ pressed }) => [
                        styles.stepButton,
                        pressed && styles.pressed,
                      ]}
                      testID={`increase-${item.id}`}
                    >
                      <Text style={styles.stepLabel}>+</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.delivery}>
            <View>
              <Text style={styles.deliveryTitle}>Local delivery</Text>
              <Text style={styles.deliveryBody}>Tomorrow, 2:00-5:00 PM</Text>
            </View>
            <Text style={styles.free}>Free</Text>
          </View>

          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>{formatMoney(subtotal)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery</Text>
              <Text style={styles.summaryValue}>$0.00</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text
                accessibilityLiveRegion="polite"
                style={styles.totalValue}
                testID="cart-total"
              >
                {formatMoney(subtotal)}
              </Text>
            </View>
          </View>

          <Pressable
            accessibilityLabel="Place demo order"
            accessibilityRole="button"
            onPress={() => setOrdered(true)}
            style={({ pressed }) => [
              styles.checkout,
              pressed && styles.checkoutPressed,
            ]}
            testID="checkout-button"
          >
            <Text style={styles.checkoutLabel}>Place demo order</Text>
          </Pressable>

          {ordered ? (
            <View
              accessibilityLiveRegion="assertive"
              style={styles.success}
              testID="order-success"
            >
              <Text style={styles.successTitle}>Order ready</Text>
              <Text style={styles.successBody}>
                Your demo order is confirmed for tomorrow afternoon.
              </Text>
            </View>
          ) : null}
        </>
      ) : (
        <View style={styles.empty} testID="empty-cart">
          <Text style={styles.emptyTitle}>Your cart is ready.</Text>
          <Text style={styles.emptyBody}>
            Add a product in Discover and it will appear here instantly.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}
