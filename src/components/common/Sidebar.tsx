import React from 'react';
import { 
  LayoutDashboard, BedDouble, CalendarDays, KeyRound, Sparkles, 
  CreditCard, Users, Star, BarChart3, Calendar, Settings, Crown, 
  ChevronRight, Sparkle, Utensils, Heart, Compass
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}

export const Sidebar: React.FC = () => {
  const { userRole, activeTab, setActiveTab, sidebarCollapsed, rooms, bookings } = useHotel();

  const occupiedRoomsCount = rooms.filter(r => r.status === 'Occupied').length;
  const occupancyRate = Math.round((occupiedRoomsCount / rooms.length) * 100);

  const staffNavItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'rooms', label: 'Rooms & Rates', icon: BedDouble, badge: `${rooms.length}` },
    { id: 'bookings', label: 'Guest Bookings', icon: CalendarDays, badge: `${bookings.length}` },
    { id: 'checkin', label: 'Check-in Desk', icon: KeyRound, badge: 'Live', badgeColor: 'bg-emerald-500 text-white' },
    { id: 'housekeeping', label: 'Housekeeping', icon: Sparkles, badge: 'Kanban' },
    { id: 'payments', label: 'Online Payments', icon: CreditCard },
    { id: 'guests', label: 'Guests CRM', icon: Users, badge: 'VIP' },
    { id: 'reviews', label: 'Guest Reviews', icon: Star },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
    { id: 'calendar', label: 'Hotel Calendar', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const clientNavItems: NavItem[] = [
    { id: 'client-facilities', label: 'Palace Facilities', icon: Sparkles },
    { id: 'client-suites', label: 'Suites & Haveli', icon: BedDouble, badge: `${rooms.length}` },
    { id: 'client-dining', label: 'Shahi Dawat Dining', icon: Utensils, badge: 'Royal Thali', badgeColor: 'bg-amber-500 text-slate-950 font-bold' },
    { id: 'client-spa', label: 'Ayurvedic Spa', icon: Heart },
    { id: 'client-mystay', label: 'My Stay & Digital Key', icon: KeyRound, badge: 'Suite #204', badgeColor: 'bg-emerald-500 text-white' },
    { id: 'reviews', label: 'Guest Reviews', icon: Star }
  ];

  const currentNavItems = userRole === 'client' ? clientNavItems : staffNavItems;

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 glass-nav transition-all duration-300 flex flex-col ${
        sidebarCollapsed ? 'w-20' : 'w-64 sm:w-72'
      }`}
    >
      {/* Brand Header */}
      <div className="h-20 px-6 flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/80">
        <div 
          onClick={() => setActiveTab(userRole === 'client' ? 'client-facilities' : 'dashboard')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-300 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
              <Crown className="w-5 h-5 text-amber-400" />
            </div>
          </div>

          {!sidebarCollapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-lg font-heading tracking-tight gold-gradient-text">
                AURA PALACE
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 dark:text-slate-400">
                {userRole === 'client' ? 'Atithi Guest Experience' : 'Royal Palace Management'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] uppercase font-bold tracking-widest text-amber-600 dark:text-amber-400 opacity-80">
          {!sidebarCollapsed && (userRole === 'client' ? 'Guest Portal' : 'Management Suite')}
        </div>

        {currentNavItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id || (userRole === 'client' && activeTab.startsWith('client') && activeTab === item.id);

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full h-11 px-3.5 rounded-2xl flex items-center justify-between transition-all group relative cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent text-amber-700 dark:text-amber-300 font-bold border-l-4 border-amber-500 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
              title={sidebarCollapsed ? item.label : undefined}
              id={`nav-item-${item.id}`}
            >
              <div className="flex items-center space-x-3 min-w-0">
                <Icon
                  className={`w-5 h-5 transition-transform group-hover:scale-110 flex-shrink-0 ${
                    isActive ? 'text-amber-500 dark:text-amber-400' : 'text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200'
                  }`}
                />
                {!sidebarCollapsed && (
                  <span className="text-sm tracking-tight truncate font-medium">
                    {item.label}
                  </span>
                )}
              </div>

              {!sidebarCollapsed && (
                <div className="flex items-center space-x-1.5">
                  {item.badge && (
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        item.badgeColor
                          ? item.badgeColor
                          : isActive
                          ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                          : 'bg-slate-200/70 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <ChevronRight className="w-4 h-4 text-amber-500 opacity-80" />
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Card */}
      {!sidebarCollapsed && (
        <div className="p-4 m-3 rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-amber-200/60 dark:border-slate-800/80 space-y-2.5 shadow-sm">
          {userRole === 'client' ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                <span className="flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 text-amber-500" /> Concierge Hotline
                </span>
                <span className="text-emerald-500 text-[10px]">24/7 Live</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                Dial Ext. 001 or tap "My Stay" to request private dining, yacht charters, or spa.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Sparkle className="w-3.5 h-3.5 text-amber-500" /> Live Occupancy
                </span>
                <span className="font-stat font-bold text-amber-600 dark:text-amber-400">{occupancyRate}%</span>
              </div>

              <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${occupancyRate}%` }}
                ></div>
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {occupiedRoomsCount} of {rooms.length} Suites Occupied
              </p>
            </>
          )}
        </div>
      )}
    </aside>
  );
};
