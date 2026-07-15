import { useCartStore } from '@gronxb-super-app/store';
import { lazy, Suspense, useState } from 'react';
import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const DiscoverApp = lazy(() => import('discover/App'));
const CartApp = lazy(() => import('cart/App'));

const colors = {
  accent: '#E8325C',
  canvas: '#F7F7F8',
  hairline: '#DDDDDD',
  ink: '#222222',
  muted: '#6A6A6A',
  surface: '#FFFFFF',
};

type Tab = 'discover' | 'cart';

function TabButton({
  label,
  count,
  selected,
  tab,
  onSelect,
}: {
  label: string;
  count: number;
  selected: boolean;
  tab: Tab;
  onSelect: (tab: Tab) => void;
}) {
  return (
    <Pressable
      accessibilityLabel={`${label} tab${count > 0 ? `, ${count} items` : ''}`}
      accessibilityRole="tab"
      accessibilityState={{ selected }}
      onPress={() => onSelect(tab)}
      style={({ pressed }) => [
        styles.tab,
        selected && styles.selectedTab,
        pressed && styles.pressed,
      ]}
      testID={`${tab}-tab`}
    >
      <View style={styles.tabContent}>
        <Text style={[styles.tabLabel, selected && styles.selectedTabLabel]}>
          {label}
        </Text>
        {count > 0 ? (
          <View style={styles.tabBadge}>
            <Text style={styles.tabBadgeLabel}>{count}</Text>
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}

function RemoteLoading() {
  return (
    <View accessibilityLiveRegion="polite" style={styles.loading}>
      <Text style={styles.loadingTitle}>Opening your shop</Text>
      <Text style={styles.loadingBody}>
        Connecting to the local Metro remote.
      </Text>
    </View>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('discover');
  const cartSnapshot = useCartStore();
  const cartItemCount = cartSnapshot.itemCount;

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top', 'left', 'right']} style={styles.app}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>Gronxb Market</Text>
            <Text style={styles.connection}>
              Three Metro bundles, one native app
            </Text>
          </View>
        </View>

        <View accessibilityRole="tablist" style={styles.tabs}>
          <TabButton
            label="Discover"
            count={0}
            onSelect={setActiveTab}
            selected={activeTab === 'discover'}
            tab="discover"
          />
          <TabButton
            label="Cart"
            count={cartItemCount}
            onSelect={setActiveTab}
            selected={activeTab === 'cart'}
            tab="cart"
          />
        </View>

        <View style={styles.remote}>
          <Suspense fallback={<RemoteLoading />}>
            {activeTab === 'discover' ? <DiscoverApp /> : <CartApp />}
          </Suspense>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  app: { backgroundColor: colors.canvas, flex: 1 },
  brand: { color: colors.ink, fontSize: 17, fontWeight: '700', lineHeight: 22 },
  connection: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    marginTop: 4,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  loading: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  loadingBody: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 21,
    marginTop: 8,
    textAlign: 'center',
  },
  loadingTitle: {
    color: colors.ink,
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 28,
  },
  pressed: { opacity: 0.72 },
  remote: { flex: 1, overflow: 'hidden' },
  selectedTab: { backgroundColor: colors.ink },
  selectedTabLabel: { color: colors.surface },
  tab: {
    alignItems: 'center',
    borderRadius: 22,
    flex: 1,
    justifyContent: 'center',
    minHeight: 44,
  },
  tabBadge: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: 10,
    height: 20,
    justifyContent: 'center',
    minWidth: 20,
    paddingHorizontal: 5,
  },
  tabBadgeLabel: {
    color: colors.surface,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
  },
  tabContent: { alignItems: 'center', flexDirection: 'row', gap: 8 },
  tabLabel: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
  },
  tabs: {
    backgroundColor: colors.surface,
    borderColor: colors.hairline,
    borderRadius: 24,
    borderWidth: 1,
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 16,
    padding: 3,
  },
});
