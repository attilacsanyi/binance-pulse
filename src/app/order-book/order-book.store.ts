import { inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { BinanceService } from '../binance.service';

export interface TradingPair {
  symbol: string;
}

interface OrderBookStore {
  orderBookSymbols: string[];
  tradingPairs: TradingPair[] | undefined;
}

export const OrderBookStore = signalStore(
  withState<OrderBookStore>({ orderBookSymbols: [], tradingPairs: undefined }),
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

  withHooks(store => {
    const binanceService = inject(BinanceService);

    return {
      onInit() {
        console.debug('Order book store initialized', store.orderBookSymbols());
        binanceService
          .getTradingPairs()
          .pipe(takeUntilDestroyed())
          .subscribe(pairs => {
            patchState(store, state => ({
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
