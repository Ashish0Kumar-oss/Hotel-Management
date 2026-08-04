import React, { useState } from 'react';
import { Star, MessageSquare, ThumbsUp, Award, CheckCircle2, Send } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { Review } from '../../types';

export const ReviewsDashboard: React.FC = () => {
  const { reviews } = useHotel();
  const [replyingId, setReplyingId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [localReviews, setLocalReviews] = useState<Review[]>(reviews);

  const handleSendReply = (id: string) => {
    setLocalReviews(prev => prev.map(r => r.id === id ? { ...r, response: replyText } : r));
    setReplyingId(null);
    setReplyText('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
          <Star className="w-7 h-7 text-amber-500 fill-amber-500" />
          Guest Reviews & Five-Star Reputation
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Monitor guest satisfaction scores, guest feedback analytics, and publish staff responses.
        </p>
      </div>

      {/* Overview Analytics Bar */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 text-center flex flex-col justify-center">
          <span className="text-xs text-slate-400 block font-bold uppercase">Overall Rating</span>
          <span className="text-4xl font-extrabold font-stat gold-gradient-text my-1">4.95 / 5</span>
          <div className="flex justify-center gap-1 text-amber-400">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
          </div>
        </div>

        <div className="md:col-span-4 glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 text-center">
            <span className="text-xs text-slate-400 block">Cleanliness</span>
            <span className="text-lg font-bold text-slate-900 dark:text-slate-100 font-stat">5.0 ★</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 text-center">
            <span className="text-xs text-slate-400 block">Amenities</span>
            <span className="text-lg font-bold text-slate-900 dark:text-slate-100 font-stat">4.95 ★</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 text-center">
            <span className="text-xs text-slate-400 block">Concierge Service</span>
            <span className="text-lg font-bold text-slate-900 dark:text-slate-100 font-stat">4.98 ★</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 text-center">
            <span className="text-xs text-slate-400 block">Gastronomy</span>
            <span className="text-lg font-bold text-slate-900 dark:text-slate-100 font-stat">4.92 ★</span>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {localReviews.map(rev => (
          <div key={rev.id} className="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <img src={rev.guestAvatar} alt="" className="w-12 h-12 rounded-full object-cover ring-2 ring-amber-500/40" />
                <div>
                  <h3 className="font-bold text-base font-heading text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    {rev.guestName}
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold flex items-center gap-1 border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" /> Verified Luxury Guest
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{rev.roomType} • Stayed {rev.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30 text-amber-500 text-sm font-bold font-stat">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{rev.rating}</span>
              </div>
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed italic">
              "{rev.comment}"
            </p>

            {/* Official Hotel Response */}
            {rev.response ? (
              <div className="p-4 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
                <span className="font-bold text-amber-600 dark:text-amber-400 block uppercase tracking-wider">
                  Official Response from Executive Management
                </span>
                <p className="text-slate-700 dark:text-slate-300">{rev.response}</p>
              </div>
            ) : replyingId === rev.id ? (
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <textarea
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  placeholder="Write official executive response..."
                  className="w-full p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs focus:outline-none focus:border-amber-500"
                  rows={2}
                />
                <div className="flex justify-end space-x-2">
                  <button onClick={() => setReplyingId(null)} className="px-3 py-1.5 rounded-xl border text-xs font-semibold">Cancel</button>
                  <button onClick={() => handleSendReply(rev.id)} className="px-4 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center space-x-1">
                    <Send className="w-3.5 h-3.5" />
                    <span>Post Official Response</span>
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setReplyingId(rev.id)}
                className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
              >
                <MessageSquare className="w-3.5 h-3.5" /> Reply as General Manager
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
