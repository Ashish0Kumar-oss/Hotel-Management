import React, { createContext, useContext, useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Room, Booking, Guest, HousekeepingTask, PaymentTransaction, Review, 
  HotelNotification, RoomStatus, BookingStatus, HousekeepingColumn,
  UserRole, ServiceRequest
} from '../types';
import { 
  INITIAL_ROOMS, INITIAL_BOOKINGS, INITIAL_GUESTS, 
  INITIAL_HOUSEKEEPING, INITIAL_PAYMENTS, INITIAL_REVIEWS, INITIAL_NOTIFICATIONS,
  INITIAL_SERVICE_REQUESTS
} from '../data/mockData';

interface HotelContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  rooms: Room[];
  bookings: Booking[];
  guests: Guest[];
  housekeeping: HousekeepingTask[];
  payments: PaymentTransaction[];
  notifications: HotelNotification[];
  reviews: Review[];
  serviceRequests: ServiceRequest[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (open: boolean) => void;
  selectedRoomForBooking: Room | null;
  setSelectedRoomForBooking: (room: Room | null) => void;
  selectedRoomForView: Room | null;
  setSelectedRoomForView: (room: Room | null) => void;
  selectedInvoice: PaymentTransaction | null;
  setSelectedInvoice: (invoice: PaymentTransaction | null) => void;
  
  // Actions
  addBooking: (bookingData: Partial<Booking>) => void;
  updateBookingStatus: (bookingId: string, status: BookingStatus) => void;
  updateRoomStatus: (roomId: string, status: RoomStatus) => void;
  updateHousekeepingStatus: (taskId: string, status: HousekeepingColumn) => void;
  addPayment: (payment: Partial<PaymentTransaction>) => void;
  addServiceRequest: (request: Partial<ServiceRequest>) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  triggerConfetti: () => void;
}

const HotelContext = createContext<HotelContextType | undefined>(undefined);

