'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Award, Users, ShieldAlert, Sparkles, MessageSquare, ArrowRight, CheckCircle2, ChevronDown, Trophy, Clock, Cpu, BookOpen, Layers, Check, Ticket, Phone } from 'lucide-react';

const TOP_PRIZES = [
  {
    name: "Winner (1st Place)",
    icon: <Trophy className="h-6 w-6 text-amber-500" />,
    prizeValue: "₹60,000",
    description: "Grand cash reward for the champion team of CodeSprint-2026.",
    features: [
      "Grand ₹60,000 Cash Prize",
      "CodeSprint Winner Trophy",
      "Winner Certificate of Honor",
      "National Spotlight & Recognition"
    ],
    popular: true,
    color: "amber"
  },
  {
    name: "Runner-up (2nd Place)",
    icon: <Sparkles className="h-6 w-6 text-slate-400" />,
    prizeValue: "₹40,000",
    description: "Cash reward for the second-place team of the national hackathon.",
    features: [
      "₹40,000 Cash Prize",
      "Runner-up Trophy",
      "Special Merit Certificate",
      "Direct Jury Mentorship"
    ],
    color: "slate"
  },
  {
    name: "Second Runner-up (3rd Place)",
    icon: <Layers className="h-6 w-6 text-amber-700" />,
    prizeValue: "₹25,000",
    description: "Cash reward for the third-place team of the hackathon.",
    features: [
      "₹25,000 Cash Prize",
      "Second Runner-up Trophy",
      "Finalist Certificate",
      "Access to Startup Incubator"
    ],
    color: "zinc"
  }
];

const CATEGORY_PRIZES = [
  { name: "Best Innovation", value: "₹15,000", desc: "For out-of-the-box creative thinking." },
  { name: "Best Business Idea", value: "₹10,000", desc: "Recognizing commercial viability." },
  { name: "Best Technical Implementation", value: "₹10,000", desc: "For clean engineering, code quality, and architecture." },
  { name: "Best UI/UX Design", value: "₹10,000", desc: "Outstanding user experience and clean aesthetics." },
  { name: "Best AI / GenAI Solution", value: "₹10,000", desc: "Innovative integration of LLMs/GenAI tools." },
  { name: "Best Female-Led Team", value: "₹10,000", desc: "Encouraging gender diversity and leadership." },
  { name: "Best Emerging Team (Freshers)", value: "₹10,000", desc: "Special encouragement prize for first-year teams." }
];

const CERTIFICATE_AWARDS = [
  "Best Social Impact Solution",
  "Best Healthcare Innovation",
  "Best Agriculture Solution",
  "Best Education Technology Solution",
  "Jury's Choice Award"
];

const FACULTY_COORDINATORS = [
  { name: 'Dr. N. Penchalaiah', role: 'Faculty Coordinator', contact: '8309848987' },
  { name: 'Dr. G. Manoj Kumar', role: 'Faculty Coordinator', contact: '9885448657' },
  { name: 'Dr. BVS Uma Prathyusha', role: 'Faculty Coordinator', contact: '8499986269' },
  { name: 'Prof. C. Suneetha', role: 'Faculty Mentor', contact: '9490101043' },
  { name: 'Dr. J. Amarendra', role: 'Co-Convener / Principal, ASCET', contact: '9398885403' },
  { name: 'Dr. Mohsin Ahmed', role: 'Faculty Mentor', contact: '8082353507' }
];

const STUDENT_COORDINATORS = [
  { name: 'Mr. Palati Koushik', role: 'Student Lead', contact: '7569520695' },
  { name: 'Mr. Mayur Rai', role: 'Student Lead', contact: '7460817621' },
  { name: 'Mr. Siva Papa Rao', role: 'Coordinator', contact: '8688154471' },
  { name: 'Ms. Sravani', role: 'Coordinator', contact: '9063971817' },
  { name: 'Mr. Nayab', role: 'Coordinator', contact: '8985611197' },
  { name: 'Ms. B. Kavya', role: 'Coordinator', contact: '9985833812' },
  { name: 'Ms. Sai Deepthi', role: 'Coordinator', contact: '9441569347' },
  { name: 'Ms. Yaga Sri', role: 'Coordinator', contact: '9032599568' }
];

// Why Participate bullets
const BENEFITS = [
  'Solve real-world challenges across 15 domains',
  'Compete for ₹2,0,000 total cash prize pool',
  'Receive feedback from industry-expert judges',
  'Acquire high-quality Event T-Shirt & Lunch',
  'Network with talented developers and innovators',
  'Cross-department collaboration encouraged',
  'National level participation certificates',
  'Showcase your prototype to university delegates'
];

