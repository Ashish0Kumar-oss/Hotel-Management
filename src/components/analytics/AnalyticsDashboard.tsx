import React from 'react';
import { 
  BarChart3, TrendingUp, DollarSign, PieChart as PieChartIcon, 
  Calendar, Download, ArrowUpRight, ShieldCheck, Sparkles
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, 
  XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend 
} from 'recharts';
import { REVENUE_MONTHLY_DATA, ROOM_PERFORMANCE_DATA } from '../../data/mockData';

export const AnalyticsDashboard: React.FC = () => {
  const COLORS = ['#D4AF37', '#0F172A', '#10B981', '#2563EB', '#8B5CF6', '#EC4899'];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <BarChart3 className="w-7 h-7 text-amber-500" />
            Executive Financial Analytics & RevPAR
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time yield optimization, Average Daily Rate (ADR), RevPAR metrics, and seasonal revenue projections.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="h-11 px-5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center space-x-2 transition-colors cursor-pointer self-start md:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Export Analytics PDF</span>
        </button>
      </div>

      {/* Financial KPIs Banner */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="glass-card rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase">RevPAR (Rev Per Available Room)</span>
          <div className="text-2xl sm:text-3xl font-extrabold font-stat text-amber-500">$796.80</div>
          <p className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +16.4% vs Last Month
          </p>
        </div>

        <div className="glass-card rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase">ADR (Average Daily Rate)</span>
          <div className="text-2xl sm:text-3xl font-extrabold font-stat text-slate-900 dark:text-slate-100">$830.00</div>
          <p className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +8.2% Seasonal Surge
          </p>
        </div>

        <div className="glass-card rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase">Average Stay Duration</span>
          <div className="text-2xl sm:text-3xl font-extrabold font-stat text-slate-900 dark:text-slate-100">4.6 Nights</div>
          <p className="text-[11px] text-slate-500">High Repeat VIP Guests</p>
        </div>

        <div className="glass-card rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase">Cancellation Rate</span>
          <div className="text-2xl sm:text-3xl font-extrabold font-stat text-emerald-500">1.2%</div>
          <p className="text-[11px] text-emerald-500 font-semibold">Industry Record Low</p>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Revenue Chart */}
        <div className="lg:col-span-2 glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg font-heading text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-500" /> Monthly Revenue vs Target Performance
            </h2>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500">
              YTD +21.4%
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_MONTHLY_DATA}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '1rem', color: '#fff' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#D4AF37" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
                <Area type="monotone" dataKey="target" stroke="#94a3b8" fillOpacity={0.1} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Room Category Revenue Pie Chart */}
        <div className="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="font-bold text-lg font-heading text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-2">
              <PieChartIcon className="w-5 h-5 text-amber-500" /> Room Revenue Breakdown
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Contribution by Suite Category</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ROOM_PERFORMANCE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="revenue"
                >
                  {ROOM_PERFORMANCE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '0.8rem', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1">
            {ROOM_PERFORMANCE_DATA.slice(0, 4).map((r, idx) => (
              <div key={r.type} className="flex items-center justify-between text-xs font-semibold">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                  {r.type}
                </span>
                <span className="font-stat">${r.revenue.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
