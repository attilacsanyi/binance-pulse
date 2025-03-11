import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ENV } from '@bp/core';
import { of, timer } from 'rxjs';
import { catchError, retry, throttleTime } from 'rxjs/operators';
import { webSocket } from 'rxjs/webSocket';

interface OrderBookEntry {
  price: string;
  quantity: string;
}

/**
 * TODO: need to export this interface
 * Issue in order-book-card.component.ts:
 *   Public property 'orderBookData' of exported class has or is using name 'OrderBookData' from external module "...order-book-ws.service" but cannot be named.
 */
export interface OrderBookData {
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
}

interface OrderBookMessage {
  lastUpdateId: number;
  /**
   * [price, quantity]
   */
  bids: [string, string][];
  /**
   * [price, quantity]
   */
  asks: [string, string][];
}

@Injectable()
export class OrderBookWSService {
  readonly #env = inject(ENV);
  readonly #reconnectInterval = 5000;
  readonly #destroyRef = inject(DestroyRef);
  readonly #orderBookData = signal<OrderBookData | undefined | null>(undefined);

  readonly orderBookData = this.#orderBookData.asReadonly();

  /**
   * Connect to the order book WebSocket server for a given symbol.
   * @param symbol The symbol to connect to.
   * @param throttleTimeMs The time to throttle the messages.
   */
  connect(symbol: string, throttleTimeMs = 2000): void {
    const wsUrl = `${this.#env.binanceWsUrl}/${symbol.toLowerCase()}@depth5@100ms`;
    /** https://rxjs.dev/api/webSocket/webSocket#websocket */
    const websocket$ = webSocket<OrderBookMessage | null>({
      url: wsUrl,
      openObserver: {
        next: () => console.debug(`Connected to ${symbol} WebSocket server`),
      },
      closeObserver: {
        next: () =>
          console.debug(`Disconnected from ${symbol} WebSocket server`),
      },
    });

    websocket$
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        // Force error on first message to test retry logic
        // tap({
        //   next: () => {
        //     throw new Error('Forced error on first message');
        //   },
        // }),
        retry({
          count: 2,
          delay: (error, retryAttempt) => {
            console.warn(
              `WebSocket connection failed with error '${error}' on attempt ${retryAttempt}. Retrying in ${
                this.#reconnectInterval / 1000
              } seconds...`,
            );
            return timer(this.#reconnectInterval);
          },
        }),
        catchError(error => {
          console.error(`${symbol} WebSocket error:`, error);
          return of(null);
        }),
        throttleTime(throttleTimeMs),
      )
      .subscribe(message => this.processOrderBookMessage(message));
  }

  processOrderBookMessage(message: OrderBookMessage | null): void {
    // Error case
    if (!message) {
      this.#orderBookData.set(null);
      return;
    }

    const bids: OrderBookEntry[] = message.bids.map(([price, quantity]) => ({
      price,
      quantity,
    }));
    const asks: OrderBookEntry[] = message.asks.map(([price, quantity]) => ({
      price,
      quantity,
    }));

    this.#orderBookData.set({ bids, asks });
  }
}
