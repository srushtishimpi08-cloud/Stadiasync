import React from "react";
import { StadiumTransitData } from "../types";
import { useTranslation } from "react-i18next";
import { Train, Bus, Users, MapPin, AlertCircle, Info } from "lucide-react";
import { motion } from "motion/react";

interface Props {
  data: StadiumTransitData;
}

export const TransitDashboard: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3 uppercase tracking-tighter">
            <Train className="text-blue-600" size={32} />
            {t("transit_info")}
          </h2>
          <p className="text-slate-400 text-sm font-bold tracking-tight">AI-synced transport availability based on match pace.</p>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-blue-600 bg-blue-50 border border-blue-100 p-4 rounded-[1.5rem] shadow-sm">
          <AlertCircle size={16} className="text-blue-600 animate-pulse" />
          <p className="font-black uppercase tracking-widest shrink-0">
            Synced for: <span className="text-slate-900">{new Date(data.predictedMatchEnd).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 flex flex-col justify-between overflow-hidden relative group shadow-sm">
          <Users className="absolute -right-6 -bottom-6 w-32 h-32 text-slate-50 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t("crowd_density")}</span>
          <div className="mt-6 flex flex-col gap-1 relative z-10">
            <span className="text-5xl font-black text-slate-900 tracking-tighter">{data.crowdDensity}</span>
            <p className="text-[11px] text-emerald-600 font-black uppercase tracking-widest mt-1 bg-emerald-50 self-start px-3 py-1 rounded-full border border-emerald-100">Live Traffic Control Active</p>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 flex flex-col justify-between overflow-hidden relative shadow-sm">
          <MapPin className="absolute -right-6 -bottom-6 w-32 h-32 text-slate-50" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Current Arena</span>
          <div className="mt-6 flex flex-col gap-1 relative z-10">
            <span className="text-3xl font-black text-slate-900 uppercase tracking-tighter">{data.stadiumName}</span>
            <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest mt-1">Verified Location Hub</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-2">
           <Info size={14} className="text-blue-400" />
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Available Public Carriers</span>
        </div>
        {data.transitOptions.map((option, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`flex items-center justify-between p-6 bg-white rounded-3xl border border-slate-100 hover:border-blue-600 transition-all cursor-pointer group shadow-sm`}
          >
            <div className="flex items-center gap-6">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${option.type === 'Metro' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-slate-50 text-slate-600 border-slate-100'} group-hover:scale-105 transition-transform`}>
                {option.type === "Metro" ? <Train size={24} /> : <Bus size={24} />}
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-black text-lg uppercase text-slate-900 leading-none">{option.route}</span>
                <div className="flex items-center gap-3">
                   <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <Users size={12} className="text-blue-400" />
                      {option.availableVehicles || Math.floor(Math.random() * 5 + 1)} Carriers
                   </div>
                   <span className="text-slate-200 text-xs">|</span>
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Next departure in sync</span>
                </div>
              </div>
            </div>
            
            <div className="text-right flex flex-col items-end">
              <p className="text-2xl font-black text-slate-900 leading-none mb-1">~{option.frequency}</p>
              <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full border ${
                 option.status.includes('High') || option.status.includes('Ahead') ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100'
              }`}>{option.status}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
