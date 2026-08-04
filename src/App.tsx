import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { HotelProvider, useHotel } from './context/HotelContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { LandingDashboard } from './components/dashboard/LandingDashboard';
import { RoomManagement } from './components/rooms/RoomManagement';
import { RoomDetailModal } from './components/rooms/RoomDetailModal';
import { BookingManagement } from './components/bookings/BookingManagement';
import { MultiStepBookingModal } from './components/bookings/MultiStepBookingModal';
import { CheckInDesk } from './components/checkin/CheckInDesk';
import { HousekeepingKanban } from './components/housekeeping/HousekeepingKanban';
import { PaymentCenter } from './components/payments/PaymentCenter';
import { InvoiceModal } from './components/payments/InvoiceModal';
import { GuestCRM } from './components/guests/GuestCRM';
import { ReviewsDashboard } from './components/reviews/ReviewsDashboard';
import { AnalyticsDashboard } from './components/analytics/AnalyticsDashboard';
import { HotelCalendar } from './components/calendar/HotelCalendar';
import { SettingsPage } from './components/settings/SettingsPage';
import { ClientPortal } from './components/client/ClientPortal';

const MainLayout: React.FC = () => {
  const { userRole, activeTab, sidebarCollapsed } = useHotel();

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#030712] text-slate-900 dark:text-slate-100 flex transition-colors duration-300">
      {/* Collapsible Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'pl-20' : 'pl-20 sm:pl-64 lg:pl-72'}`}>
        {/* Sticky Header */}
        <Header />

        {/* Viewport View Handler */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {/* Client Portal Views */}
          {(userRole === 'client' || activeTab.startsWith('client')) && (
            <ClientPortal />
          )}

          {/* Staff Manager Views */}
          {userRole === 'staff' && !activeTab.startsWith('client') && (
            <>
              {activeTab === 'dashboard' && <LandingDashboard />}
              {activeTab === 'rooms' && <RoomManagement />}
              {activeTab === 'bookings' && <BookingManagement />}
              {activeTab === 'checkin' && <CheckInDesk />}
              {activeTab === 'housekeeping' && <HousekeepingKanban />}
              {activeTab === 'payments' && <PaymentCenter />}
              {activeTab === 'guests' && <GuestCRM />}
              {activeTab === 'reviews' && <ReviewsDashboard />}
              {activeTab === 'reports' && <AnalyticsDashboard />}
              {activeTab === 'calendar' && <HotelCalendar />}
              {activeTab === 'settings' && <SettingsPage />}
            </>
          )}
        </main>
      </div>

      {/* Global Modals */}
      <GlobalSearchModal />
      <MultiStepBookingModal />
      <RoomDetailModal />
      <InvoiceModal />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <HotelProvider>
        <MainLayout />
      </HotelProvider>
    </ThemeProvider>
  );
}
