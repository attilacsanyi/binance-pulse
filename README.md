![GitHub Actions Status](https://github.com/attilacsanyi/binance-pulse/actions/workflows/ci.yml/badge.svg)

# Binance Pulse

Real-time order book visualization for Binance trading pairs.

## Features

- Real-time order book data via WebSocket
- Multiple order books simultaneously
- Trading pair autocomplete (ETH pairs by default)
- Responsive grid layout

## Getting Started

```bash
pnpm install    # Install dependencies
pnpm start      # Development server
pnpm build      # Production build
pnpm test       # Run tests
pnpm lint       # Run linter
pnpm demo       # Local production preview
pnpm graph      # View dependency graph
```

## Architecture

### Libraries

| Library      | Purpose                                               |
| ------------ | ----------------------------------------------------- |
| `core`       | Environment config, BinanceService                    |
| `layout`     | Header, navbar components                             |
| `order-book` | Order book page, components, store, WebSocket service |

### Binance WebSocket API

Uses `wss://data-stream.binance.vision/ws` for all market data:

- **Trading pairs**: `!ticker@arr` stream
- **Order book**: `{symbol}@depth5@100ms` stream

No API keys required - public market data only.

### State Management

NgRx Signal Store with computed signals for derived state.

## Deployment

Netlify deployment via GitHub Actions (`ci.yml`).

---

Built with [Nx](https://nx.dev)
