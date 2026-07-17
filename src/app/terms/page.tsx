'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-700 font-sans py-24 relative bg-grid animate-[fadeIn_0.3s_ease-out]">
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-900 transition-colors mb-12 group font-semibold">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to home
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-white rounded-xl border border-slate-200 text-slate-800 shadow-sm">
            <FileText className="h-5 w-5" />
          </div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">legal</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">Terms of Service</h1>
        <p className="text-xs text-slate-500 mb-12">Last Updated: February 25, 2026</p>

        <div className="space-y-8 text-sm leading-relaxed text-slate-600">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">1. Event Registration</h2>
            <p>
              By registering for CodeSprint-2026, you agree to provide accurate, current, and complete information. Each participant must complete their registration and submit any required payments to be verified. Teams must consist of 3 to 5 members.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">2. Code of Conduct</h2>
            <p>
              We are committed to providing a harassment-free and inclusive experience for all participants. You agree to treat all attendees, jury members, partners, and staff with respect. Any form of harassment, discrimination, or academic dishonesty will lead to immediate disqualification.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">3. Intellectual Property</h2>
            <p>
              You own all intellectual property rights to the prototypes, logic, and designs created during CodeSprint-2026. However, by participating, you grant the organizers a non-exclusive license to showcase, feature, and review your project for promotional and informational purposes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">4. Liability</h2>
            <p>
              The event is hosted at the KVT Hall, Gudur, AP, India. While we ensure high standards of safety and physical security, the organizers are not responsible for any personal injury, loss of property, or technical failure of personal hardware/software during the event.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">5. Modifications and Cancellations</h2>
            <p>
              The organizing committee reserves the right to modify the schedule, deadlines, venue arrangements, or award criteria if unforeseen circumstances arise. Any such changes will be immediately communicated to participants through their dashboard or email.
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
