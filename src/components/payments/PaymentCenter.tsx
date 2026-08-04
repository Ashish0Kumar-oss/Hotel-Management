import React, { useState } from 'react';
import { 
  CreditCard, QrCode, DollarSign, Download, CheckCircle2, 
  RefreshCw, ShieldCheck, ArrowUpRight, Search, FileText, Plus, Sparkles
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { PaymentTransaction } from '../../types';

export const PaymentCenter: React.FC = () => {
  const { payments, addPayment, setSelectedInvoice, triggerConfetti } = useHotel();
  const [activeMethod, setActiveMethod] = useState<'Credit Card' | 'UPI / QR' | 'Apple Pay' | 'Wire Transfer'>('Credit Card');
  const [chargeAmount, setChargeAmount] = useState<string>('125000');
  const [guestNameInput, setGuestNameInput] = useState<string>('Maharaja Vikramaditya Singh');
  const [bookingRefInput, setBookingRefInput] = useState<string>('AUR-88291');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [paymentDone, setPaymentDone] = useState<boolean>(false);

  const totalSettledToday = payments.reduce((acc, p) => acc + p.amount, 0);

  const handleProcessPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentDone(true);
      addPayment({
        guestName: guestNameInput,
        bookingRef: bookingRefInput,
        amount: Number(chargeAmount),
        method: activeMethod,
        status: 'Completed',
        cardLast4: '4821'
      });
      triggerConfetti();
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <CreditCard className="w-7 h-7 text-amber-500" />
            Online Payments & Merchant Processing
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            PCI-DSS compliant luxury payment gateway, instant QR code generator, and automated financial settlements.
          </p>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800 flex items-center space-x-4">
          <div>
            <span className="text-xs text-slate-400 block">Total Processed Today</span>
            <span className="text-xl font-extrabold font-stat text-emerald-500">₹{totalSettledToday.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Virtual POS Payment Terminal */}
        <div className="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-800">
            <h2 className="font-bold text-base font-heading text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" /> Virtual Merchant Terminal
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500">
              TERMINAL ONLINE
            </span>
          </div>

          {/* Payment Method Selector */}
          <div className="grid grid-cols-2 gap-2">
            {(['Credit Card', 'UPI / QR', 'Apple Pay', 'Wire Transfer'] as const).map(method => (
              <button
                key={method}
                onClick={() => {
                  setActiveMethod(method);
                  setPaymentDone(false);
                }}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeMethod === method
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {method}
              </button>
            ))}
          </div>

          {/* Terminal Input Form */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">Guest Name</label>
              <input
                type="text"
                value={guestNameInput}
                onChange={e => setGuestNameInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm focus:outline-none focus:border-amber-500 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">Booking Reference #</label>
              <input
                type="text"
                value={bookingRefInput}
                onChange={e => setBookingRefInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-mono focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">Charge Amount (₹ INR)</label>
              <input
                type="number"
                value={chargeAmount}
                onChange={e => setChargeAmount(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-lg font-extrabold font-stat text-amber-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Dynamic Payment Method View (QR code or Card Input) */}
          {activeMethod === 'UPI / QR' ? (
            <div className="p-4 rounded-2xl bg-slate-950 text-center space-y-2 border border-slate-800">
              <QrCode className="w-24 h-24 mx-auto text-amber-400 p-2 bg-white rounded-xl shadow-lg" />
              <p className="text-xs text-slate-300 font-medium">Scan UPI QR Code to pay ₹{Number(chargeAmount || 0).toLocaleString('en-IN')}</p>
              <p className="text-[10px] text-slate-500">Supports GPay, PhonePe, Paytm, BHIM & International Cards</p>
            </div>
          ) : null}

          {/* Red Accent CTA as requested */}
          <button
            onClick={handleProcessPayment}
            disabled={isProcessing}
            className={`w-full py-3.5 rounded-2xl font-bold text-sm shadow-xl transition-all flex items-center justify-center space-x-2 cursor-pointer ${
              paymentDone
                ? 'bg-emerald-600 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/30 hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            {isProcessing ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : paymentDone ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>Payment Charged Successfully!</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-5 h-5" />
                <span>Process Charge ₹{Number(chargeAmount || 0).toLocaleString('en-IN')}</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Transaction History Table */}
        <div className="lg:col-span-2 glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg font-heading text-slate-900 dark:text-slate-100">
              Recent Settlement History
            </h2>
            <span className="text-xs text-slate-500 dark:text-slate-400">{payments.length} Transactions</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100/80 dark:bg-slate-900/80 border-b border-slate-200/80 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase font-bold text-[11px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Transaction Ref</th>
                  <th className="py-3 px-4">Guest</th>
                  <th className="py-3 px-4">Method</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/80">
                {payments.map(tx => (
                  <tr key={tx.id} className="hover:bg-slate-100/50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-600 dark:text-amber-400">{tx.transactionRef}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">{tx.guestName}</td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">{tx.method}</td>
                    <td className="py-3.5 px-4 font-stat font-extrabold text-slate-900 dark:text-slate-100">₹{tx.amount.toLocaleString('en-IN')}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedInvoice(tx)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-amber-500/10 hover:text-amber-500 text-slate-600 dark:text-slate-400 text-xs font-bold transition-colors flex items-center gap-1 ml-auto"
                      >
                        <FileText className="w-3.5 h-3.5" /> Invoice
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
