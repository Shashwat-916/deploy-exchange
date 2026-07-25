"use client";

import React from "react";
import Link from "next/link";
import { Mail, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GmailVerificationPage() {
  return (
    <div className="min-h-screen bg-[#0b0d12] text-zinc-200 font-sans selection:bg-[#E33E3F]/30 flex flex-col justify-between">
      {/* Header */}
      <header className="h-16 w-full bg-[#0b0d12]/90 backdrop-blur-md flex items-center justify-between px-6">
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
        <div className="max-w-md w-full rounded-2xl border border-zinc-800/80 bg-zinc-900/30 backdrop-blur-md p-8 flex flex-col items-center gap-6 text-center">
          {/* Icon wrapper */}
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#E33E3F]/10 to-[#f46869]/10 border border-[#E33E3F]/20 flex items-center justify-center text-[#E33E3F] shadow-lg">
              <Mail className="w-9 h-9 animate-pulse" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 border-2 border-[#0b0d12]">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white tracking-tight">Check your Gmail</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              We have sent a magic verification link to your email address. Click the link to complete authentication and start trading.
            </p>
          </div>

          <div className="w-full pt-4 border-t border-zinc-800/40 flex flex-col gap-3">
            <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer" className="w-full">
              <Button className="w-full bg-[#E33E3F] hover:bg-[#E33E3F]/90 text-white font-semibold py-2.5 rounded-xl cursor-pointer">
                Open Gmail Inbox
              </Button>
            </a>
            <Link href="/" className="w-full">
              <Button variant="ghost" className="w-full text-zinc-400 hover:text-white cursor-pointer flex items-center justify-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Go Back
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-zinc-800/40 bg-[#0b0d12]/60 backdrop-blur-md px-6 text-center text-xs text-zinc-600">
        <p>© {new Date().getFullYear()} Backpack Exchange. All rights reserved.</p>
      </footer>
    </div>
  );
}
