import { Injectable, signal } from '@angular/core';

@Injectable()
export class OrderBookStoreService {
  #orderBookSymbols = signal<string[]>([]);

  get orderBookSymbols() {
    return this.#orderBookSymbols.asReadonly();
  }

  addOrderBookSymbol(symbol: string) {
    this.#orderBookSymbols.update(symbols => [...symbols, symbol]);
  }

  removeOrderBookSymbol(symbol: string) {
    this.#orderBookSymbols.update(symbols => symbols.filter(s => s !== symbol));
  }
}
