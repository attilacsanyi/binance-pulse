type Env = {
  production: boolean;
  binanceApiUrl: string;
  binanceWsUrl: string;
};

export const commonEnv: Env = {
  production: true,
  binanceApiUrl: 'https://api.binance.com/api/v3',
  binanceWsUrl: 'wss://stream.binance.com:9443/ws',
};

import { InjectionToken } from '@angular/core';

export const ENV = new InjectionToken<Env>('App Environment');
