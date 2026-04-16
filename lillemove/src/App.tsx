import { useState, useEffect } from 'react';
import './index.css';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Users,
  Building2,
  Shield,
  Clock,
  Eye,
  Heart,
  Sparkles,
  Mountain,
  Compass,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  Target,
  Ticket,
  Play
} from 'lucide-react';
import { Camera } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

// langues
type Language = 'FR' | 'EN';


interface Translation {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  business: {
    title: string;
    subtitle: string;
    benefits: {
      timeTitle: string;
      timeDesc: string;
      visibilityTitle: string;
      visibilityDesc: string;
      healthTitle: string;
      healthDesc: string;
    };
  };
  kpi: {
    title: string;
    subtitle: string;
    conversion: string;
    activities: string;
    retention: string;
  };
  ethics: {
    title: string;
    privacy: string;
    noBias: string;
  };
  demo: {
    title: string;
    subtitle: string;
    placeholder: string;
    userMessage: string;
    botResponse: string;
  };
  video: {
    title: string;
    subtitle: string;
    step1: string;
    step2: string;
    step3: string;
  };
  footer: {
    description: string;
    resources: string;
    follow: string;
    rights: string;
  };
}

// traduction
const translations: Record<Language, Translation> = {
  FR: {
    hero: {
      title: "Lille bouge avec vous, peu importe le ciel.",
      subtitle: "Le compagnon intelligent qui adapte vos sorties sportives et culturelles à la météo lilloise.",
      cta: "Ajouter à Discord"
    },
    business: {
      title: "Une Valeur Ajoutée pour Tous",
      subtitle: "Des bénéfices concrets pour utilisateurs et partenaires",
      benefits: {
        timeTitle: "Gain de Temps",
        timeDesc: "Recommandations instantanées adaptées à la météo. Fini les recherches interminables.",
        visibilityTitle: "Visibilité Locale",
        visibilityDesc: "Nos partenaires (Climb Up, Urban Padel, Zoo de Lille) gagnent en visibilité directe.",
        healthTitle: "Réduction de la Sédentarité",
        healthDesc: "Plus d'excuses ! Des suggestions adaptées pour rester actif toute l'année."
      }
    },
    kpi: {
      title: "Performance & Impact Mesurable",
      subtitle: "Des résultats concrets pour votre business",
      conversion: "Taux de Conversion des Codes Promos",
      activities: "Activités Suggérées par Jour",
      retention: "Utilisateurs Récurrents"
    },
    ethics: {
      title: "Éthique & Confidentialité",
      privacy: "Aucune donnée personnelle stockée. Vos informations restent privées.",
      noBias: "Algorithme transparent sans biais de recommandation."
    },
    demo: {
      title: "Découvrez LilleMove en Action",
      subtitle: "Testez une conversation typique avec notre bot",
      placeholder: "Tapez votre message...",
      userMessage: "Je cherche une activité",
      botResponse: "Bonjour ! Il fait actuellement 14°C et il pleut à Lille. Voici deux activités indoor :\n\n🧗 1. Escalade à Climb Up\n-10% avec le code MOOVE10\n📍 Rue de Tournai, Lille\n\n🎾 2. Session Padel au Urban Padel\n-15% avec le code MOOVE10\n📍 Boulevard de la Liberté"
    },
    video: {
      title: "Découvrez LilleMove en Action",
      subtitle: "Regardez comment le bot transforme votre expérience à Lille",
      step1: "Ajoutez LilleMoove Bot à votre serveur Discord en un clic",
      step2: "Demandez une activité et le bot analyse la météo en temps réel",
      step3: "Profitez de recommandations personnalisées avec des codes promo exclusifs"
    },
    footer: {
      description: "Votre compagnon intelligent pour découvrir Lille, quelle que soit la météo.",
      resources: "Ressources",
      follow: "Rejoins-nous",
      rights: "Tous droits réservés."
    }
  },
  EN: {
    hero: {
      title: "Lille moves with you, no matter the weather.",
      subtitle: "The smart companion that adapts your sports and cultural outings to Lille's weather.",
      cta: "Add to Discord"
    },
    business: {
      title: "Added Value for Everyone",
      subtitle: "Concrete benefits for users and partners",
      benefits: {
        timeTitle: "Time Saving",
        timeDesc: "Instant recommendations adapted to the weather. No more endless searches.",
        visibilityTitle: "Local Visibility",
        visibilityDesc: "Our partners (Climb Up, Urban Padel, Zoo de Lille) gain direct visibility.",
        healthTitle: "Reduced Sedentarity",
        healthDesc: "No more excuses! Adapted suggestions to stay active all year round."
      }
    },
    kpi: {
      title: "Measurable Performance & Impact",
      subtitle: "Concrete results for your business",
      conversion: "Promo Code Conversion Rate",
      activities: "Activities Suggested per Day",
      retention: "Recurring Users"
    },
    ethics: {
      title: "Ethics & Privacy",
      privacy: "No personal data stored. Your information remains private.",
      noBias: "Transparent algorithm without recommendation bias."
    },
    demo: {
      title: "Discover LilleMoove in Action",
      subtitle: "Try a typical conversation with our bot",
      placeholder: "Type your message...",
      userMessage: "I'm looking for an activity",
      botResponse: "Hello! It's currently 14°C and raining in Lille. Here are two indoor activities:\n\n🧗 1. Climbing at Climb Up\n-10% with code MOOVE10\n📍 Rue de Tournai, Lille\n\n🎾 2. Padel Session at Urban Padel\n-15% with code MOOVE10\n📍 Boulevard de la Liberté"
    },
    video: {
      title: "Discover LilleMove in Action",
      subtitle: "Watch how the bot transforms your experience in Lille",
      step1: "Add LilleMove Bot to your Discord server in one click",
      step2: "Ask for an activity and the bot analyzes the weather in real time",
      step3: "Enjoy personalized recommendations with exclusive promo codes"
    },
    footer: {
      description: "Your smart companion to discover Lille, whatever the weather.",
      resources: "Resources",
      follow: "Join us",
      rights: "All rights reserved."
    }
  }
};

