import React, { useState, useEffect, useMemo } from 'react';
import { Film, Calendar, Clock, User, Phone, CheckCircle, ChevronLeft, Ticket, Info, Timer, Sparkles } from 'lucide-react';

// --- DATA & CONFIG ---
const ROOMS = [
  {
    id: 'type-a',
    name: 'Type A',
    color: 'from-purple-600 to-indigo-600',
    shadow: 'shadow-purple-500/20',
    pricing: { 1: 16000, 2: 30000, 3: 45000 }
  },
  {
    id: 'type-b',
    name: 'Type B',
    color: 'from-blue-600 to-cyan-500',
    shadow: 'shadow-cyan-500/20',
    pricing: { 1: 14000, 2: 27000, 3: 40000 }
  },
  {
    id: 'type-c',
    name: 'Type C',
    color: 'from-emerald-500 to-teal-600',
    shadow: 'shadow-emerald-500/20',
    pricing: { 1: 12000, 2: 23000, 3: 34000 }
  },
  {
    id: 'type-d',
    name: 'Type D',
    color: 'from-orange-500 to-red-600',
    shadow: 'shadow-orange-500/20',
    pricing: { 1: 10000, 2: 19000, 3: 27000 }
  },
  {
    id: 'type-e',
    name: 'Type E',
    color: 'from-pink-600 to-rose-500',
    shadow: 'shadow-pink-500/20',
    pricing: { 1: 7500, 2: 14000, 3: 21000 }
  }
];

const OPEN_HOUR = 9;  // 9 AM
const CLOSE_HOUR = 20; // 8 PM

