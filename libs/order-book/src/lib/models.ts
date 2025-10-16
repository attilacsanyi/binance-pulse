export type OrderBookEntry = {
  price: string;
  quantity: string;
};

export type OrderBookData = {
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
};
