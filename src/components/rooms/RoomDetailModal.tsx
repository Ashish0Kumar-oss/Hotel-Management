import React, { useState } from 'react';
import { 
  X, Star, Users, Maximize2, BedDouble, Check, Calendar, 
  Sparkles, Wrench, ShieldCheck, ChevronLeft, ChevronRight, DollarSign
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

export const RoomDetailModal: React.FC = () => {
  const { selectedRoomForView, setSelectedRoomForView, setSelectedRoomForBooking, setIsBookingModalOpen } = useHotel();
  const [activeImgIndex, setActiveImgIndex] = useState<number>(0);

  if (!selectedRoomForView) return null;

  const room = selectedRoomForView;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="w-full max-w-4xl glass-card rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-2xl overflow-hidden text-slate-900 dark:text-slate-100 my-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-6 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-extrabold font-heading text-xs border border-amber-500/30">
              SUITE {room.number}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-heading">{room.type}</h2>
          </div>
          <button
            onClick={() => setSelectedRoomForView(null)}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto pr-3">
          {/* Image Carousel / Gallery */}
          <div className="space-y-3">
            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 dark:border-slate-800">
              <img
                src={room.images[activeImgIndex] || room.images[0]}
                alt={room.type}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              
              {room.images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImgIndex(prev => (prev === 0 ? room.images.length - 1 : prev - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 transition-colors backdrop-blur-md"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveImgIndex(prev => (prev === room.images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 transition-colors backdrop-blur-md"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Image Thumbnails */}
            {room.images.length > 1 && (
              <div className="flex items-center space-x-3 overflow-x-auto pb-1">
                {room.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`w-20 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImgIndex === idx ? 'border-amber-500 scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800">
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block">Rate / Night</span>
              <span className="text-xl font-extrabold font-stat text-amber-500">${room.pricePerNight}</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block">Bed Specs</span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{room.bedType}</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block">Capacity</span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Max {room.maxOccupancy} Guests</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block">Suite Size</span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{room.sizeSqFt} sq ft</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="font-bold text-base font-heading">Suite Overview</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {room.description}
            </p>
          </div>

          {/* Amenities checklist */}
          <div className="space-y-3">
            <h3 className="font-bold text-base font-heading flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" /> Five-Star Suite Amenities & Services
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {room.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-xs font-semibold text-slate-700 dark:text-slate-200 p-2 rounded-xl bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 block">Current Status</span>
            <span className="text-sm font-bold text-emerald-500">{room.status}</span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSelectedRoomForView(null)}
              className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              Close
            </button>

            {/* Red Accent CTA Button */}
            <button
              onClick={() => {
                setSelectedRoomForBooking(room);
                setSelectedRoomForView(null);
                setIsBookingModalOpen(true);
              }}
              className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-lg shadow-red-600/30 hover:scale-105 active:scale-95 transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Suite Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
