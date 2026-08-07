'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, User, Users, School, GraduationCap, Crown, Shield, UserCheck, X, Sparkles, Calendar } from 'lucide-react';
import { API_URL } from '../../config/api';

interface Participant {
  id: string;
  name: string;
  college: string;
  year: string;
  branch: string;
  gender: string;
  role: 'admin' | 'team-leader' | 'participant';
  teamId: string;
  teamRole: 'leader' | 'member';
  teamName: string;
  createdAt?: string;
}

interface SoloParticipant {
  id: string;
  name: string;
  college: string;
  year: string;
  branch: string;
  gender: string;
}

export default function ParticipantsPage() {
  const [activeTab, setActiveTab] = useState<'teams' | 'solo'>('teams');

  // ── Teams tab state ──────────────────────────────────────────
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalParticipants, setTotalParticipants] = useState<number | null>(null);

  const [search, setSearch] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [joinedFilter, setJoinedFilter] = useState('');
  const [selectedCollege, setSelectedCollege] = useState('');

  // ── Solo tab state ───────────────────────────────────────────
  const [soloParticipants, setSoloParticipants] = useState<SoloParticipant[]>([]);
  const [soloLoading, setSoloLoading] = useState(true);
  const [soloSearch, setSoloSearch] = useState('');
  const [soloCollegeFilter, setSoloCollegeFilter] = useState('');

  const isFiltered = Boolean(search.trim() || selectedYear || joinedFilter || selectedCollege);
  const displayTotal = totalParticipants !== null ? totalParticipants : (loading ? 0 : participants.length);

  const collegesList = React.useMemo(() => {
    const set = new Set<string>();
    participants.forEach((p) => { if (p.college) set.add(p.college.trim()); });
    return Array.from(set).sort();
  }, [participants]);

  const soloCollegesList = React.useMemo(() => {
    const set = new Set<string>();
    soloParticipants.forEach((p) => { if (p.college) set.add(p.college.trim()); });
    return Array.from(set).sort();
  }, [soloParticipants]);

  // Fetch initial total
  useEffect(() => {
    const fetchTotalCount = async () => {
      try {
        const res = await fetch(`${API_URL}/api/public/participants`);
        if (res.ok) { const list = await res.json(); setTotalParticipants(list.length); }
      } catch (err) { console.error('Failed to fetch total count:', err); }
    };
    fetchTotalCount();
  }, []);

  // Fetch team participants
  const fetchParticipants = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      const res = await fetch(`${API_URL}/api/public/participants?${params.toString()}`);
      if (res.ok) {
        const list = await res.json();
        const cleanList = (Array.isArray(list) ? list : []).filter((p: any) => p && !p.hidden && (p.email || '').toLowerCase() !== 'vamshi.c2002@gmail.com');
        setParticipants(cleanList);
        if (!search) setTotalParticipants(cleanList.length);
      }
    } catch (err) { console.error('Error fetching participants:', err); }
    finally { setLoading(false); }
  };

  // Fetch solo participants
  const fetchSoloParticipants = async () => {
    setSoloLoading(true);
    try {
      const params = new URLSearchParams();
      if (soloSearch) params.append('search', soloSearch);
      const res = await fetch(`${API_URL}/api/public/solo-participants?${params.toString()}`);
      if (res.ok) { 
        const list = await res.json(); 
        const cleanSolo = (Array.isArray(list) ? list : []).filter((p: any) => p && !p.hidden && (p.email || '').toLowerCase() !== 'vamshi.c2002@gmail.com');
        setSoloParticipants(cleanSolo); 
      }
    } catch (err) { console.error('Error fetching solo participants:', err); }
    finally { setSoloLoading(false); }
  };

  useEffect(() => { fetchParticipants(); }, [search]);
  useEffect(() => { fetchSoloParticipants(); }, [soloSearch]);

  // Frontend filters for teams tab — only show participants actually in a team
  const filteredParticipants = React.useMemo(() => {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOf7DaysAgo = new Date(startOfToday.getTime() - 7 * 24 * 60 * 60 * 1000);

    return participants.filter((p) => {
      // Exclude participants with no real teamId (they belong in Solo tab)
      if (!p.teamId || p.teamName === 'Individual Participants') return false;

      if (selectedCollege && p.college?.trim().toLowerCase() !== selectedCollege.trim().toLowerCase()) return false;
      if (selectedYear) {
        const y = selectedYear.toLowerCase();
        const pYear = (p.year || '').toLowerCase();
        const ordinal = y.replace(' year', '');
        const digit = y.replace(/[^0-9]/g, '');
        const matchesYear =
          pYear === y || pYear.includes(ordinal) || pYear === digit ||
          (pYear.includes('1st') && ordinal === '1st') || (pYear.includes('2nd') && ordinal === '2nd') ||
          (pYear.includes('3rd') && ordinal === '3rd') || (pYear.includes('4th') && ordinal === '4th');
        if (!matchesYear) return false;
      }
      if (joinedFilter) {
        if (!p.createdAt) return false;
        const time = new Date(p.createdAt).getTime();
        if (joinedFilter === 'today' && time < startOfToday.getTime()) return false;
        if (joinedFilter === 'past7' && (time < startOf7DaysAgo.getTime() || time >= startOfToday.getTime())) return false;
        if (joinedFilter === 'older' && time >= startOf7DaysAgo.getTime()) return false;
      }
      return true;
    });
  }, [participants, selectedYear, joinedFilter, selectedCollege]);

  // Frontend filter for solo tab (college)
  const filteredSolo = React.useMemo(() => {
    if (!soloCollegeFilter) return soloParticipants;
    return soloParticipants.filter(p => p.college?.trim().toLowerCase() === soloCollegeFilter.trim().toLowerCase());
  }, [soloParticipants, soloCollegeFilter]);

  const clearFilters = () => { setSearch(''); setSelectedYear(''); setJoinedFilter(''); setSelectedCollege(''); };

  // Group by teamName for Teams tab
  const groupedTeams = React.useMemo(() => {
    const groups: { [teamName: string]: Participant[] } = {};
    filteredParticipants.forEach((p) => {
      const key = p.teamName || 'Individual Participants';
      if (!groups[key]) groups[key] = [];
      groups[key].push(p);
    });
    Object.keys(groups).forEach((key) => {
      groups[key].sort((a, b) => {
        if (a.teamRole === 'leader' && b.teamRole !== 'leader') return -1;
        if (b.teamRole === 'leader' && a.teamRole !== 'leader') return 1;
        return a.name.localeCompare(b.name);
      });
    });
    return groups;
  }, [filteredParticipants]);

  const initials = (name: string) =>
    name.trim().split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="flex-1 w-full bg-slate-50 text-slate-800 relative overflow-hidden bg-grid pt-8 pb-20 px-4 sm:px-6 lg:px-8 animate-[fadeIn_0.3s_ease-out]">
      {/* Decorative ambient glows */}
      <div className="absolute top-[-10%] left-[-15%] w-[40%] h-[40%] rounded-full bg-purple-100/50 blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-[-10%] right-[-15%] w-[40%] h-[40%] rounded-full bg-blue-100/50 blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">CodeSprint Participants</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-lg mx-auto leading-relaxed">
            Browse all confirmed hackathon participants for CodeSprint-2026.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
          {/* Total Students */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all flex items-center gap-3.5">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0">
              <Users className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Students</p>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-2xl sm:text-3xl font-black text-slate-900">
                  {loading && totalParticipants === null ? '...' : displayTotal}
                </span>
                <span className="text-xs text-slate-500 font-medium">total</span>
              </div>
            </div>
          </div>

          {/* Showing/Filtered */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all flex items-center gap-3.5">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-purple-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-purple-200">
              <UserCheck className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {activeTab === 'teams' ? (isFiltered ? 'Filtered' : 'In Teams') : 'Solo / Unpaired'}
              </p>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-2xl sm:text-3xl font-black text-purple-700">
                  {activeTab === 'teams'
                    ? (loading ? '...' : filteredParticipants.length)
                    : (soloLoading ? '...' : filteredSolo.length)}
                </span>
                {activeTab === 'teams' && isFiltered && (
                  <span className="text-xs text-slate-500 font-medium">of {displayTotal}</span>
                )}
              </div>
            </div>
          </div>

          {/* Solo badge — clickable */}
          <div
            className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all flex items-center gap-3.5 cursor-pointer"
            onClick={() => setActiveTab('solo')}
          >
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center flex-shrink-0">
              <User className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">Solo / Unpaired</p>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-2xl sm:text-3xl font-black text-sky-700">
                  {soloLoading ? '...' : soloParticipants.length}
                </span>
                <span className="text-xs text-slate-500 font-medium">registered</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mb-6 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('teams')}
            className={`pb-2.5 px-1 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'teams'
                ? 'border-purple-600 text-purple-700'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            🏆 In Teams ({loading ? '…' : filteredParticipants.length})
          </button>
          <button
            onClick={() => setActiveTab('solo')}
            className={`pb-2.5 px-1 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'solo'
                ? 'border-sky-600 text-sky-700'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            👤 Solo / Unpaired ({soloLoading ? '…' : soloParticipants.length})
          </button>
        </div>

        {/* ===== IN-TEAMS TAB ===== */}
        {activeTab === 'teams' && (
          <>
            {/* Filter Toolbar */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
              <div className="relative w-full md:w-96">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Search className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  placeholder="Search by participant name, college, branch, or team..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="block w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-500/50 text-xs"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                {/* College Filter */}
                <div className="relative flex-1 sm:flex-none">
                  <select
                    value={selectedCollege}
                    onChange={(e) => setSelectedCollege(e.target.value)}
                    className="w-full sm:w-40 py-2 pl-3 pr-8 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none focus:border-purple-500/50 text-xs appearance-none cursor-pointer truncate"
                  >
                    <option value="">All Colleges</option>
                    {collegesList.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400">
                    <School className="h-3.5 w-3.5 text-slate-400" />
                  </span>
                </div>

                {/* Year Filter */}
                <div className="relative flex-1 sm:flex-none">
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full sm:w-40 py-2 pl-3 pr-8 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none focus:border-purple-500/50 text-xs appearance-none cursor-pointer"
                  >
                    <option value="">All Years</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400">
                    <GraduationCap className="h-3.5 w-3.5 text-slate-400" />
                  </span>
                </div>

                {/* Joined Filter */}
                <div className="relative flex-1 sm:flex-none">
                  <select
                    value={joinedFilter}
                    onChange={(e) => setJoinedFilter(e.target.value)}
                    className="w-full sm:w-40 py-2 pl-3 pr-8 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none focus:border-purple-500/50 text-xs appearance-none cursor-pointer"
                  >
                    <option value="">When Joined</option>
                    <option value="today">Today</option>
                    <option value="past7">Past 7 Days</option>
                    <option value="older">Older</option>
                  </select>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  </span>
                </div>

                {isFiltered && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-purple-700 bg-slate-100 hover:bg-purple-50 border border-slate-200 hover:border-purple-200 rounded-xl transition-colors cursor-pointer"
                  >
                    <X className="h-3.5 w-3.5" />Clear
                  </button>
                )}

                <div className="px-3 py-1.5 rounded-xl bg-purple-50 border border-purple-100 text-purple-700 font-bold text-xs flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-purple-600" />
                  <span>
                    {loading ? 'Loading...' : isFiltered
                      ? `${filteredParticipants.length} / ${displayTotal} Students`
                      : `${displayTotal} Total Students`}
                  </span>
                </div>
              </div>
            </div>

            {/* Participants list */}
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className="bg-white border border-slate-200/80 p-5 rounded-2xl h-24 animate-pulse flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4 w-full">
                      <div className="h-11 w-11 rounded-2xl bg-slate-100 flex-shrink-0"></div>
                      <div className="space-y-2 w-1/2">
                        <div className="h-4 bg-slate-100 rounded w-1/3"></div>
                        <div className="h-3 bg-slate-100 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredParticipants.length === 0 ? (
              <div className="text-center py-20 bg-white border border-slate-200 rounded-3xl shadow-sm">
                <Users className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-800">No Participants Found</h3>
                <p className="text-xs text-slate-500 mt-1">Try modifying your search query or filters.</p>
                {isFiltered && (
                  <button
                    onClick={clearFilters}
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl transition-colors cursor-pointer"
                  >
                    <X className="h-3.5 w-3.5" />
                    Reset Filters ({displayTotal} total available)
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-2.5">
                {filteredParticipants.map((member) => {
                  const isLeader = member.teamRole === 'leader' || member.role === 'team-leader';
                  return (
                    <div
                      key={member.id}
                      className="bg-white border border-slate-200/80 hover:border-slate-300 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between gap-4 group"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className={`h-11 w-11 rounded-2xl flex items-center justify-center text-xs font-extrabold flex-shrink-0 transition-transform group-hover:scale-105 ${
                          isLeader
                            ? 'bg-purple-600 text-white shadow-md shadow-purple-200'
                            : 'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}>
                          {isLeader ? (
                            <Crown className="h-5 w-5 text-amber-300 fill-amber-300" />
                          ) : (
                            member.name.substring(0, 2).toUpperCase()
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight group-hover:text-purple-600 transition-colors">
                              {member.name}
                            </h3>
                            {isLeader ? (
                              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200 flex items-center gap-1">
                                <Crown className="h-3 w-3 text-purple-600" />Team Leader
                              </span>
                            ) : (
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                                Member
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-500 mt-1">
                            <span className="flex items-center gap-1 font-semibold text-slate-700">
                              <School className="h-3.5 w-3.5 text-purple-600 flex-shrink-0" />
                              {member.college}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1 text-slate-600 font-medium">
                              <GraduationCap className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                              {member.year}
                            </span>
                            {member.branch && (
                              <>
                                <span>•</span>
                                <span className="text-slate-600 font-medium">{member.branch}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Team name badge */}
                      {member.teamName && member.teamName !== 'Individual Participants' && (
                        <div className="hidden sm:flex items-center gap-1.5 shrink-0">
                          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 whitespace-nowrap">
                            {member.teamName}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* ===== SOLO / UNPAIRED TAB ===== */}
        {activeTab === 'solo' && (
          <>
            {/* Filter Toolbar */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
              <div className="relative w-full md:w-96">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Search className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  placeholder="Search by name, college, or branch..."
                  value={soloSearch}
                  onChange={(e) => setSoloSearch(e.target.value)}
                  className="block w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500/50 text-xs"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                {/* College Filter */}
                <div className="relative flex-1 sm:flex-none">
                  <select
                    value={soloCollegeFilter}
                    onChange={(e) => setSoloCollegeFilter(e.target.value)}
                    className="w-full sm:w-40 py-2 pl-3 pr-8 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none focus:border-sky-500/50 text-xs appearance-none cursor-pointer truncate"
                  >
                    <option value="">All Colleges</option>
                    {soloCollegesList.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400">
                    <School className="h-3.5 w-3.5" />
                  </span>
                </div>

                <div className="px-3 py-1.5 rounded-xl bg-sky-50 border border-sky-100 text-sky-700 font-bold text-xs flex items-center gap-1.5">
                  <UserCheck className="h-3.5 w-3.5 text-sky-600" />
                  <span>{soloLoading ? 'Loading...' : `${filteredSolo.length} Solo Participants`}</span>
                </div>
              </div>
            </div>

            {soloLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map(s => (
                  <div key={s} className="bg-white border border-slate-200/80 p-5 rounded-2xl h-28 animate-pulse shadow-sm" />
                ))}
              </div>
            ) : filteredSolo.length === 0 ? (
              <div className="text-center py-20 bg-white border border-slate-200 rounded-3xl shadow-sm">
                <UserCheck className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-800">No Solo Participants</h3>
                <p className="text-xs text-slate-500 mt-1">
                  {soloSearch || soloCollegeFilter
                    ? 'No results match your search.'
                    : 'All registered participants have joined a team.'}
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {filteredSolo.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white border border-slate-200/80 hover:border-sky-200 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between gap-4 group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      {/* Avatar */}
                      <div className={`h-11 w-11 rounded-2xl flex items-center justify-center text-xs font-extrabold flex-shrink-0 transition-transform group-hover:scale-105 ${
                        p.gender?.toLowerCase() === 'female'
                          ? 'bg-pink-100 text-pink-700'
                          : 'bg-sky-100 text-sky-700'
                      }`}>
                        {initials(p.name)}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight group-hover:text-sky-600 transition-colors">
                            {p.name}
                          </h3>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                            p.gender?.toLowerCase() === 'female'
                              ? 'bg-pink-50 text-pink-600 border-pink-200'
                              : 'bg-blue-50 text-blue-600 border-blue-200'
                          }`}>
                            {p.gender}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-500 mt-1">
                          <span className="flex items-center gap-1 font-semibold text-slate-700">
                            <School className="h-3.5 w-3.5 text-sky-500 flex-shrink-0" />
                            {p.college}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-slate-600 font-medium">
                            <GraduationCap className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                            {p.year}
                          </span>
                          {p.branch && (
                            <>
                              <span>•</span>
                              <span className="text-slate-600 font-medium">{p.branch}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Badge */}
                    <div className="hidden sm:flex items-center shrink-0">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-sky-50 text-sky-600 border border-sky-200 whitespace-nowrap">
                        Looking for a team
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
