# core

Shared utilities and services for the Binance Pulse application.

## Contents

- **`ENV`** - Environment configuration injection token
- **`BinanceService`** - Fetches trading pairs via WebSocket (`!ticker@arr` stream)

## Environment Config

```typescript
binanceApiUrl: 'https://api.binance.com/api/v3';
binanceDataWsUrl: 'wss://data-stream.binance.vision/ws';
```

## Usage

```typescript
import { ENV, BinanceService } from '@bp/core';
```

## Tests

```bash
nx test core
```
