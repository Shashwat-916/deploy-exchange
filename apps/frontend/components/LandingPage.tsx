"use client";

import React from "react";
import Link from "next/link";
import { Mail, MessageSquare, ShieldCheck, ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

// 1. BackPackImage Component
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



// 3. NavBar Component (Removed Markets links)
function NavBar() {
    return (
        <header className="sticky top-0 z-50 h-16 w-full bg-[#0b0d12]/90 backdrop-blur-md transition-all duration-200 relative">
            <div className="flex h-full w-full items-center justify-between px-6">
                {/* Left Section: Logo only */}
                <div className="flex items-center gap-10 h-full">
                    <Link href="/" className="flex items-center transition-transform duration-200 hover:scale-[1.01]">
                        <BackPackImage />
                    </Link>
                </div>


            </div>
        </header>
    );
}

export default function LandingPageComponent() {
    return (
        <div className="min-h-screen bg-[#0b0d12] text-zinc-200 font-sans selection:bg-[#E33E3F]/30 flex flex-col justify-between relative overflow-hidden">
            <NavBar />

            <main className="flex-1 flex items-center justify-center px-6 py-12 relative z-10">
                <div className="max-w-3xl w-full flex flex-col items-center gap-12">
                    {/* Header Title */}
                    <div className="text-center space-y-3">

                        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                            Authenticate with <span className="text-[#E33E3F]">Backpack</span>
                        </h2>
                        <p className="text-sm md:text-base text-zinc-400 max-w-md mx-auto leading-relaxed">
                            Select an option below to securely verify your identity and continue.
                        </p>
                    </div>

                    {/* Two Authentication Cards */}
                    <div className="grid md:grid-cols-2 gap-6 w-full">
                        {/* Left Card: Email Auth */}
                        <Link href="/gmail" className="group block relative">
                            {/* Outer glow overlay */}
                            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[#E33E3F] to-[#f46869] opacity-0 blur transition duration-300 group-hover:opacity-10" />

                            <div className="relative h-72 rounded-2xl border border-zinc-800/80 bg-zinc-900/30 backdrop-blur-md p-8 flex flex-col items-center justify-center gap-6 transition-all duration-300 hover:border-[#E33E3F]/40 hover:bg-zinc-900/50 hover:scale-[1.02]">
                                {/* Icon Container with active hover glow */}
                                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#E33E3F]/10 to-[#f46869]/10 border border-[#E33E3F]/20 flex items-center justify-center text-[#E33E3F] shadow-lg group-hover:scale-110 group-hover:border-[#E33E3F]/40 transition-all duration-300 relative">
                                    <Mail className="w-10 h-10 relative z-10" />
                                    <div className="absolute inset-0 rounded-full bg-[#E33E3F] opacity-0 blur-md group-hover:opacity-20 transition-all duration-300" />
                                </div>

                                {/* Text Description */}
                                <div className="text-center space-y-2">
                                    <h3 className="text-xl font-bold text-white tracking-tight flex items-center justify-center gap-1.5">
                                        Gmail / Message

                                    </h3>
                                    <p className="text-xs text-zinc-500 max-w-[200px] leading-relaxed">
                                        Verify securely using your email address and login links
                                    </p>
                                </div>
                            </div>
                        </Link>

                        {/* Right Card: Phone Auth */}
                        <Link href="/message" className="group block relative">
                            {/* Outer glow overlay */}
                            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[#E33E3F] to-[#f46869] opacity-0 blur transition duration-300 group-hover:opacity-10" />

                            <div className="relative h-72 rounded-2xl border border-zinc-800/80 bg-zinc-900/30 backdrop-blur-md p-8 flex flex-col items-center justify-center gap-6 transition-all duration-300 hover:border-[#E33E3F]/40 hover:bg-zinc-900/50 hover:scale-[1.02]">
                                {/* Icon Container with active hover glow */}
                                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#E33E3F]/10 to-[#f46869]/10 border border-[#E33E3F]/20 flex items-center justify-center text-[#E33E3F] shadow-lg group-hover:scale-110 group-hover:border-[#E33E3F]/40 transition-all duration-300 relative">
                                    <MessageSquare className="w-10 h-10 relative z-10" />
                                    <div className="absolute inset-0 rounded-full bg-[#E33E3F] opacity-0 blur-md group-hover:opacity-20 transition-all duration-300" />
                                </div>

                                {/* Text Description */}
                                <div className="text-center space-y-2">
                                    <h3 className="text-xl font-bold text-white tracking-tight flex items-center justify-center gap-1.5">
                                        Phone / SMS

                                    </h3>
                                    <p className="text-xs text-zinc-500 max-w-[200px] leading-relaxed">
                                        Verify securely using a mobile number and one-time SMS code
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-6 border-t border-zinc-800/40 bg-[#0b0d12]/60 backdrop-blur-md px-6 text-center text-xs text-zinc-600 relative z-10">
                <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p>© {new Date().getFullYear()} Backpack Exchange. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <a href="#" className="hover:text-zinc-400 transition-colors flex items-center gap-1">
                            Terms <ExternalLink className="w-3 h-3" />
                        </a>
                        <a href="#" className="hover:text-zinc-400 transition-colors flex items-center gap-1">
                            Privacy <ExternalLink className="w-3 h-3" />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}