export default function CinemaBookingApp() {
  // --- STATE ---
  const [currentView, setCurrentView] = useState('home');
  const [selectedRoom, setSelectedRoom] = useState(null);
  
  // Date & Time
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [duration, setDuration] = useState(3); // Default 3 hours
  const [selectedTime, setSelectedTime] = useState(null);
  
  // Form
  const [formData, setFormData] = useState({ name: '', phone: '' });

  // Initialize next 7 dates
  useEffect(() => {
    const next7Days = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i);
      return d;
    });
    setDates(next7Days);
    setSelectedDate(next7Days[0]);
  }, []);

  // --- LOGIC ---
  const calculatePrice = (room, hours) => {
    if (!room) return 0;
    const blocksOfThree = Math.floor(hours / 3);
    const remainder = hours % 3;
    
    let total = blocksOfThree * room.pricing[3];
    if (remainder === 1) total += room.pricing[1];
    if (remainder === 2) total += room.pricing[2];
    
    return total;
  };

  const availableTimeSlots = useMemo(() => {
    const slots = [];
    const lastStartHour = CLOSE_HOUR - duration;
    
    for (let i = OPEN_HOUR; i <= lastStartHour; i++) {
      const ampm = i >= 12 ? 'PM' : 'AM';
      const displayHour = i > 12 ? i - 12 : (i === 0 ? 12 : i);
      slots.push({
        label: `${displayHour}:00 ${ampm}`,
        hour: i
      });
    }
    return slots;
  }, [duration]);

  // Ensure selected time is still valid if duration changes
  useEffect(() => {
    if (selectedTime) {
      const lastStartHour = CLOSE_HOUR - duration;
      if (selectedTime.hour > lastStartHour) {
        setSelectedTime(null); // Reset time if new duration exceeds closing time
      }
    }
  }, [duration, selectedTime]);

  const totalPrice = calculatePrice(selectedRoom, duration);

  // --- HANDLERS ---
  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    setCurrentView('datetime');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (currentView === 'datetime') {
      setCurrentView('home');
      setSelectedTime(null);
      setDuration(3);
    } else if (currentView === 'form') {
      setCurrentView('datetime');
    }
  };

  const resetFlow = () => {
    setCurrentView('home');
    setSelectedRoom(null);
    setSelectedDate(dates[0]);
    setSelectedTime(null);
    setDuration(3);
    setFormData({ name: '', phone: '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- VIEWS ---
  const renderHome = () => (
    <div className="animate-in fade-in duration-500 max-w-6xl mx-auto w-full px-4">
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-6 text-sm font-medium">
          <Sparkles className="w-4 h-4" /> Premium Private Viewing
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 mb-4 tracking-tight">
          Select Your Room
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Immerse yourself in cinematic perfection. Choose a room type to begin your reservation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ROOMS.map((room) => (
          <div
            key={room.id}
            onClick={() => handleRoomSelect(room)}
            className={`bg-slate-900 rounded-2xl overflow-hidden cursor-pointer group hover:-translate-y-2 transition-all duration-300 border border-slate-800 hover:border-slate-700 shadow-lg hover:${room.shadow}`}
          >
            {/* CSS-based Image Placeholder with Gradient */}
            <div className={`h-48 w-full bg-gradient-to-br ${room.color} relative overflow-hidden flex flex-col items-center justify-center`}>
              {room.id === 'type-a' ? (
                <img src="/typeA.jpg" alt="Type A" className="w-full h-full object-cover object-center" />
              ) : room.id === 'type-b' ? (
                <img src="/typeB.jpg" alt="Type B" className="w-full h-full object-cover object-center" />
              ) : room.id === 'type-c' ? (
                <img src="/typeC.jpg" alt="Type C" className="w-full h-full object-cover object-center" />
              ) : room.id === 'type-d' ? (
                <img src="/typeD.jpg" alt="Type D" className="w-full h-full object-cover object-center" />
              ) : (
                <Film className="w-16 h-16 text-white/50 group-hover:scale-110 group-hover:text-white/90 transition-all duration-500 drop-shadow-lg" />
              )}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
              {/* Glass reflection effect */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent"></div>
            </div>
            
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center justify-between">
                {room.name}
              </h3>
              
              <div className="space-y-3 mb-8">
                <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-2">
                  <span className="text-slate-400">1 Hour Rate</span>
                  <span className="font-medium text-slate-200">{room.pricing[1].toLocaleString()} Ks</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-2">
                  <span className="text-slate-400">2 Hour Rate</span>
                  <span className="font-medium text-slate-200">{room.pricing[2].toLocaleString()} Ks</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">3 Hour Rate</span>
                  <span className="font-bold text-cyan-400">{room.pricing[3].toLocaleString()} Ks</span>
                </div>
              </div>
              
              <button className="w-full py-3 bg-slate-800 group-hover:bg-cyan-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors duration-300 shadow-[0_0_15px_rgba(6,182,212,0)] group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                Book {room.name}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDateTime = () => (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto w-full px-4">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Schedule Booking</h2>
          <p className="text-slate-400">Customize your viewing duration and arrival time.</p>
        </div>
        <div className="px-5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold flex items-center gap-2 shadow-lg">
          <Film className="w-5 h-5 text-cyan-400" />
          {selectedRoom.name}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Duration Picker */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Timer className="w-5 h-5 text-cyan-400" /> Select Duration
            </h3>
            <div className="flex items-center gap-6">
              <input 
                type="range" 
                min="1" 
                max="11" 
                value={duration} 
                onChange={(e) => setDuration(parseInt(e.target.value))}
                className="w-full accent-cyan-500 h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
              <div className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-lg min-w-[100px] text-center">
                <span className="text-2xl font-black text-white">
                  {duration}
                </span>
                <span className="text-sm text-slate-400 font-medium ml-1">hrs</span>
              </div>
            </div>
            <p className="text-sm text-slate-500 mt-4 flex items-center gap-1.5">
              <Info className="w-4 h-4" /> 
              Operating hours: 9:00 AM - 8:00 PM. Maximum 11 hours per booking.
            </p>
          </div>

          {/* Date Picker */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-cyan-400" /> Select Date
            </h3>
            <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar snap-x">
              {dates.map((date, i) => {
                const isSelected = selectedDate && selectedDate.getDate() === date.getDate();
                return (
                  <button
                    key={i}
                    onClick={() => { setSelectedDate(date); setSelectedTime(null); }}
                    className={`snap-start shrink-0 flex flex-col items-center justify-center w-[100px] h-[110px] rounded-xl border transition-all duration-300 ${
                      isSelected
                        ? 'bg-gradient-to-b from-cyan-500 to-blue-600 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)] scale-105'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                    }`}
                  >
                    <span className="text-xs uppercase font-bold tracking-widest mb-1">{date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                    <span className={`text-3xl font-black ${isSelected ? 'text-white' : 'text-slate-200'}`}>{date.getDate()}</span>
                    <span className="text-xs mt-1 font-medium">{date.toLocaleDateString('en-US', { month: 'short' })}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Picker */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-cyan-400" /> Arrival Time
              </h3>
            </div>
            
            {availableTimeSlots.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {availableTimeSlots.map((slot) => {
                  const isSelected = selectedTime && selectedTime.hour === slot.hour;
                  return (
                    <button
                      key={slot.hour}
                      onClick={() => setSelectedTime(slot)}
                      className={`py-3 px-2 rounded-xl border font-semibold transition-all duration-300 text-center ${
                        isSelected
                          ? 'bg-cyan-500 border-cyan-400 text-white shadow-[0_0_10px_rgba(6,182,212,0.4)] scale-105'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-600 hover:bg-slate-800'
                      }`}
                    >
                      {slot.label}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="p-5 bg-red-950/30 border border-red-900/50 rounded-xl flex items-start gap-3 text-red-400">
                <Info className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-sm leading-relaxed">
                  A {duration}-hour duration exceeds our 8:00 PM closing time for today. 
                  Please reduce your duration or select a different date to see available slots.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 sticky top-24 shadow-xl">
             <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-slate-800 pb-4">
                <Ticket className="w-5 h-5 text-cyan-400" /> Booking Summary
             </h3>
             
             <div className="space-y-5 mb-8">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Room Selection</p>
                  <p className="font-medium text-white text-lg">{selectedRoom.name}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Viewing Duration</p>
                  <p className="font-medium text-white text-lg">{duration} Hour{duration > 1 ? 's' : ''}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Date & Arrival</p>
                  <p className="font-medium text-white text-lg">
                    {selectedDate ? selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : '-'} 
                    {selectedTime ? ` at ${selectedTime.label}` : ''}
                  </p>
                </div>
             </div>

             <div className="pt-6 border-t border-slate-800 mb-8 bg-slate-950/50 -mx-6 px-6 pb-6 rounded-b-2xl">
                <p className="text-slate-400 mb-2 font-medium">Total Amount</p>
                <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-sm">
                  {totalPrice.toLocaleString()} Ks
                </p>
             </div>

             <button
                onClick={() => { setCurrentView('form'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                disabled={!selectedDate || !selectedTime}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-300 text-lg shadow-[0_0_20px_rgba(6,182,212,0.3)] disabled:shadow-none"
             >
                Continue to Details
             </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderForm = () => (
    <div className="animate-in fade-in duration-500 max-w-2xl mx-auto w-full px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-2">Guest Details</h2>
        <p className="text-slate-400">Who should we prepare the room for?</p>
      </div>
      
      <form onSubmit={(e) => { e.preventDefault(); setCurrentView('success'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl">
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner"
              placeholder="e.g. John Doe"
            />
          </div>
        </div>
        
        <div className="mb-10">
          <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
          <div className="relative group">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner"
              placeholder="+95 9 123 456 789"
            />
          </div>
        </div>

        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-slate-400">Room Selected</span>
            <span className="font-semibold text-white">{selectedRoom.name}</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-slate-400">Total Duration</span>
            <span className="font-semibold text-white">{duration} Hours</span>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-slate-800 mt-2">
            <span className="font-medium text-slate-300">Total Amount Due</span>
            <span className="font-black text-xl text-cyan-400">{totalPrice.toLocaleString()} Ks</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl font-bold text-xl transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transform hover:-translate-y-0.5"
        >
          Confirm Reservation
        </button>
      </form>
    </div>
  );

  const renderSuccess = () => (
    <div className="animate-in zoom-in-95 duration-700 max-w-lg mx-auto w-full px-4 text-center py-12">
      <div className="w-24 h-24 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-8 relative">
        <div className="absolute inset-0 border-2 border-cyan-500/30 rounded-full animate-ping"></div>
        <CheckCircle className="w-12 h-12 text-cyan-400 relative z-10" />
      </div>
      
      <h2 className="text-4xl font-black text-white mb-3">Booking Confirmed</h2>
      <p className="text-slate-400 mb-10 text-lg">
        Thank you, <span className="text-white font-semibold">{formData.name}</span>. Your screening room is officially reserved.
      </p>
      
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-10 text-left space-y-5 shadow-2xl relative overflow-hidden">
        {/* Decorative corner glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl"></div>
        
        <div className="flex justify-between items-center border-b border-slate-800 pb-5">
          <span className="text-slate-500 font-medium">Room</span>
          <span className="font-bold text-white text-lg">{selectedRoom.name}</span>
        </div>
        <div className="flex justify-between items-center border-b border-slate-800 pb-5">
          <span className="text-slate-500 font-medium">Date</span>
          <span className="font-bold text-white text-lg">
            {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </span>
        </div>
        <div className="flex justify-between items-center border-b border-slate-800 pb-5">
          <span className="text-slate-500 font-medium">Time</span>
          <span className="font-bold text-white text-lg">{selectedTime.label} <span className="text-sm text-slate-400 font-normal">({duration} hrs)</span></span>
        </div>
        <div className="flex justify-between items-center pt-2">
          <span className="text-slate-500 font-medium">Total Amount</span>
          <span className="font-black text-2xl text-cyan-400">{totalPrice.toLocaleString()} Ks</span>
        </div>
      </div>

      <button
        onClick={resetFlow}
        className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all duration-300 w-full border border-slate-700 shadow-lg"
      >
        Book Another Room
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0f16] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-white pb-16">
      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-900/10 blur-[120px]"></div>
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-cyan-900/10 blur-[120px]"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0f16]/80 backdrop-blur-md border-b border-slate-800/50 py-4 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex-1">
            {currentView !== 'home' && currentView !== 'success' && (
              <button 
                onClick={handleBack}
                className="p-2 text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors group bg-slate-900 rounded-lg border border-slate-800 hover:border-slate-600"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="hidden sm:inline font-medium text-sm pr-1">Back</span>
              </button>
            )}
          </div>
          
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-1 cursor-pointer" onClick={resetFlow}>
              <img src="/logo.jpg" alt="Friend Home" className="w-14 h-14 object-cover rounded-full border-2 border-white/30 shadow-[0_0_20px_rgba(6,182,212,0.4)]" />
              <span className="text-[10px] uppercase tracking-widest text-cyan-500 font-bold">Friend Home</span>
            </div>

          </div>
          
          <div className="flex-1"></div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-10 md:pt-16 relative z-10">
        {currentView === 'home' && renderHome()}
        {currentView === 'datetime' && renderDateTime()}
        {currentView === 'form' && renderForm()}
        {currentView === 'success' && renderSuccess()}
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          background: #06b6d4;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #06b6d4;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
          border: none;
        }
      `}} />
    </div>
  );
}
