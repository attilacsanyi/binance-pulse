import { inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BinanceService } from '@bp/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';

export interface TradingPair {
  symbol: string;
}

interface OrderBookStore {
  orderBookSymbols: string[];
  tradingPairs: TradingPair[] | null;
}

const defaultTradingPairs = ['BTCUSDC', 'ETHUSDC'];

const initialState: OrderBookStore = {
  orderBookSymbols: defaultTradingPairs,
  tradingPairs: defaultTradingPairs.map(symbol => ({ symbol })),
};

export const OrderBookStore = signalStore(
  withState<OrderBookStore>(initialState),
  // Common dependencies
  withProps(() => ({
    _binanceService: inject(BinanceService),
  })),
  withComputed(store => ({
    tradingPairsLoading: () => store.tradingPairs() === null,
    sortedTradingPairs: () => {
      const tradingPairs = store.tradingPairs();
      if (tradingPairs === null) return null;
      return tradingPairs.sort((a, b) => a.symbol.localeCompare(b.symbol));
    },
  })),
  withMethods(store => ({
    addOrderBookSymbol(symbol: string): void {
      patchState(store, state => {
        const alreadyAdded = state.orderBookSymbols.includes(symbol);
        return alreadyAdded
          ? state
          : {
              orderBookSymbols: [...state.orderBookSymbols, symbol],
              tradingPairs:
                state.tradingPairs === null
                  ? null
                  : state.tradingPairs.filter(pair => pair.symbol !== symbol),
            };
      });
    },
    removeOrderBookSymbol(symbol: string): void {
      patchState(store, state => {
        const wasPresent = state.orderBookSymbols.includes(symbol);
        return wasPresent
          ? {
              orderBookSymbols: state.orderBookSymbols.filter(
                s => s !== symbol,
              ),
              tradingPairs: [...(state.tradingPairs || []), { symbol }],
            }
          : state;
      });
    },
  })),
  withHooks(store => {
    const { _binanceService } = store;

    return {
      onInit() {
        console.debug('Order book store initialized', store.orderBookSymbols());

        _binanceService
          .getTradingPairs()
          .pipe(takeUntilDestroyed())
          .subscribe({
            next: pairs => {
              patchState(store, {
                tradingPairs: pairs.map(pair => ({ symbol: pair })),
              });
              console.debug(
                'Order book store trading pairs loaded',
                pairs.length,
              );
            },
            error: () => {
              patchState(store, { tradingPairs: null });
            },
          });
      },
      onDestroy() {
        console.debug('Order book store destroyed', store.orderBookSymbols());
      },
    };
  }),
);
