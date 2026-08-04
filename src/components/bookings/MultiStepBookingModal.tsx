import React, { useState } from 'react';
import { 
  X, Check, ChevronRight, ChevronLeft, User, BedDouble, 
  Sparkles, CreditCard, ShieldCheck, Printer, Crown, Calendar
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { Room } from '../../types';

export const MultiStepBookingModal: React.FC = () => {
  const { 
    isBookingModalOpen, 
    setIsBookingModalOpen, 
    rooms, 
    selectedRoomForBooking, 
    addBooking,
    addPayment 
  } = useHotel();

  const [step, setStep] = useState<number>(1);

  // Step 1: Guest Details
  const [guestName, setGuestName] = useState('Maharaja Vikramaditya Singh');
  const [guestEmail, setGuestEmail] = useState('vikramaditya@royalheritage.in');
  const [guestPhone, setGuestPhone] = useState('+91 98111 99887');
  const [vipTier, setVipTier] = useState<'Diamond' | 'Platinum' | 'Gold' | 'Standard'>('Diamond');
  const [passportId, setPassportId] = useState('IN-8821-X9');
  const [specialRequests, setSpecialRequests] = useState('Chilled Royal Champagne on arrival. Fresh marigold garland welcome & Lake Pichola view.');

  // Step 2: Room & Stay
  const availableRooms = rooms.filter(r => r.status === 'Available');
  const [selectedRoom, setSelectedRoom] = useState<Room>(selectedRoomForBooking || availableRooms[0] || rooms[0]);
  const [checkInDate, setCheckInDate] = useState('2026-08-05');
  const [checkOutDate, setCheckOutDate] = useState('2026-08-09');
  const [nightsCount, setNightsCount] = useState(4);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  // Step 3: Add-on Services
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(['Airport Limousine Transfer', 'Private Butler Service']);

  // Step 4: Payment
  const [paymentMethod, setPaymentMethod] = useState<'Credit Card' | 'Apple Pay' | 'UPI' | 'Wire'>('Credit Card');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvc, setCardCvc] = useState('882');

  // Step 5 Confirmation state
  const [confirmedBookingRef, setConfirmedBookingRef] = useState<string>('');

  if (!isBookingModalOpen) return null;

  const addOnOptions = [
    { name: 'Vintage Rolls-Royce Transfer', price: 12500, description: 'Private 1938 Vintage Rolls-Royce airport escort' },
    { name: 'Ayurveda & Shirodhara Spa Package', price: 18500, description: 'Full body 4-hand Abhyanga massage & Shirodhara oil pour' },
    { name: 'Private Royal Khansama Butler', price: 25000, description: '24/7 dedicated personal butler for dining, tea & packing' },
    { name: '24k Gold Royal Thali Experience', price: 15000, description: '11-course royal feast served on silver platters' }
  ];

  const addOnsTotal = selectedAddOns.reduce((acc, name) => {
    const item = addOnOptions.find(a => a.name === name);
    return acc + (item ? item.price : 0);
  }, 0);

  const roomSubtotal = (selectedRoom ? selectedRoom.pricePerNight : 850) * nightsCount;
  const grandTotal = roomSubtotal + addOnsTotal;

  const toggleAddOn = (name: string) => {
    setSelectedAddOns(prev => 
      prev.includes(name) ? prev.filter(a => a !== name) : [...prev, name]
    );
  };

  const handleCompleteBooking = () => {
    const ref = `AUR-${Math.floor(10000 + Math.random() * 90000)}`;
    setConfirmedBookingRef(ref);

    addBooking({
      bookingRef: ref,
      guestName,
      guestEmail,
      guestPhone,
      vipTier,
      roomId: selectedRoom.id,
      roomNumber: selectedRoom.number,
      roomType: selectedRoom.type,
      checkInDate,
      checkOutDate,
      nights: nightsCount,
      guestsCount: { adults, children },
      totalAmount: grandTotal,
      paidAmount: grandTotal,
      paymentStatus: 'Paid',
      status: 'Confirmed',
      specialRequests,
      addOnServices: selectedAddOns
    });

    addPayment({
      bookingRef: ref,
      guestName,
      amount: grandTotal,
      method: paymentMethod === 'Credit Card' ? 'Credit Card' : 'Apple Pay',
      status: 'Completed',
      cardLast4: '8821'
    });

    setStep(5);
  };

  const handleClose = () => {
    setIsBookingModalOpen(false);
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="w-full max-w-3xl glass-card rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-2xl overflow-hidden text-slate-900 dark:text-slate-100 my-6"
        onClick={e => e.stopPropagation()}
      >
        {/* Header with Progress Steps */}
        <div className="p-6 border-b border-slate-200/80 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Crown className="w-5 h-5 text-amber-500" />
              <h2 className="text-xl font-bold font-heading">Five-Star Suite Reservation</h2>
            </div>
            <button onClick={handleClose} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-between relative px-2">
            {[1, 2, 3, 4, 5].map(s => (
              <div key={s} className="flex flex-col items-center z-10">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    step === s
                      ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-500/30 scale-110'
                      : step > s
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                  }`}
                >
                  {step > s ? <Check className="w-4 h-4" /> : s}
                </div>
                <span className="text-[10px] font-semibold text-slate-400 mt-1 hidden sm:block">
                  {s === 1 && 'Guest Details'}
                  {s === 2 && 'Suite Selection'}
                  {s === 3 && 'Add-on Services'}
                  {s === 4 && 'Payment'}
                  {s === 5 && 'Confirmation'}
                </span>
              </div>
            ))}
            <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-200 dark:bg-slate-800 -z-0" />
          </div>
        </div>

        {/* Form Step Contents */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
          {/* STEP 1: GUEST DETAILS */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h3 className="font-bold text-base font-heading flex items-center gap-2">
                <User className="w-4 h-4 text-amber-500" /> Step 1: Guest Profile & Passport Info
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">Full Guest Name</label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={e => setGuestName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={guestEmail}
                    onChange={e => setGuestEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={guestPhone}
                    onChange={e => setGuestPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">Membership Tier</label>
                  <select
                    value={vipTier}
                    onChange={e => setVipTier(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm focus:outline-none focus:border-amber-500 font-bold"
                  >
                    <option value="Diamond">Diamond VIP</option>
                    <option value="Platinum">Platinum Elite</option>
                    <option value="Gold">Gold Member</option>
                    <option value="Standard">Standard Guest</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">Passport / Driver License ID</label>
                <input
                  type="text"
                  value={passportId}
                  onChange={e => setPassportId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-mono focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">Special Requests & Preferences</label>
                <textarea
                  value={specialRequests}
                  onChange={e => setSpecialRequests(e.target.value)}
                  rows={2}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          )}

          {/* STEP 2: ROOM SELECTION & DATES */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h3 className="font-bold text-base font-heading flex items-center gap-2">
                <BedDouble className="w-4 h-4 text-amber-500" /> Step 2: Choose Suite & Dates
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">Check-in Date</label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={e => setCheckInDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">Check-out Date</label>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={e => setCheckOutDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">Nights Count</label>
                  <input
                    type="number"
                    min={1}
                    value={nightsCount}
                    onChange={e => setNightsCount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold"
                  />
                </div>
              </div>

              {/* Room Grid Picker */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400">Select Available Suite</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {availableRooms.map(r => (
                    <div
                      key={r.id}
                      onClick={() => setSelectedRoom(r)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        selectedRoom?.id === r.id
                          ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/40'
                          : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-amber-500/40'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <img src={r.images[0]} alt="" className="w-12 h-12 rounded-xl object-cover" />
                        <div>
                          <p className="font-bold text-sm">Suite {r.number} • {r.type}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Max {r.maxOccupancy} Guests • Floor {r.floor}</p>
                        </div>
                      </div>
                      <span className="font-stat font-extrabold text-sm text-amber-500">₹{r.pricePerNight.toLocaleString('en-IN')}/night</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: ADD-ON SERVICES */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h3 className="font-bold text-base font-heading flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" /> Step 3: Curated Concierge Add-ons
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {addOnOptions.map(item => {
                  const isSelected = selectedAddOns.includes(item.name);
                  return (
                    <div
                      key={item.name}
                      onClick={() => toggleAddOn(item.name)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-amber-500/10 border-amber-500 ring-1 ring-amber-500'
                          : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-200/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                          isSelected ? 'bg-amber-500 border-amber-500 text-slate-950' : 'border-slate-400'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div>
                          <p className="font-bold text-sm">{item.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{item.description}</p>
                        </div>
                      </div>
                      <span className="font-stat font-bold text-sm text-emerald-500">+₹{item.price.toLocaleString('en-IN')}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: PAYMENT */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h3 className="font-bold text-base font-heading flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-amber-500" /> Step 4: Secure Digital Payment
              </h3>

              {/* Luxury Credit Card Preview */}
              <div className="p-6 rounded-2xl bg-gradient-to-tr from-slate-900 via-slate-800 to-amber-950 text-white shadow-xl space-y-6 relative overflow-hidden border border-amber-500/30">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs font-heading gold-gradient-text tracking-widest uppercase">
                    AURA ROYAL BLACK CARD
                  </span>
                  <Crown className="w-6 h-6 text-amber-400" />
                </div>
                <div className="font-mono text-xl tracking-widest">{cardNumber}</div>
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Cardholder</span>
                    <span className="font-semibold">{guestName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Expires</span>
                    <span className="font-semibold">{cardExpiry}</span>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>Suite {selectedRoom.number} ({nightsCount} nights)</span>
                  <span className="font-bold">₹{roomSubtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Add-on Services</span>
                  <span className="font-bold">₹{addOnsTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-800 font-bold text-sm text-amber-500">
                  <span>Total Due Today</span>
                  <span className="font-stat text-base">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: CONFIRMATION */}
          {step === 5 && (
            <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center ring-8 ring-emerald-500/10">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-slate-100">
                  Reservation Confirmed!
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Booking Reference ID: <span className="font-mono font-bold text-amber-500">{confirmedBookingRef}</span>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left space-y-2 text-xs max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-slate-400">Guest:</span>
                  <span className="font-bold">{guestName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Suite:</span>
                  <span className="font-bold">Suite {selectedRoom.number} ({selectedRoom.type})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Check-in:</span>
                  <span className="font-bold">{checkInDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Settled:</span>
                  <span className="font-bold text-emerald-500">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        <div className="p-6 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          {step > 1 && step < 5 ? (
            <button
              onClick={() => setStep(prev => prev - 1)}
              className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold flex items-center space-x-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 && (
            <button
              onClick={() => setStep(prev => prev + 1)}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center space-x-1 shadow-md shadow-amber-500/20"
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {step === 4 && (
            /* Red Accent CTA as requested */
            <button
              onClick={handleCompleteBooking}
              className="px-8 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-xl shadow-red-600/30 hover:scale-105 active:scale-95 transition-all flex items-center space-x-2 cursor-pointer"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Confirm & Pay ₹{grandTotal.toLocaleString('en-IN')}</span>
            </button>
          )}

          {step === 5 && (
            <button
              onClick={handleClose}
              className="px-8 py-3 rounded-2xl bg-slate-900 dark:bg-slate-100 text-slate-100 dark:text-slate-900 font-bold text-sm"
            >
              Done & Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
