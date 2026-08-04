export type UserRole = 'client' | 'staff';

export type RoomStatus = 'Available' | 'Occupied' | 'Cleaning' | 'Maintenance';
export type RoomType = 'Maharaja Suite' | 'Maharani Lake Suite' | 'Royal Peacock Villa' | 'Heritage Haveli Suite' | 'Palace Deluxe Room' | 'Royal Executive Room';

export interface Room {
  id: string;
  number: string;
  floor: number;
  type: RoomType;
  pricePerNight: number;
  status: RoomStatus;
  maxOccupancy: number;
  sizeSqFt: number;
  bedType: string;
  view: string;
  images: string[];
  amenities: string[];
  rating: number;
  reviewCount: number;
  description: string;
}

export interface ResortFacility {
  id: string;
  title: string;
  category: 'Wellness & Spa' | 'Gastronomy' | 'Recreation' | 'Exclusive Services';
  image: string;
  hours: string;
  location: string;
  description: string;
  features: string[];
  rating: number;
}

export interface DiningVenue {
  id: string;
  name: string;
  cuisine: string;
  michelins?: number;
  image: string;
  hours: string;
  dressCode: string;
  description: string;
  signatureDish: string;
}

export interface SpaTreatment {
  id: string;
  title: string;
  duration: string;
  price: number;
  image: string;
  description: string;
  benefits: string[];
}

export interface ServiceRequest {
  id: string;
  serviceType: string;
  roomNumber: string;
  timeRequested: string;
  status: 'Received' | 'In Progress' | 'Delivered';
  notes?: string;
}

export type BookingStatus = 'Confirmed' | 'Checked-in' | 'Checked-out' | 'Cancelled' | 'Pending';

export interface Booking {
  id: string;
  bookingRef: string;
  guestId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestAvatar: string;
  vipTier: 'Diamond' | 'Platinum' | 'Gold' | 'Standard';
  roomId: string;
  roomNumber: string;
  roomType: RoomType;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  guestsCount: { adults: number; children: number };
  totalAmount: number;
  paidAmount: number;
  paymentStatus: 'Paid' | 'Partial' | 'Pending' | 'Refunded';
  status: BookingStatus;
  specialRequests?: string;
  addOnServices: string[];
  createdAt: string;
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  country: string;
  membershipTier: 'Diamond VIP' | 'Platinum' | 'Gold Elite' | 'Member';
  totalStays: number;
  totalSpent: number;
  loyaltyPoints: number;
  favoriteRoomType: string;
  preferences: string[];
  lastStay: string;
  notes: string;
  status: 'Active' | 'VIP' | 'Blacklisted';
}

export type HousekeepingPriority = 'High' | 'Normal' | 'Low';
export type HousekeepingColumn = 'Dirty' | 'Cleaning' | 'Inspection' | 'Ready';

export interface HousekeepingTask {
  id: string;
  roomId: string;
  roomNumber: string;
  roomType: RoomType;
  floor: number;
  assignedStaff: { name: string; avatar: string };
  priority: HousekeepingPriority;
  status: HousekeepingColumn;
  estimatedMinutes: number;
  specialNotes?: string;
  updatedAt: string;
}

export interface PaymentTransaction {
  id: string;
  transactionRef: string;
  bookingRef: string;
  guestName: string;
  amount: number;
  method: 'Credit Card' | 'Debit Card' | 'UPI / QR' | 'Net Banking' | 'Apple Pay' | 'Wire Transfer';
  status: 'Completed' | 'Processing' | 'Failed' | 'Refunded';
  date: string;
  cardLast4?: string;
  invoiceUrl?: string;
}

export interface Review {
  id: string;
  guestName: string;
  guestAvatar: string;
  roomType: string;
  rating: number;
  categories: {
    cleanliness: number;
    amenities: number;
    service: number;
    location: number;
  };
  comment: string;
  date: string;
  response?: string;
}

export interface HotelNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'booking' | 'housekeeping' | 'payment' | 'guest_request' | 'system';
  read: boolean;
  priority?: 'high' | 'normal';
}

export interface RevenueDataPoint {
  month: string;
  revenue: number;
  target: number;
  occupancyRate: number;
  adr: number; // Average Daily Rate
}

export interface RoomPerformanceData {
  type: string;
  bookedDays: number;
  revenue: number;
  occupancyPercent: number;
}
