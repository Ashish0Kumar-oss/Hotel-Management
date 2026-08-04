import React, { useState } from 'react';
import { 
  Users, Search, Award, Star, Mail, Phone, MapPin, 
  Calendar, DollarSign, Heart, FileText, ChevronRight, Plus
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { Guest } from '../../types';

export const GuestCRM: React.FC = () => {
  const { guests } = useHotel();
  const [selectedGuest, setSelectedGuest] = useState<Guest>(guests[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState('All');

  const filteredGuests = guests.filter(g => {
    const matchesTier = tierFilter === 'All' || g.membershipTier.toLowerCase().includes(tierFilter.toLowerCase());
    const matchesSearch = g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.country.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTier && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <Users className="w-7 h-7 text-amber-500" />
            Guest CRM & Loyalty Relationship Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track VIP guest preferences, stay histories, lifetime spend, and personalized room preferences.
          </p>
        </div>

        {/* Tier Filters */}
        <div className="flex items-center space-x-2">
          {['All', 'Diamond', 'Platinum', 'Gold'].map(t => (
            <button
              key={t}
              onClick={() => setTierFilter(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                tierFilter === t
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Guest List */}
        <div className="glass-card rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search guest profile..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="space-y-2 max-h-[65vh] overflow-y-auto pr-1">
            {filteredGuests.map(guest => (
              <div
                key={guest.id}
                onClick={() => setSelectedGuest(guest)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedGuest.id === guest.id
                    ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/30'
                    : 'bg-slate-100/60 dark:bg-slate-900/60 border-slate-200/60 dark:border-slate-800 hover:bg-slate-200/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <img src={guest.avatar} alt="" className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-500/40" />
                  <div>
                    <div className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                      {guest.name}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{guest.membershipTier} • {guest.country}</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-stat font-extrabold text-xs text-emerald-500">${guest.totalSpent.toLocaleString()}</span>
                  <span className="text-[10px] text-slate-400 block">{guest.totalStays} Stays</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Guest Comprehensive Profile Card */}
        <div className="lg:col-span-2 glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 space-y-6">
          {/* Header Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-amber-950 text-white border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <img src={selectedGuest.avatar} alt="" className="w-16 h-16 rounded-full object-cover ring-4 ring-amber-400/60 shadow-lg" />
              <div>
                <h2 className="text-xl font-bold font-heading flex items-center gap-2">
                  {selectedGuest.name}
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-extrabold border border-amber-400/40">
                    {selectedGuest.membershipTier}
                  </span>
                </h2>
                <p className="text-xs text-slate-300 flex items-center gap-2 mt-1">
                  <Mail className="w-3.5 h-3.5 text-amber-400" /> {selectedGuest.email}
                  <span>•</span>
                  <MapPin className="w-3.5 h-3.5 text-amber-400" /> {selectedGuest.country}
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 block uppercase font-bold">Loyalty Balance</span>
              <span className="text-2xl font-extrabold font-stat gold-gradient-text">
                {selectedGuest.loyaltyPoints.toLocaleString()} PTS
              </span>
            </div>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 text-center">
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block">Total Lifetime Stays</span>
              <span className="text-xl font-extrabold font-stat text-slate-900 dark:text-slate-100">{selectedGuest.totalStays} Stays</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block">Total Spend</span>
              <span className="text-xl font-extrabold font-stat text-emerald-500">${selectedGuest.totalSpent.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block">Favorite Suite</span>
              <span className="text-sm font-bold text-amber-500">{selectedGuest.favoriteRoomType}</span>
            </div>
          </div>

          {/* Guest Preferences */}
          <div className="space-y-3">
            <h3 className="font-bold text-base font-heading flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <Heart className="w-4 h-4 text-rose-500" /> Personalized Guest Preferences & Amenities
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedGuest.preferences.map((pref, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-semibold"
                >
                  ✨ {pref}
                </span>
              ))}
            </div>
          </div>

          {/* Staff Notes */}
          <div className="space-y-2">
            <h3 className="font-bold text-base font-heading flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <FileText className="w-4 h-4 text-amber-500" /> Concierge Staff Notes
            </h3>
            <div className="p-4 rounded-2xl bg-slate-100/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
              "{selectedGuest.notes}"
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
