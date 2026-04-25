
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./i18n";
import { Stadium, Match, StadiumTransitData, NearbyService } from "./types";
import { LanguageSelector } from "./components/LanguageSelector";
import { MatchCard } from "./components/MatchCard";
import { TransitDashboard } from "./components/TransitDashboard";
import { EmergencySection } from "./components/EmergencySection";
import { TicketBooking } from "./components/TicketBooking";
import {
  Search,
  MapPin,
  LayoutDashboard,
  User,
  Compass,
  Bell,
  Waves,
  ChevronRight,
  Loader2,
  Clock
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import axios from "axios";

export default function App() {
  const { t } = useTranslation();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [stadiums, setStadiums] = useState<Stadium[]>([]);
  const [selectedStadium, setSelectedStadium] = useState<Stadium | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [transitData, setTransitData] = useState<StadiumTransitData | null>(null);
  const [nearbyRecommendations, setNearbyRecommendations] = useState<NearbyService[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  // Auth Simulation
  const [emailInput, setEmailInput] = useState("");
  const [nameInput, setNameInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [stadiumsRes, matchesRes] = await Promise.all([
          axios.get("/api/stadiums"),
          axios.get("/api/matches")
        ]);
        setStadiums(stadiumsRes.data);
        setMatches(matchesRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleStadiumSelect = async (stadium: Stadium) => {
    setSelectedStadium(stadium);
    setLoading(true);
    setActiveTab("dashboard");
    try {
      const [transitRes, nearbyRes] = await Promise.all([
        axios.get(`/api/transit/${stadium.id}`),
        axios.get(`/api/nearby/${stadium.id}`)
      ]);
      setTransitData(transitRes.data);
      setNearbyRecommendations(nearbyRes.data.recommendations);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching transit or nearby data:", err);
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput && nameInput) {
      setUser({ name: nameInput, email: emailInput });
      setActiveTab("stadiums"); // Take them to selection first
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans text-slate-900">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 flex flex-col gap-8"
        >
          <div className="flex flex-col gap-3">
            <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 font-black italic text-2xl">
               SS
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 leading-tight tracking-tighter uppercase">Stadia<span className="text-blue-600">Sync</span></h1>
              <p className="text-slate-500 font-bold text-sm tracking-tight">Login to sync your transit with the game.</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe" 
                className="bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 font-bold placeholder:text-slate-300 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">Email Address</label>
              <input 
                type="email" 
                placeholder="john@example.com" 
                className="bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 font-bold placeholder:text-slate-300 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
              />
            </div>
            <button className="bg-blue-600 text-white font-black py-5 rounded-2xl mt-4 shadow-xl shadow-blue-500/20 hover:bg-blue-500 transition-colors uppercase tracking-widest">
              Continue
            </button>
          </form>

          <div className="flex flex-col gap-4">
             <div className="flex items-center gap-2">
                <div className="h-px bg-slate-100 flex-1"/>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Available In</span>
                <div className="h-px bg-slate-100 flex-1"/>
             </div>
             <div className="flex flex-wrap justify-center gap-2">
                {['English', 'Hindi', 'Marathi', 'Telugu', 'Tamil', 'Kannada'].map(l => (
                  <span key={l} className="text-[10px] font-black text-slate-400 px-3 py-1 bg-slate-50 rounded-full border border-slate-100 uppercase tracking-tighter">{l}</span>
                ))}
             </div>
          </div>
        </motion.div>
      </div>
    );
  }

  const activeMatch = selectedStadium ? matches.find(m => m.stadiumId === selectedStadium.id) : null;

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24 lg:pb-0 lg:pl-24 text-slate-900">
      {/* SOS FAB for Mobile */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.open("tel:100")}
        className="lg:hidden fixed bottom-28 right-6 w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl z-55 border-4 border-white"
      >
        <Bell size={24} className="animate-pulse" />
      </motion.button>

      {/* Mobile Top Bar */}
      <div className="lg:hidden bg-white/80 backdrop-blur-md text-slate-900 p-6 flex justify-between items-center sticky top-0 z-40 border-b border-slate-100">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white italic text-sm">SS</div>
           <h1 className="text-xl font-bold tracking-tighter uppercase">Stadia<span className="text-blue-600">Sync</span></h1>
        </div>
        <LanguageSelector />
      </div>

      {/* Sidebar Desktop */}
      <nav className="fixed left-0 top-0 bottom-0 w-24 bg-white flex flex-col items-center py-8 z-50 border-r border-slate-100">
        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center font-bold text-white italic mb-12 shadow-lg shadow-blue-500/10">
          SS
        </div>
        <div className="flex flex-col gap-8 text-slate-300">
          <button onClick={() => { setActiveTab("dashboard"); }} className={activeTab === "dashboard" ? "text-blue-600" : "hover:text-slate-900 transition-colors"}>
            <LayoutDashboard size={26} />
          </button>
          <button onClick={() => { setActiveTab("stadiums"); }} className={activeTab === "stadiums" ? "text-blue-600" : "hover:text-slate-900 transition-colors"}>
            <Compass size={26} />
          </button>
          <button onClick={() => window.open("tel:100")} className="hover:text-red-600 text-red-400 transition-colors">
            <Bell size={26} />
          </button>
          <button onClick={() => setActiveTab("account")} className={activeTab === "account" ? "text-blue-600" : "hover:text-slate-900 transition-colors"}>
            <User size={26} />
          </button>
        </div>
        <div className="mt-auto">
          <LanguageSelector />
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 md:p-10 flex flex-col gap-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
             <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center border-4 border-white shadow-lg font-bold text-white text-xl block shrink-0">
               {user.name[0]}
             </div>
             <div className="flex flex-col">
               <h2 className="text-[10px] uppercase font-black tracking-[0.2em] text-blue-600 tabular-nums">
                 {selectedStadium ? `Stationed at ${selectedStadium.name.split(' ')[0]}` : "Fan Dashboard"}
               </h2>
               <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">
                 Good Day, {user.name.split(' ')[0]}
               </h1>
             </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                readOnly
                placeholder="Search venues..." 
                className="bg-white border border-slate-100 rounded-2xl pl-12 pr-6 py-4 w-full md:w-80 shadow-sm text-slate-900 placeholder:text-slate-300 focus:ring-2 focus:ring-blue-600 transition-all outline-none"
              />
            </div>
            <button 
              onClick={() => window.open("tel:100")}
              className="bg-red-600 text-white px-6 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-red-500/20 hover:bg-red-700 transition-colors hidden md:flex items-center gap-2"
            >
              <Bell size={14} />
              Emergency SOS
            </button>
          </div>
        </header>

        {activeTab === "stadiums" || !selectedStadium ? (
          <div className="flex flex-col gap-8">
             <div className="flex flex-col">
               <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Choose Your Venue</h2>
               <p className="text-slate-400 text-sm font-bold tracking-tight">Select your stadium for automated transport scheduling.</p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {stadiums.map((stadium) => (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    key={stadium.id}
                    onClick={() => handleStadiumSelect(stadium)}
                    className="p-10 bg-white rounded-[3rem] border border-slate-100 text-left hover:border-blue-600 transition-all flex flex-col gap-6 relative overflow-hidden group shadow-sm"
                  >
                    <div className="relative z-10">
                      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <MapPin size={28} />
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight uppercase">{stadium.name}</h3>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stadium.city} • {stadium.capacity.toLocaleString()} Fans</p>
                    </div>
                  </motion.button>
                ))}
             </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Match & Info */}
            <div className="lg:col-span-4 flex flex-col gap-10">
              <section className="flex flex-col gap-6">
                 <div className="flex items-center justify-between">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t("live_score")}</h3>
                    <button 
                      onClick={() => setSelectedStadium(null)} 
                      className="text-[10px] font-black text-blue-600 hover:underline uppercase tracking-widest"
                    >
                      Change Venue
                    </button>
                 </div>
                 <div className="flex flex-col gap-6">
                    {activeMatch ? (
                      <MatchCard match={activeMatch} />
                    ) : (
                      <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 text-center flex flex-col items-center gap-4 shadow-sm">
                         <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-200">
                            <Clock size={32} />
                         </div>
                         <p className="font-black text-slate-900 text-lg uppercase">Quiet Pitch</p>
                         <p className="text-[10px] text-slate-400 font-bold max-w-[200px]">No matches scheduled for today at this venue.</p>
                      </div>
                    )}
                 </div>
              </section>

              <div className="bg-blue-600 border border-blue-500 rounded-[2.5rem] p-8 text-white shadow-lg shadow-blue-500/10">
                 <h4 className="font-black text-sm uppercase tracking-tighter">Location Preview</h4>
                 <p className="text-xs font-bold opacity-70 mb-6">{selectedStadium.city}, {selectedStadium.capacity.toLocaleString()} Seats</p>
                 <div className="h-44 bg-blue-700/50 rounded-3xl flex items-center justify-center font-mono text-[10px] text-blue-200 uppercase tracking-widest border border-blue-500/30">
                    Live Venue View
                 </div>
              </div>
            </div>

            {/* Right Column: Transit & Services */}
            <div className="lg:col-span-8">
               <AnimatePresence mode="wait">
                 {loading ? (
                   <motion.div 
                     key="loader"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="flex flex-col items-center justify-center py-32 gap-6"
                   >
                     <Loader2 size={56} className="text-blue-600 animate-spin" />
                     <p className="font-black text-slate-300 uppercase tracking-widest text-[10px]">{t("loading")}</p>
                   </motion.div>
                 ) : (
                   <motion.div 
                     key="data"
                     initial={{ opacity: 0, scale: 0.98 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="flex flex-col gap-12"
                   >
                      <TransitDashboard data={transitData!} />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                         <EmergencySection recommendations={nearbyRecommendations} />
                         <div className="flex flex-col gap-10">
                            <TicketBooking />
                            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 flex flex-col justify-center items-center text-center shadow-sm">
                               <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                                  <Waves size={28} />
                               </div>
                               <h4 className="text-slate-900 font-black uppercase tracking-tighter">Smart Sync Active</h4>
                               <p className="text-[10px] font-bold text-slate-400 mt-1">Status: Optimized for Crowd Flow</p>
                            </div>
                         </div>
                      </div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>
          </div>
        )}

        {/* Event Listings - Bottom Section */}
        <section className="flex flex-col gap-10 mt-12 pb-12">
           <div className="flex items-center justify-between">
              <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">{t("event_listings")}</h3>
              <p className="text-[10px] font-black text-blue-600 cursor-pointer uppercase tracking-[0.2em] hover:underline">Explore All</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col gap-6 group cursor-pointer hover:border-blue-600 transition-colors">
                   <div className="aspect-video bg-slate-50 rounded-3xl overflow-hidden relative border border-slate-100">
                      <img 
                        src={`https://picsum.photos/seed/cricket${i}/800/600`} 
                        alt="Event" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute top-5 left-5 bg-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase text-blue-600 shadow-lg">Season 2026</div>
                   </div>
                   <div className="flex flex-col gap-2">
                      <h4 className="font-black text-slate-900 text-xl tracking-tight uppercase leading-tight">Match Day {i}: Grand Final</h4>
                      <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                         <span className="flex items-center gap-1"><MapPin size={12} className="text-blue-600" /> {selectedStadium ? selectedStadium.city : "Venue TBD"}</span>
                         <span>Limited Seats</span>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </section>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-100 p-5 flex justify-around items-center z-50">
        <button onClick={() => setActiveTab("dashboard")} className={`flex flex-col items-center gap-1.5 ${activeTab === "dashboard" ? "text-blue-600" : "text-slate-300"}`}>
          <LayoutDashboard size={24} />
          <span className="text-[9px] font-black uppercase tracking-widest">Live</span>
        </button>
        <button onClick={() => setActiveTab("stadiums")} className={`flex flex-col items-center gap-1.5 ${activeTab === "stadiums" ? "text-blue-600" : "text-slate-300"}`}>
          <Compass size={24} />
          <span className="text-[9px] font-black uppercase tracking-widest">Explore</span>
        </button>
        <div className="relative -top-10 bg-blue-600 text-white p-5 rounded-[1.5rem] shadow-xl shadow-blue-500/20 border-4 border-slate-50">
           <Waves size={32} />
        </div>
        <button onClick={() => window.open("tel:112")} className="flex flex-col items-center gap-1.5 text-red-400">
          <Bell size={24} />
          <span className="text-[9px] font-black uppercase tracking-widest">SOS</span>
        </button>
        <button onClick={() => setActiveTab("account")} className={`flex flex-col items-center gap-1.5 ${activeTab === "account" ? "text-blue-600" : "text-slate-300"}`}>
          <User size={24} />
          <span className="text-[9px] font-black uppercase tracking-widest">Profile</span>
        </button>
      </nav>
    </div>
  );
}
