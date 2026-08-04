import React, { useState } from 'react';
import { 
  Settings, Building2, Percent, CreditCard, ShieldCheck, 
  Database, Bell, Globe, Save, CheckCircle2, Moon, Sun
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useHotel } from '../../context/HotelContext';

export const SettingsPage: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { triggerConfetti } = useHotel();
  const [activeTab, setActiveTab] = useState('hotel');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Settings State
  const [hotelName, setHotelName] = useState('Aura Grand Resort & Spa');
  const [currency, setCurrency] = useState('USD ($)');
  const [resortTaxRate, setResortTaxRate] = useState('12%');
  const [autoBackup, setAutoBackup] = useState(true);
  const [pciCompliance, setPciCompliance] = useState(true);

  const handleSave = () => {
    setSavedSuccess(true);
    triggerConfetti();
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <Settings className="w-7 h-7 text-amber-500" />
            Resort Settings & System Administration
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Configure property metadata, financial tax rules, gateway merchant API keys, and staff roles.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="h-11 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center space-x-2 transition-all cursor-pointer self-start md:self-auto"
        >
          {savedSuccess ? <CheckCircle2 className="w-4 h-4 text-slate-950" /> : <Save className="w-4 h-4" />}
          <span>{savedSuccess ? 'Settings Saved!' : 'Save Configuration'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation Tabs */}
        <div className="glass-card rounded-3xl p-3 border border-slate-200/80 dark:border-slate-800 space-y-1">
          {[
            { id: 'hotel', label: 'Hotel Information', icon: Building2 },
            { id: 'taxes', label: 'Taxes & Currency', icon: Percent },
            { id: 'gateway', label: 'Payment Gateway', icon: CreditCard },
            { id: 'security', label: 'Security & Backup', icon: ShieldCheck },
            { id: 'theme', label: 'Appearance & Theme', icon: Moon }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full px-4 py-3 rounded-2xl text-xs font-bold flex items-center space-x-3 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Settings Form Panel */}
        <div className="lg:col-span-3 glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 space-y-6">
          {activeTab === 'hotel' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold font-heading">Hotel Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">Resort Name</label>
                  <input
                    type="text"
                    value={hotelName}
                    onChange={e => setHotelName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">Primary Star Rating</label>
                  <input
                    type="text"
                    value="5-Star Luxury Resort & Spa"
                    disabled
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-200/60 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700 text-sm font-semibold text-amber-500"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'taxes' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold font-heading">Financial Rules & Taxes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">Base Currency</label>
                  <select
                    value={currency}
                    onChange={e => setCurrency(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-semibold"
                  >
                    <option value="USD ($)">USD ($) - United States Dollar</option>
                    <option value="EUR (€)">EUR (€) - Euro</option>
                    <option value="GBP (£)">GBP (£) - British Pound</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">State Tourism Tax Rate</label>
                  <input
                    type="text"
                    value={resortTaxRate}
                    onChange={e => setResortTaxRate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-semibold"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'theme' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold font-heading">Appearance & Interface Modes</h2>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center space-x-3">
                  {darkMode ? <Moon className="w-6 h-6 text-amber-400" /> : <Sun className="w-6 h-6 text-amber-500" />}
                  <div>
                    <h3 className="font-bold text-sm">{darkMode ? 'Dark Mode Active' : 'Light Mode Active'}</h3>
                    <p className="text-xs text-slate-500">Ultra-modern glassmorphism UI theme</p>
                  </div>
                </div>

                <button
                  onClick={toggleDarkMode}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                >
                  Toggle Theme
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold font-heading">Security & Automated Cloud Backups</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div>
                    <h3 className="font-bold text-sm">Automated Hourly Cloud Backup</h3>
                    <p className="text-xs text-slate-500">Encrypt and mirror reservations database every 60 minutes</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={autoBackup}
                    onChange={e => setAutoBackup(e.target.checked)}
                    className="w-5 h-5 accent-amber-500 rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div>
                    <h3 className="font-bold text-sm">PCI-DSS Level 1 Encryption Shield</h3>
                    <p className="text-xs text-slate-500">Bank-grade card vaulting & tokenization</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={pciCompliance}
                    onChange={e => setPciCompliance(e.target.checked)}
                    className="w-5 h-5 accent-amber-500 rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'gateway' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold font-heading">Merchant Payment Gateways</h2>
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm">Stripe / Apple Pay Integration</span>
                    <span className="text-xs font-bold text-emerald-500">CONNECTED</span>
                  </div>
                  <input
                    type="password"
                    value="sk_live_9812398129381923"
                    disabled
                    className="w-full px-3 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
