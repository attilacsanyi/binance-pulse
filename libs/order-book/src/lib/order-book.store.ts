import { computed, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BinanceService } from '@bp/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

export interface TradingPair {
  symbol: string;
}

interface OrderBookStore {
  orderBookSymbols: string[];
  tradingPairs: TradingPair[] | undefined;
}

export const OrderBookStore = signalStore(
  withState<OrderBookStore>({ orderBookSymbols: [], tradingPairs: undefined }),
  withComputed(store => ({
    sortedTradingPairs: computed(() =>
      store.tradingPairs()?.sort((a, b) => a.symbol.localeCompare(b.symbol)),
    ),
  })),
  withMethods(store => ({
    addOrderBookSymbol(symbol: string): void {
      patchState(store, state => ({
        orderBookSymbols: [...state.orderBookSymbols, symbol],
        tradingPairs: state.tradingPairs?.filter(
          pair => pair.symbol !== symbol,
        ),
      }));
    },
    removeOrderBookSymbol(symbol: string): void {
      patchState(store, state => ({
        orderBookSymbols: state.orderBookSymbols.filter(s => s !== symbol),
        tradingPairs: [...(state.tradingPairs || []), { symbol }],
      }));
    },
  })),
  withHooks(store => {
    const binanceService = inject(BinanceService);

    return {
      onInit() {
        console.debug('Order book store initialized', store.orderBookSymbols());
        binanceService
          .getTradingPairs()
          .pipe(takeUntilDestroyed())
          .subscribe(pairs => {
            patchState(store, _state => ({
              tradingPairs: pairs.map(pair => ({ symbol: pair })),
            }));
          });
      },
      onDestroy() {
        console.debug('Order book store destroyed', store.orderBookSymbols());
      },
    };
  }),
);
