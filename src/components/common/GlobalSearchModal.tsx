import React, { useState, useEffect } from 'react';
import { Search, X, BedDouble, CalendarDays, Users, CreditCard, ArrowRight } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

export const GlobalSearchModal: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    rooms, 
    bookings, 
    guests, 
    payments, 
    setActiveTab,
    setSelectedRoomForView 
  } = useHotel();

  const [term, setTerm] = useState('');

  // Close on Escape key or shortcut Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredRooms = term.trim() 
    ? rooms.filter(r => r.number.includes(term) || r.type.toLowerCase().includes(term.toLowerCase()))
    : [];

  const filteredBookings = term.trim()
    ? bookings.filter(b => b.bookingRef.toLowerCase().includes(term.toLowerCase()) || b.guestName.toLowerCase().includes(term.toLowerCase()))
    : [];

  const filteredGuests = term.trim()
    ? guests.filter(g => g.name.toLowerCase().includes(term.toLowerCase()) || g.email.toLowerCase().includes(term.toLowerCase()))
    : [];

  const filteredPayments = term.trim()
    ? payments.filter(p => p.transactionRef.toLowerCase().includes(term.toLowerCase()) || p.guestName.toLowerCase().includes(term.toLowerCase()))
    : [];

  const hasResults = filteredRooms.length > 0 || filteredBookings.length > 0 || filteredGuests.length > 0 || filteredPayments.length > 0;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-start justify-center pt-16 px-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl glass-card rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-2xl overflow-hidden text-slate-900 dark:text-slate-100"
        onClick={e => e.stopPropagation()}
      >
        {/* Input Bar */}
        <div className="p-4 border-b border-slate-200/80 dark:border-slate-800 flex items-center space-x-3">
          <Search className="w-5 h-5 text-amber-500" />
          <input
            type="text"
            value={term}
            onChange={e => setTerm(e.target.value)}
            placeholder="Search by room #, guest name, booking ref (e.g. AUR-88291)..."
            className="flex-1 bg-transparent border-none outline-none text-base placeholder-slate-400 font-sans"
            autoFocus
          />
          {term && (
            <button onClick={() => setTerm('')} className="p-1 hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded-full">
              <X className="w-4 h-4 text-slate-400" />
            </button>
          )}
          <button 
            onClick={() => setIsSearchOpen(false)}
            className="px-2.5 py-1 text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4">
          {!term.trim() ? (
            <div className="text-center py-8 text-slate-400 space-y-2">
              <Search className="w-10 h-10 mx-auto text-amber-500/40" />
              <p className="text-sm font-medium">Type to search luxury hotel records</p>
              <div className="flex justify-center gap-2 pt-2">
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  Try "Royal Suite"
                </span>
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  Try "Eleanor"
                </span>
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  Try "AUR-88291"
                </span>
              </div>
            </div>
          ) : !hasResults ? (
            <div className="text-center py-8 text-slate-400">
              <p className="text-sm font-medium">No luxury records match "{term}"</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Rooms */}
              {filteredRooms.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-1.5">
                    <BedDouble className="w-4 h-4" /> Rooms & Suites ({filteredRooms.length})
                  </h4>
                  <div className="space-y-1.5">
                    {filteredRooms.map(r => (
                      <div
                        key={r.id}
                        onClick={() => {
                          setSelectedRoomForView(r);
                          setIsSearchOpen(false);
                        }}
                        className="p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer flex items-center justify-between transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                      >
                        <div className="flex items-center space-x-3">
                          <img src={r.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
                          <div>
                            <p className="font-bold text-sm">Room {r.number} • {r.type}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">${r.pricePerNight}/night • Floor {r.floor}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bookings */}
              {filteredBookings.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-1.5">
                    <CalendarDays className="w-4 h-4" /> Bookings ({filteredBookings.length})
                  </h4>
                  <div className="space-y-1.5">
                    {filteredBookings.map(b => (
                      <div
                        key={b.id}
                        onClick={() => {
                          setActiveTab('bookings');
                          setIsSearchOpen(false);
                        }}
                        className="p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer flex items-center justify-between transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                      >
                        <div>
                          <p className="font-bold text-sm">{b.bookingRef} — {b.guestName}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{b.roomType} (Room {b.roomNumber}) • {b.status}</p>
                        </div>
                        <span className="font-stat text-xs font-bold text-emerald-600 dark:text-emerald-400">${b.totalAmount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Guests */}
              {filteredGuests.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-1.5">
                    <Users className="w-4 h-4" /> Guest CRM ({filteredGuests.length})
                  </h4>
                  <div className="space-y-1.5">
                    {filteredGuests.map(g => (
                      <div
                        key={g.id}
                        onClick={() => {
                          setActiveTab('guests');
                          setIsSearchOpen(false);
                        }}
                        className="p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer flex items-center justify-between transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                      >
                        <div className="flex items-center space-x-3">
                          <img src={g.avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
                          <div>
                            <p className="font-bold text-sm">{g.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{g.email} • {g.membershipTier}</p>
                          </div>
                        </div>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
                          {g.totalStays} Stays
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Payments */}
              {filteredPayments.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4" /> Transactions ({filteredPayments.length})
                  </h4>
                  <div className="space-y-1.5">
                    {filteredPayments.map(p => (
                      <div
                        key={p.id}
                        onClick={() => {
                          setActiveTab('payments');
                          setIsSearchOpen(false);
                        }}
                        className="p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer flex items-center justify-between transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                      >
                        <div>
                          <p className="font-bold text-sm">{p.transactionRef} — {p.guestName}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{p.method} • {p.date}</p>
                        </div>
                        <span className="font-stat font-bold text-sm text-emerald-600 dark:text-emerald-400">${p.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