export const HotelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>('client');
  const [activeTab, setActiveTab] = useState<string>('client-facilities');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [rooms, setRooms] = useState<Room[]>(INITIAL_ROOMS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [guests] = useState<Guest[]>(INITIAL_GUESTS);
  const [housekeeping, setHousekeeping] = useState<HousekeepingTask[]>(INITIAL_HOUSEKEEPING);
  const [payments, setPayments] = useState<PaymentTransaction[]>(INITIAL_PAYMENTS);
  const [notifications, setNotifications] = useState<HotelNotification[]>(INITIAL_NOTIFICATIONS);
  const [reviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>(INITIAL_SERVICE_REQUESTS);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<Room | null>(null);
  const [selectedRoomForView, setSelectedRoomForView] = useState<Room | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<PaymentTransaction | null>(null);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#0F172A', '#10B981', '#EF4444', '#3B82F6']
      });
    } catch (e) {
      console.warn('Confetti effect failed:', e);
    }
  };

  const addBooking = (bookingData: Partial<Booking>) => {
    const newRef = `AUR-${Math.floor(10000 + Math.random() * 90000)}`;
    const newBooking: Booking = {
      id: `bk-${Date.now()}`,
      bookingRef: newRef,
      guestId: bookingData.guestId || 'gst-new',
      guestName: bookingData.guestName || 'Guest User',
      guestEmail: bookingData.guestEmail || 'guest@auraresort.com',
      guestPhone: bookingData.guestPhone || '+1 (555) 000-0000',
      guestAvatar: bookingData.guestAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      vipTier: bookingData.vipTier || 'Standard',
      roomId: bookingData.roomId || 'room-101',
      roomNumber: bookingData.roomNumber || '101',
      roomType: bookingData.roomType || 'Maharaja Suite',
      checkInDate: bookingData.checkInDate || new Date().toISOString().split('T')[0],
      checkOutDate: bookingData.checkOutDate || new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      nights: bookingData.nights || 3,
      guestsCount: bookingData.guestsCount || { adults: 2, children: 0 },
      totalAmount: bookingData.totalAmount || 2500,
      paidAmount: bookingData.paidAmount || 2500,
      paymentStatus: bookingData.paymentStatus || 'Paid',
      status: bookingData.status || 'Confirmed',
      specialRequests: bookingData.specialRequests || '',
      addOnServices: bookingData.addOnServices || [],
      createdAt: new Date().toISOString().split('T')[0]
    };

    setBookings(prev => [newBooking, ...prev]);

    // Update room status to occupied if confirmed or checked-in
    if (newBooking.status === 'Checked-in') {
      updateRoomStatus(newBooking.roomId, 'Occupied');
    }

    // Add notification
    const newNotif: HotelNotification = {
      id: `notif-${Date.now()}`,
      title: 'New Reservation Created',
      message: `Booking ${newRef} for ${newBooking.guestName} (${newBooking.roomType})`,
      time: 'Just now',
      type: 'booking',
      read: false,
      priority: newBooking.vipTier === 'Diamond' ? 'high' : 'normal'
    };
    setNotifications(prev => [newNotif, ...prev]);
    triggerConfetti();
  };

  const updateBookingStatus = (bookingId: string, status: BookingStatus) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        const updated = { ...b, status };
        // Sync room state
        if (status === 'Checked-in') {
          updateRoomStatus(b.roomId, 'Occupied');
        } else if (status === 'Checked-out') {
          updateRoomStatus(b.roomId, 'Cleaning');
          // Add housekeeping task automatically
          setHousekeeping(hPrev => [
            {
              id: `hk-${Date.now()}`,
              roomId: b.roomId,
              roomNumber: b.roomNumber,
              roomType: b.roomType,
              floor: 1,
              assignedStaff: { name: 'Maria Santos', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80' },
              priority: b.vipTier === 'Diamond' ? 'High' : 'Normal',
              status: 'Dirty',
              estimatedMinutes: 40,
              specialNotes: `Check-out inspection and cleaning for ${b.guestName}.`,
              updatedAt: 'Just now'
            },
            ...hPrev
          ]);
        }
        return updated;
      }
      return b;
    }));
  };

  const updateRoomStatus = (roomId: string, status: RoomStatus) => {
    setRooms(prev => prev.map(r => r.id === roomId ? { ...r, status } : r));
  };

  const updateHousekeepingStatus = (taskId: string, status: HousekeepingColumn) => {
    setHousekeeping(prev => prev.map(t => {
      if (t.id === taskId) {
        // If ready, optionally set room status to Available
        if (status === 'Ready') {
          updateRoomStatus(t.roomId, 'Available');
          triggerConfetti();
        } else if (status === 'Cleaning') {
          updateRoomStatus(t.roomId, 'Cleaning');
        }
        return { ...t, status, updatedAt: 'Just now' };
      }
      return t;
    }));
  };

  const addPayment = (paymentData: Partial<PaymentTransaction>) => {
    const newTx: PaymentTransaction = {
      id: `tx-${Date.now()}`,
      transactionRef: `PAY-${Math.floor(10000 + Math.random() * 90000)}`,
      bookingRef: paymentData.bookingRef || 'AUR-GENERAL',
      guestName: paymentData.guestName || 'Guest User',
      amount: paymentData.amount || 500,
      method: paymentData.method || 'Credit Card',
      status: paymentData.status || 'Completed',
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      cardLast4: paymentData.cardLast4 || '4242',
      invoiceUrl: '#'
    };
    setPayments(prev => [newTx, ...prev]);

    const notif: HotelNotification = {
      id: `notif-${Date.now()}`,
      title: 'Payment Received',
      message: `₹${newTx.amount.toLocaleString('en-IN')} received via ${newTx.method} from ${newTx.guestName}.`,
      time: 'Just now',
      type: 'payment',
      read: false
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const addServiceRequest = (request: Partial<ServiceRequest>) => {
    const newReq: ServiceRequest = {
      id: `sr-${Date.now()}`,
      serviceType: request.serviceType || 'Room Service',
      roomNumber: request.roomNumber || '204',
      timeRequested: 'Just now',
      status: 'Received',
      notes: request.notes || ''
    };
    setServiceRequests(prev => [newReq, ...prev]);

    const notif: HotelNotification = {
      id: `notif-${Date.now()}`,
      title: 'Guest Service Request',
      message: `${newReq.serviceType} requested for Suite ${newReq.roomNumber}.`,
      time: 'Just now',
      type: 'guest_request',
      read: false,
      priority: 'high'
    };
    setNotifications(prev => [notif, ...prev]);
    triggerConfetti();
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <HotelContext.Provider value={{
      userRole,
      setUserRole,
      activeTab,
      setActiveTab,
      sidebarCollapsed,
      setSidebarCollapsed,
      rooms,
      bookings,
      guests,
      housekeeping,
      payments,
      notifications,
      reviews,
      serviceRequests,
      searchQuery,
      setSearchQuery,
      isSearchOpen,
      setIsSearchOpen,
      isBookingModalOpen,
      setIsBookingModalOpen,
      selectedRoomForBooking,
      setSelectedRoomForBooking,
      selectedRoomForView,
      setSelectedRoomForView,
      selectedInvoice,
      setSelectedInvoice,
      addBooking,
      updateBookingStatus,
      updateRoomStatus,
      updateHousekeepingStatus,
      addPayment,
      addServiceRequest,
      markNotificationAsRead,
      markAllNotificationsAsRead,
      triggerConfetti
    }}>
      {children}
    </HotelContext.Provider>
  );
};

export const useHotel = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
};
