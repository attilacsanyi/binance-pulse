![GitHub Actions Status](https://github.com/attilacsanyi/binance-pulse/actions/workflows/ci.yml/badge.svg)

# Binance Pulse

Real-time order book visualization for Binance trading pairs.

## Features

- Real-time order book data via WebSocket connection
- Multiple order book views simultaneously
- Trading pair selection with autocomplete
- ETH quote asset pairs supported by default
- Responsive grid layout

## Getting Started

- Install dependencies: `pnpm install`
- Start the development server: `pnpm start`
- Build for production: `pnpm build`
- Local production demo: `pnpm demo` (using `http-server`)
- Test: `pnpm test`
- Lint: `pnpm lint`

## Developer Notes

### WebSocket Connection

The application connects to Binance's WebSocket API using the following format:

```typescript
wss://stream.binance.com:9443/ws/adaeth@depth5@100ms
```

### Binance API

The application uses the Binance API to get the list of trading pairs.

```typescript
https://api.binance.com/api/v3/exchangeInfo
```

### State Management

The application uses NgRx Signals for state management with:

- Computed signals for derived state
- Signal stores for complex state management
- Component-level signals for local state

## Deployment

The application is configured for Netlify deployment using the `deploy` script and Github Actions (`ci.yml`).

---

Built with [Nx](https://nx.dev) 🔥
