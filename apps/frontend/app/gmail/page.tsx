"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, KeyRound, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  InputOTP, 
  InputOTPGroup, 
  InputOTPSlot, 
  InputOTPSeparator 
} from "@/components/ui/input-otp";

export default function GmailVerificationPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Email Input, 2: OTP Input, 3: Success
  const [email, setEmail] = useState("");
  const [otpValue, setOtpValue] = useState("");

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
      setStep(2);
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpValue.length === 6) {
      setStep(3);
    }
  };
  return (
    <div className="min-h-screen  bg-[#0b0d12]  text-zinc-200 font-sans selection:bg-[#E33E3F]/30 flex flex-col justify-between">
      {/* Header */}
      <header className="h-16 w-full bg-[#0b0d12]/90 backdrop-blur-md flex items-center justify-between px-6 border-none">
        <Link href="/" className="flex items-center gap-2.5">
          <img
            src="/backpack-logo.jpg"
            alt="Backpack Logo"
            className="h-7 w-auto object-contain rounded-full"
          />
          <span className="text-2xl font-semibold text-white tracking-tight font-sans">
            Backpack
          </span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full rounded-2xl border border-zinc-800/80 bg-[#14151B] backdrop-blur-md p-8 flex flex-col gap-6 relative overflow-hidden shadow-2xl">
          {/* Subtle Glow Ring */}
          <div className="absolute -right-16 -top-16 w-32 h-32 bg-[#E33E3F]/5 rounded-full blur-3xl pointer-events-none" />

          {step === 1 && (
            <form onSubmit={handleSendOtp} className="space-y-6">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#E33E3F]/10 to-[#f46869]/10 border border-[#E33E3F]/20 flex items-center justify-center text-[#E33E3F] shadow-lg">
                  <Mail className="w-7 h-7" />
                </div>
                <div className="space-y-1.5">
                  <h2 className="text-2xl font-bold text-white tracking-tight">Gmail Verification</h2>
                  <p className="text-xs text-zinc-400 max-w-[280px] leading-relaxed">
                    Enter your email to receive a 6-digit confirmation code.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Email Address</label>
                <Input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 px-4 rounded-xl bg-zinc-950/50 border-zinc-800 text-white placeholder-zinc-700 focus-visible:border-[#E33E3F] focus-visible:ring-3 focus-visible:ring-[#E33E3F]/20 text-sm font-medium transition-all"
                />
              </div>

              <div className="space-y-3">
                <Button type="submit" className="w-full bg-[#E33E3F] hover:bg-[#E33E3F]/90 text-white font-semibold py-2.5 rounded-xl cursor-pointer shadow-lg shadow-red-500/10 transition duration-200">
                  Send Code
                </Button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerify} className="space-y-6">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#E33E3F]/10 to-[#f46869]/10 border border-[#E33E3F]/20 flex items-center justify-center text-[#E33E3F] shadow-lg">
                  <KeyRound className="w-7 h-7" />
                </div>
                <div className="space-y-1.5">
                  <h2 className="text-2xl font-bold text-white tracking-tight">Enter Code</h2>
                  <p className="text-xs text-zinc-400 max-w-[280px] leading-relaxed">
                    We sent a confirmation code to <span className="text-white font-medium">{email}</span>.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <InputOTP
                  maxLength={6}
                  value={otpValue}
                  onChange={(value) => setOtpValue(value)}
                >
                  <InputOTPGroup className="gap-2.5">
                    <InputOTPSlot index={0} className="w-12 h-14 bg-zinc-950 border border-zinc-800 rounded-xl text-lg font-bold text-white transition-all data-[active=true]:border-[#E33E3F] data-[active=true]:ring-3 data-[active=true]:ring-[#E33E3F]/20 border-l" />
                    <InputOTPSlot index={1} className="w-12 h-14 bg-zinc-950 border border-zinc-800 rounded-xl text-lg font-bold text-white transition-all data-[active=true]:border-[#E33E3F] data-[active=true]:ring-3 data-[active=true]:ring-[#E33E3F]/20 border-l" />
                    <InputOTPSlot index={2} className="w-12 h-14 bg-zinc-950 border border-zinc-800 rounded-xl text-lg font-bold text-white transition-all data-[active=true]:border-[#E33E3F] data-[active=true]:ring-3 data-[active=true]:ring-[#E33E3F]/20 border-l" />
                    <InputOTPSeparator className="text-zinc-600" />
                    <InputOTPSlot index={3} className="w-12 h-14 bg-zinc-950 border border-zinc-800 rounded-xl text-lg font-bold text-white transition-all data-[active=true]:border-[#E33E3F] data-[active=true]:ring-3 data-[active=true]:ring-[#E33E3F]/20 border-l" />
                    <InputOTPSlot index={4} className="w-12 h-14 bg-zinc-950 border border-zinc-800 rounded-xl text-lg font-bold text-white transition-all data-[active=true]:border-[#E33E3F] data-[active=true]:ring-3 data-[active=true]:ring-[#E33E3F]/20 border-l" />
                    <InputOTPSlot index={5} className="w-12 h-14 bg-zinc-950 border border-zinc-800 rounded-xl text-lg font-bold text-white transition-all data-[active=true]:border-[#E33E3F] data-[active=true]:ring-3 data-[active=true]:ring-[#E33E3F]/20 border-l" />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="space-y-3">
                <Button type="submit" disabled={otpValue.length !== 6} className="w-full bg-[#E33E3F] hover:bg-[#E33E3F]/90 text-white disabled:opacity-50 disabled:cursor-not-allowed font-semibold py-2.5 rounded-xl cursor-pointer shadow-lg shadow-red-500/10 transition duration-200">
                  Verify & Continue
                </Button>
                <div className="flex items-center justify-between text-xs px-1">
                  <span className="text-zinc-500">Didn't receive code?</span>
                  <button type="button" onClick={() => { setStep(1); setOtpValue(""); }} className="text-[#E33E3F] hover:underline font-semibold cursor-pointer">
                    Resend Email
                  </button>
                </div>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="space-y-6 py-4">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-lg">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div className="space-y-1.5">
                  <h2 className="text-2xl font-bold text-white tracking-tight">Verified Successfully</h2>
                  <p className="text-xs text-zinc-400 max-w-[280px] leading-relaxed">
                    Your email address has been authenticated. You can now access your dashboard.
                  </p>
                </div>
              </div>

              <Link href="/market" className="block">
                <Button className="w-full bg-[#E33E3F] hover:bg-[#E33E3F]/90 text-white font-semibold py-2.5 rounded-xl cursor-pointer shadow-lg shadow-red-500/10 transition duration-200">
                  Go to Markets
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-zinc-800/40 bg-[#0b0d12]/60 backdrop-blur-md px-6 text-center text-xs text-zinc-600">
        <p>© {new Date().getFullYear()} Backpack Exchange. All rights reserved.</p>
      </footer>
    </div>
  );
}
