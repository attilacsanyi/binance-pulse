import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BinanceService } from '../../../../src/app/binance.service';
import { OrderBookStore } from './order-book.store';

describe('OrderBookStore', () => {
  let store: InstanceType<typeof OrderBookStore>;

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

    store = TestBed.inject(OrderBookStore);
  };

  describe('tradingPairs', () => {
    it('should verify that the trading pairs are stored', () => {
      setup({ tradingPairs: ['ADAETH'] });

      expect(store.tradingPairs()).toEqual([{ symbol: 'ADAETH' }]);
    });

    it('should verify that that sorted trading pairs are correctly sorted', () => {
      setup({ tradingPairs: ['BTCETH', 'ADAETH'] });

      expect(store.sortedTradingPairs()).toEqual([
        { symbol: 'ADAETH' },
        { symbol: 'BTCETH' },
      ]);
    });
  });

  describe('orderBookSymbols', () => {
    it('should verify that the order book symbol is empty', () => {
      expect(store.orderBookSymbols().length).toEqual(0);
    });

    it('should verify that the order book symbol is added', () => {
      store.addOrderBookSymbol('ADAETH');

      expect(store.orderBookSymbols().includes('ADAETH')).toBe(true);
    });

    it('should verify that the order book symbol is removed', () => {
      store.addOrderBookSymbol('ADAETH');
      store.removeOrderBookSymbol('ADAETH');

      expect(store.orderBookSymbols().includes('ADAETH')).toBe(false);
    });
  });
});
