import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';

interface BinanceSymbol {
  symbol: string;
  isSpotTradingAllowed: boolean;
  quoteAsset: string;
}

interface ExchangeInfoResponse {
  symbols: BinanceSymbol[];
}

@Injectable({
  providedIn: 'root',
})
export class BinanceService {
  readonly #http = inject(HttpClient);

  getTradingPairs(quoteAssetParam = 'ETH'): Observable<string[]> {
    return this.#http
      .get<ExchangeInfoResponse>(
        `https://api.binance.com/api/v3/exchangeInfo?symbolStatus=TRADING`,
      )
      .pipe(
        map(response =>
          response.symbols
            .filter(
              symbol =>
                symbol.isSpotTradingAllowed &&
                symbol.quoteAsset === quoteAssetParam,
            )
            .map(({ symbol }) => symbol),
        ),
        catchError(error => {
          console.error('Error fetching trading pairs:', error);
          return [];
        }),
      );
  }
}
