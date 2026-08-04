import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Sparkles } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

export const HotelCalendar: React.FC = () => {
  const { rooms, bookings, setIsBookingModalOpen, setSelectedRoomForBooking } = useHotel();
  const [currentMonth, setCurrentMonth] = useState('August 2026');

  // Days 1 to 14 timeline grid columns
  const days = Array.from({ length: 14 }, (_, i) => i + 1);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <CalendarIcon className="w-7 h-7 text-amber-500" />
            Master Resort Availability Matrix
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Visual room timeline matrix, real-time booking slots, and maintenance schedule.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 glass-card p-1 rounded-2xl border border-slate-200 dark:border-slate-800">
            <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 font-bold text-xs font-heading">{currentMonth}</span>
            <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid Timeline Matrix */}
      <div className="glass-card rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            {/* Days Header */}
            <div className="grid grid-cols-15 bg-slate-100/80 dark:bg-slate-900/80 border-b border-slate-200/80 dark:border-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400 p-3">
              <div className="col-span-3">SUITE / TYPE</div>
              {days.map(d => (
                <div key={d} className="text-center font-stat">
                  AUG {d < 10 ? `0${d}` : d}
                </div>
              ))}
            </div>

            {/* Room Matrix Rows */}
            <div className="divide-y divide-slate-200/60 dark:divide-slate-800/80">
              {rooms.map(room => (
                <div key={room.id} className="grid grid-cols-15 items-center p-3 text-xs hover:bg-slate-100/40 dark:hover:bg-slate-800/40 transition-colors">
                  <div className="col-span-3 font-bold flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 font-mono text-[10px]">
                      #{room.number}
                    </span>
                    <span className="truncate">{room.type}</span>
                  </div>

                  {/* Day Slots */}
                  {days.map(day => {
                    const isOccupied = room.status === 'Occupied' && (day >= 3 && day <= 8);
                    const isCleaning = room.status === 'Cleaning' && day === 4;
                    const isMaintenance = room.status === 'Maintenance' && (day >= 2 && day <= 5);

                    return (
                      <div
                        key={day}
                        onClick={() => {
                          if (!isOccupied && !isCleaning && !isMaintenance) {
                            setSelectedRoomForBooking(room);
                            setIsBookingModalOpen(true);
                          }
                        }}
                        className={`h-9 mx-0.5 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all cursor-pointer ${
                          isOccupied
                            ? 'bg-blue-600 text-white shadow-sm'
                            : isCleaning
                            ? 'bg-amber-500 text-slate-950 shadow-sm'
                            : isMaintenance
                            ? 'bg-rose-600 text-white shadow-sm'
                            : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                        }`}
                      >
                        {isOccupied ? 'Occupied' : isCleaning ? 'Cleaning' : isMaintenance ? 'Maint' : 'Available'}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
