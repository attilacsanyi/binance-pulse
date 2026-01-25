import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { ENV } from '@bp/core';
import { of, Subscription, timer } from 'rxjs';
import { catchError, retry, throttleTime } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { OrderBookData, OrderBookEntry } from './models';

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

  #ws$: WebSocketSubject<OrderBookMessage | null> | null = null;
  #subscription: Subscription | null = null;

  readonly orderBookData = this.#orderBookData.asReadonly();

  constructor() {
    this.#destroyRef.onDestroy(() => this.#disconnect());
  }

  /**
   * Connect to the order book WebSocket server for a given symbol.
   * Uses data-stream.binance.vision endpoint for market data.
   * @param symbol The symbol to connect to.
   * @param throttleTimeMs The time to throttle the messages.
   */
  connect(symbol: string, throttleTimeMs = 2000): void {
    const wsUrl = `${this.#env.binanceDataWsUrl}/${symbol.toLowerCase()}@depth5@100ms`;

    this.#ws$ = webSocket<OrderBookMessage | null>({
      url: wsUrl,
      openObserver: {
        next: () => console.debug(`Connected to ${symbol} WebSocket server`),
      },
      closeObserver: {
        next: () =>
          console.debug(`Disconnected from ${symbol} WebSocket server`),
      },
    });

    this.#subscription = this.#ws$
      .pipe(
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

  /**
   * Disconnect from the WebSocket server and clean up resources.
   */
  #disconnect(): void {
    this.#subscription?.unsubscribe();
    this.#subscription = null;

    this.#ws$?.complete();
    this.#ws$ = null;
  }
}
