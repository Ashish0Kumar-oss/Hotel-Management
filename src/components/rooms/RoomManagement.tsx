import React, { useState } from 'react';
import { 
  BedDouble, Search, Filter, Plus, Users, Maximize2, Star, 
  CheckCircle2, AlertTriangle, Sparkles, Wrench, Eye, Edit2, Calendar
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { Room, RoomStatus } from '../../types';

export const RoomManagement: React.FC = () => {
  const { rooms, updateRoomStatus, setSelectedRoomForBooking, setSelectedRoomForView, setIsBookingModalOpen } = useHotel();

  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const roomTypes = ['All', 'Royal Suite', 'Presidential Suite', 'Ocean Penthouse', 'Garden Villa', 'Deluxe Suite', 'Executive Room'];
  const statusList = ['All', 'Available', 'Occupied', 'Cleaning', 'Maintenance'];

  const filteredRooms = rooms.filter(room => {
    const matchesType = selectedType === 'All' || room.type === selectedType;
    const matchesStatus = selectedStatus === 'All' || room.status === selectedStatus;
    const matchesSearch = room.number.includes(searchFilter) || 
      room.type.toLowerCase().includes(searchFilter.toLowerCase()) ||
      room.description.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: RoomStatus) => {
    switch (status) {
      case 'Available':
        return {
          bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
          icon: CheckCircle2,
          label: 'Available'
        };
      case 'Occupied':
        return {
          bg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
          icon: BedDouble,
          label: 'Occupied'
        };
      case 'Cleaning':
        return {
          bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
          icon: Sparkles,
          label: 'Cleaning'
        };
      case 'Maintenance':
        return {
          bg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
          icon: Wrench,
          label: 'Maintenance'
        };
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <BedDouble className="w-7 h-7 text-amber-500" />
            Luxury Suite Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Overview of all 5-star suites, live housekeeping states, and room pricing controls.
          </p>
        </div>

        {/* Red Accent CTA button */}
        <button
          onClick={() => {
            setSelectedRoomForBooking(rooms.find(r => r.status === 'Available') || null);
            setIsBookingModalOpen(true);
          }}
          className="h-11 px-5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:scale-105 active:scale-95 transition-all flex items-center space-x-2 cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Book Suite</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 glass-card rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={searchFilter}
              onChange={e => setSearchFilter(e.target.value)}
              placeholder="Filter by room # or features..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          {/* Type Filter Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 lg:pb-0 pr-2">
            {roomTypes.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedType === type
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/25'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Status Filter Row */}
        <div className="flex items-center space-x-2 pt-2 border-t border-slate-200/60 dark:border-slate-800">
          <span className="text-xs font-bold uppercase text-slate-400 flex items-center gap-1 mr-2">
            <Filter className="w-3.5 h-3.5" /> Status:
          </span>
          {statusList.map(st => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                selectedStatus === st
                  ? 'bg-slate-900 dark:bg-slate-100 text-slate-100 dark:text-slate-900 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Room Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map(room => {
          const badge = getStatusBadge(room.status);
          const BadgeIcon = badge.icon;

          return (
            <div
              key={room.id}
              className="group glass-card rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xl hover:-translate-y-2 hover:shadow-2xl hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image & Overlay Badges */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={room.images[0]}
                  alt={room.type}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-400 text-xs font-extrabold font-heading tracking-wide border border-amber-500/30">
                    SUITE {room.number}
                  </span>

                  <span className={`px-3 py-1 rounded-full backdrop-blur-md text-xs font-bold border flex items-center gap-1.5 ${badge.bg}`}>
                    <BadgeIcon className="w-3.5 h-3.5" />
                    {badge.label}
                  </span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                  <div>
                    <h3 className="text-lg font-bold font-heading text-white drop-shadow-md">
                      {room.type}
                    </h3>
                    <p className="text-xs text-slate-300 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      {room.rating} ({room.reviewCount} reviews) • Floor {room.floor}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-2xl font-extrabold font-stat text-amber-400 drop-shadow-md">
                      ${room.pricePerNight}
                    </span>
                    <span className="text-[10px] text-slate-300 block">/ night</span>
                  </div>
                </div>
              </div>

              {/* Room Body Details */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                    {room.description}
                  </p>

                  <div className="flex items-center space-x-4 text-xs font-medium text-slate-500 dark:text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-amber-500" /> Max {room.maxOccupancy} Guests
                    </span>
                    <span className="flex items-center gap-1">
                      <Maximize2 className="w-3.5 h-3.5 text-amber-500" /> {room.sizeSqFt} sq ft
                    </span>
                  </div>

                  {/* Amenities Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {room.amenities.slice(0, 3).map((amenity, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-medium"
                      >
                        {amenity}
                      </span>
                    ))}
                    {room.amenities.length > 3 && (
                      <span className="text-[10px] px-2 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold">
                        +{room.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedRoomForView(room)}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View</span>
                  </button>

                  {/* Status Toggle Quick Selector */}
                  <select
                    value={room.status}
                    onChange={e => updateRoomStatus(room.id, e.target.value as RoomStatus)}
                    className="py-2 px-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>

                  {/* Red CTA for Booking if available */}
                  <button
                    onClick={() => {
                      setSelectedRoomForBooking(room);
                      setIsBookingModalOpen(true);
                    }}
                    disabled={room.status !== 'Available'}
                    className={`py-2 px-3.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-1 transition-all cursor-pointer ${
                      room.status === 'Available'
                        ? 'bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/20'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed opacity-60'
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
