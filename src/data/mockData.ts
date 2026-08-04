import { 
  Room, Booking, Guest, HousekeepingTask, PaymentTransaction, Review, 
  HotelNotification, RevenueDataPoint, RoomPerformanceData,
  ResortFacility, DiningVenue, SpaTreatment, ServiceRequest
} from '../types';

export const INITIAL_ROOMS: Room[] = [
  {
    id: 'room-101',
    number: '101',
    floor: 1,
    type: 'Maharaja Suite',
    pricePerNight: 185000,
    status: 'Available',
    maxOccupancy: 4,
    sizeSqFt: 2450,
    bedType: 'Emperor Royal Canopy King',
    view: 'Panoramic Lake Pichola & City Palace',
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Private Heated Plunge Pool', '24/7 Royal Khansama & Butler', 'Jharokha Balcony', 'Sandalwood & Gold Bathroom', 'Bespoke Sitar Audio', 'Complimentary Saffron Kahwa & Sweets'],
    rating: 4.99,
    reviewCount: 58,
    description: 'The crowning jewel of the palace. Features a private marble Jharokha, heated infinity plunge pool overlooking Lake Pichola, dedicated 24/7 personal khansama butler, and antique Rajasthani teakwood carving.'
  },
  {
    id: 'room-204',
    number: '204',
    floor: 2,
    type: 'Maharani Lake Suite',
    pricePerNight: 125000,
    status: 'Occupied',
    maxOccupancy: 4,
    sizeSqFt: 1850,
    bedType: '2x Royal Canopy King Beds',
    view: 'Lake Pichola & Sunset Courtyard',
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Private Royal Dining Room', 'Jacuzzi with Rose Petals', 'In-Suite Ayurvedic Massage Table', 'Vintage Silver Tea Service', 'Private Helipad / Rolls-Royce Transfer'],
    rating: 5.0,
    reviewCount: 44,
    description: 'Elegantly decorated with hand-painted gold leaf murals, brass chandeliers, and sprawling marble bath. Includes private dining hall for 8 guests and dedicated evening Diya lighting ritual.'
  },
  {
    id: 'room-305',
    number: '305',
    floor: 3,
    type: 'Royal Peacock Villa',
    pricePerNight: 85000,
    status: 'Available',
    maxOccupancy: 3,
    sizeSqFt: 1400,
    bedType: 'Super King Heritage Bed',
    view: 'Private Peacock Courtyard & Lotus Pond',
    images: [
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Outdoor Sunken Stone Tub', 'Private Botanical Garden', 'Organic Kumkumadi Toiletries', 'High-Speed Wi-Fi 6', 'Dyson Airwrap Suite'],
    rating: 4.95,
    reviewCount: 72,
    description: 'A serene sanctuary featuring private lily ponds where royal peacocks stroll at dawn. Includes hand-carved stone bath and daybed under bougainvillea.'
  },
  {
    id: 'room-112',
    number: '112',
    floor: 1,
    type: 'Heritage Haveli Suite',
    pricePerNight: 55000,
    status: 'Cleaning',
    maxOccupancy: 4,
    sizeSqFt: 1100,
    bedType: 'Royal Four-Poster Bed',
    view: 'Heritage Palace Fountain & Courtyard',
    images: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Private Courtyard Terrace', 'Marble Rain Shower', 'Hand-woven Silk Bedding', 'Ayurvedic Herbal Tea Station', 'Custom Pillow & Jasmine Menu'],
    rating: 4.92,
    reviewCount: 61,
    description: 'Authentic 18th-century Haveli architecture featuring intricate Jali lattice work, velvet daybeds, and private fountain courtyard.'
  },
  {
    id: 'room-402',
    number: '402',
    floor: 4,
    type: 'Palace Deluxe Room',
    pricePerNight: 35000,
    status: 'Occupied',
    maxOccupancy: 2,
    sizeSqFt: 750,
    bedType: 'California King',
    view: 'Aravalli Hills & Sunset Skyline',
    images: [
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Smart Room Controls', 'Pillow & Aroma Menu', 'Plush Bathrobes & Slippers', 'Minibar with Indian Artisanal Drinks', 'Harman Kardon Speakers'],
    rating: 4.88,
    reviewCount: 94,
    description: 'Charming palace room combining royal warm gold decor with modern touch controls, copper water carafes, and private sunset terrace.'
  },
  {
    id: 'room-215',
    number: '215',
    floor: 2,
    type: 'Royal Executive Room',
    pricePerNight: 25000,
    status: 'Maintenance',
    maxOccupancy: 2,
    sizeSqFt: 620,
    bedType: 'King Bed',
    view: 'Royal Gardens & Sitar Pavilion',
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Ergonomic Teak Work Desk', 'High-Speed Wi-Fi', 'Wireless Charging Pad', 'Nespresso & Masala Chai Station', 'Marble Vanity'],
    rating: 4.84,
    reviewCount: 39,
    description: 'Designed for modern executives seeking royal tranquility. Features solid carved teak desk, acoustic soundproofing, and peaceful courtyard views.'
  },
  {
    id: 'room-308',
    number: '308',
    floor: 3,
    type: 'Heritage Haveli Suite',
    pricePerNight: 58000,
    status: 'Available',
    maxOccupancy: 3,
    sizeSqFt: 1050,
    bedType: 'King Bed',
    view: 'Stepwell Pool & Palm Promenade',
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Poolside Access', 'Private Balcony', 'Jacuzzi Bath', 'Welcome Fresh Dry Fruits & Sweets Basket', 'Smart TV 65"'],
    rating: 4.91,
    reviewCount: 52,
    description: 'Spacious upper-floor Haveli suite overlooking the illuminated stepwell infinity pool and evening live sitar recitals.'
  },
  {
    id: 'room-501',
    number: '501',
    floor: 5,
    type: 'Maharaja Suite',
    pricePerNight: 195000,
    status: 'Available',
    maxOccupancy: 4,
    sizeSqFt: 2600,
    bedType: 'Emperor Royal Canopy King',
    view: '360° Sky & Royal Lake Panorama',
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['Private Royal Chef on Call', 'Astronomy Telescope Suite', 'Bespoke Vintage Wine Cabinet', 'Private Ayurvedic Steam Sauna', 'Helipad Access'],
    rating: 4.99,
    reviewCount: 33,
    description: 'The highest point in the resort tower. Offers 360-degree views of Udaipur lakes and fortresses, private astronomy telescope, and private royal dining deck.'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk-1001',
    bookingRef: 'AUR-IN-88291',
    guestId: 'gst-01',
    guestName: 'Lady Eleanor Vance',
    guestEmail: 'e.vance@vanceholdings.com',
    guestPhone: '+91 98200 12345',
    guestAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    vipTier: 'Diamond',
    roomId: 'room-204',
    roomNumber: '204',
    roomType: 'Maharani Lake Suite',
    checkInDate: '2026-08-03',
    checkOutDate: '2026-08-08',
    nights: 5,
    guestsCount: { adults: 2, children: 1 },
    totalAmount: 625000,
    paidAmount: 625000,
    paymentStatus: 'Paid',
    status: 'Checked-in',
    specialRequests: 'Chilled Royal Champagne and Fresh Marigold Garland upon arrival. High floor lake view preferred. Organic Ayurvedic breakfast.',
    addOnServices: ['Vintage Rolls-Royce Transfer', 'Private Butler Service', 'Royal 24k Gold Thali Experience'],
    createdAt: '2026-07-20'
  },
  {
    id: 'bk-1002',
    bookingRef: 'AUR-IN-88292',
    guestId: 'gst-02',
    guestName: 'Maharaja Vikramaditya Singh',
    guestEmail: 'vikramaditya@royalheritage.in',
    guestPhone: '+91 98111 99887',
    guestAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    vipTier: 'Diamond',
    roomId: 'room-101',
    roomNumber: '101',
    roomType: 'Maharaja Suite',
    checkInDate: '2026-08-04',
    checkOutDate: '2026-08-10',
    nights: 6,
    guestsCount: { adults: 2, children: 0 },
    totalAmount: 1110000,
    paidAmount: 1110000,
    paymentStatus: 'Paid',
    status: 'Confirmed',
    specialRequests: 'Private Helipad landing confirmation. Evening Pandit Ji Puja arrangement in suite.',
    addOnServices: ['Helicopter Airport Escort', 'Ayurvedic Shirodhara Spa Package'],
    createdAt: '2026-07-28'
  },
  {
    id: 'bk-1003',
    bookingRef: 'AUR-IN-88293',
    guestId: 'gst-03',
    guestName: 'Ananya & Rohan Singhania',
    guestEmail: 'ananya.s@singhania-group.com',
    guestPhone: '+91 99300 44112',
    guestAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    vipTier: 'Platinum',
    roomId: 'room-402',
    roomNumber: '402',
    roomType: 'Palace Deluxe Room',
    checkInDate: '2026-08-02',
    checkOutDate: '2026-08-05',
    nights: 3,
    guestsCount: { adults: 2, children: 0 },
    totalAmount: 105000,
    paidAmount: 105000,
    paymentStatus: 'Paid',
    status: 'Checked-in',
    specialRequests: 'Anniversary cake setup with live Sitar recital on balcony.',
    addOnServices: ['Executive Lounge Access', 'Couples Kumkumadi Spa'],
    createdAt: '2026-07-25'
  },
  {
    id: 'bk-1004',
    bookingRef: 'AUR-IN-88294',
    guestId: 'gst-04',
    guestName: 'Dr. Rajesh Kapur',
    guestEmail: 'rajesh.kapur@tech-global.in',
    guestPhone: '+91 98450 77665',
    guestAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    vipTier: 'Gold',
    roomId: 'room-305',
    roomNumber: '305',
    roomType: 'Royal Peacock Villa',
    checkInDate: '2026-08-05',
    checkOutDate: '2026-08-09',
    nights: 4,
    guestsCount: { adults: 2, children: 0 },
    totalAmount: 340000,
    paidAmount: 170000,
    paymentStatus: 'Partial',
    status: 'Confirmed',
    specialRequests: 'Late arrival at 9:30 PM. Request hot Kashmiri Kahwa tea upon arrival.',
    addOnServices: ['Ayurvedic Panchakarma Consultation'],
    createdAt: '2026-08-01'
  },
  {
    id: 'bk-1005',
    bookingRef: 'AUR-IN-88295',
    guestId: 'gst-05',
    guestName: 'Priya & Kabir Malhotra',
    guestEmail: 'priya@malhotra-studios.in',
    guestPhone: '+91 98711 22334',
    guestAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    vipTier: 'Diamond',
    roomId: 'room-112',
    roomNumber: '112',
    roomType: 'Heritage Haveli Suite',
    checkInDate: '2026-08-04',
    checkOutDate: '2026-08-07',
    nights: 3,
    guestsCount: { adults: 2, children: 2 },
    totalAmount: 165000,
    paidAmount: 165000,
    paymentStatus: 'Paid',
    status: 'Pending',
    specialRequests: 'Candlelit dinner setup in private courtyard garden with traditional Rajasthani folk music.',
    addOnServices: ['Private Butler Service', 'Royal 24k Gold Thali Experience'],
    createdAt: '2026-08-02'
  }
];

export const INITIAL_GUESTS: Guest[] = [
  {
    id: 'gst-01',
    name: 'Lady Eleanor Vance',
    email: 'e.vance@vanceholdings.com',
    phone: '+91 98200 12345',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    country: 'India / UK',
    membershipTier: 'Diamond VIP',
    totalStays: 14,
    totalSpent: 4850000,
    loyaltyPoints: 124000,
    favoriteRoomType: 'Maharani Lake Suite',
    preferences: ['Chilled Royal Champagne', 'Silk Vetiver Pillows', 'Room Temp 21°C', 'Daily Financial Express & Mint'],
    lastStay: '2026-08-03',
    notes: 'Primary investor in Vance Global. Prefers immediate check-in via royal private courtyard.',
    status: 'VIP'
  },
  {
    id: 'gst-02',
    name: 'Maharaja Vikramaditya Singh',
    email: 'vikramaditya@royalheritage.in',
    phone: '+91 98111 99887',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    country: 'India',
    membershipTier: 'Diamond VIP',
    totalStays: 9,
    totalSpent: 3620000,
    loyaltyPoints: 89500,
    favoriteRoomType: 'Maharaja Suite',
    preferences: ['Helicopter Escort', 'Saffron Kahwa at 7:00 AM', 'Vintage Cigar Lounge'],
    lastStay: '2026-06-15',
    notes: 'Royal patron. Always books private sommelier tasting and evening Sitar recital.',
    status: 'VIP'
  },
  {
    id: 'gst-03',
    name: 'Ananya & Rohan Singhania',
    email: 'ananya.s@singhania-group.com',
    phone: '+91 99300 44112',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    country: 'India',
    membershipTier: 'Platinum',
    totalStays: 6,
    totalSpent: 1840000,
    loyaltyPoints: 42100,
    favoriteRoomType: 'Palace Deluxe Room',
    preferences: ['Almond Milk Saffron Tea', 'Ergonomic Desk Chair', 'Quiet Courtyard Wing'],
    lastStay: '2026-08-02',
    notes: 'Chairperson of Singhania Group. Requires dedicated gigabit Wi-Fi line.',
    status: 'Active'
  },
  {
    id: 'gst-04',
    name: 'Dr. Rajesh Kapur',
    email: 'rajesh.kapur@tech-global.in',
    phone: '+91 98450 77665',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    country: 'India',
    membershipTier: 'Gold Elite',
    totalStays: 4,
    totalSpent: 1280000,
    loyaltyPoints: 26000,
    favoriteRoomType: 'Royal Peacock Villa',
    preferences: ['Morning Yoga Mat', 'Himalayan Mineral Water', 'High Floor View'],
    lastStay: '2026-05-18',
    notes: 'Tech founder & venture capitalist. Uses conference center for board meetings.',
    status: 'Active'
  },
  {
    id: 'gst-05',
    name: 'Priya & Kabir Malhotra',
    email: 'priya@malhotra-studios.in',
    phone: '+91 98711 22334',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    country: 'India',
    membershipTier: 'Diamond VIP',
    totalStays: 11,
    totalSpent: 4100000,
    loyaltyPoints: 105000,
    favoriteRoomType: 'Heritage Haveli Suite',
    preferences: ['Fresh White Jasmine Flowers', 'Private Ayurvedic Therapists', 'Silver Tea Set in Suite'],
    lastStay: '2026-07-04',
    notes: 'Film producer & designer. Enjoys uninterrupted afternoon tea in private pavilion.',
    status: 'VIP'
  }
];

export const INITIAL_HOUSEKEEPING: HousekeepingTask[] = [
  {
    id: 'hk-1',
    roomId: 'room-112',
    roomNumber: '112',
    roomType: 'Heritage Haveli Suite',
    floor: 1,
    assignedStaff: { name: 'Sunita Sharma', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80' },
    priority: 'High',
    status: 'Cleaning',
    estimatedMinutes: 45,
    specialNotes: 'VIP Arrival at 2:00 PM. Setup fresh marigold flower rangoli & brass lamps.',
    updatedAt: '10 mins ago'
  },
  {
    id: 'hk-2',
    roomId: 'room-215',
    roomNumber: '215',
    roomType: 'Royal Executive Room',
    floor: 2,
    assignedStaff: { name: 'Vikram Verma', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80' },
    priority: 'Normal',
    status: 'Dirty',
    estimatedMinutes: 30,
    specialNotes: 'Carpet sandalwood steam polishing required.',
    updatedAt: '25 mins ago'
  },
  {
    id: 'hk-3',
    roomId: 'room-308',
    roomNumber: '308',
    roomType: 'Heritage Haveli Suite',
    floor: 3,
    assignedStaff: { name: 'Meenakshi Patel', avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=200&q=80' },
    priority: 'High',
    status: 'Inspection',
    estimatedMinutes: 15,
    specialNotes: 'Awaiting Duty Manager sign-off for guest check-in.',
    updatedAt: '5 mins ago'
  },
  {
    id: 'hk-4',
    roomId: 'room-101',
    roomNumber: '101',
    roomType: 'Maharaja Suite',
    floor: 1,
    assignedStaff: { name: 'Sunita Sharma', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80' },
    priority: 'Low',
    status: 'Ready',
    estimatedMinutes: 0,
    specialNotes: 'Inspected and certified 5-Star Royal Standard.',
    updatedAt: '1 hour ago'
  },
  {
    id: 'hk-5',
    roomId: 'room-501',
    roomNumber: '501',
    roomType: 'Maharaja Suite',
    floor: 5,
    assignedStaff: { name: 'Meenakshi Patel', avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=200&q=80' },
    priority: 'Normal',
    status: 'Ready',
    estimatedMinutes: 0,
    specialNotes: 'Fully stocked silver tea bar and fresh silk linens.',
    updatedAt: '2 hours ago'
  }
];

export const INITIAL_PAYMENTS: PaymentTransaction[] = [
  {
    id: 'tx-901',
    transactionRef: 'PAY-AUR-88291-A',
    bookingRef: 'AUR-IN-88291',
    guestName: 'Lady Eleanor Vance',
    amount: 625000,
    method: 'UPI / QR',
    status: 'Completed',
    date: '2026-07-20 14:32',
    cardLast4: '4821',
    invoiceUrl: '#'
  },
  {
    id: 'tx-902',
    transactionRef: 'PAY-AUR-88292-A',
    bookingRef: 'AUR-IN-88292',
    guestName: 'Maharaja Vikramaditya Singh',
    amount: 1110000,
    method: 'Net Banking',
    status: 'Completed',
    date: '2026-07-28 11:15',
    invoiceUrl: '#'
  },
  {
    id: 'tx-903',
    transactionRef: 'PAY-AUR-88293-A',
    bookingRef: 'AUR-IN-88293',
    guestName: 'Ananya & Rohan Singhania',
    amount: 105000,
    method: 'Credit Card',
    status: 'Completed',
    date: '2026-07-25 09:40',
    invoiceUrl: '#'
  },
  {
    id: 'tx-904',
    transactionRef: 'PAY-AUR-88294-A',
    bookingRef: 'AUR-IN-88294',
    guestName: 'Dr. Rajesh Kapur',
    amount: 170000,
    method: 'UPI / QR',
    status: 'Completed',
    date: '2026-08-01 16:20',
    invoiceUrl: '#'
  },
  {
    id: 'tx-905',
    transactionRef: 'PAY-AUR-88295-A',
    bookingRef: 'AUR-IN-88295',
    guestName: 'Priya & Kabir Malhotra',
    amount: 165000,
    method: 'Debit Card',
    status: 'Completed',
    date: '2026-08-02 18:05',
    cardLast4: '9012',
    invoiceUrl: '#'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    guestName: 'Lady Beatrice Montgomery',
    guestAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    roomType: 'Maharani Lake Suite',
    rating: 5,
    categories: { cleanliness: 5.0, amenities: 5.0, service: 5.0, location: 5.0 },
    comment: 'An unexampled haven of royal heritage and warmth. The private Lake Pichola view, traditional Shehnai greeting, and 24k Gold Thali made our anniversary truly unforgettable. True Atithi Devo Bhava hospitality!',
    date: 'August 1, 2026',
    response: 'Dhanyawad Lady Beatrice. It was our absolute privilege hosting your anniversary at Aura Palace.'
  },
  {
    id: 'rev-2',
    guestName: 'Rohan Singhania',
    guestAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    roomType: 'Maharaja Suite',
    rating: 4.9,
    categories: { cleanliness: 5.0, amenities: 4.8, service: 5.0, location: 4.9 },
    comment: 'Flawless royal service, exceptional gastronomy at Shahi Dawat, and seamless UPI digital check-in. Highest recommendation in Udaipur!',
    date: 'July 28, 2026'
  },
  {
    id: 'rev-3',
    guestName: 'Camilla Dupont',
    guestAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    roomType: 'Royal Peacock Villa',
    rating: 5,
    categories: { cleanliness: 5.0, amenities: 5.0, service: 5.0, location: 5.0 },
    comment: 'The sunrise view over the palace lotus ponds is mesmerizing. The Ayurvedic Kumkumadi spa therapy team is world-class!',
    date: 'July 24, 2026'
  }
];

export const INITIAL_NOTIFICATIONS: HotelNotification[] = [
  {
    id: 'notif-1',
    title: 'New Royal VIP Reservation',
    message: 'Maharaja Vikramaditya Singh requested helicopter pickup for Maharaja Suite 101.',
    time: '10 mins ago',
    type: 'booking',
    read: false,
    priority: 'high'
  },
  {
    id: 'notif-2',
    title: 'Housekeeping Certified',
    message: 'Maharaja Suite 101 has been inspected and marked READY by Sunita S.',
    time: '25 mins ago',
    type: 'housekeeping',
    read: false
  },
  {
    id: 'notif-3',
    title: 'UPI Payment Confirmed',
    message: 'Received UPI payment settlement of ₹6,25,000 for Booking AUR-IN-88291.',
    time: '1 hour ago',
    type: 'payment',
    read: true
  },
  {
    id: 'notif-4',
    title: 'Special Royal Request Alert',
    message: 'Room 204 requested 24k Gold Thali In-Suite dining and chilled Royal Champagne.',
    time: '2 hours ago',
    type: 'guest_request',
    read: true,
    priority: 'high'
  }
];

export const REVENUE_MONTHLY_DATA: RevenueDataPoint[] = [
  { month: 'Jan', revenue: 38000000, target: 35000000, occupancyRate: 78, adr: 45000 },
  { month: 'Feb', revenue: 42000000, target: 38000000, occupancyRate: 84, adr: 48000 },
  { month: 'Mar', revenue: 49000000, target: 45000000, occupancyRate: 88, adr: 52000 },
  { month: 'Apr', revenue: 51000000, target: 48000000, occupancyRate: 91, adr: 55000 },
  { month: 'May', revenue: 56000000, target: 52000000, occupancyRate: 94, adr: 58000 },
  { month: 'Jun', revenue: 64000000, target: 60000000, occupancyRate: 97, adr: 65000 },
  { month: 'Jul', revenue: 72000000, target: 65000000, occupancyRate: 99, adr: 72000 },
  { month: 'Aug', revenue: 69500000, target: 65000000, occupancyRate: 96, adr: 70000 }
];

export const ROOM_PERFORMANCE_DATA: RoomPerformanceData[] = [
  { type: 'Maharaja Suite', bookedDays: 28, revenue: 5180000, occupancyPercent: 93 },
  { type: 'Maharani Lake Suite', bookedDays: 29, revenue: 3625000, occupancyPercent: 96 },
  { type: 'Royal Peacock Villa', bookedDays: 27, revenue: 2295000, occupancyPercent: 90 },
  { type: 'Heritage Haveli Suite', bookedDays: 26, revenue: 1430000, occupancyPercent: 86 },
  { type: 'Palace Deluxe Room', bookedDays: 28, revenue: 980000, occupancyPercent: 93 },
  { type: 'Royal Executive Room', bookedDays: 24, revenue: 600000, occupancyPercent: 80 }
];

export const RESORT_FACILITIES: ResortFacility[] = [
  {
    id: 'fac-1',
    title: 'Stepwell Baoli Infinity Pool & Lotus Deck',
    category: 'Wellness & Spa',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
    hours: '06:00 AM – 11:00 PM Daily',
    location: 'Royal Water Palace • West Courtyard',
    description: 'Modeled after ancient Rajasthani Baoli stepwells with temperature-controlled infinity waters overlooking Lake Pichola. Includes luxury royal cabanas with private butler service and live evening Sitar melodies.',
    features: ['Heated Stepwell Infinity Pool', 'Private Royal Cabanas', 'Underwater Acoustic Sound', 'Towel & Fresh Jasmine Concierge'],
    rating: 5.0
  },
  {
    id: 'fac-2',
    title: 'Ayurveda Siddha & Shirodhara Sanctuarium',
    category: 'Wellness & Spa',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    hours: '07:00 AM – 09:00 PM Daily',
    location: 'Sandalwood Pavilion',
    description: 'World-renowned holistic sanctuary offering authentic Panchakarma therapies, 4-hand Abhyanga oil massage, Shirodhara, Kumkumadi facial rituals, and private yoga decks by the lily pond.',
    features: ['Shirodhara Herbal Therapy', '4-Hand Abhyanga Massage', '24k Kumkumadi Facials', 'Sunset Diya & Meditation Deck'],
    rating: 4.99
  },
  {
    id: 'fac-3',
    title: 'Vintage Rolls-Royce & Royal Carriage Club',
    category: 'Exclusive Services',
    image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=1200&q=80',
    hours: '24/7 By Appointment',
    location: 'Palace Main Gate & Helipad',
    description: 'Private 1938 Vintage Rolls-Royce chauffeurs and decorated royal horse carriages for sunset lakefront promenades, heritage fort tours, and airport transfers with royal Shehnai escorts.',
    features: ['Private Chauffeur Escort', 'Sunset Lakefront Carriages', 'Traditional Shehnai Welcome', 'Helipad Airport Pickup'],
    rating: 5.0
  },
  {
    id: 'fac-4',
    title: 'Championship Lakefront Polo & Golf Club',
    category: 'Recreation',
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80',
    hours: '06:30 AM – 07:00 PM Daily',
    location: 'Aravalli Greens',
    description: 'PGA-standard 18-hole golf course and royal polo grounds surrounded by the Aravalli hills, featuring personalized royal caddie service and clubhouse high tea.',
    features: ['Royal Caddie Escort', 'Polo & Golf Pro Shop', 'TrackMan Range Tech', 'Heritage Clubhouse Restaurant'],
    rating: 4.96
  }
];

export const RESORT_DINING: DiningVenue[] = [
  {
    id: 'dine-1',
    name: 'Shahi Dawat — Royal Nizami & Rajasthani Dining',
    cuisine: 'MasterChef Fine Dining & Royal Thali',
    michelins: 2,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    hours: '07:00 PM – 11:30 PM (Dinner)',
    dressCode: 'Royal Ethnic / Elegant Formal',
    description: 'Overlooking the moonlit Lake Pichola. Executive Master Chef Shivraj Singh presents 11-course Royal Thali on silver platters, 24k Gold leaf desserts, and slow-cooked Dum Pukht delicacies.',
    signatureDish: '24k Gold Leaf Royal Thali with Saffron Dum Biryani & Dal Baati Churma'
  },
  {
    id: 'dine-2',
    name: 'Jharokha Lounge & Masala Chai Pavilion',
    cuisine: 'Artisanal High Tea, Kahwa & Rare Whiskies',
    image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=1200&q=80',
    hours: '02:00 PM – 02:00 AM Daily',
    dressCode: 'Smart Casual',
    description: 'Opulent lounge with carved marble Jharokha seats, live Classical Sitar & Sarangi recitals, artisanal Kashmiri Kahwa, saffron masala chai, and single-malt scotch bar.',
    signatureDish: 'Kashmiri Kahwa Tea with Saffron Gold Pistachio Sweets & Single Malts'
  },
  {
    id: 'dine-3',
    name: 'Bayfront Spice & Tandoori Canopy',
    cuisine: 'Coastal Malabari & North Indian Tandoor',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    hours: '07:00 AM – 05:00 PM (Breakfast & Lunch)',
    dressCode: 'Resort Casual',
    description: 'Set under open-air carved arches by the lake. Serves organic cold-pressed juices, tandoori tiger prawns, Malabar fish curry, and wood-fired naan.',
    signatureDish: 'Tandoori Malabar Tiger Prawns & Smoked Dal Makhani with Garlic Naan'
  }
];

export const RESORT_SPA: SpaTreatment[] = [
  {
    id: 'spa-1',
    title: 'Kumkumadi Saffron & 24k Gold Radiance Facial',
    duration: '90 Minutes',
    price: 28500,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
    description: 'Pure Kashmiri saffron oil, lotus nectar, and 24k gold leaf application combined with facial Marma point therapy for luminous skin glow and rejuvenation.',
    benefits: ['Pure Kashmiri Saffron Glow', 'Cellular Rejuvenation', 'Marma Point Stress Release']
  },
  {
    id: 'spa-2',
    title: 'Ayurvedic Shirodhara & Abhyanga 4-Hand Ritual',
    duration: '75 Minutes',
    price: 18500,
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
    description: 'Traditional 4-hand synchronized massage using warm herbal oils followed by continuous warm Shirodhara oil pour on the forehead and herbal steam.',
    benefits: ['Deep Mind Calming', 'Insomnia & Stress Relief', 'Full Body Lymphatic Detox']
  },
  {
    id: 'spa-3',
    title: 'Royal Sunset Couples Herbal Bath & Massage',
    duration: '120 Minutes',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1591343393572-35254f461b24?auto=format&fit=crop&w=800&q=80',
    description: 'Side-by-side beachfront pavilion therapy accompanied by copper herbal bath, rose petal soak, and chilled Royal Champagne with saffron sweets.',
    benefits: ['Couples Serenity', 'Deep Muscle Tension Release', 'Includes Royal Champagne & Sweets']
  }
];

export const INITIAL_SERVICE_REQUESTS: ServiceRequest[] = [
  {
    id: 'sr-1',
    serviceType: 'Pillow & Fresh Jasmine Menu',
    roomNumber: '204',
    timeRequested: '10 mins ago',
    status: 'In Progress',
    notes: '2x Organic Silk Vetiver Pillows & Fresh Jasmine Garlands'
  },
  {
    id: 'sr-2',
    serviceType: 'Vintage Rolls-Royce Chauffeur',
    roomNumber: '101',
    timeRequested: '30 mins ago',
    status: 'Delivered',
    notes: 'Udaipur Airport Escort for 04:00 PM'
  }
];
