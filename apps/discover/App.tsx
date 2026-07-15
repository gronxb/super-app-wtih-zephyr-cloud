import { cartStore, useCartStore } from '@gronxb-super-app/store';
import type { CartItemInput } from '@gronxb-super-app/store';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const colors = {
  accent: '#E8325C',
  accentSoft: '#FFF0F3',
  canvas: '#F7F7F8',
  hairline: '#DDDDDD',
  ink: '#222222',
  muted: '#6A6A6A',
  productLilac: '#E8E1FF',
  productMint: '#DDF4EA',
  productSky: '#DCEEFF',
  surface: '#FFFFFF',
};

const products = [
  {
    color: colors.productLilac,
    id: 'headphones',
    mark: 'NC',
    name: 'Noise-canceling headphones',
    price: 249,
    subtitle: 'Focus mode, without the wires',
  },
  {
    color: colors.productMint,
    id: 'keyboard',
    mark: 'MK',
    name: 'Low-profile keyboard',
    price: 129,
    subtitle: 'Quiet switches, all-day comfort',
  },
  {
    color: colors.productSky,
    id: 'speaker',
    mark: 'SP',
    name: 'Pocket speaker',
    price: 89,
    subtitle: 'Clear sound for small spaces',
  },
] as const satisfies readonly (CartItemInput & { readonly subtitle: string })[];

function formatMoney(value: number) {
  return `$${value}`;
}

export default function App() {
  const cartSnapshot = useCartStore();
  const itemCount = cartSnapshot.itemCount;

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      testID="discover-screen"
    >
      <View style={styles.intro}>
        <Text style={styles.title}>Find your next everyday favorite.</Text>
        <Text style={styles.subtitle}>
          Useful objects, selected for focused desks and calmer homes.
        </Text>
      </View>

      <View style={styles.deliveryCard}>
        <Text style={styles.deliveryTitle}>Free local delivery</Text>
        <Text style={styles.deliveryBody}>
          Orders placed today arrive tomorrow afternoon.
        </Text>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Popular right now</Text>
        <Text accessibilityLiveRegion="polite" style={styles.addedCount}>
          {itemCount} added
        </Text>
      </View>

      {products.map((product) => {
        const quantity =
          cartSnapshot.lines.find((line) => line.id === product.id)?.quantity ??
          0;
        const isAdded = quantity > 0;
        return (
          <View key={product.id} style={styles.product}>
            <View
              style={[styles.productArt, { backgroundColor: product.color }]}
            >
              <Text style={styles.productMark}>{product.mark}</Text>
            </View>
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productSubtitle}>{product.subtitle}</Text>
              <View style={styles.productFooter}>
                <Text style={styles.price}>{formatMoney(product.price)}</Text>
                <Pressable
                  accessibilityLabel={`${isAdded ? 'Remove' : 'Add'} ${product.name}`}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isAdded }}
                  onPress={() =>
                    isAdded
                      ? cartStore.removeItem(product.id)
                      : cartStore.addItem(product)
                  }
                  style={({ pressed }) => [
                    styles.addButton,
                    isAdded && styles.addedButton,
                    pressed && styles.pressed,
                  ]}
                  testID={`add-${product.id}`}
                >
                  <Text style={[styles.addLabel, isAdded && styles.addedLabel]}>
                    {isAdded ? 'Added' : 'Add'}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  addButton: {
    alignItems: 'center',
    borderColor: colors.hairline,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 44,
    minWidth: 72,
    paddingHorizontal: 16,
  },
  addLabel: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
  },
  addedButton: { backgroundColor: colors.accent, borderColor: colors.accent },
  addedCount: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
  },
  addedLabel: { color: colors.surface },
  content: { paddingBottom: 32, paddingHorizontal: 20, paddingTop: 24 },
  deliveryBody: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
    marginTop: 4,
  },
  deliveryCard: {
    backgroundColor: colors.accentSoft,
    borderRadius: 16,
    marginTop: 20,
    padding: 16,
  },
  deliveryTitle: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 21,
  },
  intro: { paddingRight: 24 },
  pressed: { opacity: 0.68 },
  price: { color: colors.ink, fontSize: 17, fontWeight: '700', lineHeight: 22 },
  product: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    flexDirection: 'row',
    marginBottom: 12,
    padding: 12,
  },
  productArt: {
    alignItems: 'center',
    borderRadius: 12,
    height: 112,
    justifyContent: 'center',
    width: 104,
  },
  productDetails: { flex: 1, justifyContent: 'space-between', paddingLeft: 12 },
  productFooter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  productMark: {
    color: colors.ink,
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 28,
  },
  productName: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 22,
  },
  productSubtitle: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
    marginTop: 4,
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginTop: 24,
  },
  sectionTitle: {
    color: colors.ink,
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 28,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 21,
    marginTop: 8,
  },
  title: { color: colors.ink, fontSize: 32, fontWeight: '700', lineHeight: 38 },
});
