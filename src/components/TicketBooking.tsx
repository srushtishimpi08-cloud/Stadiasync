import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Ticket, X, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const TicketBooking: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-blue-500/20 hover:bg-blue-500 transition-colors uppercase tracking-widest text-sm"
      >
        <Ticket size={20} />
        {t("ticket_booking")}
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100"
            >
              <div className="p-6 bg-blue-600 text-white flex justify-between items-center">
                <h3 className="text-xl font-black">{t("ticket_booking")}</h3>
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
                  <X />
                </button>
              </div>

              <div className="p-6 bg-white gap-6 flex flex-col">
                {step === 1 ? (
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Zone</span>
                      <div className="grid grid-cols-2 gap-3">
                        {['North Stand', 'South Pavillion', 'East Gallery', 'West Deck'].map(zone => (
                          <button key={zone} className="p-4 rounded-2xl border border-slate-100 bg-slate-50 font-black text-slate-400 hover:border-blue-600 hover:text-blue-600 text-xs uppercase tracking-tighter transition-all">
                            {zone}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 text-center p-6 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">Fast Filling! Only 42 seats left in South Pavillion.</p>
                    </div>
                    <button
                      onClick={() => setStep(2)}
                      className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition-colors"
                    >
                      Continue to Payment
                    </button>
                  </div>
                ) : (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center gap-4 py-8 text-center"
                  >
                    <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center border border-blue-100 shadow-inner">
                      <CheckCircle2 size={48} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-2xl font-black text-slate-900">Booking Confirmed!</h4>
                      <p className="text-slate-400 font-bold text-sm">Your e-ticket has been sent to your email.</p>
                    </div>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        setStep(1);
                      }}
                      className="mt-4 px-8 py-3 bg-slate-900 text-white font-black rounded-xl hover:bg-slate-800 transition-colors"
                    >
                      Done
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
