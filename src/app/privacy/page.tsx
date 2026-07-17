'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-700 font-sans py-24 relative bg-grid animate-[fadeIn_0.3s_ease-out]">
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-900 transition-colors mb-12 group font-semibold">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to home
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-white rounded-xl border border-slate-200 text-slate-800 shadow-sm">
            <Shield className="h-5 w-5" />
          </div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">legal</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">Privacy Policy</h1>
        <p className="text-xs text-slate-500 mb-12">Last Updated: February 20, 2026</p>

        <div className="space-y-8 text-sm leading-relaxed text-slate-600">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">1. Information We Collect</h2>
            <p>
              When you register for CodeSprint-2026, we collect personal information necessary to organize the event, manage teams, and process registrations. This includes your name, email address, contact number, college/organization details, and payment information.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">2. How We Use Your Information</h2>
            <p>
              We use the collected information to:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-500">
              <li>Verify your identity and eligibility for the hackathon.</li>
              <li>Coordinate team formation and communication.</li>
              <li>Provide critical updates regarding schedule changes, venue directions, or problem statements.</li>
              <li>Process registration payments securely through our integrations.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">3. Data Sharing and Protection</h2>
            <p>
              Your data is strictly used for the logistics of CodeSprint-2026 and is never sold or shared with external third-party advertisers. We employ industry-standard encryption, SSL protocols, and access controls to secure your personal identifiers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">4. Cookies and Analytics</h2>
            <p>
              We may utilize basic session cookies and anonymous web analytics to ensure proper authentication states (like maintaining your login session) and evaluate the performance of our portal.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">5. Contact Information</h2>
            <p>
              If you have any questions, concerns, or requests regarding your personal information, please reach out to us at:
            </p>
            <p className="font-mono text-xs text-purple-600 font-bold">
              codesprint@audisankara.ac.in
            </p>
          </section>
        </div>

        <div className="border-t border-slate-200 mt-16 pt-8 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} CodeSprint-2026. All rights reserved.
        </div>
      </div>
    </div>
  );
}
