import React from 'react';
import { X, Printer, Download, Crown, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

export const InvoiceModal: React.FC = () => {
  const { selectedInvoice, setSelectedInvoice } = useHotel();

  if (!selectedInvoice) return null;

  const inv = selectedInvoice;
  const subtotal = inv.amount;
  const resortTax = Math.round(subtotal * 0.12);
  const luxuryFee = Math.round(subtotal * 0.05);
  const totalAmount = subtotal + resortTax + luxuryFee;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white text-slate-900 rounded-3xl border border-slate-200 shadow-2xl overflow-hidden my-8 p-8 space-y-6"
        onClick={e => e.stopPropagation()}
      >
        {/* Invoice Header */}
        <div className="flex items-start justify-between border-b border-slate-200 pb-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Crown className="w-6 h-6 text-amber-500" />
              <span className="font-extrabold text-xl font-heading tracking-tight text-slate-900">
                AURA PALACE & HAVELI RESORT
              </span>
            </div>
            <p className="text-xs text-slate-500">Haridas Ji Ki Magri, Lake Pichola, Udaipur, Rajasthan 313001</p>
            <p className="text-xs text-slate-500">GSTIN: 08AABCA1234F1ZM • Phone: +91 (294) 555-AURA</p>
          </div>

          <div className="text-right">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              OFFICIAL RECEIPT
            </span>
            <p className="text-sm font-bold font-mono text-slate-800 mt-2">{inv.transactionRef}</p>
            <p className="text-xs text-slate-500">{inv.date}</p>
          </div>
        </div>

        {/* Bill To & Stay Info */}
        <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
          <div>
            <span className="text-slate-400 block font-bold uppercase">Billed To</span>
            <span className="font-extrabold text-sm text-slate-900">{inv.guestName}</span>
            <span className="block text-slate-500 mt-0.5">Booking Ref: {inv.bookingRef}</span>
          </div>
          <div className="text-right">
            <span className="text-slate-400 block font-bold uppercase">Payment Method</span>
            <span className="font-bold text-slate-800">{inv.method}</span>
            {inv.cardLast4 && <span className="block text-slate-500 mt-0.5">Card ending in •••• {inv.cardLast4}</span>}
          </div>
        </div>

        {/* Itemized Table */}
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100 text-slate-500 font-bold uppercase border-b border-slate-200">
            <tr>
              <th className="py-2.5 px-3">Description</th>
              <th className="py-2.5 px-3 text-right">Qty</th>
              <th className="py-2.5 px-3 text-right">Rate</th>
              <th className="py-2.5 px-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            <tr>
              <td className="py-3 px-3">Heritage Palace Suite Accommodation Charge</td>
              <td className="py-3 px-3 text-right">1</td>
              <td className="py-3 px-3 text-right">₹{subtotal.toLocaleString('en-IN')}</td>
              <td className="py-3 px-3 text-right font-bold">₹{subtotal.toLocaleString('en-IN')}</td>
            </tr>
            <tr>
              <td className="py-3 px-3 text-slate-600">GST (12% Goods & Services Tax)</td>
              <td className="py-3 px-3 text-right">1</td>
              <td className="py-3 px-3 text-right">₹{resortTax.toLocaleString('en-IN')}</td>
              <td className="py-3 px-3 text-right">₹{resortTax.toLocaleString('en-IN')}</td>
            </tr>
            <tr>
              <td className="py-3 px-3 text-slate-600">Royal Service & Cultural Heritage Fee (5%)</td>
              <td className="py-3 px-3 text-right">1</td>
              <td className="py-3 px-3 text-right">₹{luxuryFee.toLocaleString('en-IN')}</td>
              <td className="py-3 px-3 text-right">₹{luxuryFee.toLocaleString('en-IN')}</td>
            </tr>
          </tbody>
        </table>

        {/* Total Summary */}
        <div className="flex justify-end pt-4 border-t border-slate-200">
          <div className="w-64 space-y-2 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal:</span>
              <span className="font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Taxes & Fees:</span>
              <span className="font-bold">₹{(resortTax + luxuryFee).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-amber-600 pt-2 border-t border-slate-200">
              <span>Total Paid:</span>
              <span className="font-stat">₹{totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Invoice Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-200">
          <div className="flex items-center space-x-1 text-xs text-emerald-600 font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>PAID IN FULL • THANK YOU FOR STAYING AT AURA</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSelectedInvoice(null)}
              className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold hover:bg-slate-100"
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 flex items-center space-x-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Print Invoice</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
