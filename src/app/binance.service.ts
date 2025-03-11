import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
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
        `${environment.binanceApiUrl}/exchangeInfo?symbolStatus=TRADING`,
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
