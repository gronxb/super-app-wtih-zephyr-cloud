import type {
  CartItemInput,
  CartLine,
  CartPort,
  CartSnapshot,
} from './contract';

const listeners = new Set<() => void>();
let snapshot: CartSnapshot = { itemCount: 0, lines: [], subtotal: 0 };

function publish(lines: readonly CartLine[]) {
  snapshot = {
    itemCount: lines.reduce((total, line) => total + line.quantity, 0),
    lines,
    subtotal: lines.reduce(
      (total, line) => total + line.price * line.quantity,
      0,
    ),
  };
  for (const listener of listeners) listener();
}

function setQuantity(id: string, quantity: number) {
  if (quantity <= 0) {
    publish(snapshot.lines.filter((line) => line.id !== id));
    return;
  }

  publish(
    snapshot.lines.map((line) =>
      line.id === id ? { ...line, quantity } : line,
    ),
  );
}

export const cartStore: CartPort = {
  addItem(item: CartItemInput) {
    const current = snapshot.lines.find((line) => line.id === item.id);
    if (current === undefined) {
      publish([...snapshot.lines, { ...item, quantity: 1 }]);
      return;
    }

    setQuantity(item.id, current.quantity + 1);
  },
  decrementItem(id) {
    const current = snapshot.lines.find((line) => line.id === id);
    if (current !== undefined) setQuantity(id, current.quantity - 1);
  },
  getSnapshot() {
    return snapshot;
  },
  incrementItem(id) {
    const current = snapshot.lines.find((line) => line.id === id);
    if (current !== undefined) setQuantity(id, current.quantity + 1);
  },
  removeItem(id) {
    setQuantity(id, 0);
  },
  subscribe(listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};
