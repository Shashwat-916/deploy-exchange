"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GetTickers } from "@/actions/ticker";
import {
  UsdtBanner,
  SolanaBanner,
  ListingBanner,
  ReferralBanner
} from "./banner/Banners";

interface TickerResponse {
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

interface MarketTicker {
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

const SYMBOL_INFO: Record<string, { ticker: string; name: string }> = {
  BTC_USDC: { ticker: "BTC", name: "Bitcoin" },
  ETH_USDC: { ticker: "ETH", name: "Ethereum" },
  SOL_USDC: { ticker: "SOL", name: "Solana" },
};

function formatPrice(value: number): string {
  return value >= 1000
    ? `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : `$${value.toFixed(2)}`;
}

function toMarketTickers(raw: TickerResponse[]): MarketTicker[] {
  const result: MarketTicker[] = [];
  const order = ["BTC", "SOL", "ETH"];

  for (const item of raw) {
    const info = SYMBOL_INFO[item.symbol];
    if (!info) continue;

    const lastPrice = parseFloat(item.lastPrice) || 0;
    const changePercent = (parseFloat(item.priceChangePercent) * 100) || 0;
    const highPrice = parseFloat(item.high) || 0;
    const lowPrice = parseFloat(item.low) || 0;
    const vol = parseFloat(item.volume) || 0;
    const tradesCount = parseInt(item.trades) || 0;

    result.push({
      ticker: info.ticker,
      name: info.name,
      price: formatPrice(lastPrice),
      change: `${changePercent >= 0 ? "+" : ""}${changePercent.toFixed(2)}%`,
      isPositive: changePercent >= 0,
      high: formatPrice(highPrice),
      low: formatPrice(lowPrice),
      volume: vol >= 1000
        ? vol.toLocaleString(undefined, { maximumFractionDigits: 2 })
        : vol.toFixed(2),
      trades: tradesCount.toLocaleString(),
    });
  }

  result.sort((a, b) => order.indexOf(a.ticker) - order.indexOf(b.ticker));
  return result;
}


function BackPackImage() {
  return (
    <div className="flex h-8 items-center justify-center gap-2.5">
      <img
        src="/backpack-logo.jpg"
        alt="Backpack Logo"
        className="h-7 w-auto object-contain rounded-full"
      />
      <span className="text-2xl font-semibold text-white tracking-tight">
        Backpack
      </span>
    </div>
  );
}

// 2. Profile Component
function Profile() {
  return (
    <button className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-[#E33E3F] to-[#f46869] text-[13px] font-semibold text-white transition duration-200 hover:opacity-90 shadow-lg shadow-red-500/15 cursor-pointer border border-white/10">
      M
    </button>
  );
}

// 3. NavBar Component
function NavBar() {
  return (
    <header className="sticky top-0 z-50 h-16 w-full bg-[#0b0d12]/90 backdrop-blur-md transition-all duration-200">
      <div className="flex h-full w-full items-center justify-between px-6">
        {/* Left Section: Logo & Links */}
        <div className="flex items-center gap-10 h-full">
          <Link href="/" className="flex items-center transition-transform duration-200 hover:scale-[1.01]">
            <BackPackImage />
          </Link>
          <nav className="hidden md:flex items-center gap-6 h-full">
            <Link href="/market" className="relative flex items-center text-sm font-medium text-white transition-colors duration-200 h-16 group">
              <span>Markets</span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#E33E3F] transition-transform duration-300 ease-out origin-left rounded-full" />
            </Link>
          </nav>
        </div>

        {/* Right Section: Actions */}
        <div className="flex items-center gap-4">
          <Button variant="outline" className="border-zinc-800 bg-zinc-900/ hover:bg-zinc-800 hover:text-white cursor-pointer rounded-xl px-4 py-1.5 text-xs text-green-400 font-bold">
            Check Balances
          </Button>
          <Profile />
        </div>
      </div>
    </header>
  );
}

function PromoBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const banners = [
    <UsdtBanner key="usdt" />,
    <SolanaBanner key="solana" />,
    <ListingBanner key="listing" />,
    <ReferralBanner key="referral" />
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    // Auto-advance banner every 6 seconds
    const timer = setInterval(handleNext, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-[85%] mx-auto h-54 bg-[#111318] rounded-2xl overflow-hidden border border-zinc-800/60 shadow-xl group/slider">
      {/* Slides wrapper */}
      <div
        className="flex h-full w-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <div key={index} className="w-full h-full flex-shrink-0">
            {banner}
          </div>
        ))}
      </div>

      {/* Left Navigation Arrow */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 text-zinc-400 hover:text-white bg-black/40 hover:bg-black/60 rounded-full border border-zinc-800 transition-all opacity-0 group-hover/slider:opacity-100 cursor-pointer shadow-md"
        aria-label="Previous banner"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Right Navigation Arrow */}
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 text-zinc-400 hover:text-white bg-black/40 hover:bg-black/60 rounded-full border border-zinc-800 transition-all opacity-0 group-hover/slider:opacity-100 cursor-pointer shadow-md"
        aria-label="Next banner"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Pagination indicators (Dots) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${currentIndex === index ? "bg-white w-3" : "bg-white/30 hover:bg-white/50"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

const getIcon = (ticker: string) => {
  switch (ticker) {
    case "BTC":
      return (
        <svg viewBox="0 0 32 32" className="w-8 h-8 rounded-full select-none shrink-0">
          <circle cx="16" cy="16" r="16" fill="#F7931A" />
          <path d="M19.5 13c.2-1.3-.8-2-2.2-2.5l.4-1.8h-1.1l-.4 1.7c-.3-.1-.6-.1-.9-.2l.4-1.8H14l-.4 1.8c-.3 0-.6.1-.9.1l-.4 1.9H12l-.4 1.8c-.2 0-.5 0-.7-.1l-1.5-.4-.3 1.2s.8.2.8.2c.4.1.5.4.5.6l-.6 2.4c0 .1-.1.2-.2.2l-.8-.2-.3 1.2 1.4.3c.3.1.5.1.8.1l-.4 1.8h1.1l.4-1.7c.3 0 .6.1.9.1l-.4 1.7h1.1l.4-1.8c1.9.4 3.3.2 3.9-1.2.5-1.1.2-2-1-2.5.8-.3 1.4-.9 1.4-2.1zm-3.3 5c-.3 1.7-2.7.8-3.4.6l.7-2.8c.8.2 3 .6 2.7 2.2zm.4-4.2c-.3 1.5-2.3.8-2.9.6l.6-2.5c.6.1 2.6.4 2.3 1.9z" fill="white" />
        </svg>
      );
    case "SOL":
      return (
        <svg viewBox="0 0 32 32" className="w-8 h-8 rounded-full select-none shrink-0">
          <defs>
            <linearGradient id="sol-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00FFA3" />
              <stop offset="100%" stopColor="#DC1FFF" />
            </linearGradient>
          </defs>
          <circle cx="16" cy="16" r="16" fill="url(#sol-grad)" />
          <g fill="white">
            <path d="M8 10h16l-3.5 3.5H11.5z" />
            <path d="M11.5 13.5h16l-3.5 3.5h-16z" opacity="0.85" />
            <path d="M8 17h16l-3.5 3.5H11.5z" />
          </g>
        </svg>
      );
    case "ETH":
      return (
        <svg viewBox="0 0 32 32" className="w-8 h-8 rounded-full select-none shrink-0">
          <circle cx="16" cy="16" r="16" fill="#627EEA" />
          <g fill="white" opacity="0.9">
            <path d="M16 6v7.36l6.45-2.88z" opacity="0.8" />
            <path d="M16 6L9.55 10.48 16 13.36z" />
            <path d="M16 22.36v3.64l6.45-9.1z" opacity="0.8" />
            <path d="M16 26v-3.64L9.55 16.9z" />
            <path d="M16 14.54l6.45-3.82-6.45-2.89z" opacity="0.7" />
            <path d="M16 7.83L9.55 10.72l6.45 3.82z" opacity="0.9" />
          </g>
        </svg>
      );
    case "USDT":
      return (
        <svg viewBox="0 0 32 32" className="w-8 h-8 rounded-full select-none shrink-0">
          <circle cx="16" cy="16" r="16" fill="#26A17B" />
          <g fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 12 L22 12" />
            <path d="M16 12 L16 21" />
            <circle cx="16" cy="18" r="4" strokeWidth="1.5" />
            <path d="M12.5 18 L19.5 18" strokeWidth="1.5" />
          </g>
        </svg>
      );
    default:
      return null;
  }
};

function AllMarket() {
  const [markets, setMarkets] = useState<MarketTicker[]>([
    { ticker: "BTC", name: "Bitcoin", price: "$64,273.70", change: "+0.25%", isPositive: true, high: "$64,389.80", low: "$63,750.70", volume: "11.19", trades: "3,198" },
    { ticker: "SOL", name: "Solana", price: "$74.39", change: "+0.96%", isPositive: true, high: "$74.64", low: "$73.51", volume: "7,078.87", trades: "2,971" },
    { ticker: "ETH", name: "Ethereum", price: "$1,869.39", change: "+0.55%", isPositive: true, high: "$1,875.11", low: "$1,850.11", volume: "234.76", trades: "4,317" },
    { ticker: "USDT", name: "Tether", price: "$1.00", change: "+0.01%", isPositive: true, high: "$1.00", low: "$0.99", volume: "1,245,630.00", trades: "9,832" }
  ]);

  useEffect(() => {
    let active = true;

    // Initial fetch
    GetTickers().then((data: TickerResponse[]) => {
      if (active) {
        setMarkets(toMarketTickers(data));
      }
    });

    // Poll updates every 10 seconds
    const interval = setInterval(() => {
      GetTickers().then((data: TickerResponse[]) => {
        if (active) {
          setMarkets(toMarketTickers(data));
        }
      });
    }, 10000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-[85%] mx-auto flex flex-col gap-3 bg-[#14151B] p-6 m-2 rounded-md border border-zinc-800/40">
      {/* Table Headers (Responsive Grid Template) */}
      <div className="grid grid-cols-[1.5fr_1fr_1fr] sm:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1.2fr] lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1.2fr_0.8fr] items-center px-4 py-2 text-xs font-semibold text-zinc-500 tracking-wider uppercase select-none border-b border-zinc-800/60 pb-3">
        <div>Asset</div>
        <div className="text-right">Price</div>
        <div className="text-right">24h Change</div>
        <div className="text-right hidden sm:block">24h High</div>
        <div className="text-right hidden sm:block">24h Low</div>
        <div className="text-right hidden md:block">24h Volume</div>
        <div className="text-right hidden lg:block">Trades</div>
      </div>

      {/* Rows */}
      {markets.map((market) => (
        <div
          key={market.ticker}
          className="grid grid-cols-[1.5fr_1fr_1fr] sm:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1.2fr] lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1.2fr_0.8fr] items-center px-4 py-3.5 hover:bg-zinc-800/20 transition-all duration-200 cursor-pointer rounded-xl border border-transparent hover:border-zinc-800/30"
        >
          {/* Asset Info */}
          <div className="flex items-center gap-3">
            {getIcon(market.ticker)}
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-zinc-100 text-sm">{market.ticker}</span>
              <span className="text-xs text-zinc-500 truncate">{market.name}</span>
            </div>
          </div>

          {/* Price */}
          <div className="text-right font-bold text-sm text-zinc-100">
            {market.price}
          </div>

          {/* 24h Change */}
          <div className={`text-right font-bold text-sm ${market.isPositive ? 'text-[#00c278]' : 'text-[#ff4d4d]'}`}>
            {market.change}
          </div>

          {/* 24h High */}
          <div className="text-right text-xs text-zinc-400 font-semibold hidden sm:block">
            {market.high}
          </div>

          {/* 24h Low */}
          <div className="text-right text-xs text-zinc-400 font-semibold hidden sm:block">
            {market.low}
          </div>

          {/* Volume */}
          <div className="text-right text-xs text-zinc-400 font-semibold hidden md:block">
            {market.volume}
          </div>

          {/* Trades */}
          <div className="text-right text-xs text-zinc-400 font-semibold hidden lg:block">
            {market.trades}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function MarketPageComponent() {
  return (
    <div className="min-h-screen bg-[#0b0d12] text-zinc-200 font-sans selection:bg-[#E33E3F]/30">
      <NavBar />

      <main className="max-w-[1400px] mx-auto px-6 py-8 flex flex-col gap-12">
        <PromoBanner />
        <AllMarket />
      </main>
    </div>
  );
}