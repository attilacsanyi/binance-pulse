import { Injectable, signal } from '@angular/core';
import { environment } from '@env';

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
  #websocket: WebSocket | null = null;
  #orderBookData = signal<OrderBookData | undefined>(undefined);

  get orderBookData() {
    return this.#orderBookData.asReadonly();
  }

  connect(symbol: string): void {
    const wsUrl = `${environment.binanceWsUrl}/${symbol.toLowerCase()}@depth5@100ms`;
    this.#websocket = new WebSocket(wsUrl);

    this.#websocket.onopen = () => {
      console.debug(`Connected to ${symbol} WebSocket server`);
    };

    this.#websocket.onclose = () => {
      console.debug(`Disconnected from ${symbol} WebSocket server`);
    };

    this.#websocket.onmessage = event => {
      this.processOrderBookMessage(event.data);
    };

    this.#websocket.onerror = error => {
      console.error(`${symbol} WebSocket error:`, error);
    };
  }

  disconnect(): void {
    if (this.#websocket) {
      this.#websocket.close();
      this.#websocket = null;
    }
  }

  processOrderBookMessage(message: string): void {
    // TODO: add zod validation with expected schema
    const data: OrderBookMessage = JSON.parse(message);
    const bids: OrderBookEntry[] = data.bids.map(([price, quantity]) => ({
      price,
      quantity,
    }));
    const asks: OrderBookEntry[] = data.asks.map(([price, quantity]) => ({
      price,
      quantity,
    }));

    this.#orderBookData.set({ bids, asks });
  }
}
