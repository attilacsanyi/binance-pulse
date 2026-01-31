type Env = {
  production: boolean;
  binanceDataApiUrl: string;
  binanceDataWsUrl: string;
};

export const commonEnv: Env = {
  production: true,
  binanceDataApiUrl: 'https://data-api.binance.vision/api/v3',
  binanceDataWsUrl: 'wss://data-stream.binance.vision/ws',
};

import { InjectionToken } from '@angular/core';

export const ENV = new InjectionToken<Env>('App Environment');
