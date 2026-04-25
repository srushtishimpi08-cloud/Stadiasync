import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "welcome": "TransitSync LIVE",
      "select_stadium": "Select Your Stadium",
      "live_score": "Live Score",
      "transit_info": "Match-Synced Transit",
      "crowd_density": "Predicted Crowd Density",
      "emergency": "Emergency & Services",
      "ticket_booking": "Book Tickets",
      "share": "Share Event",
      "next": "Next",
      "previous": "Previous",
      "loading": "Syncing Data...",
      "no_match": "No ongoing match at this venue.",
      "hospital": "Hospitals",
      "hotel": "Hotels",
      "restaurant": "Restaurants",
      "airbnb": "Airbnbs",
      "rating": "Rate Venue",
      "account": "My Account",
      "event_listings": "Upcoming Events"
    }
  },
  hi: {
    translation: {
      "welcome": "ट्रांजिटसिंक लाइव",
      "select_stadium": "अपना स्टेडियम चुनें",
      "live_score": "लाइव स्कोर",
      "transit_info": "मैच-सिंक्ड ट्रांजिट",
      "crowd_density": "अनुमानित भीड़ घनत्व",
      "emergency": "आपातकालीन सेवाएं",
      "ticket_booking": "टिकट बुक करें",
      "share": "इवेंट साझा करें",
      "hospital": "अस्पताल",
      "hotel": "होटल",
      "restaurant": "रेस्तरां",
      "rating": "वेन्यू रेट करें",
    }
  },
  mr: {
    translation: {
      "welcome": "ट्रान्झिटसिंक लाईव्ह",
      "select_stadium": "तुमचे स्टेडियम निवडा",
      "live_score": "लाईव्ह धावसंख्या",
      "transit_info": "सामन्याशी जोडलेली वाहतूक",
      "emergency": "आणीबाणी आणि सेवा",
    }
  },
  te: {
    translation: {
      "welcome": "ట్రాన్సిట్ సింక్ లైవ్",
      "select_stadium": "మీ స్టేడియంను ఎంచుకోండి",
    }
  },
  ta: {
    translation: {
      "welcome": "டிரான்ஸிட் சிங்க் லைவ்",
      "select_stadium": "உங்கள் மைதானத்தைத் தேர்ந்தெடுக்கவும்",
    }
  },
  kn: {
    translation: {
      "welcome": "ಟ್ರಾನ್ಸಿಟ್ ಸಿಂಕ್ ಲೈವ್",
      "select_stadium": "ನಿಮ್ಮ ಕ್ರೀಡಾಂಗಣವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
