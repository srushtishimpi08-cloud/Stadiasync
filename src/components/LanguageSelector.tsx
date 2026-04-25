import React from "react";
import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिन्दी" },
  { code: "mr", name: "मराठी" },
  { code: "te", name: "తెలుగు" },
  { code: "ta", name: "தமிழ்" },
  { code: "kn", name: "ಕನ್ನಡ" },
];

export const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  return (
    <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-slate-100 shadow-sm">
      <Languages size={14} className="text-slate-300" />
      <select
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        className="bg-transparent text-[10px] font-black uppercase tracking-widest text-slate-900 focus:outline-none cursor-pointer"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code} className="text-slate-900 bg-white">
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};
