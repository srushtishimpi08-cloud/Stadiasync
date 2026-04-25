import React from "react";
import { useTranslation } from "react-i18next";
import { LifeBuoy, Hospital, Hotel, Utensils, Home, Share2, Star, Compass } from "lucide-react";
import { motion } from "motion/react";

import { NearbyService } from "../types";

interface Props {
  recommendations?: NearbyService[];
}

export const EmergencySection: React.FC<Props> = ({ recommendations }) => {
  const { t } = useTranslation();

  const handleNearbySearch = (type: string) => {
    const query = encodeURIComponent(type + " near stadium");
    window.open(`https://www.google.com/maps/search/${query}`, "_blank");
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'Hospital': return <Hospital size={16} className="text-red-500" />;
      case 'Hotel': return <Hotel size={16} className="text-emerald-400" />;
      case 'Restaurant': return <Utensils size={16} className="text-amber-400" />;
      case 'Airbnb': return <Home size={16} className="text-indigo-400" />;
      default: return <Compass size={16} />;
    }
  };

  return (
    <div className="flex flex-col gap-8 pt-10 border-t border-slate-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
           <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center shadow-sm">
              <LifeBuoy size={28} />
           </div>
           <div className="flex flex-col">
              <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">
                {t("emergency")}
              </h2>
              <p className="text-[10px] font-black text-red-600/60 uppercase tracking-widest">Support is 1-Tap Away</p>
           </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-slate-900 rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-center"
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'StadiaSync Live Sync',
                text: 'Safety and transit synced for the game!',
                url: window.location.href,
              });
            }
          }}
        >
          <Share2 size={24} />
        </motion.button>
      </div>

      <div className="flex flex-col gap-4">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Venue Directory</span>
        <div className="grid grid-cols-1 gap-3">
          {recommendations?.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleNearbySearch(item.name)}
              className="bg-white border border-slate-100 p-5 rounded-[2rem] flex items-center justify-between hover:border-blue-600 transition-all text-left group shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-blue-50 transition-colors">
                  {getIcon(item.type)}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-black text-slate-900 uppercase tracking-tight leading-none mb-1">{item.name}</span>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{item.type} • {item.dist} Away</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-black text-amber-500 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                <Star size={10} className="fill-amber-500" />
                {item.rating}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {['Hospital', 'Hotel', 'Restaurant', 'Airbnb'].map((cat) => (
          <button
            key={cat}
            onClick={() => handleNearbySearch(cat)}
            className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm"
          >
             Search {cat}
          </button>
        ))}
      </div>

      <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 flex flex-col gap-5 shadow-sm">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">{t("rating")}</h3>
        <div className="flex items-center justify-between px-2">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={24} className={s <= 4 ? "fill-amber-400 text-amber-400" : "text-slate-200"} />
            ))}
          </div>
          <button className="text-[10px] font-black uppercase text-white bg-slate-900 px-6 py-3 rounded-2xl shadow-lg shadow-gray-200 hover:bg-slate-800 transition-colors">
            Post Review
          </button>
        </div>
      </div>
    </div>
  );
};