// Highlights list
const HIGHLIGHTS = [
  '8-Hours Continuous Hackathon',
  'Randomly Allocated Problem Statements',
  'Organized by Audisankara University',
  'NAAC A+ Accredited Campus',
  '15+ Cash & Certificate Award Categories',
  'Open-Source Libraries & AI Tools Allowed',
  'Wi-Fi Enabled KVT Hall Venue',
  'Multi-Stage Technical Mentorship'
];

const INCLUSIONS = [
  'Event Access Pass',
  'Premium Event T-Shirt',
  'Working Lunch & Snacks',
  'National Participation Certificate',
  'High-Speed Campus Wi-Fi',
  'Technical Mentor Assistance',
  'Power Outlets & Workstations',
  'Closing Awards Ceremony Entry'
];

// FAQ items
const FAQS = [
  { q: 'Who is eligible to participate?', a: 'All college students from any branch or department are eligible to register. Cross-department teams are highly encouraged.' },
  { q: 'What is the team size and composition?', a: 'Teams must consist of 3 to 5 members. It is mandatory to have minimum one female member in every team.' },
  { q: 'What is the registration fee?', a: 'The registration fee is ₹399 per participant, which includes the event T-Shirt, participation certificate, and a working lunch.' },
  { q: 'How are problem statements selected?', a: 'Each team will receive one randomly allocated problem statement from healthcare, agriculture, retail, finance, retail, smart cities, retailer, logistics, retailer, environment, retail, retail, retailers or hospitality. Teams must build a working prototype in 8 hours.' },
  { q: 'Are AI tools and third-party libraries allowed?', a: 'Yes! Teams are allowed to use open-source libraries and AI tools (like ChatGPT, Claude, Gemini, and GitHub Copilot) for research and development. However, teams must fully understand their code.' },
  { q: 'What is the evaluation timeline?', a: 'Evaluation takes place in 4 stages: Stage 1 (Discover & Innovate - 9:00 AM), Stage 2 (Build Progress - 10:00 AM), Stage 3 (Prototype Quality - 12:00 PM), and Stage 4 (Final Pitch & Demo - 3:00 PM).' }
];

