import React, { useState } from 'react';
import { 
  Sparkles, BedDouble, Utensils, Heart, KeyRound, Star, Crown, 
  MapPin, Clock, ShieldCheck, ChevronRight, CheckCircle2, Phone, 
  Calendar, Users, Coffee, Waves, Wine, Compass, ArrowRight, BellRing,
  Smartphone, Plus, Check
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { RESORT_FACILITIES, RESORT_DINING, RESORT_SPA } from '../../data/mockData';
import { Room } from '../../types';

export const ClientPortal: React.FC = () => {
  const { 
    rooms, 
    setIsBookingModalOpen, 
    setSelectedRoomForBooking, 
    setSelectedRoomForView,
    addServiceRequest,
    serviceRequests,
    bookings,
    activeTab,
    setActiveTab
  } = useHotel();

  const [activeClientTab, setActiveClientTab] = useState<'facilities' | 'suites' | 'dining' | 'spa' | 'mystay'>('facilities');
  const [tableResSuccess, setTableResSuccess] = useState<string | null>(null);
  const [spaBookSuccess, setSpaBookSuccess] = useState<string | null>(null);
  const [roomServiceNote, setRoomServiceNote] = useState('');
  const [selectedServiceType, setSelectedServiceType] = useState('Pillow Menu Selection');

  // Filter available suites
  const luxurySuites = rooms.slice(0, 6);

  // Active guest booking for "My Stay"
  const activeBooking = bookings[0]; // Eleanor Vance - Presidential Suite 204

  const handleBookSuite = (room: Room) => {
    setSelectedRoomForBooking(room);
    setIsBookingModalOpen(true);
  };

  const handleTableReservation = (venueName: string) => {
    setTableResSuccess(venueName);
    setTimeout(() => setTableResSuccess(null), 4000);
  };

  const handleSpaBooking = (spaTitle: string) => {
    setSpaBookSuccess(spaTitle);
    setTimeout(() => setSpaBookSuccess(null), 4000);
  };

  const handleSendServiceRequest = (e: React.FormEvent) => {
    e.preventDefault();
    addServiceRequest({
      serviceType: selectedServiceType,
      roomNumber: activeBooking?.roomNumber || '204',
      notes: roomServiceNote || 'Prompt delivery requested.'
    });
    setRoomServiceNote('');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Client Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-amber-500/20">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1800&q=80" 
            alt="Aura Resort Ocean View" 
            className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-slate-950/80"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.15),transparent_50%)]"></div>
        </div>

        <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-4xl text-white space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 backdrop-blur-md text-amber-300 text-xs font-semibold tracking-wider uppercase">
            <Crown className="w-4 h-4 text-amber-400" />
            <span>5-Star World Luxury Hotel Award Winner</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-heading leading-tight tracking-tight text-amber-50">
            Welcome to <span className="gold-gradient-text">Aura Palace & Haveli</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
            Immerse yourself in 5-star royal heritage, Lake Pichola views, MasterChef Shahi Dawat, Ayurveda wellness, and bespoke 24/7 khansama butler service.
          </p>

          {/* Quick Action Navigation Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveClientTab('suites')}
              className={`px-6 py-3 rounded-2xl font-semibold text-sm flex items-center space-x-2.5 transition-all shadow-lg cursor-pointer ${
                activeClientTab === 'suites'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-amber-500/30'
                  : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20'
              }`}
            >
              <BedDouble className="w-4 h-4" />
              <span>Explore Suites & Villas</span>
            </button>

            <button
              onClick={() => setActiveClientTab('facilities')}
              className={`px-6 py-3 rounded-2xl font-semibold text-sm flex items-center space-x-2.5 transition-all shadow-lg cursor-pointer ${
                activeClientTab === 'facilities'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-amber-500/30'
                  : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Resort Amenities</span>
            </button>

            <button
              onClick={() => setActiveClientTab('dining')}
              className={`px-6 py-3 rounded-2xl font-semibold text-sm flex items-center space-x-2.5 transition-all shadow-lg cursor-pointer ${
                activeClientTab === 'dining'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-amber-500/30'
                  : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20'
              }`}
            >
              <Utensils className="w-4 h-4 text-amber-400" />
              <span>Fine Dining</span>
            </button>

            <button
              onClick={() => setActiveClientTab('mystay')}
              className={`px-6 py-3 rounded-2xl font-semibold text-sm flex items-center space-x-2.5 transition-all shadow-lg cursor-pointer ${
                activeClientTab === 'mystay'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-amber-500/30'
                  : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 backdrop-blur-md'
              }`}
            >
              <KeyRound className="w-4 h-4 text-amber-400" />
              <span>My Stay & Digital Key</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveClientTab('facilities')}
          className={`px-5 py-2.5 rounded-xl font-medium text-sm flex items-center space-x-2 whitespace-nowrap transition-all ${
            activeClientTab === 'facilities'
              ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Resort Facilities ({RESORT_FACILITIES.length})</span>
        </button>

        <button
          onClick={() => setActiveClientTab('suites')}
          className={`px-5 py-2.5 rounded-xl font-medium text-sm flex items-center space-x-2 whitespace-nowrap transition-all ${
            activeClientTab === 'suites'
              ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
          }`}
        >
          <BedDouble className="w-4 h-4" />
          <span>Luxury Suites & Villas</span>
        </button>

        <button
          onClick={() => setActiveClientTab('dining')}
          className={`px-5 py-2.5 rounded-xl font-medium text-sm flex items-center space-x-2 whitespace-nowrap transition-all ${
            activeClientTab === 'dining'
              ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
          }`}
        >
          <Utensils className="w-4 h-4" />
          <span>Michelin Dining</span>
        </button>

        <button
          onClick={() => setActiveClientTab('spa')}
          className={`px-5 py-2.5 rounded-xl font-medium text-sm flex items-center space-x-2 whitespace-nowrap transition-all ${
            activeClientTab === 'spa'
              ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Thalasso Spa Rituals</span>
        </button>

        <button
          onClick={() => setActiveClientTab('mystay')}
          className={`px-5 py-2.5 rounded-xl font-medium text-sm flex items-center space-x-2 whitespace-nowrap transition-all ${
            activeClientTab === 'mystay'
              ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
          }`}
        >
          <KeyRound className="w-4 h-4" />
          <span>My Stay & Keycard</span>
        </button>
      </div>

      {/* 1. FACILITIES & EXPERIENCES TAB */}
      {activeClientTab === 'facilities' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-slate-100">
                World-Class Resort Facilities
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Exclusively reserved for guests of Aura Grand Resort & Spa
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RESORT_FACILITIES.map(fac => (
              <div 
                key={fac.id}
                className="glass-card rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 hover:shadow-xl transition-all group flex flex-col"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={fac.image} 
                    alt={fac.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  <span className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30">
                    {fac.category}
                  </span>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <div className="flex items-center space-x-1 bg-amber-500/90 text-slate-950 text-xs font-bold px-2.5 py-1 rounded-full">
                      <Star className="w-3.5 h-3.5 fill-slate-950" />
                      <span>{fac.rating} / 5.0</span>
                    </div>
                    <span className="text-xs text-slate-300 font-medium flex items-center gap-1 bg-slate-900/70 px-2.5 py-1 rounded-full backdrop-blur-sm">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      {fac.hours}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {fac.title}
                    </h3>
                    <p className="text-xs text-amber-600 dark:text-amber-400 font-medium flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {fac.location}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                      {fac.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                    <div className="flex flex-wrap gap-1.5">
                      {fac.features.map((feat, idx) => (
                        <span 
                          key={idx}
                          className="text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-lg border border-slate-200/50 dark:border-slate-700/50"
                        >
                          ✓ {feat}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setActiveClientTab('suites')}
                      className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-amber-500 dark:bg-slate-800 dark:hover:bg-amber-500 text-slate-800 dark:text-slate-200 hover:text-slate-950 font-semibold text-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <span>Inquire & Reserve Access</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. LUXURY SUITES & VILLAS TAB */}
      {activeClientTab === 'suites' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-slate-100">
                Resort Suites, Penthouses & Villas
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Select your luxury residence with guaranteed ocean view and butler service
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedRoomForBooking(rooms[0]);
                setIsBookingModalOpen(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-md flex items-center space-x-2 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Custom Reservation Request</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {luxurySuites.map(room => (
              <div 
                key={room.id}
                className="glass-card rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 hover:shadow-xl transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={room.images[0]} 
                      alt={room.type}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30">
                      Suite #{room.number}
                    </div>
                    <div className="absolute top-3 right-3 bg-emerald-500/90 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      {room.status}
                    </div>
                    <div className="absolute bottom-3 left-3 bg-slate-950/70 text-white text-xs font-medium px-2.5 py-1 rounded-lg backdrop-blur-sm">
                      {room.sizeSqFt} sq.ft • {room.bedType}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-slate-100">
                          {room.type}
                        </h3>
                        <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                          {room.view}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-stat font-extrabold text-amber-600 dark:text-amber-400">
                          ₹{room.pricePerNight.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium">per night</div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                      {room.description}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {room.amenities.slice(0, 3).map((amenity, i) => (
                        <span key={i} className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded">
                          • {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 space-y-2">
                  <button
                    onClick={() => handleBookSuite(room)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-500/20 cursor-pointer flex items-center justify-center space-x-1.5"
                  >
                    <span>Reserve Suite Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelectedRoomForView(room)}
                    className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium text-xs transition-colors cursor-pointer"
                  >
                    View Gallery & Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. MICHELIN DINING TAB */}
      {activeClientTab === 'dining' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div>
            <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-slate-100">
              Michelin Gastronomy & Lounges
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Indulge in award-winning culinary mastery overlooking the ocean
            </p>
          </div>

          {tableResSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 flex items-center space-x-3 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <div className="text-sm font-medium">
                Table reservation confirmed for <strong>{tableResSuccess}</strong>! Our Head Sommelier will contact you.
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {RESORT_DINING.map(dine => (
              <div 
                key={dine.id}
                className="glass-card rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-60 overflow-hidden">
                    <img src={dine.image} alt={dine.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                    {dine.michelins && (
                      <div className="absolute top-4 left-4 bg-amber-500 text-slate-950 text-xs font-black px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                        <Crown className="w-3.5 h-3.5 fill-slate-950" />
                        <span>{dine.michelins} Michelin Stars</span>
                      </div>
                    )}
                    <span className="absolute bottom-3 right-3 text-xs bg-slate-900/80 text-amber-300 font-medium px-2.5 py-1 rounded-lg backdrop-blur-sm">
                      Dress Code: {dine.dressCode}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-slate-100">
                      {dine.name}
                    </h3>
                    <p className="text-xs text-amber-600 dark:text-amber-400 font-bold">
                      {dine.cuisine}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {dine.description}
                    </p>

                    <div className="p-3 rounded-xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 text-xs">
                      <span className="font-bold text-amber-600 dark:text-amber-400 block mb-0.5">Chef's Signature:</span>
                      <span className="text-slate-800 dark:text-slate-200 italic">{dine.signatureDish}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => handleTableReservation(dine.name)}
                    className="w-full py-3 rounded-xl bg-slate-900 hover:bg-amber-500 dark:bg-slate-800 dark:hover:bg-amber-500 text-white hover:text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md"
                  >
                    Reserve Table For Tonight
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. SPA & WELLNESS TAB */}
      {activeClientTab === 'spa' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div>
            <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-slate-100">
              Thalasso Spa & Wellness Rituals
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Rejuvenate body and spirit with marine hydrotherapy and 24k gold treatments
            </p>
          </div>

          {spaBookSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 flex items-center space-x-3 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <div className="text-sm font-medium">
                Appointment booked for <strong>{spaBookSuccess}</strong>! Spa Concierge has reserved your therapist.
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RESORT_SPA.map(spa => (
              <div 
                key={spa.id}
                className="glass-card rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-52 overflow-hidden">
                    <img src={spa.image} alt={spa.title} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 bg-slate-900/80 text-amber-400 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                      ⏱ {spa.duration}
                    </span>
                    <span className="absolute bottom-3 right-3 text-lg font-stat font-extrabold text-white bg-amber-500/90 px-3 py-1 rounded-xl shadow-lg">
                      ₹{spa.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-slate-100">
                      {spa.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {spa.description}
                    </p>

                    <div className="space-y-1 pt-2">
                      {spa.benefits.map((b, i) => (
                        <div key={i} className="text-[11px] text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-amber-500" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => handleSpaBooking(spa.title)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                  >
                    Book Spa Ritual
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. MY STAY & DIGITAL KEYCARD TAB */}
      {activeClientTab === 'mystay' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-300">
          {/* Left Column: Active Stay & Digital Room Key */}
          <div className="space-y-6">
            <div className="glass-card rounded-3xl p-6 border border-amber-500/30 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">Active Stay</span>
                  <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-slate-100">
                    {activeBooking?.guestName || 'Eleanor Vance'}
                  </h3>
                </div>
                <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/20">
                  Checked-in
                </span>
              </div>

              {/* NFC Digital Room Key Simulation */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-white space-y-6 shadow-2xl relative overflow-hidden border border-amber-500/40">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl"></div>

                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center space-x-2">
                    <Crown className="w-5 h-5 text-amber-400" />
                    <span className="text-xs font-bold gold-gradient-text">AURA DIGITAL RFID KEY</span>
                  </div>
                  <Smartphone className="w-5 h-5 text-amber-400 animate-pulse" />
                </div>

                <div className="text-center py-4 relative z-10">
                  <div className="text-xs text-amber-300 uppercase tracking-widest font-medium">Suite Room</div>
                  <div className="text-5xl font-black font-stat gold-gradient-text my-1">
                    #{activeBooking?.roomNumber || '204'}
                  </div>
                  <div className="text-xs text-slate-300 font-medium">
                    {activeBooking?.roomType || 'Presidential Suite'}
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 relative z-10">
                  <div>Check-out: {activeBooking?.checkOutDate || '2026-08-08'}</div>
                  <div className="text-emerald-400 font-medium flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    Tap Door Lock
                  </div>
                </div>
              </div>

              {/* Stay Summary Metrics */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 font-medium block">Booking Reference</span>
                  <span className="text-slate-900 dark:text-slate-100 font-bold font-mono">{activeBooking?.bookingRef || 'AUR-88291'}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 font-medium block">Total Nights</span>
                  <span className="text-slate-900 dark:text-slate-100 font-bold">{activeBooking?.nights || 5} Nights</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Room Service Request Form & Active Requests */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 space-y-6">
              <div>
                <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <BellRing className="w-5 h-5 text-amber-500" />
                  Request Concierge & In-Suite Service
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Direct request sent to your personal butler and resort front desk
                </p>
              </div>

              <form onSubmit={handleSendServiceRequest} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Service Type
                    </label>
                    <select
                      value={selectedServiceType}
                      onChange={(e) => setSelectedServiceType(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs font-medium focus:outline-none focus:border-amber-500"
                    >
                      <option value="Pillow & Fresh Jasmine Menu">Pillow & Fresh Jasmine Menu</option>
                      <option value="Vintage Rolls-Royce Transfer">Vintage Rolls-Royce Airport Escort</option>
                      <option value="In-Suite Royal Thali Breakfast">In-Suite Royal Thali Breakfast</option>
                      <option value="Chilled Royal Champagne Delivery">Chilled Royal Champagne Delivery</option>
                      <option value="Evening Diya Aarti & Turndown">Evening Diya Aarti & Turndown</option>
                      <option value="Valet Vintage Car Pickup">Valet Vintage Car Pickup</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Suite Number
                    </label>
                    <input 
                      type="text"
                      disabled
                      value={`Suite #${activeBooking?.roomNumber || '204'}`}
                      className="w-full h-11 px-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Special Instructions / Notes
                  </label>
                  <textarea 
                    rows={3}
                    value={roomServiceNote}
                    onChange={(e) => setRoomServiceNote(e.target.value)}
                    placeholder="E.g., Please deliver 2 silk lavender pillows at 8:00 PM."
                    className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md transition-colors cursor-pointer"
                >
                  Send Request to Butler
                </button>
              </form>

              {/* Service Requests Tracker */}
              <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Recent Service Requests
                </h4>

                <div className="space-y-2">
                  {serviceRequests.map(sr => (
                    <div 
                      key={sr.id}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-semibold text-slate-800 dark:text-slate-200">
                          {sr.serviceType}
                        </div>
                        {sr.notes && <p className="text-slate-500 text-[11px] mt-0.5">{sr.notes}</p>}
                      </div>
                      <div className="text-right">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          sr.status === 'Delivered'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        }`}>
                          {sr.status}
                        </span>
                        <div className="text-[10px] text-slate-400 mt-0.5">{sr.timeRequested}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
