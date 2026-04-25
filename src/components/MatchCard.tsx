import React from "react";
import { Match } from "../types";
import { useTranslation } from "react-i18next";
import { Trophy, Clock, Timer, Activity, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

interface Props {
  match: Match;
}

export const MatchCard: React.FC<Props> = ({ match }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex flex-col gap-6 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-6 flex flex-col items-end gap-2">
        <span className="flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
        {match.pace && (
          <div className={`text-[9px] font-black uppercase px-2 py-1 rounded-full border ${
            match.pace === 'Ending Early' ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 
            match.pace === 'Delayed' ? 'bg-amber-50 border-amber-200 text-amber-600' : 
            'bg-blue-50 border-blue-200 text-blue-600'
          }`}>
            {match.pace}
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
           <Activity size={14} className="text-blue-600" />
           <h2 className="text-[10px] font-black text-blue-600 tracking-[0.2em] uppercase">Live Broadcast</h2>
        </div>
        <div className="flex gap-2 text-[10px] font-mono text-slate-400 uppercase font-bold tracking-widest bg-slate-50 px-3 py-1 rounded-full">
           {match.target ? `Target: ${match.target}` : "First Innings"}
        </div>
      </div>

      <div className="flex items-center justify-between py-2 px-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 font-bold text-2xl shadow-inner border border-blue-100/50">{match.teams[0][0]}</div>
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">{match.teams[0]}</span>
        </div>
        <div className="text-slate-300 font-black text-xs italic uppercase tracking-[0.3em]">VS</div>
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 font-bold text-2xl shadow-inner border border-blue-100/50">{match.teams[1][0]}</div>
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">{match.teams[1]}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex flex-col gap-1 col-span-2">
           <span className="text-4xl font-black tabular-nums text-slate-900 leading-none">{match.score}</span>
           <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t("live_score")}</span>
        </div>
        
        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100 flex items-center justify-between">
           <div className="flex flex-col gap-1">
              <span className="text-xs font-black text-blue-600 tracking-tight">{match.crr}</span>
              <span className="text-[9px] text-blue-400 font-black uppercase tracking-widest">Curr RR</span>
           </div>
           <TrendingUp size={16} className="text-blue-300" />
        </div>

        <div className="bg-slate-900 rounded-2xl p-4 flex items-center justify-between text-white">
           <div className="flex flex-col gap-1">
              <span className="text-xs font-black tracking-tight">{match.rrr}</span>
              <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Req RR</span>
           </div>
           <Timer size={16} className="text-slate-600" />
        </div>
      </div>

       <div className="flex flex-col gap-2 bg-slate-50 p-6 rounded-3xl border border-slate-100">
          <div className="flex items-center justify-between">
             <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Predicted Conclusion</p>
             <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-sm"></span>
          </div>
          <div className="flex items-center justify-between">
             <p className="text-3xl font-black text-slate-900 tracking-tighter leading-none">
               ~{Math.max(1, Math.floor((new Date(match.predictedEndTime).getTime() - Date.now()) / 60000))} MINS
             </p>
             <div className="flex items-center gap-2 text-[10px] font-black text-blue-600 bg-white px-3 py-1.5 rounded-xl shadow-sm border border-slate-100">
               <Clock size={12} />
               {new Date(match.predictedEndTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
             </div>
          </div>
       </div>
    </motion.div>
  );
};
