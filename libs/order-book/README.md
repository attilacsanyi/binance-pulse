# order-book

Order book feature module for real-time Binance market data.

## Components

- **`OrderBookPageComponent`** - Main page with trading pair selector and order book grid
- **`OrderBookCardComponent`** - Displays bids/asks for a single trading pair
- **`TradingPairSelectorComponent`** - Autocomplete input for selecting trading pairs
- **`OrderBookEntryTableComponent`** - Table displaying price/quantity entries

## Services

- **`OrderBookWSService`** - WebSocket connection to `{symbol}@depth5@100ms` stream

## State

- **`OrderBookStore`** - NgRx Signal Store managing trading pairs and active order books

## Usage

```typescript
import { OrderBookStore } from '@bp/order-book';
```

## Tests

```bash
nx test order-book
```
