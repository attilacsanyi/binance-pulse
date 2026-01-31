import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ENV } from '../env';

/**
 * Symbol information from exchangeInfo endpoint
 * https://developers.binance.com/docs/binance-spot-api-docs/rest-api
 */
interface BinanceSymbol {
  symbol: string;
  status: string;
  quoteAsset: string;
  isSpotTradingAllowed: boolean;
}

interface ExchangeInfoResponse {
  symbols: BinanceSymbol[];
}

@Injectable({ providedIn: 'root' })
export class BinanceService {
  readonly #http = inject(HttpClient);
  readonly #env = inject(ENV);

  /**
   * Get trading pairs via REST API using the exchangeInfo endpoint.
   * @param quoteAsset Quote asset to filter by (default: 'USDC')
   */
  getTradingPairs(quoteAsset = 'USDC'): Observable<string[]> {
    const url = `${this.#env.binanceDataApiUrl}/exchangeInfo`;

    return this.#http.get<ExchangeInfoResponse>(url).pipe(
      map(response =>
        response.symbols
          .filter(
            symbol =>
              symbol.status === 'TRADING' &&
              symbol.isSpotTradingAllowed &&
              symbol.quoteAsset === quoteAsset,
          )
          .map(symbol => symbol.symbol),
      ),
      catchError(error => {
        console.error('Error fetching trading pairs:', error);
        return of([]);
      }),
    );
  }
}
