## 0.2.1 (2026-01-31)

### 🚀 Features

- **accessibility:** improved accessibility ([cf8e2a3](https://github.com/attilacsanyi/binance-pulse/commit/cf8e2a3))
- **app.config:** add withViewTransitions to router configuration for enhanced navigation experience ([1238ea3](https://github.com/attilacsanyi/binance-pulse/commit/1238ea3))
- **app.config:** enable in-memory scrolling in router configuration for improved user experience ([3fd2bfd](https://github.com/attilacsanyi/binance-pulse/commit/3fd2bfd))
- **home-page:** implement OnPush change detection strategy for improved performance ([0936b8c](https://github.com/attilacsanyi/binance-pulse/commit/0936b8c))
- **lint-staged:** add lint-staged configuration and pre-commit hook for automated linting and formatting ([9371b73](https://github.com/attilacsanyi/binance-pulse/commit/9371b73))
- **order-book:** make \_binanceService private to store ([fde2729](https://github.com/attilacsanyi/binance-pulse/commit/fde2729))
- **order-book:** add loading state for trading pairs ([0356f36](https://github.com/attilacsanyi/binance-pulse/commit/0356f36))
- **order-book.store:** integrate binanceService as a prop for improved dependency management ([b32bae5](https://github.com/attilacsanyi/binance-pulse/commit/b32bae5))
- **profiling:** enable application profiling before bootstrapping to capture startup performance ([817f3cc](https://github.com/attilacsanyi/binance-pulse/commit/817f3cc))
- **zoneless:** remove zone.js dependency and update test setup for zoneless environment ([2e3fd5b](https://github.com/attilacsanyi/binance-pulse/commit/2e3fd5b))

### 🩹 Fixes

- **binance:** update ticker symbol example and adjust trading pairs filter description to reflect USDC ([ff70089](https://github.com/attilacsanyi/binance-pulse/commit/ff70089))
- **binance.service:** handle errors in fetching trading pairs by returning an observable of an empty array ([67f16a2](https://github.com/attilacsanyi/binance-pulse/commit/67f16a2))
- **layout:** adjust header and navbar component styles ([ef4d42f](https://github.com/attilacsanyi/binance-pulse/commit/ef4d42f))
- **order-book:** prevent duplicate order book symbols and ensure state consistency ([6cd5edc](https://github.com/attilacsanyi/binance-pulse/commit/6cd5edc))

### ❤️ Thank You

- Attila Csanyi @attilacsanyi

## 0.2.0 (2025-03-11)

### 🚀 Features

- **home:** create home page component with welcome message ([5adc53c](https://github.com/attilacsanyi/binance-pulse/commit/5adc53c))
- **order-book:** introduce nx module boundaries ([#1](https://github.com/attilacsanyi/binance-pulse/pull/1))

### ❤️ Thank You

- Attila Csanyi @attilacsanyi

## 0.1.0 (2025-03-11)

### 🚀 Features

- add Tailwind CSS for styling and responsive design ([a0bbe43](https://github.com/attilacsanyi/binance-pulse/commit/a0bbe43))
- **angular:** integrate Angular Material for enhanced UI components ([e0fa1b3](https://github.com/attilacsanyi/binance-pulse/commit/e0fa1b3))
- **branding:** update favicon and add logo with improved header design ([307aa71](https://github.com/attilacsanyi/binance-pulse/commit/307aa71))
- **environment:** add environment configuration for Binance API and WebSocket URLs ([53f756a](https://github.com/attilacsanyi/binance-pulse/commit/53f756a))
- **order-book:** add WebSocket-based order book component and service (unstyled) ([f4a6693](https://github.com/attilacsanyi/binance-pulse/commit/f4a6693))
- **order-book:** refactor order book components and rename WebSocket service ([6c3fa5d](https://github.com/attilacsanyi/binance-pulse/commit/6c3fa5d))
- **order-book:** implement dynamic order book management with store service ([ff81785](https://github.com/attilacsanyi/binance-pulse/commit/ff81785))
- **order-book:** create order book card component and update home component ([12d7dcf](https://github.com/attilacsanyi/binance-pulse/commit/12d7dcf))
- **order-book:** add conditional rendering for order book data loading state ([38ac984](https://github.com/attilacsanyi/binance-pulse/commit/38ac984))
- **order-book:** add tables for bids and asks with basic styling (minimalistic) ([c7527e4](https://github.com/attilacsanyi/binance-pulse/commit/c7527e4))
- **order-book:** improve number formatting and type safety for order book entries ([f0dea7f](https://github.com/attilacsanyi/binance-pulse/commit/f0dea7f))
- **order-book:** add responsive grid layout for order book cards ([7369567](https://github.com/attilacsanyi/binance-pulse/commit/7369567))
- **order-book:** integrate trading pairs from binance service into order book store ([67a4eeb](https://github.com/attilacsanyi/binance-pulse/commit/67a4eeb))
- **order-book:** add computed sorting for trading pairs and show available symbols ([054afe8](https://github.com/attilacsanyi/binance-pulse/commit/054afe8))
- **order-book:** improve error handling and loading states for WebSocket connection ([04e51e3](https://github.com/attilacsanyi/binance-pulse/commit/04e51e3))
- **order-book:** add throttling to WebSocket message processing ([206f1ec](https://github.com/attilacsanyi/binance-pulse/commit/206f1ec))
- **performance:** implement OnPush change detection strategy across components ([6f6b4e2](https://github.com/attilacsanyi/binance-pulse/commit/6f6b4e2))
- **routing:** implement lazy loading and create home route for order book ([bc4e68e](https://github.com/attilacsanyi/binance-pulse/commit/bc4e68e))
- **trading:** add Binance trading pair selector component (unstyled version) ([d6dac69](https://github.com/attilacsanyi/binance-pulse/commit/d6dac69))
- **trading:** improve trading pair selector component styling ([7349070](https://github.com/attilacsanyi/binance-pulse/commit/7349070))

### ❤️ Thank You

- Attila Csanyi @attilacsanyi
