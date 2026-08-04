import React, { useState, useRef } from 'react';
import { 
  KeyRound, Search, Upload, FileText, CheckCircle2, ShieldCheck, 
  Printer, Sparkles, User, BedDouble, Calendar, RotateCcw, Award
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { Booking } from '../../types';

export const CheckInDesk: React.FC = () => {
  const { bookings, updateBookingStatus, triggerConfetti } = useHotel();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(
    bookings.find(b => b.status === 'Confirmed') || bookings[0] || null
  );

  const [idUploaded, setIdUploaded] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [keyGenerated, setKeyGenerated] = useState(false);
  const [checkInCompleted, setCheckInCompleted] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);

  // Filter confirmed arrivals
  const pendingArrivals = bookings.filter(b => 
    b.bookingRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.roomNumber.includes(searchQuery)
  );

  // Canvas drawing functions for signature
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.strokeStyle = '#D4AF37'; // Luxury Gold Signature Line
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setHasSignature(false);
    }
  };

  const handleGenerateKey = () => {
    setKeyGenerated(true);
    triggerConfetti();
  };

  const handleCompleteCheckIn = () => {
    if (!selectedBooking) return;
    updateBookingStatus(selectedBooking.id, 'Checked-in');
    setCheckInCompleted(true);
    triggerConfetti();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title Bar */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
          <KeyRound className="w-7 h-7 text-amber-500" />
          Digital Reception Desk & Keycard Issuer
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Perform digital guest verification, ID validation, signature authorization, and instant RFID key encoding.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Guest Arrivals List */}
        <div className="glass-card rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-base font-heading text-slate-900 dark:text-slate-100">
              Today's Arrival Roster
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
              {pendingArrivals.length} Arrivals
            </span>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search guest or ref..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
            {pendingArrivals.map(b => (
              <div
                key={b.id}
                onClick={() => {
                  setSelectedBooking(b);
                  setIdUploaded(false);
                  setHasSignature(false);
                  setKeyGenerated(false);
                  setCheckInCompleted(false);
                }}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                  selectedBooking?.id === b.id
                    ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/30'
                    : 'bg-slate-100/60 dark:bg-slate-900/60 border-slate-200/60 dark:border-slate-800 hover:bg-slate-200/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{b.guestName}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600">
                    {b.vipTier}
                  </span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
                  <span>Suite {b.roomNumber} ({b.roomType})</span>
                  <span className="font-mono text-[11px] font-bold">{b.bookingRef}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Reception Desk Processing Workflow */}
        <div className="lg:col-span-2 space-y-6">
          {selectedBooking ? (
            <div className="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 space-y-6">
              {/* Guest Overview Card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white gap-4 border border-amber-500/30">
                <div className="flex items-center space-x-4">
                  <img src={selectedBooking.guestAvatar} alt="" className="w-14 h-14 rounded-full object-cover ring-2 ring-amber-400" />
                  <div>
                    <h3 className="font-bold text-lg font-heading flex items-center gap-2">
                      {selectedBooking.guestName}
                      <Award className="w-4 h-4 text-amber-400" />
                    </h3>
                    <p className="text-xs text-slate-300">
                      Suite {selectedBooking.roomNumber} • {selectedBooking.roomType} • {selectedBooking.nights} Nights Stay
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Total Settled</span>
                  <span className="text-xl font-extrabold font-stat text-amber-400">₹{selectedBooking.totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* 3 Steps: 1. ID Scanner, 2. Signature, 3. RFID Keycard */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. ID Upload Simulator */}
                <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3">
                  <h4 className="font-bold text-xs uppercase text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> 1. Guest ID Verification
                  </h4>

                  {!idUploaded ? (
                    <div 
                      onClick={() => setIdUploaded(true)}
                      className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 text-center hover:border-amber-500 cursor-pointer transition-colors space-y-2"
                    >
                      <Upload className="w-8 h-8 text-amber-500 mx-auto" />
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Scan Passport or Driver License</p>
                      <p className="text-[10px] text-slate-400">Click to run simulated optical scanner</p>
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-between text-xs font-semibold">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Passport Verified (US-9821-X9)
                      </span>
                      <button onClick={() => setIdUploaded(false)} className="text-[10px] underline">Rescan</button>
                    </div>
                  )}
                </div>

                {/* 2. Digital Signature Pad */}
                <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs uppercase text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                      <FileText className="w-4 h-4" /> 2. Guest Signature Pad
                    </h4>
                    {hasSignature && (
                      <button onClick={clearSignature} className="text-[10px] text-slate-400 hover:text-slate-600 flex items-center gap-1">
                        <RotateCcw className="w-3 h-3" /> Clear
                      </button>
                    )}
                  </div>

                  <div className="relative border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-950">
                    <canvas
                      ref={canvasRef}
                      width={300}
                      height={100}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                      className="w-full h-24 cursor-crosshair"
                    />
                    {!hasSignature && (
                      <span className="absolute inset-0 flex items-center justify-center text-xs text-slate-500 pointer-events-none">
                        Sign here using mouse or touch...
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* RFID Keycard Generator Section */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-amber-950 border border-amber-500/30 text-white space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <KeyRound className="w-5 h-5 text-amber-400" />
                    <h4 className="font-bold text-sm font-heading">3. Issue RFID Digital Keycard</h4>
                  </div>
                  <span className="text-xs text-amber-400 font-mono">ENCODER #01</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-slate-300">Assigned Suite: <span className="font-bold text-white">SUITE {selectedBooking.roomNumber}</span></p>
                    <p className="text-[11px] text-slate-400">Encrypted 256-bit NFC key access active for {selectedBooking.checkInDate} → {selectedBooking.checkOutDate}</p>
                  </div>

                  <button
                    onClick={handleGenerateKey}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center space-x-2 ${
                      keyGenerated 
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                        : 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-lg shadow-amber-500/20'
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{keyGenerated ? 'RFID Key Encoded!' : 'Encode RFID Keycard'}</span>
                  </button>
                </div>
              </div>

              {/* Final Action Bar */}
              <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                <button className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold flex items-center space-x-1.5 hover:bg-slate-200 dark:hover:bg-slate-800">
                  <Printer className="w-4 h-4" />
                  <span>Print Arrival Voucher</span>
                </button>

                {/* Red Accent CTA as requested */}
                <button
                  onClick={handleCompleteCheckIn}
                  disabled={checkInCompleted}
                  className={`px-8 py-3 rounded-2xl font-bold text-sm shadow-xl transition-all flex items-center space-x-2 cursor-pointer ${
                    checkInCompleted
                      ? 'bg-emerald-600 text-white cursor-default'
                      : 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/30 hover:scale-105 active:scale-95'
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{checkInCompleted ? 'Check-in Completed!' : 'Complete Check-in'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="glass-card rounded-3xl p-12 text-center text-slate-400 space-y-3">
              <KeyRound className="w-12 h-12 mx-auto text-amber-500/40" />
              <p className="text-base font-bold text-slate-700 dark:text-slate-300">Select a Guest Arrival to Begin Check-in</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
