import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BinanceService } from '../binance.service';
import { OrderBookStore } from './order-book.store';

describe('OrderBookStore', () => {
  it('should verify that the trading pairs are available', () => {
    const tradingPairs = ['ADAETH'];

    const binanceService = {
      getTradingPairs: () => of(tradingPairs),
    };

    TestBed.configureTestingModule({
      providers: [
        OrderBookStore,
        {
          provide: BinanceService,
          useValue: binanceService,
        },
      ],
    });

    const store = TestBed.inject(OrderBookStore);

    expect(store.tradingPairs()).toEqual([{ symbol: 'ADAETH' }]);
  });
});
