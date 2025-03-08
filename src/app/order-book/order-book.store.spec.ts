import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BinanceService } from '../binance.service';
import { OrderBookStore } from './order-book.store';

describe('OrderBookStore', () => {
  const setup = (data: { tradingPairs: string[] }) => {
    const binanceService = {
      getTradingPairs: () => of(data.tradingPairs),
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
  };

  it('should verify that the trading pairs are stored', () => {
    setup({ tradingPairs: ['ADAETH'] });

    const store = TestBed.inject(OrderBookStore);

    expect(store.tradingPairs()).toEqual([{ symbol: 'ADAETH' }]);
  });

  it('should verify that that sorted trading pairs are correctly sorted', () => {
    setup({ tradingPairs: ['BTCETH', 'ADAETH'] });

    const store = TestBed.inject(OrderBookStore);

    expect(store.sortedTradingPairs()).toEqual([
      { symbol: 'ADAETH' },
      { symbol: 'BTCETH' },
    ]);
  });
});