export default function LandingPage() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marqueeContainer = marqueeRef.current;
    if (!marqueeContainer) return;

    const updateOpacity = () => {
      const items = marqueeContainer.querySelectorAll('.marquee-item');
      const containerRect = marqueeContainer.getBoundingClientRect();
      const centerY = containerRect.top + containerRect.height / 2;

      items.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenterY = itemRect.top + itemRect.height / 2;
        const distance = Math.abs(centerY - itemCenterY);
        const maxDistance = containerRect.height / 2;
        const normalizedDistance = Math.min(distance / maxDistance, 1);
        const opacity = 1 - normalizedDistance * 0.75;
        (item as HTMLElement).style.opacity = opacity.toString();
      });
    };

    const animationFrame = () => {
      updateOpacity();
      requestAnimationFrame(animationFrame);
    };

    const frame = requestAnimationFrame(animationFrame);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Countdown timer logic targeting August 08, 2026 at 09:00 AM
  useEffect(() => {
    const targetDate = new Date('2026-08-08T09:00:00+05:30').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleFaq = (index: number) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  return (
    <div className="flex-1 w-full bg-slate-50 text-slate-800 relative overflow-hidden bg-grid">
      {/* Decorative ambient glows in light mode */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-100/50 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-100/50 blur-[120px] pointer-events-none -z-10" />

      {/* Hero Section with Vertical Marquee */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column - Hero Content */}
          <div className="space-y-8 max-w-xl text-left">
            {/* Floating Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-bold text-slate-700 shadow-sm animate-pulse">
              <Sparkles className="h-3.5 w-3.5 text-purple-600" />
              8-Hours National Level Hackathon
            </div>

            {/* Hero Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-none text-slate-900">
              CodeSprint-2026
              <span className="block text-purple-600 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase font-mono mt-2">
                by Audisankara University
              </span>
              <span className="block mt-4 text-2xl sm:text-3xl md:text-4xl font-bold text-slate-500 leading-tight">
                National Level Coding Hackathon & Prototype Sprint
              </span>
            </h1>

            {/* Tagline */}
            <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
              Solve real-world challenges, engineer working prototypes in 8 hours, team up under expert mentorship, and compete for a massive cash prize pool.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/register"
                className="group relative px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-1.5 cursor-pointer"
              >
                <span className="relative z-10">REGISTER NOW</span>
                <ArrowRight className="h-4 w-4 relative z-10" />
              </Link>
              <Link
                href="/teams"
                className="group relative px-6 py-3.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 rounded-xl font-bold text-xs overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-sm flex items-center gap-1.5 cursor-pointer shadow-inner"
              >
                <span className="relative z-10">EXPLORE TEAMS</span>
              </Link>
            </div>

            {/* Event Quick Info Cards */}
            <div className="pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="group flex items-center gap-3.5 bg-white border border-slate-100 rounded-2xl p-4 transition-all duration-300 hover:shadow-sm hover:scale-[1.02] text-left">
                <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-purple-50 text-purple-600 flex-shrink-0">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Date:</span>
                  <span className="text-sm font-extrabold text-slate-900">08 August '26</span>
                </div>
              </div>

              <div className="group flex items-center gap-3.5 bg-white border border-slate-100 rounded-2xl p-4 transition-all duration-300 hover:shadow-sm hover:scale-[1.02] text-left">
                <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-purple-50 text-purple-600 flex-shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Venue:</span>
                  <span className="text-sm font-extrabold text-slate-900">KVT Hall, Gudur</span>
                </div>
              </div>

              <div className="group flex items-center gap-3.5 bg-white border border-slate-100 rounded-2xl p-4 transition-all duration-300 hover:shadow-sm hover:scale-[1.02] text-left">
                <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-purple-50 text-purple-600 flex-shrink-0">
                  <Ticket className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Entry Fee:</span>
                  <span className="text-sm font-extrabold text-slate-900">₹399 / student</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Tech Domain Vertical Marquee */}
          <div ref={marqueeRef} className="relative h-[400px] sm:h-[450px] flex items-center justify-center w-full">
            <div className="relative w-full h-full font-mono overflow-hidden">
              <VerticalMarquee speed={25} className="h-full">
                {marqueeItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="text-xl md:text-2xl font-light tracking-tight py-6 text-slate-500 text-center marquee-item transition-opacity duration-300"
                  >
                    {item}
                  </div>
                ))}
              </VerticalMarquee>
              
              {/* Top vignette */}
              <div className="pointer-events-none absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-slate-50 to-transparent z-10"></div>
              
              {/* Bottom vignette */}
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent z-10"></div>
            </div>
          </div>

        </div>
      </section>

      {/* Countdown Ticker Section */}
      <section className="py-12 bg-white border-y border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Hacking Starts In</p>
          <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto">
            {Object.entries(timeLeft).map(([label, value]) => (
              <div key={label} className="flex flex-col items-center p-3.5 rounded-xl bg-slate-50 border border-slate-200 shadow-inner">
                <span className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-mono">{String(value).padStart(2, '0')}</span>
                <span className="text-[10px] text-slate-500 capitalize mt-1 font-semibold">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div>
          <span className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-2 block font-mono">What is CodeSprint-2026?</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">8-Hours National Level Hackathon</h2>
        </div>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
          <strong>CodeSprint-2026</strong> is a national level prototype building sprint organized by <strong>Audisankara (Deemed to be University)</strong>. 
          Audisankara is NAAC A+ accredited and declared under Section 3 of the UGC Act, 1956. This intense 8-hour hackathon challenges students to build innovative working software and hardware systems addressing real-world problem statements.
        </p>
        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-3xl mx-auto">
          Every participating team receives a randomly allocated problem statement from healthcare, agriculture, retail, finance, retail, smart cities, and retailer domains. Students must engineer a working software prototype, get evaluated across 4 stages, and pitch to a jury.
        </p>
      </section>

      {/* Why Participate & Highlights Grid */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Why Participate */}
            <div className="text-left space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-purple-600" />
                Why Participate?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {BENEFITS.map((b, idx) => (
                  <div key={idx} className="flex gap-2.5 items-start text-slate-700 text-xs">
                    <span className="h-1.5 w-1.5 bg-purple-600 rounded-full mt-1.5 flex-shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="text-left space-y-6 lg:border-l lg:border-slate-200 lg:pl-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-purple-600" />
                Event Highlights
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {HIGHLIGHTS.map((h, idx) => (
                  <div key={idx} className="flex gap-2.5 items-start text-slate-700 text-xs">
                    <span className="h-1.5 w-1.5 bg-purple-600 rounded-full mt-1.5 flex-shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Prize Pool Details */}
      <section id="prizes" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        
        {/* Header Block */}
        <div className="text-center space-y-4 mb-20 max-w-3xl mx-auto">
          <div className="inline-flex p-2 bg-purple-50 rounded-xl text-purple-600 border border-purple-100 mb-2">
            <Trophy className="h-6 w-6" />
          </div>
          <div className="relative w-fit mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Total Cash Prize Pool: ₹2,00,000
            </h2>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm max-w-lg mx-auto mt-4 leading-relaxed">
            Win massive cash awards across various categories, encouraging innovation, UI/UX, AI solutions, and diversity.
          </p>
        </div>

        {/* Top 3 prizes cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative z-10 mb-16">
          {TOP_PRIZES.map((tier, index) => (
            <div
              key={tier.name}
              className="relative group transition-all duration-300 bg-white rounded-3xl border border-slate-200/80 p-8 text-left shadow-sm hover:shadow-md hover:scale-[1.01]"
            >
              {tier.popular && (
                <div
                  className="absolute -top-3 right-6 bg-slate-900 text-white 
                  font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-wider"
                >
                  Grand Winner
                </div>
              )}

              <div className="mb-6">
                <div
                  className="w-12 h-12 rounded-2xl mb-4 flex items-center justify-center bg-slate-50 border border-slate-100"
                >
                  {tier.icon}
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                  {tier.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-normal">
                  {tier.description}
                </p>
              </div>

              {/* Prize Value */}
              <div className="mb-6 font-mono">
                <span className="text-3xl font-black text-slate-900 tracking-tight">
                  {tier.prizeValue}
                </span>
              </div>

              {/* Features Checklist */}
              <div className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border border-slate-200 flex items-center justify-center bg-slate-50 shrink-0">
                      <Check className="w-2.5 h-2.5 text-purple-600" />
                    </div>
                    <span className="text-xs text-slate-700 font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action button */}
              <Link
                href="/register"
                className={`w-full h-11 flex items-center justify-center font-bold text-xs uppercase tracking-wider rounded-xl transition-all border ${
                  tier.popular
                    ? "bg-slate-900 text-white hover:bg-slate-800 border-transparent"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200"
                }`}
              >
                Register to Win
              </Link>
            </div>
          ))}
        </div>

        {/* Category specific prizes grid */}
        <div className="max-w-5xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 shadow-sm text-left mb-12">
          <h3 className="text-base font-bold text-slate-900 mb-6 border-b border-slate-100 pb-3 uppercase tracking-wider">
            Special Category Cash Awards (₹10,000 – ₹15,000 each)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {CATEGORY_PRIZES.map((cp, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-bold text-slate-900">{cp.name}</span>
                  <span className="text-xs font-black text-purple-600 font-mono">{cp.value}</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">{cp.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Certificate Awards */}
        <div className="max-w-5xl mx-auto bg-slate-50 border border-slate-200 rounded-3xl p-6 text-left">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
            Additional Certificate Recognitions
          </h3>
          <div className="flex flex-wrap gap-3">
            {CERTIFICATE_AWARDS.map((ca, idx) => (
              <span key={idx} className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700">
                ⭐ {ca}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty & Student Coordinators */}
      <section id="coordinators" className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-bold text-purple-600 uppercase tracking-widest font-mono">SUPPORT DESK</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">Event Coordinators & Mentors</h2>
            <p className="text-slate-500 text-sm">Feel free to contact our mentors and coordinators for any registrations or assistance.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Faculty Coordinators */}
            <div className="space-y-6 text-left">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Users className="h-4.5 w-4.5 text-purple-600" />
                Faculty Coordinators & Mentors
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FACULTY_COORDINATORS.map((fc, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200/60 rounded-2xl p-5 hover:border-slate-300 transition-all">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold font-mono">{fc.role}</span>
                    <h4 className="text-sm font-bold text-slate-800 mt-1">{fc.name}</h4>
                    <a href={`tel:${fc.contact}`} className="text-xs text-purple-600 hover:text-purple-800 font-bold mt-2.5 inline-flex items-center gap-1.5 font-mono">
                      <Phone className="h-3.5 w-3.5" />
                      {fc.contact}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Student Coordinators */}
            <div className="space-y-6 text-left">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Users className="h-4.5 w-4.5 text-purple-600" />
                Student Coordinators
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {STUDENT_COORDINATORS.map((sc, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200/60 rounded-2xl p-5 hover:border-slate-300 transition-all">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold font-mono">{sc.role}</span>
                    <h4 className="text-sm font-bold text-slate-800 mt-1">{sc.name}</h4>
                    <a href={`tel:${sc.contact}`} className="text-xs text-purple-600 hover:text-purple-800 font-bold mt-2.5 inline-flex items-center gap-1.5 font-mono">
                      <Phone className="h-3.5 w-3.5" />
                      {sc.contact}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works / 8-Hours Evaluation Timeline */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-bold text-purple-600 uppercase tracking-widest font-mono">4-STAGE EVALUATION</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-2">How It Works & Evaluation</h2>
          <p className="text-slate-500 text-xs mt-1">Teams progress through 4 rigorous check-in stages within 8 hours.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto text-left">
          {[
            { stage: '1', title: 'Discover & Innovate', time: '9:00 AM – 10:00 AM', desc: 'Focuses on problem understanding, brainstorming, planning, and feature scoping.' },
            { stage: '2', title: 'Build Progress', time: '10:00 AM – 12:00 PM', desc: 'Jury reviews tech stack, setup, architecture, code quality, and initial prototype builds.' },
            { stage: '3', title: 'Prototype Quality', time: '12:00 PM – 3:00 PM', desc: 'Reviews UI/UX designs, teamwork metrics, user flow completion, and mentor feedback integration.' },
            { stage: '4', title: 'Final Pitch & Demo', time: '3:00 PM – 5:00 PM', desc: 'Working prototype demos, slide pitching, code explanations, and Q&A defense.' },
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between min-h-[15rem] hover:shadow-sm hover:border-slate-350 transition-all">
              <div>
                <span className="text-2xl font-black text-slate-300 font-mono">Stage 0{item.stage}</span>
                <h4 className="text-sm font-bold text-slate-900 mt-2">{item.title}</h4>
                <p className="text-[10px] text-purple-600 font-bold font-mono mt-0.5">{item.time}</p>
              </div>
              <p className="text-xxs text-slate-500 leading-relaxed mt-4">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rules & Eligibility Section */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Eligibility */}
            <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl text-left space-y-4">
              <h3 className="text-sm font-bold text-purple-600 flex items-center gap-2 uppercase tracking-wider mb-2 font-mono">
                <Users className="h-4.5 w-4.5" />
                Eligibility
              </h3>
              <ul className="space-y-3.5 text-xs text-slate-700">
                {[
                  'Open to all undergraduate college students',
                  'Open to all postgraduate college students',
                  'Engineering, Design, Commerce, and Arts students welcome',
                  'Cross-departmental teams are highly encouraged',
                  'Each participant must register individually'
                ].map((el, i) => (
                  <li key={i} className="flex gap-2 items-center">
                    <CheckCircle2 className="h-4 w-4 text-purple-600 flex-shrink-0" />
                    <span>{el}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Team Rules */}
            <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl text-left space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wider mb-2 font-mono">
                <Layers className="h-4.5 w-4.5" />
                Team Rules
              </h3>
              <ul className="space-y-3.5 text-xs text-slate-700">
                {[
                  'Team size must be between 3 and 5 members',
                  'Minimum one female member is mandatory in every team',
                  'Every member must actively contribute to the prototype',
                  'Plagiarism of any form leads to immediate disqualification',
                  'Open-source libraries and generative AI tools are permitted',
                  'Jury decisions are absolute and final'
                ].map((rule, i) => (
                  <li key={i} className="flex gap-2 items-center">
                    <CheckCircle2 className="h-4 w-4 text-slate-400 flex-shrink-0" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-purple-600 uppercase tracking-widest font-mono">DEADLINES</span>
          <h2 className="text-3xl font-bold text-slate-900 mt-2">Important Timeline</h2>
        </div>

        <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-4 sm:before:left-1/2 before:w-[1px] before:bg-slate-200">
          {[
            { label: 'Registration Window Opens', date: 'Now' },
            { label: 'Registration Closes (Last Date)', date: '03 August 2026' },
            { label: 'Team Formation & Lock Deadline', date: '05 August 2026' },
            { label: 'CodeSprint-2026 Commences', date: '08 August 2026 (09:00 AM)' },
            { label: 'Jury Pitching & Demos', date: '08 August 2026 (03:00 PM)' },
            { label: 'Winner Announcements & Closing', date: '08 August 2026 (05:00 PM)' },
          ].map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={idx} className={`flex flex-col sm:flex-row items-start relative ${isEven ? 'sm:flex-row-reverse' : ''}`}>
                {/* timeline node dot */}
                <div className="absolute left-4 sm:left-1/2 transform -translate-x-[50%] top-1 h-3.5 w-3.5 rounded-full border-2 border-purple-600 bg-white z-10" />
                
                <div className="w-full sm:w-[45%] pl-10 sm:pl-0 sm:px-6 text-left sm:text-right">
                  <div className="p-4 rounded-xl bg-white border border-slate-200/80 flex flex-col justify-center text-left hover:border-slate-300 hover:shadow-sm transition-all">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{item.label}</span>
                    <span className="text-xs font-bold text-slate-800 mt-1">{item.date}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Inclusions / What's Included */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-purple-600 uppercase tracking-widest font-mono">HOSPITALITY</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">What is Included?</h2>
            <p className="text-slate-500 text-xs mt-1">Included facilities provided to every participant with their ₹399 entry fee.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {INCLUSIONS.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center gap-3 text-left">
                <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0" />
                <span className="text-xs text-slate-800 font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordions */}
      <section id="faq" className="py-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-purple-600 uppercase tracking-widest font-mono">FAQ</span>
          <h2 className="text-3xl font-bold text-slate-900 mt-2">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white border border-slate-200 overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full px-6 py-5 text-left flex items-center justify-between text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <span className="text-xs font-bold text-slate-900">{faq.q}</span>
                <ChevronDown className={`h-4 w-4 text-slate-500 transition-transform duration-350 ${faqOpen === idx ? 'transform rotate-180' : ''}`} />
              </button>
              {faqOpen === idx && (
                <div className="px-6 pb-5 pt-1 text-xs text-slate-500 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Helpdesk Support Section */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white border border-slate-200 p-12 rounded-3xl relative overflow-hidden shadow-sm">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-3">Have Questions or Need Help?</h2>
          <p className="text-slate-500 text-xs mb-8 max-w-lg mx-auto">
            Our student and faculty coordinator teams are available to assist you with registration inquiries or team formation questions.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-md mx-auto mb-8 text-left text-xs">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <span className="text-[10px] text-slate-500 uppercase font-bold font-mono">Email Support</span>
              <a href="mailto:codesprint@audisankara.ac.in" className="block font-semibold text-slate-800 mt-1 hover:text-purple-600 truncate">codesprint@audisankara.ac.in</a>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <span className="text-[10px] text-slate-500 uppercase font-bold font-mono">Phone Helpline</span>
              <p className="font-semibold text-slate-800 mt-1">+91 8309848987 / 7569520695</p>
            </div>
          </div>

          <a
            href="mailto:codesprint@audisankara.ac.in"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs shadow-sm transition-all"
          >
            Email Support Team
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <style>{`
        @keyframes marquee-vertical {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-50%);
          }
        }
      `}</style>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

interface VerticalMarqueeProps {
  children: React.ReactNode;
  pauseOnHover?: boolean;
  reverse?: boolean;
  className?: string;
  speed?: number;
  onItemsRef?: (items: HTMLElement[]) => void;
}

function VerticalMarquee({
  children,
  pauseOnHover = false,
  reverse = false,
  className,
  speed = 30,
  onItemsRef,
}: VerticalMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (onItemsRef && containerRef.current) {
      const items = Array.from(containerRef.current.querySelectorAll('.marquee-item')) as HTMLElement[];
      onItemsRef(items);
    }
  }, [onItemsRef]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "group flex flex-col overflow-hidden",
        className
      )}
      style={
        {
          "--duration": `${speed}s`,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "flex shrink-0 flex-col animate-[marquee-vertical_var(--duration)_linear_infinite]",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex shrink-0 flex-col animate-[marquee-vertical_var(--duration)_linear_infinite]",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}

const marqueeItems = [
  "Artificial Intelligence",
  "Machine Learning",
  "Deep Learning",
  "Natural Language Processing",
  "Large Language Models",
  "Generative AI",
  "AI Agents",
  "Computer Vision",
  "OCR & Image Search",
  "Android Development",
  "Web Development",
  "Cyber Security & Audits",
  "Data Analytics",
  "Business Intelligence",
  "Cloud Computing & DevOps",
  "Internet of Things (IoT)",
  "Blockchain & Smart Contracts",
  "Robotic Process Automation"
];
