import { inject, Injectable } from '@angular/core';
import { catchError, finalize, first, map, Observable, of } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { ENV } from '../env';

/**
 * 24hr rolling window ticker from !ticker@arr stream
 * https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams
 */
interface TickerMessage {
  /** Event type: "24hrTicker" */
  e: string;
  /** Symbol (e.g., "BNBUSDC") */
  s: string;
}

@Injectable({ providedIn: 'root' })
export class BinanceService {
  readonly #env = inject(ENV);

  /**
   * Get trading pairs via WebSocket using the All Market Tickers stream.
   * Uses data-stream.binance.vision endpoint for market data only.
   * Filters symbols by quote asset suffix (e.g., symbols ending with 'USDC').
   * @param quoteAssetParam Quote asset to filter by (default: 'USDC')
   */
  getTradingPairs(quoteAssetParam = 'USDC'): Observable<string[]> {
    const wsUrl = `${this.#env.binanceDataWsUrl}/!ticker@arr`;

    const ws$ = webSocket<TickerMessage[]>({
      url: wsUrl,
      openObserver: {
        next: () => console.debug('Connected to ticker stream'),
      },
      closeObserver: {
        next: () => console.debug('Disconnected from ticker stream'),
      },
    });

    return ws$.pipe(
      first(),
      map(tickers =>
        tickers
          .filter(ticker => ticker.s.endsWith(quoteAssetParam))
          .map(ticker => ticker.s),
      ),
      catchError(error => {
        console.error('Error fetching trading pairs via WebSocket:', error);
        return of([]);
      }),
      finalize(() => ws$.complete()),
    );
  }
}
