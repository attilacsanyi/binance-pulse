import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from '@env';
import { webSocket } from 'rxjs/webSocket';

interface OrderBookEntry {
  price: string;
  quantity: string;
}

interface OrderBookData {
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
  readonly #destroyRef = inject(DestroyRef);
  readonly #orderBookData = signal<OrderBookData | undefined>(undefined);

  get orderBookData() {
    return this.#orderBookData.asReadonly();
  }

  connect(symbol: string): void {
    const wsUrl = `${environment.binanceWsUrl}/${symbol.toLowerCase()}@depth5@100ms`;
    const websocket$ = webSocket<OrderBookMessage>({
      url: wsUrl,
      openObserver: {
        next: () => console.debug(`Connected to ${symbol} WebSocket server`),
      },
      closeObserver: {
        next: () =>
          console.debug(`Disconnected from ${symbol} WebSocket server`),
      },
    });

    websocket$.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe({
      next: message => this.processOrderBookMessage(message),
      error: error => console.error(`${symbol} WebSocket error:`, error),
    });
  }

  processOrderBookMessage(message: OrderBookMessage): void {
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
