import React, { useState } from 'react';
import { 
  Search, Bell, Sun, Moon, Plus, Crown, ChevronDown, PanelLeftClose, PanelLeft, 
  Settings, User, LogOut, UserCheck, ShieldCheck, Heart, Sparkles, BedDouble
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { useTheme } from '../../context/ThemeContext';

export const Header: React.FC = () => {
  const { 
    userRole,
    setUserRole,
    activeTab,
    setActiveTab,
    notifications, 
    markAllNotificationsAsRead, 
    setIsSearchOpen, 
    setIsBookingModalOpen,
    sidebarCollapsed,
    setSidebarCollapsed
  } = useHotel();
  const { darkMode, toggleDarkMode } = useTheme();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleToggleRole = () => {
    if (userRole === 'client') {
      setUserRole('staff');
      setActiveTab('dashboard');
    } else {
      setUserRole('client');
      setActiveTab('client-facilities');
    }
  };

  return (
    <header className="sticky top-0 z-30 h-20 px-4 sm:px-8 glass-nav backdrop-blur-md flex items-center justify-between transition-all">
      {/* Left side: Mobile menu toggle + Page Indicator */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setSidebarCollapsed(prev => !prev)}
          className="p-2.5 rounded-xl hover:bg-slate-200/60 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
          title="Toggle Sidebar"
          id="btn-sidebar-toggle"
        >
          {sidebarCollapsed ? <PanelLeft className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
        </button>

        <div className="hidden sm:flex items-center space-x-2 text-xs font-medium tracking-wide text-slate-500 dark:text-slate-400">
          <span className="flex items-center text-amber-600 dark:text-amber-400 font-semibold gap-1 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
            <Crown className="w-3.5 h-3.5 fill-amber-500" /> 5-Star Royal Heritage
          </span>
          <span>•</span>
          <span className="text-slate-800 dark:text-slate-200 font-bold">Aura Palace & Haveli Resort, Udaipur</span>
        </div>
      </div>

      {/* Middle: Quick Search Trigger */}
      <div className="flex-1 max-w-md mx-4">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="w-full h-11 px-4 rounded-full bg-white/80 dark:bg-slate-900/80 border border-amber-200/80 dark:border-slate-800/80 text-slate-500 dark:text-slate-400 hover:border-amber-500/50 dark:hover:border-amber-500/40 transition-all flex items-center justify-between text-sm group shadow-sm"
          id="btn-global-search-trigger"
        >
          <div className="flex items-center space-x-2.5">
            <Search className="w-4 h-4 text-slate-400 group-hover:text-amber-500 transition-colors" />
            <span className="hidden md:inline">
              {userRole === 'client' ? 'Search suites, dining, spa...' : 'Search rooms, guests, bookings...'}
            </span>
            <span className="md:hidden">Search...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right side: Role Mode Toggle, Actions, Theme, Notifications, Profile */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Role Mode Switcher Pill */}
        <button
          onClick={handleToggleRole}
          className={`h-10 px-3.5 rounded-full text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer border shadow-sm ${
            userRole === 'client'
              ? 'bg-gradient-to-r from-amber-500/15 via-amber-500/25 to-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
              : 'bg-slate-900 text-amber-400 border-amber-500/50 hover:bg-slate-800'
          }`}
          title="Switch between Guest Portal and Staff Management Portal"
          id="btn-toggle-user-role"
        >
          {userRole === 'client' ? (
            <>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden md:inline">Guest View</span>
              <span className="text-[10px] bg-amber-500 text-slate-950 px-1.5 py-0.5 rounded-full font-extrabold uppercase">Switch to Staff</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">Staff Portal</span>
              <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded-full font-bold uppercase">Switch to Guest</span>
            </>
          )}
        </button>

        {/* CTA Button */}
        <button
          onClick={() => setIsBookingModalOpen(true)}
          className="h-10 px-3.5 sm:px-4 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold text-xs flex items-center space-x-1.5 shadow-md shadow-red-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          id="btn-header-new-booking"
        >
          <Plus className="w-3.5 h-3.5 stroke-[3]" />
          <span className="hidden sm:inline">
            {userRole === 'client' ? 'Reserve Suite' : 'New Booking'}
          </span>
        </button>

        {/* Dark/Light Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-slate-200/60 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          id="btn-theme-toggle"
        >
          {darkMode ? (
            <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
          ) : (
            <Moon className="w-4 h-4 text-slate-700 hover:-rotate-12 transition-transform" />
          )}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsNotifOpen(prev => !prev)}
            className="p-2 rounded-full hover:bg-slate-200/60 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 transition-colors relative cursor-pointer"
            id="btn-notifications-toggle"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse shadow-sm">
                {unreadCount}
              </span>
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800 shadow-2xl p-4 text-slate-900 dark:text-slate-100 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-800">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-sm font-heading">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs px-2 py-0.5 rounded-full font-medium">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="text-xs text-amber-600 dark:text-amber-400 hover:underline font-medium cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="mt-3 space-y-2.5 max-h-80 overflow-y-auto pr-1">
                {notifications.length === 0 ? (
                  <p className="text-center py-6 text-sm text-slate-400">No new notifications</p>
                ) : (
                  notifications.slice(0, 5).map(n => (
                    <div
                      key={n.id}
                      className={`p-3 rounded-xl border text-xs transition-colors ${
                        n.read
                          ? 'bg-slate-50/50 dark:bg-slate-900/30 border-slate-200/40 dark:border-slate-800/40'
                          : 'bg-amber-500/5 dark:bg-amber-500/10 border-amber-500/30'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{n.title}</span>
                        <span className="text-[10px] text-slate-400">{n.time}</span>
                      </div>
                      <p className="mt-1 text-slate-600 dark:text-slate-300 leading-relaxed">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(prev => !prev)}
            className="flex items-center space-x-2 p-1 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
            id="btn-user-profile-menu"
          >
            <div className="relative">
              <img
                src={userRole === 'client' 
                  ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                  : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                }
                alt="Avatar"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-amber-500/50 shadow-sm"
              />
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-slate-950"></span>
            </div>
            <div className="hidden lg:block text-left pr-1">
              <div className="text-xs font-bold font-heading text-slate-800 dark:text-slate-100 leading-tight">
                {userRole === 'client' ? 'Lady Eleanor Vance' : 'Alexander Vance'}
              </div>
              <div className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">
                {userRole === 'client' ? 'Diamond VIP Guest' : 'General Manager'}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-56 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800 shadow-2xl py-2 text-slate-800 dark:text-slate-200 z-50 animate-in fade-in duration-150">
              <div className="px-4 py-2 border-b border-slate-200/60 dark:border-slate-800">
                <p className="text-xs font-bold font-heading">
                  {userRole === 'client' ? 'Lady Eleanor Vance' : 'Alexander Vance'}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {userRole === 'client' ? 'e.vance@vanceholdings.com' : 'a.vance@auraresort.com'}
                </p>
              </div>

              <div className="py-1">
                <button 
                  onClick={handleToggleRole}
                  className="w-full text-left px-4 py-2 text-xs hover:bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center space-x-2 font-semibold cursor-pointer"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Switch to {userRole === 'client' ? 'Manager Portal' : 'Guest Portal'}</span>
                </button>
              </div>

              <div className="border-t border-slate-200/60 dark:border-slate-800 pt-1">
                <button className="w-full text-left px-4 py-2 text-xs text-red-600 dark:text-red-400 hover:bg-red-500/10 flex items-center space-x-2 font-medium cursor-pointer">
                  <LogOut className="w-4 h-4" />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
