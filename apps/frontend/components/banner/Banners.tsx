import React from "react";
import Link from "next/link";

// 1. USDT Banner (The base one you provided)
export function UsdtBanner() {
  return (
    <div className="relative w-full h-full bg-gradient-to-r from-[#111318] to-[#151921] flex items-center group">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(122,241,205,0.03)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-1/3 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute right-10 top-[-10%] w-[120%] h-[120%] border border-[#7af1cd] rounded-full blur-[2px]" />
        <div className="absolute right-4 top-[5%] w-[90%] h-[90%] border border-[#7af1cd] rounded-full blur-[1px]" />
      </div>

      <div className="w-full flex items-center justify-between px-16 z-10">
        <div className="flex flex-col gap-4 max-w-lg">
          <div className="flex items-center gap-2">
            <img src="/backpack-logo.jpg" alt="Backpack" className="w-5 h-5 rounded-full object-contain" />
            <span className="text-[11px] font-semibold text-zinc-400 tracking-wider uppercase">Backpack</span>
          </div>

          <h2 className="text-3xl font-extrabold text-white tracking-tight">Got USDT?</h2>
          <p className="text-[#8c92a0] text-sm leading-relaxed">Convert to USD with 0 fees and start trading on Backpack!</p>
          
          <div className="flex items-center gap-3">
            <button className="bg-[#7af1cd] hover:bg-[#8ef8d7] text-[#0d1017] px-6 py-2.5 rounded-xl font-bold text-xs transition-all shadow-[0_0_12px_rgba(122,241,205,0.15)] hover:shadow-[0_0_18px_rgba(122,241,205,0.3)] cursor-pointer">
              Trade USDT
            </button>
            <Link href="/market">
              <button className="border border-zinc-800 bg-zinc-900/40 text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer rounded-xl px-6 py-2.5 text-xs font-bold transition-all">
                View Markets
              </button>
            </Link>
          </div>
        </div>

        <div className="relative w-36 h-36 flex-shrink-0 mr-4">
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_0_20px_rgba(122,241,205,0.15)] select-none">
            <defs>
              <radialGradient id="usdt-grad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#26A17B" />
                <stop offset="100%" stopColor="#145341" />
              </radialGradient>
            </defs>
            <circle cx="60" cy="60" r="52" fill="#13161f" stroke="#26A17B" strokeWidth="2" />
            <circle cx="60" cy="60" r="45" fill="url(#usdt-grad)" />
            <g fill="none" stroke="white" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 40 48 L 80 48" />
              <path d="M 60 48 L 60 76" />
              <circle cx="60" cy="67" r="13" strokeWidth="4" />
              <path d="M 49 67 L 71 67" strokeWidth="4" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

// 2. Solana Speed Banner (Purple)
export function SolanaBanner() {
  return (
    <div className="relative w-full h-full bg-gradient-to-r from-[#111318] to-[#151921] flex items-center group">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(168,85,247,0.05)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-1/3 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute right-10 top-[-10%] w-[120%] h-[120%] border border-purple-500 rounded-full blur-[2px]" />
        <div className="absolute right-4 top-[5%] w-[90%] h-[90%] border border-purple-500 rounded-full blur-[1px]" />
      </div>

      <div className="w-full flex items-center justify-between px-16 z-10">
        <div className="flex flex-col gap-4 max-w-lg">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-purple-400 tracking-wider uppercase">Solana Ecosystem</span>
          </div>

          <h2 className="text-3xl font-extrabold text-white tracking-tight">Trade SOL with Super Speed</h2>
          <p className="text-[#8c92a0] text-sm leading-relaxed">Execute lightning-fast Solana trades with zero downtime on Backpack.</p>
          
          <div className="flex items-center gap-3">
            <button className="bg-purple-500 hover:bg-purple-400 text-white px-6 py-2.5 rounded-xl font-bold text-xs transition-all shadow-[0_0_12px_rgba(168,85,247,0.2)] hover:shadow-[0_0_18px_rgba(168,85,247,0.4)] cursor-pointer">
              Trade SOL Now
            </button>
          </div>
        </div>

        <div className="relative w-36 h-36 flex-shrink-0 mr-4">
          <svg viewBox="0 0 128 128" className="w-full h-full drop-shadow-[0_0_20px_rgba(168,85,247,0.2)] select-none">
            <defs>
              <linearGradient id="sol-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00FFA3" />
                <stop offset="50%" stopColor="#8546FF" />
                <stop offset="100%" stopColor="#DC1FFF" />
              </linearGradient>
            </defs>
            <circle cx="64" cy="64" r="60" fill="#13161f" stroke="url(#sol-grad)" strokeWidth="1" />
            <g transform="translate(24, 34) scale(0.65)" fill="url(#sol-grad)">
              <path d="M10.6 15.2h106.8c3.6 0 5.5 4.3 3 6.9L103.1 39.3c-1.5 1.5-3.5 2.3-5.6 2.3H10.6c-3.6 0-5.5-4.3-3-6.9l17.3-17.3c1.5-1.5 3.5-2.3 5.6-2.3zM117.4 48.6H10.6c-3.6 0-5.5 4.3-3 6.9l17.3 17.3c1.5 1.5 3.5 2.3 5.6 2.3h106.8c3.6 0 5.5-4.3 3-6.9L122.9 51c-1.5-1.5-3.5-2.3-5.6-2.3zM10.6 82h106.8c3.6 0 5.5 4.3 3 6.9L103.1 106c-1.5 1.5-3.5 2.3-5.6 2.3H10.6c-3.6 0-5.5-4.3-3-6.9l17.3-17.3c1.5-1.5 3.5-2.3 5.6-2.3z"/>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

// 3. New Listing Banner (Green)
export function ListingBanner() {
  return (
    <div className="relative w-full h-full bg-gradient-to-r from-[#111318] to-[#121d18] flex items-center group">
      <div className="absolute right-20 top-1/2 -translate-y-1/2 w-40 h-40">
        <div className="absolute inset-0 rounded-full border border-emerald-500/20 animate-pulse scale-75" />
        <div className="absolute inset-0 rounded-full border border-emerald-500/10 animate-pulse delay-75" />
      </div>

      <div className="w-full flex items-center justify-between px-16 z-10">
        <div className="flex flex-col gap-4 max-w-lg">
          <div className="flex items-center gap-2">
            <span className="inline-block px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">New Listing</span>
          </div>

          <h2 className="text-3xl font-extrabold text-white tracking-tight">JUP is Live</h2>
          <p className="text-[#8c92a0] text-sm leading-relaxed">Spot trading is now open for JUP/USDC. Start trading immediately.</p>
          
          <div className="flex items-center gap-3">
            <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl font-bold text-xs transition-all shadow-[0_0_12px_rgba(16,185,129,0.2)] hover:shadow-[0_0_18px_rgba(16,185,129,0.4)] cursor-pointer">
              Trade JUP
            </button>
          </div>
        </div>

        <div className="relative w-36 h-36 flex-shrink-0 mr-4 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-28 h-28 text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <circle cx="50" cy="50" r="45" fill="#13161f" stroke="currentColor" strokeWidth="2"/>
            <text x="50" y="57" textAnchor="middle" fill="currentColor" fontSize="24" fontWeight="bold" fontFamily="sans-serif">JUP</text>
          </svg>
        </div>
      </div>
    </div>
  );
}

// 4. Referral Banner (Gold/Yellow)
export function ReferralBanner() {
  return (
    <div className="relative w-full h-full bg-gradient-to-r from-[#111318] to-[#1a1610] flex items-center group">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(251,191,36,0.03)_0%,transparent_60%)] pointer-events-none" />
      
      <div className="w-full flex items-center justify-between px-16 z-10">
        <div className="flex flex-col gap-4 max-w-lg">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-yellow-400 tracking-wider uppercase">Rewards</span>
          </div>

          <h2 className="text-3xl font-extrabold text-white tracking-tight">Invite & Earn</h2>
          <p className="text-[#8c92a0] text-sm leading-relaxed">Share your link and get 30% commission on every trade your friends make.</p>
          
          <div className="flex items-center gap-3">
            <button className="bg-yellow-500 hover:bg-yellow-400 text-[#0d1017] px-6 py-2.5 rounded-xl font-bold text-xs transition-all shadow-[0_0_12px_rgba(251,191,36,0.2)] hover:shadow-[0_0_18px_rgba(251,191,36,0.4)] cursor-pointer">
              Get Invite Link
            </button>
          </div>
        </div>

        <div className="relative w-36 h-36 flex-shrink-0 mr-4 flex items-center justify-center">
            <svg viewBox="0 0 64 64" className="w-28 h-28 text-yellow-500 drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                <circle cx="32" cy="20" r="16" fill="#13161f" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M32 10V30M22 20H42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M10 48c0-4.4 3.6-8 8-8h28c4.4 0 8 3.6 8 8v10H10V48z" fill="#13161f" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M32 40v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
        </div>
      </div>
    </div>
  );
}

// 5. Security/KYC Banner (Blue)
export function SecurityBanner() {
  return (
    <div className="relative w-full h-full bg-gradient-to-r from-[#111318] to-[#151921] flex items-center group">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.05)_0%,transparent_60%)] pointer-events-none" />
      
      <div className="w-full flex items-center justify-between px-16 z-10">
        <div className="flex flex-col gap-4 max-w-lg">
          <div className="flex items-center gap-2">
             <span className="text-[11px] font-semibold text-blue-400 tracking-wider uppercase">Account Security</span>
          </div>

          <h2 className="text-3xl font-extrabold text-white tracking-tight">Verify Your Identity</h2>
          <p className="text-[#8c92a0] text-sm leading-relaxed">Complete KYC to unlock higher withdrawal limits and fiat deposit features.</p>
          
          <div className="flex items-center gap-3">
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-bold text-xs transition-all shadow-[0_0_12px_rgba(59,130,246,0.2)] hover:shadow-[0_0_18px_rgba(59,130,246,0.4)] cursor-pointer">
              Start Verification
            </button>
          </div>
        </div>

        <div className="relative w-36 h-36 flex-shrink-0 mr-4 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" className="w-28 h-28 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)] text-blue-500">
            <path d="M12 2L3 7V12C3 17.55 6.84 22.74 12 24C17.16 22.74 21 17.55 21 12V7L12 2Z" fill="#13161f" stroke="currentColor" strokeWidth="1"/>
            <path d="M12 6V12M12 12V18M12 12H18M12 12H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </div>
      </div>
    </div>
  );
}