//  DISCORD ICON 
const DiscordIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

//  MAIN APP 
export default function App() {
  const [language, setLanguage] = useState<Language>('FR');
  const [conversionRate, setConversionRate] = useState(0);
  const [activitiesCount, setActivitiesCount] = useState(0);
  const [retentionRate, setRetentionRate] = useState(0);

  const t = translations[language];

  // Animation des compteurs KPI
  const animateCounter = (setter: (val: number) => void, target: number, duration: number) => {
    const steps = 60;
    const increment = target / steps;
    const stepDuration = duration / steps;
    let current = 0;
    
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setter(target);
        clearInterval(interval);
      } else {
        setter(Math.floor(current));
      }
    }, stepDuration);
  };

  const handleKPIAnimation = (inView: boolean) => {
    if (inView && conversionRate === 0) {
      animateCounter(setConversionRate, 42, 2000);
      animateCounter(setActivitiesCount, 350, 2000);
      animateCounter(setRetentionRate, 78, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/*  HEADER */}
       <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
      <div className="flex items-center -ml-4 sm:-ml-6">
        <img
          src="/Moove.png"
          alt="LilleMoove"
          className="h-20 w-auto"
        />
      </div>
          
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Language Toggle */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setLanguage('FR')}
                className={`px-2 sm:px-3 py-1.5 rounded-md text-sm transition-all ${
                  language === 'FR' 
                    ? 'bg-white shadow-sm text-gray-900' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                FR
              </button>
              <button
                onClick={() => setLanguage('EN')}
                className={`px-2 sm:px-3 py-1.5 rounded-md text-sm transition-all ${
                  language === 'EN' 
                    ? 'bg-white shadow-sm text-gray-900' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                EN
              </button>
            </div>

            {/* Discord Bouton */}
            <a  href="https://discord.com/api/oauth2/authorize?client_id=1489257669721194658&permissions=2048&scope=bot" target="_blank" className="flex items-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white px-3 sm:px-6 py-2.5 rounded-lg transition-colors text-sm sm:text-base">
              <DiscordIcon />
              <span className="hidden sm:inline">{t.hero.cta}</span>
              <span className="sm:hidden">Discord</span>
            </a>
          </div>
        </div>
      </header>

      {/*  SECTION  */}
      <section className="relative bg-gradient-to-br from-[#0052CC] via-[#0052CC] to-[#10B981] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#10B981] rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                
                <span className="text-sm">Sport • Culture • Tourisme</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {t.hero.title}
              </h1>
              <p className="text-lg sm:text-xl mb-8 text-blue-100">
                {t.hero.subtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="https://discord.com/api/oauth2/authorize?client_id=1489257669721194658&permissions=2048&scope=bot"
                  target="_blank"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                  
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-white rounded-full blur-xl opacity-50"
                  ></motion.div>
                  <div className="relative bg-white text-[#0052CC] px-6 sm:px-8 py-3 sm:py-4 rounded-full flex items-center gap-2 shadow-xl">
                    <DiscordIcon />
                    <span className="font-semibold">{t.hero.cta}</span>
                  </div>
                </motion.a>

                <button 
                  onClick={() => document.getElementById('video')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all border border-white/30 flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  <span className="font-semibold">{language === 'FR' ? 'Voir la démo' : 'Watch Demo'}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1764671708519-447591cd8179?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWxsZSUyMGZyYW5jZSUyMGFyY2hpdGVjdHVyZSUyMHRvdXJpc218ZW58MXx8fHwxNzc1NjgxNzkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Lille"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0052CC]/50 to-transparent"></div>
              </div>
              
              {/* Floating Activity Cards */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl max-w-[200px]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div>
                    <img 
  src="/Moove.png" 
  alt="LilleMoove" 
  className="h-16 w-auto"
/>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BUSINESS VALUE */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t.business.title}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              {t.business.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {/* Time Saving */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-[#0052CC] to-[#003D99] flex items-center justify-center mb-4 sm:mb-6">
                <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                {t.business.benefits.timeTitle}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t.business.benefits.timeDesc}
              </p>
            </motion.div>

            {/* Visibilité */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center mb-4 sm:mb-6">
                <Eye className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                {t.business.benefits.visibilityTitle}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t.business.benefits.visibilityDesc}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-[#10B981]/10 text-[#10B981] rounded-full text-sm">Climb Up</span>
                <span className="px-3 py-1 bg-[#10B981]/10 text-[#10B981] rounded-full text-sm">Urban Padel</span>
                <span className="px-3 py-1 bg-[#10B981]/10 text-[#10B981] rounded-full text-sm">Zoo de Lille</span>
              </div>
            </motion.div>

            {/* Health */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-[#0052CC] to-[#10B981] flex items-center justify-center mb-4 sm:mb-6">
                <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                {t.business.benefits.healthTitle}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t.business.benefits.healthDesc}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/*  VIDEO TUTO */}
      <section id="video" className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0052CC]/10 to-[#10B981]/10 px-4 py-2 rounded-full mb-6">
              <Play className="w-5 h-5 text-[#0052CC]" />
              <span className="text-sm font-semibold text-gray-700">
                {language === 'FR' ? 'Tutoriel Vidéo' : 'Video Tutorial'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t.video.title}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              {t.video.subtitle}
            </p>
          </motion.div>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Video Player */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#36393f] to-[#2f3136] aspect-video">
                {/* Video Container */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center px-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0052CC] to-[#10B981] flex items-center justify-center mx-auto mb-6 shadow-xl">
                      <Play className="w-10 h-10 text-white ml-1" />
                    </div>
                    <p className="text-white text-lg font-semibold mb-2">
                      {language === 'FR' ? 'Cliquez' : 'Clic'}
                    </p>
                  </div>
                </div>
                {/* Placeholder for actual video - uncomment and add your video URL */}
                {/*
                <video
                  controls
                  className="w-full h-full object-cover"
                  poster="/path/to/thumbnail.jpg"
                >
                  <source src="/path/to/your/video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                */}
              </div>
              {/* Video Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-6 p-6 bg-gradient-to-r from-[#0052CC]/5 to-[#10B981]/5 rounded-xl border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0052CC] to-[#10B981] flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {language === 'FR'
                        ? 'Démarrez en 3 minutes'
                        : 'Get started in 3 minutes'}
                    </h3>
                    <p className="text-gray-600">
                      {language === 'FR'
                        ? "Découvrez comment LilleMoove Bot transforme vos recherches d'activités avec des recommandations météo en temps réel."
                        : 'Discover how LilleMoove Bot transforms your activity searches with real-time weather recommendations.'}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            {/* Steps */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {language === 'FR' ? 'Étapes du tutoriel' : 'Tutorial steps'}
              </h3>
              {/* Step 1 */}
              <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0052CC] to-[#003D99] flex items-center justify-center flex-shrink-0 shadow-md">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium leading-relaxed">
                      {t.video.step1}
                    </p>
                  </div>
                </div>
              </div>
              {/* Step 2 */}
              <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0052CC] to-[#10B981] flex items-center justify-center flex-shrink-0 shadow-md">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium leading-relaxed">
                      {t.video.step2}
                    </p>
                  </div>
                </div>
              </div>
              {/* Step 3 */}
              <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center flex-shrink-0 shadow-md">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium leading-relaxed">
                      {t.video.step3}
                    </p>
                  </div>
                </div>
              </div>
              {/* Bouton */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="pt-4"
              >
                <a  href="https://discord.com/api/oauth2/authorize?client_id=1489257669721194658&permissions=2048&scope=bot" target="_blank" className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white px-6 py-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg">
                  <DiscordIcon />
                  <span className="font-semibold">{t.hero.cta}</span>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

            {/*  KPI & ROI  */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#10B981] rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {t.kpi.title}
            </h2>
            <p className="text-lg sm:text-xl text-gray-300">
              {t.kpi.subtitle}
            </p>
          </motion.div>

          {/* KPI Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            onViewportEnter={() => handleKPIAnimation(true)}
            className="grid md:grid-cols-3 gap-6 sm:gap-8"
          >
            {/* KPI 1: Conversion */}
            <div className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-[#10B981]/50 transition-all">
              <div className="flex items-center justify-center mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center">
                  <Target className="w-7 h-7 text-white" />
                </div>
              </div>
              <div className="text-4xl sm:text-5xl font-bold mb-2 text-[#10B981] text-center">
                {conversionRate}%
              </div>
              <p className="text-base sm:text-lg text-gray-300 text-center">
                {t.kpi.conversion}
              </p>
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-400">
                <Ticket className="w-4 h-4" />
                <span>MOVE10</span>
              </div>
            </div>

            {/* KPI 2: Activities */}
            <div className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-[#0052CC]/50 transition-all">
              <div className="flex items-center justify-center mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0052CC] to-[#003D99] flex items-center justify-center">
                  <BarChart3 className="w-7 h-7 text-white" />
                </div>
              </div>
              <div className="text-4xl sm:text-5xl font-bold mb-2 text-[#0052CC] text-center">
                {activitiesCount}+
              </div>
              <p className="text-base sm:text-lg text-gray-300 text-center">
                {t.kpi.activities}
              </p>
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-400">
                <Compass className="w-4 h-4" />
                <span>Sport • Culture • Tourisme</span>
              </div>
            </div>

            {/* KPI 3: Retention */}
            <div className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-[#10B981]/50 transition-all">
              <div className="flex items-center justify-center mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#10B981] to-[#0052CC] flex items-center justify-center">
                  <Users className="w-7 h-7 text-white" />
                </div>
              </div>
              <div className="text-4xl sm:text-5xl font-bold mb-2 text-[#10B981] text-center">
                {retentionRate}%
              </div>
              <p className="text-base sm:text-lg text-gray-300 text-center">
                {t.kpi.retention}
              </p>
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Fidélité mensuelle</span>
              </div>
            </div>
          </motion.div>

          {/* Partner CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            <button className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-colors shadow-xl">
              <Building2 className="w-5 h-5" />
              <span>{language === 'FR' ? 'Devenir Partenaire' : 'Become a Partner'}</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/*  ETHICS SECTION  */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#0052CC] to-[#10B981] rounded-2xl mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t.ethics.title}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {/* Privacy */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0052CC]/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-[#0052CC]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {language === 'FR' ? 'Confidentialité' : 'Privacy'}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t.ethics.privacy}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* No Bias */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-[#10B981]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {language === 'FR' ? 'Transparence' : 'Transparency'}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t.ethics.noBias}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/*  FOOTER  */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div>
                    <img 
  src="/Moove.png" 
  alt="LilleMoove" 
  className="h-10 w-auto"
/>
                  </div>
                <span className="text-xl font-bold">LilleMove</span>
              </div>
              <p className="text-gray-400 text-sm">
                {t.footer.description}
              </p>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-bold mb-4">{t.footer.resources}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">Documentation</a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {language === 'FR' ? 'Guide d\'utilisation' : 'User Guide'}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {language === 'FR' ? 'Devenir partenaire' : 'Become a partner'}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">OpenWeather API</a>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-bold mb-4">{t.footer.follow}</h4>
              <div className="flex gap-3">
                <a href="https://discord.com/api/oauth2/authorize?client_id=1489257669721194658&permissions=2048&scope=bot" target="_blank" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#5865F2] flex items-center justify-center transition-colors" >
                  <DiscordIcon />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-gray-400 text-center sm:text-left">
              © 2026 LilleMoove. {t.footer.rights}
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                {language === 'FR' ? 'Mentions légales' : 'Legal Notice'}
              </a>
              <a href="#" className="hover:text-white transition-colors">
                {language === 'FR' ? 'Politique de confidentialité' : 'Privacy Policy'}
              </a>
              <a href="#" className="hover:text-white transition-colors">CGU</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
