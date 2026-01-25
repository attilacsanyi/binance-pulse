type Env = {
  production: boolean;
  binanceApiUrl: string;
  binanceDataWsUrl: string;
};

export const commonEnv: Env = {
  production: true,
  binanceApiUrl: 'https://api.binance.com/api/v3',
  binanceDataWsUrl: 'wss://data-stream.binance.vision/ws',
};

import { InjectionToken } from '@angular/core';

export const ENV = new InjectionToken<Env>('App Environment');
