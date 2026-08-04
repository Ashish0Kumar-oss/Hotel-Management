import React, { useState } from 'react';
import { 
  CalendarDays, Search, Plus, Filter, Download, User, 
  BedDouble, DollarSign, CheckCircle2, Clock, XCircle, MoreVertical, LogIn, LogOut
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { Booking, BookingStatus } from '../../types';

export const BookingManagement: React.FC = () => {
  const { bookings, updateBookingStatus, setIsBookingModalOpen } = useHotel();
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const statuses = ['All', 'Confirmed', 'Checked-in', 'Checked-out', 'Pending', 'Cancelled'];

  const filteredBookings = bookings.filter(b => {
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    const matchesSearch = b.bookingRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.roomNumber.includes(searchTerm) ||
      b.roomType.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const exportCSV = () => {
    const headers = ['BookingRef', 'GuestName', 'RoomNumber', 'RoomType', 'CheckIn', 'CheckOut', 'TotalAmount', 'Status'];
    const rows = filteredBookings.map(b => [
      b.bookingRef,
      `"${b.guestName}"`,
      b.roomNumber,
      `"${b.roomType}"`,
      b.checkInDate,
      b.checkOutDate,
      b.totalAmount,
      b.status
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Aura_Resort_Bookings_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusChip = (status: BookingStatus) => {
    switch (status) {
      case 'Checked-in':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
      case 'Confirmed':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30';
      case 'Pending':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30';
      case 'Checked-out':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30';
      case 'Cancelled':
        return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Title & Export */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <CalendarDays className="w-7 h-7 text-amber-500" />
            Booking & Reservation Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track guest arrivals, manage stay durations, issue keycards, and handle reservation updates.
          </p>
        </div>

        <div className="flex items-center space-x-3 self-start md:self-auto">
          <button
            onClick={exportCSV}
            className="h-11 px-4 rounded-2xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-slate-800 flex items-center space-x-2 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>

          {/* Red Accent CTA button */}
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="h-11 px-5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:scale-105 active:scale-95 transition-all flex items-center space-x-2 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>New Booking</span>
          </button>
        </div>
      </div>

      {/* Search & Filters Toolbar */}
      <div className="p-4 glass-card rounded-3xl border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search by ref #, guest name, or room..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 text-sm focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0">
          {statuses.map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/25'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Table */}
      <div className="glass-card rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100/80 dark:bg-slate-900/80 border-b border-slate-200/80 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase font-bold text-[11px] tracking-wider">
              <tr>
                <th className="py-4 px-6">Guest / Ref</th>
                <th className="py-4 px-6">Suite Details</th>
                <th className="py-4 px-6">Dates & Stay</th>
                <th className="py-4 px-6">Payment</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/80">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400">
                    No reservations match your filters.
                  </td>
                </tr>
              ) : (
                filteredBookings.map(b => (
                  <tr key={b.id} className="hover:bg-slate-100/50 dark:hover:bg-slate-800/40 transition-colors">
                    {/* Guest Column */}
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <img src={b.guestAvatar} alt="" className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-500/30" />
                        <div>
                          <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                            {b.guestName}
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-extrabold">
                              {b.vipTier}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">{b.bookingRef}</div>
                        </div>
                      </div>
                    </td>

                    {/* Suite Column */}
                    <td className="py-4 px-6">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">
                        Suite {b.roomNumber}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{b.roomType}</div>
                    </td>

                    {/* Dates Column */}
                    <td className="py-4 px-6">
                      <div className="font-medium text-slate-700 dark:text-slate-300">
                        {b.checkInDate} → {b.checkOutDate}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{b.nights} Nights • {b.guestsCount.adults} Adults</div>
                    </td>

                    {/* Payment Column */}
                    <td className="py-4 px-6">
                      <div className="font-stat font-extrabold text-slate-900 dark:text-slate-100">
                        ${b.totalAmount.toLocaleString()}
                      </div>
                      <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        b.paymentStatus === 'Paid' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-600'
                      }`}>
                        {b.paymentStatus}
                      </span>
                    </td>

                    {/* Status Column */}
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border inline-flex items-center gap-1 ${getStatusChip(b.status)}`}>
                        {b.status}
                      </span>
                    </td>

                    {/* Actions Column */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {b.status === 'Confirmed' && (
                          <button
                            onClick={() => updateBookingStatus(b.id, 'Checked-in')}
                            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center space-x-1"
                          >
                            <LogIn className="w-3.5 h-3.5" />
                            <span>Check In</span>
                          </button>
                        )}
                        {b.status === 'Checked-in' && (
                          <button
                            onClick={() => updateBookingStatus(b.id, 'Checked-out')}
                            className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-colors flex items-center space-x-1"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>Check Out</span>
                          </button>
                        )}
                        {b.status !== 'Cancelled' && b.status !== 'Checked-out' && (
                          <button
                            onClick={() => updateBookingStatus(b.id, 'Cancelled')}
                            className="p-1.5 rounded-xl text-rose-500 hover:bg-rose-500/10 transition-colors"
                            title="Cancel Booking"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
