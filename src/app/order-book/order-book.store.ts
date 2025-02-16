import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

interface OrderBookStore {
  orderBookSymbols: string[];
}

export const OrderBookStore = signalStore(
  withState<OrderBookStore>({ orderBookSymbols: [] }),
  withMethods(store => ({
    addOrderBookSymbol(symbol: string): void {
      patchState(store, state => ({
        orderBookSymbols: [...state.orderBookSymbols, symbol],
      }));
    },
    removeOrderBookSymbol(symbol: string): void {
      patchState(store, state => ({
        orderBookSymbols: state.orderBookSymbols.filter(s => s !== symbol),
      }));
    },
  })),
  withHooks({
    onInit(store) {
      console.debug('Order book store initialized', store.orderBookSymbols());
    },
    onDestroy(store) {
      console.debug('Order book store destroyed', store.orderBookSymbols());
    },
  }),
);
