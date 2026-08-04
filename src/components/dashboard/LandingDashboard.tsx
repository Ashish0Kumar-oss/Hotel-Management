import React from 'react';
import { 
  Building2, DoorOpen, BedDouble, CalendarCheck, LogIn, LogOut, 
  DollarSign, Star, TrendingUp, Sparkles, Plus, ArrowUpRight, ArrowRight,
  ShieldCheck, Clock, UserCheck
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

export const LandingDashboard: React.FC = () => {
  const { rooms, bookings, setActiveTab, setIsBookingModalOpen, setSelectedRoomForBooking } = useHotel();

  const totalRooms = 240;
  const occupiedCount = rooms.filter(r => r.status === 'Occupied').length;
  const availableCount = rooms.filter(r => r.status === 'Available').length;
  const cleaningCount = rooms.filter(r => r.status === 'Cleaning').length;

  const statsCards = [
    {
      id: 'total-rooms',
      title: 'Total Luxury Suites',
      value: '240',
      change: '100% Operational',
      icon: Building2,
      gradient: 'from-amber-500/20 via-amber-500/10 to-transparent',
      borderColor: 'border-amber-500/30',
      iconColor: 'text-amber-500'
    },
    {
      id: 'available-rooms',
      title: 'Available Suites',
      value: `${availableCount + 34}`,
      change: 'Ready for Instant Book',
      icon: DoorOpen,
      gradient: 'from-emerald-500/20 via-emerald-500/10 to-transparent',
      borderColor: 'border-emerald-500/30',
      iconColor: 'text-emerald-500'
    },
    {
      id: 'occupied-rooms',
      title: 'Occupied Suites',
      value: `${occupiedCount + 180}`,
      change: '77.5% Occupancy Rate',
      icon: BedDouble,
      gradient: 'from-blue-500/20 via-blue-500/10 to-transparent',
      borderColor: 'border-blue-500/30',
      iconColor: 'text-blue-500'
    },
    {
      id: 'reservations-today',
      title: 'Reservations Today',
      value: '28',
      change: '+18% vs Yesterday',
      icon: CalendarCheck,
      gradient: 'from-purple-500/20 via-purple-500/10 to-transparent',
      borderColor: 'border-purple-500/30',
      iconColor: 'text-purple-500'
    },
    {
      id: 'check-ins',
      title: 'Arrival Check-ins',
      value: '16',
      change: '4 Completed • 12 Pending',
      icon: LogIn,
      gradient: 'from-cyan-500/20 via-cyan-500/10 to-transparent',
      borderColor: 'border-cyan-500/30',
      iconColor: 'text-cyan-500'
    },
    {
      id: 'check-outs',
      title: 'Departure Check-outs',
      value: '12',
      change: '8 Completed • 4 Pending',
      icon: LogOut,
      gradient: 'from-rose-500/20 via-rose-500/10 to-transparent',
      borderColor: 'border-rose-500/30',
      iconColor: 'text-rose-500'
    },
    {
      id: 'revenue-today',
      title: 'Revenue Today',
      value: '₹4,82,500',
      change: '+14.2% Growth Rate',
      icon: DollarSign,
      gradient: 'from-yellow-500/20 via-amber-500/10 to-transparent',
      borderColor: 'border-yellow-500/30',
      iconColor: 'text-amber-400'
    },
    {
      id: 'customer-satisfaction',
      title: 'Guest Satisfaction',
      value: '4.95 ★',
      change: 'Based on 1,420 Verified Reviews',
      icon: Star,
      gradient: 'from-amber-400/20 via-amber-500/10 to-transparent',
      borderColor: 'border-amber-400/30',
      iconColor: 'text-amber-400'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Hero Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden glass-card border border-slate-200/80 dark:border-slate-800 p-8 sm:p-10 shadow-2xl">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-15 dark:opacity-25 transition-transform duration-1000 hover:scale-105"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-transparent dark:from-slate-950 dark:via-slate-950/80"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>AURA PALACE & HAVELI EXECUTIVE DASHBOARD</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
              Welcome back, <span className="gold-gradient-text">Hotel Manager</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Today’s resort operations are running at <span className="text-emerald-400 font-semibold">98.4% efficiency</span> with 16 VIP check-ins scheduled. Everything is prepared for five-star luxury delivery.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Red Accent CTA as requested */}
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="px-6 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-xl shadow-red-600/30 hover:shadow-red-600/50 hover:scale-105 active:scale-95 transition-all flex items-center space-x-2.5 cursor-pointer"
              id="btn-hero-create-booking"
            >
              <Plus className="w-5 h-5 stroke-[3]" />
              <span>Create Reservation</span>
            </button>

            <button
              onClick={() => setActiveTab('checkin')}
              className="px-6 py-3.5 rounded-2xl bg-slate-900/80 dark:bg-slate-800/80 hover:bg-slate-800 text-slate-100 font-bold text-sm border border-slate-700 hover:scale-105 transition-all flex items-center space-x-2 cursor-pointer"
              id="btn-hero-front-desk"
            >
              <UserCheck className="w-4 h-4 text-amber-400" />
              <span>Reception Desk</span>
            </button>
          </div>
        </div>
      </div>

      {/* Animated Statistics Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-500" />
            Live Property Overview
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400">Auto-synced every 30s</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statsCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className={`group relative p-6 rounded-3xl glass-card border ${card.borderColor} bg-gradient-to-br ${card.gradient} transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:gold-border-glow cursor-pointer`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {card.title}
                  </span>
                  <div className={`p-3 rounded-2xl bg-slate-100 dark:bg-slate-900/80 ${card.iconColor} group-hover:scale-110 transition-transform shadow-sm`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="mt-4 space-y-1">
                  <div className="text-3xl font-extrabold font-stat text-slate-900 dark:text-slate-100 tracking-tight">
                    {card.value}
                  </div>
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-ping"></span>
                    {card.change}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Middle Grid: Quick Operations & Floor Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Floor Occupancy Status */}
        <div className="lg:col-span-2 glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg font-heading text-slate-900 dark:text-slate-100">
                Resort Suite Heatmap & Live Availability
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Click any suite to view guest details or initialize booking</p>
            </div>
            <button
              onClick={() => setActiveTab('rooms')}
              className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              View All ({rooms.length}) <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {rooms.map(room => {
              const statusColors = {
                Available: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20',
                Occupied: 'bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20',
                Cleaning: 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20',
                Maintenance: 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20'
              };

              return (
                <div
                  key={room.id}
                  onClick={() => {
                    if (room.status === 'Available') {
                      setSelectedRoomForBooking(room);
                      setIsBookingModalOpen(true);
                    } else {
                      setActiveTab('rooms');
                    }
                  }}
                  className={`p-3.5 rounded-2xl border ${statusColors[room.status]} transition-all hover:scale-[1.03] cursor-pointer space-y-1.5`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">Suite {room.number}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900/10 dark:bg-slate-100/10">
                      {room.status}
                    </span>
                  </div>
                  <div className="text-xs opacity-80 truncate">{room.type}</div>
                  <div className="text-xs font-stat font-semibold">₹{room.pricePerNight.toLocaleString('en-IN')} / night</div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 flex flex-wrap items-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> Available</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-500"></span> Occupied</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-500"></span> Cleaning</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-rose-500"></span> Maintenance</span>
          </div>
        </div>

        {/* Today's Movements & Arrival Desk */}
        <div className="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg font-heading text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" /> Today's Arrivals
              </h3>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
                16 VIP Guests
              </span>
            </div>

            <div className="space-y-3">
              {bookings.slice(0, 3).map(b => (
                <div
                  key={b.id}
                  className="p-3 rounded-2xl bg-slate-100/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between hover:bg-slate-200/50 transition-colors"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <img src={b.guestAvatar} alt="" className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-500/40" />
                    <div className="truncate">
                      <p className="font-bold text-sm text-slate-800 dark:text-slate-100 truncate">{b.guestName}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{b.roomType} • {b.bookingRef}</p>
                    </div>
                  </div>

                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                    b.status === 'Checked-in' 
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                  }`}>
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveTab('checkin')}
            className="w-full mt-4 py-3 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold text-xs flex items-center justify-center space-x-2 transition-colors border border-amber-500/20 cursor-pointer"
          >
            <span>Open Digital Reception Desk</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
