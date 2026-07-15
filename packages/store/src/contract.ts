export type CartItemInput = {
  readonly color: string;
  readonly id: string;
  readonly mark: string;
  readonly name: string;
  readonly price: number;
};

export type CartLine = CartItemInput & {
  readonly quantity: number;
};

export type CartSnapshot = {
  readonly itemCount: number;
  readonly lines: readonly CartLine[];
  readonly subtotal: number;
};

export interface CartPort {
  readonly addItem: (item: CartItemInput) => void;
  readonly decrementItem: (id: string) => void;
  readonly getSnapshot: () => CartSnapshot;
  readonly incrementItem: (id: string) => void;
  readonly removeItem: (id: string) => void;
  readonly subscribe: (listener: () => void) => () => void;
}
