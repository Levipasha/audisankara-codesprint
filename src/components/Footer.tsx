'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-[#03030f] py-12 text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-4 text-left">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="CodeSprint Logo" className="h-8 w-auto object-contain brightness-0 invert" />
              <span className="text-xl font-bold tracking-tight text-white">CodeSprint</span>
            </Link>
            <p className="text-xs text-zinc-500 max-w-xs leading-relaxed">
              8-Hours National Level Hackathon organized by Audisankara (Deemed to be University).
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-left">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Event</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#speakers" className="hover:text-white transition-colors">
                  Guest Speakers
                </Link>
              </li>
              <li>
                <Link href="/#prizes" className="hover:text-white transition-colors">
                  Prize Pool
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Sponsors & Powered By */}
          <div className="text-left">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Partners & Sponsors</h3>
            <div className="space-y-3.5 text-xs">
              <div>
                <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider">Organized By</p>
                <p className="text-zinc-400 mt-0.5">Audisankara (Deemed to be University)</p>
              </div>
              <div>
                <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider">Accredited</p>
                <p className="text-zinc-400 mt-0.5 leading-relaxed">
                  NAAC A+ Accredited · Declared under UGC Act
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="text-left">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Contact Support</h3>
            <ul className="space-y-2 text-xs text-zinc-500">
              <li>Email: <a href="mailto:codesprint@audisankara.ac.in" className="text-zinc-400 hover:text-white transition-colors">codesprint@audisankara.ac.in</a></li>
              <li>Phone: <span className="text-zinc-400">+91 8309848987 / 7569520695</span></li>
              <li>Venue: <span className="text-zinc-400">KVT Hall, Gudur, Andhra Pradesh, India</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-zinc-600">
          <p>© {new Date().getFullYear()} CodeSprint-2026. Organized by Audisankara (Deemed to be University). All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-zinc-400 transition-colors">codesprint.audisankara.ac.in</Link>
            <Link href="/privacy" className="hover:text-zinc-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-zinc-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
