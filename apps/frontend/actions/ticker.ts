"use server";

import axios from "axios";

export interface TickerResponse {
  firstPrice: string;
  high: string;
  lastPrice: string;
  low: string;
  priceChange: string;
  priceChangePercent: string;
  quoteVolume: string;
  symbol: string;
  trades: string;
  volume: string;
}

export interface MarketTicker {
  ticker: string;
  name: string;
  price: string;
  change: string;
  isPositive: boolean;
  high: string;
  low: string;
  volume: string;
  trades: string;
}

export async function fetchTickers(): Promise<MarketTicker[]> {
  try {
    const res = await axios.get<TickerResponse[]>("https://api.backpack.exchange/api/v1/tickers", {
      timeout: 5000
    });
    
    const data = res.data;
    
    const targetSymbols = {
      "BTC_USDC": { ticker: "BTC", name: "Bitcoin" },
      "SOL_USDC": { ticker: "SOL", name: "Solana" },
      "ETH_USDC": { ticker: "ETH", name: "Ethereum" },
      "USDT_USDC": { ticker: "USDT", name: "Tether" }
    };
    
    const result: MarketTicker[] = [];
    
    for (const item of data) {
      if (item.symbol in targetSymbols) {
        const info = targetSymbols[item.symbol as keyof typeof targetSymbols];
        const lastPrice = parseFloat(item.lastPrice) || 0;
        const changePercent = parseFloat(item.priceChangePercent) * 100 || 0;
        const highPrice = parseFloat(item.high) || 0;
        const lowPrice = parseFloat(item.low) || 0;
        const vol = parseFloat(item.volume) || 0;
        const tradesCount = parseInt(item.trades) || 0;
        
        
        const formattedPrice = lastPrice >= 1000 
          ? `$${lastPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
          : `$${lastPrice.toFixed(2)}`;
          
        const formattedChange = (changePercent >= 0 ? "+" : "") + changePercent.toFixed(2) + "%";
        
        const formattedHigh = highPrice >= 1000
          ? `$${highPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
          : `$${highPrice.toFixed(2)}`;
          
        const formattedLow = lowPrice >= 1000
          ? `$${lowPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
          : `$${lowPrice.toFixed(2)}`;

        const formattedVolume = vol >= 1000 
          ? vol.toLocaleString(undefined, { maximumFractionDigits: 2 })
          : vol.toFixed(2);
          
        const formattedTrades = tradesCount.toLocaleString();
        
        result.push({
          ticker: info.ticker,
          name: info.name,
          price: formattedPrice,
          change: formattedChange,
          isPositive: changePercent >= 0,
          high: formattedHigh,
          low: formattedLow,
          volume: formattedVolume,
          trades: formattedTrades
        });
      }
    }
    
    // Sort to keep order: BTC, SOL, ETH, USDT
    const order = ["BTC", "SOL", "ETH", "USDT"];
    result.sort((a, b) => order.indexOf(a.ticker) - order.indexOf(b.ticker));
    
    return result;
  } catch (error) {
    console.error("Error in fetchTickers action with axios:", error);
    // Fallback data
    return [
      { ticker: "BTC", name: "Bitcoin", price: "$64,273.70", change: "+0.25%", isPositive: true, high: "$64,389.80", low: "$63,750.70", volume: "11.19", trades: "3,198" },
      { ticker: "SOL", name: "Solana", price: "$74.39", change: "+0.96%", isPositive: true, high: "$74.64", low: "$73.51", volume: "7,078.87", trades: "2,971" },
      { ticker: "ETH", name: "Ethereum", price: "$1,869.39", change: "+0.55%", isPositive: true, high: "$1,875.11", low: "$1,850.11", volume: "234.76", trades: "4,317" },
      { ticker: "USDT", name: "Tether", price: "$1.00", change: "+0.01%", isPositive: true, high: "$1.00", low: "$0.99", volume: "1,245,630.00", trades: "9,832" }
    ];
  }
}