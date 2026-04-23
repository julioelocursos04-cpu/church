/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Church, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Heart, 
  Calendar, 
  Menu, 
  X, 
  Instagram, 
  Facebook, 
  Youtube,
  Quote,
  HandHeart,
  Coins
} from 'lucide-react';
import { getVerseOfTheDay } from './services/geminiService';
import ChurchMap from './components/ChurchMap';

interface VerseData {
  verse: string;
  reference: string;
  reflection: string;
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [verseData, setVerseData] = useState<VerseData | null>(null);
  const [loadingVerse, setLoadingVerse] = useState(true);

  useEffect(() => {
    async function fetchVerse() {
      const data = await getVerseOfTheDay();
      setVerseData(data);
      setLoadingVerse(false);
    }
    fetchVerse();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: 'Início', id: 'home' },
    { name: 'Sobre Nós', id: 'about' },
    { name: 'Cultos', id: 'schedule' },
    { name: 'Eventos', id: 'events' },
    { name: 'Oração', id: 'prayer' },
    { name: 'Dízimos', id: 'donations' },
    { name: 'Contato', id: 'contact' },
  ];

  return (
    <div className="min-h-screen ethereal-bg text-[#2D3748] font-sans selection:bg-[#B89B72]/20">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 transition-all duration-500 bg-white/40 backdrop-blur-xl border-b border-white/50">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div 
            className="flex items-center gap-4 cursor-pointer group" 
            onClick={() => scrollToSection('home')}
            id="nav-logo"
          >
            <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center soft-shadow group-hover:scale-105 transition-transform duration-500">
              <Church className="text-[#B89B72] w-6 h-6 stroke-[1.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-serif font-medium tracking-tight text-[#1A202C]">AD Cidade Esperança</span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-semibold">Casa de Adoração</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                aria-label={`Navegar para ${link.name}`}
                className="text-xs uppercase tracking-[0.2em] font-medium hover:text-brand-gold transition-colors relative group py-2"
                id={`nav-link-${link.id}`}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            <button 
              className="bg-[#1A202C] text-white px-8 py-3 rounded-full text-xs uppercase tracking-[0.2em] font-bold shadow-xl hover:bg-[#2D3748] hover:-translate-y-0.5 transition-all active:translate-y-0"
              onClick={() => scrollToSection('prayer')}
              aria-label="Ir para pedidos de intercessão"
              id="nav-cta"
            >
              Intercessão
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-3 rounded-full glass-panel soft-shadow" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            id="mobile-menu-toggle"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="lg:hidden fixed top-24 left-4 right-4 bg-white/90 backdrop-blur-2xl rounded-[32px] soft-shadow p-8 border border-white/50"
              id="mobile-menu"
            >
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="text-left text-sm uppercase tracking-[0.3em] py-4 border-b border-gray-50 text-gray-600 font-medium last:border-0"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-48 pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[80vw] h-[80vw] bg-[#B89B72]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 text-center lg:text-left z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-3 px-5 py-2 glass-panel rounded-full text-[10px] uppercase tracking-[0.4em] font-bold text-brand-gold mb-10 soft-shadow">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse"></span>
                Uma Comunidade de Fé
              </div>
              <h1 className="text-6xl md:text-8xl font-serif italic font-light leading-[1] mb-10 tracking-tight text-[#1A202C]">
                Lugar de <span className="font-normal text-brand-gold">Paz</span> e Restauração.
              </h1>
              <p className="text-xl text-gray-700 mb-12 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light italic">
                Caminhando juntos na graça, descobrindo o propósito e servindo com amor no coração de Cidade Esperança.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                <button 
                  className="bg-brand-gold text-white px-10 py-5 rounded-full font-bold shadow-2xl hover:bg-[#a68a5f] hover:-translate-y-1 transition-all active:translate-y-0 w-full sm:w-auto uppercase text-xs tracking-widest"
                  onClick={() => scrollToSection('schedule')}
                  aria-label="Ver programação completa de cultos"
                >
                  Programação
                </button>
                <button 
                  className="glass-panel text-[#2D3748] px-10 py-5 rounded-full font-bold hover:bg-white transition-all w-full sm:w-auto uppercase text-xs tracking-widest soft-shadow"
                  onClick={() => scrollToSection('about')}
                  aria-label="Conhecer a história e essência da nossa igreja"
                >
                  Quem Somos
                </button>
              </div>
            </motion.div>
          </div>
          <div className="flex-1 w-full max-w-xl relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="relative aspect-[4/5] rounded-[80px] overflow-hidden soft-shadow group"
            >
              <img 
                src="https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&q=80&w=1200" 
                alt="Igreja" 
                className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <div className="absolute bottom-12 left-12 right-12">
                <div className="glass-panel p-8 rounded-[40px] text-center border-white/20">
                  <h3 className="text-white text-xl font-serif italic mb-2">"A graça de Deus nos basta."</h3>
                  <div className="w-12 h-[1px] bg-[#B89B72] mx-auto"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Verse of the Day */}
      <section className="py-32 relative">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="w-16 h-16 glass-panel rounded-full mx-auto flex items-center justify-center soft-shadow mb-12">
            <Quote className="text-brand-gold w-6 h-6 stroke-[1.5]" />
          </div>
          {loadingVerse ? (
            <div className="animate-pulse space-y-8">
              <div className="h-12 bg-black/5 rounded-2xl w-3/4 mx-auto"></div>
              <div className="h-4 bg-black/5 rounded-full w-1/4 mx-auto"></div>
            </div>
          ) : verseData && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <h2 className="text-4xl md:text-6xl font-serif italic font-light text-[#1A202C] leading-tight tracking-tight">
                "{verseData.verse}"
              </h2>
              <div className="flex items-center justify-center gap-4">
                <div className="h-[1px] w-8 bg-brand-gold/30"></div>
                <p className="text-sm font-bold text-brand-gold uppercase tracking-[0.4em]">
                  {verseData.reference}
                </p>
                <div className="h-[1px] w-8 bg-brand-gold/30"></div>
              </div>
              <p className="text-gray-600 font-light text-xl italic max-w-2xl mx-auto border-t border-black/5 pt-10 px-8 leading-relaxed">
                {verseData.reflection}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-brand-gold/5 blur-[120px] -z-10 rounded-full"></div>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          
          {/* Left: Enhanced Graphic Composition */}
          <div className="flex-1 w-full grid grid-cols-12 grid-rows-6 gap-4 aspect-square lg:aspect-[4/5]">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="col-span-8 row-span-4 rounded-[64px] overflow-hidden soft-shadow relative group"
            >
              <div className="absolute inset-0 bg-[#1A202C]/10 z-10"></div>
              <img src="https://images.unsplash.com/photo-1544427928-c49bcdee84ba?auto=format&fit=crop&q=80&w=800" alt="Nossa Comunidade" className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" />
              <div className="absolute bottom-8 left-8 z-20">
                <span className="text-[10px] uppercase tracking-[0.4em] text-white font-black opacity-60">Comunidade</span>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="col-span-4 row-span-3 rounded-[48px] bg-brand-gold/10 flex items-center justify-center p-8 text-center border border-brand-gold/20 soft-shadow"
            >
              <Quote className="text-brand-gold w-6 h-6 opacity-40 absolute top-6" />
              <span className="text-brand-gold font-serif italic text-lg leading-tight mt-4">Fé que Transforma</span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="col-span-4 row-start-4 row-span-3 rounded-[48px] overflow-hidden soft-shadow relative group"
            >
              <img src="https://images.unsplash.com/photo-1490730141103-6ca3d7589d44?auto=format&fit=crop&q=80&w=600" alt="Momentos de Oração" className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" />
              <div className="absolute inset-0 bg-brand-gold/20 mix-blend-overlay"></div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="col-span-8 row-span-2 rounded-[56px] glass-panel border-white/80 soft-shadow flex flex-col justify-center px-10"
            >
              <p className="text-brand-gold font-serif italic text-xl">"Aquele que começou a boa obra em vós a aperfeiçoará."</p>
              <span className="text-[9px] uppercase tracking-widest text-gray-400 mt-4 font-bold">— Filipenses 1:6</span>
            </motion.div>
          </div>

          {/* Right: Refined Content */}
          <div className="flex-1 space-y-12">
            <div>
              <span className="text-brand-gold uppercase tracking-[0.4em] text-[10px] font-black mb-6 block">Nossa Essência</span>
              <h2 className="text-5xl md:text-6xl font-serif font-light text-[#1A202C] italic leading-tight mb-8">Compromisso com a <br /><span className="font-normal text-brand-gold not-italic">Palavra & Vida</span></h2>
              <p className="text-xl text-gray-600 font-light leading-relaxed italic max-w-xl">
                A Assembleia de Deus em Cidade Esperança é uma família unida pelo desejo de manifestar o Reino de Deus em nossa comunidade através do amor e da verdade.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-12 border-t border-gray-100/50">
              <div className="space-y-6">
                <div className="w-14 h-14 glass-panel rounded-2xl flex items-center justify-center soft-shadow bg-brand-gold/5" aria-hidden="true">
                  <Heart className="text-brand-gold w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="text-2xl font-serif italic text-[#1A202C]">Comunhão</h3>
                <p className="text-gray-500 font-light leading-relaxed text-sm">Cuidamos uns dos outros como Cristo nos ensinou, fortalecendo laços de fé e amizade.</p>
              </div>
              <div className="space-y-6">
                <div className="w-14 h-14 glass-panel rounded-2xl flex items-center justify-center soft-shadow bg-brand-gold/5" aria-hidden="true">
                  <Quote className="text-brand-gold w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="text-2xl font-serif italic text-[#1A202C]">Verdade</h3>
                <p className="text-gray-500 font-light leading-relaxed text-sm">Fundados na rocha imutável das Escrituras Sagradas para uma vida com propósito.</p>
              </div>
            </div>
            
            <div className="pt-8">
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-[#1A202C] text-white px-10 py-5 rounded-full font-bold shadow-xl hover:bg-brand-gold hover:-translate-y-1 transition-all active:translate-y-0 text-xs uppercase tracking-widest"
              >
                Visite-nos hoje
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <span className="text-brand-gold uppercase tracking-[0.4em] text-[10px] font-black mb-6 block">Celebração</span>
            <h2 className="text-5xl font-serif italic font-light text-[#1A202C]">Momentos de <span className="font-normal text-brand-gold not-italic">Encontro</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { day: 'Domingo', time: '09h00', title: 'Escola Bíblica Dom.' },
              { day: 'Domingo', time: '18h30', title: 'Culto de Celebração', highlight: true },
              { day: 'Quarta-feira', time: '19h30', title: 'Noite de Poder' },
              { day: 'Sábado', time: '19h00', title: 'Jovens (Conectados)' },
              { day: 'Sexta-feira', time: '06h00', title: 'Círculo de Oração' },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -8 }}
                className={`p-12 rounded-[56px] border border-white soft-shadow transition-all duration-500 flex flex-col justify-between min-h-[340px] ${item.highlight ? 'bg-[#1A202C] text-white' : 'glass-panel hover:bg-white'}`}
              >
                <div>
                  <div className={`text-[10px] uppercase font-black tracking-[0.3em] mb-10 ${item.highlight ? 'text-brand-gold' : 'text-gray-600'}`}>
                    {item.day}
                  </div>
                  <h3 className="text-3xl font-serif italic font-light leading-tight">{item.title}</h3>
                </div>
                <div className="flex items-center gap-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.highlight ? 'bg-white/10' : 'bg-brand-gold/10'}`}>
                    <Clock size={18} className={item.highlight ? 'text-white' : 'text-brand-gold'} />
                  </div>
                  <span className="text-3xl font-light font-serif">{item.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section id="events" className="py-32 px-6 bg-[#1A202C] rounded-[80px] mx-4 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] bg-[#B89B72]/10 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/4"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-8">
            <div className="max-w-xl">
              <span className="text-brand-gold uppercase tracking-[0.4em] text-[10px] font-black mb-6 block">Agenda de Fé</span>
              <h2 className="text-5xl font-serif font-light text-white italic leading-tight">Prepare seu coração para <br /><span className="font-normal text-brand-gold not-italic">Nossos Encontros</span></h2>
            </div>
            <button 
              className="glass-panel text-white border-white/10 px-8 py-4 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white/10 transition-all soft-shadow"
              aria-label="Ver calendário completo de eventos"
            >
              Ver Todos os Eventos
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { 
                date: '15 MAI', 
                title: 'Conferência de Família', 
                desc: 'Um tempo precioso de restauração e cura para todos os lares.',
                img: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800'
              },
              { 
                date: '02 JUN', 
                title: 'Impacto Missionário', 
                desc: 'Manifestando a luz de Cristo através de ações de serviço e amor.',
                img: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=800'
              },
            ].map((event, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="group flex flex-col glass-panel border-white/5 rounded-[64px] overflow-hidden transition-all duration-700"
              >
                <div className="aspect-[16/10] relative overflow-hidden">
                  <img src={event.img} alt={event.title} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                  <div className="absolute top-8 left-8 bg-[#B89B72] text-white px-6 py-3 rounded-2xl font-black text-[10px] tracking-widest shadow-2xl">
                    {event.date}
                  </div>
                </div>
                <div className="p-12">
                  <h3 className="text-3xl font-serif italic font-light text-white mb-6 group-hover:text-brand-gold transition-colors">{event.title}</h3>
                  <p className="text-gray-400 font-light leading-relaxed mb-10 text-lg italic	">{event.desc}</p>
                  <button 
                    className="text-white border-b border-white/20 pb-2 text-[10px] uppercase tracking-[0.4em] font-bold hover:border-brand-gold hover:text-brand-gold transition-all"
                    aria-label={`Participar do evento: ${event.title}`}
                  >
                    Participar
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tithes and Offerings Section */}
      <section id="donations" className="py-32 px-6 bg-white/30 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-brand-gold/5 blur-[120px] -z-10 rounded-full"></div>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 space-y-10">
            <div>
              <span className="text-brand-gold uppercase tracking-[0.4em] text-[10px] font-black mb-6 block">Princípios de Fé</span>
              <h2 className="text-5xl font-serif font-light text-[#1A202C] italic leading-tight">A Alegria de <br /><span className="font-normal text-brand-gold not-italic">Semear e Contribuir</span></h2>
            </div>
            
            <div className="space-y-6 text-lg font-light text-gray-700 leading-relaxed italic border-l border-brand-gold/20 pl-8">
              <p>
                "Cada um contribua segundo propôs no seu coração; não com tristeza, ou por necessidade; porque Deus ama ao que dá com alegria." — 2 Co 9:7
              </p>
              <p className="not-italic text-base">
                O seu dízimo e oferta são formas de adoração e reconhecimento da soberania de Deus sobre nossas vidas. Através de sua fidelidade, mantemos os ministérios, cuidamos da casa do Senhor e estendemos as mãos aos que mais precisam em nossa comunidade.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="flex-1 p-8 glass-panel rounded-[40px] soft-shadow border-white/80 group hover:bg-white transition-all duration-500">
                <div className="w-12 h-12 bg-brand-gold/10 rounded-2xl flex items-center justify-center mb-6 text-brand-gold">
                  <HandHeart className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif italic mb-2">Impacto Social</h3>
                <p className="text-sm text-gray-600">Suas contribuições apoiam famílias carentes e projetos de assistência em Cidade Esperança.</p>
              </div>
              <div className="flex-1 p-8 glass-panel rounded-[40px] soft-shadow border-white/80 group hover:bg-white transition-all duration-500">
                <div className="w-12 h-12 bg-brand-gold/10 rounded-2xl flex items-center justify-center mb-6 text-brand-gold">
                  <Coins className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif italic mb-2">Reino em Expansão</h3>
                <p className="text-sm text-gray-600">Investimento na manutenção do templo e na propagação do Evangelho através de nossos eventos.</p>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full max-w-md">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="glass-panel p-12 md:p-16 rounded-[64px] soft-shadow border-white border-8 shadow-2xl relative"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#1A202C] rounded-full flex items-center justify-center text-white shadow-xl">
                <Quote className="w-8 h-8 opacity-20" />
              </div>
              
              <div className="text-center space-y-10">
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.4em] font-black text-brand-gold mb-4">Contribuição Online</h3>
                  <div className="w-24 h-24 vibrant-gradient rounded-[40px] shadow-2xl mx-auto flex items-center justify-center opacity-10"></div>
                  <div className="mt-[-60px]">
                    <span className="text-6xl font-serif italic text-gray-900 leading-none" aria-label="PIX">PIX</span>
                  </div>
                </div>

                <div className="p-6 bg-white/50 rounded-3xl border border-black/5 space-y-2">
                  <span className="text-[10px] uppercase font-black text-gray-500 tracking-[0.2em]">Chave de Acesso</span>
                  <p className="text-lg font-bold text-gray-800 break-all">contato@igrejahaesperanca.com.br</p>
                </div>

                <button 
                  className="w-full bg-brand-gold text-white font-bold py-6 rounded-[32px] text-xs uppercase tracking-[0.4em] shadow-2xl hover:bg-[#a68a5f] hover:-translate-y-1 transition-all active:translate-y-0 group"
                  aria-label="Copiar chave PIX para área de transferência"
                >
                  Copiar Chave PIX
                  <span className="block text-[8px] opacity-60 font-light mt-1">Ou Escanear QR Code</span>
                </button>

                <p className="text-[10px] text-gray-600 uppercase tracking-widest leading-relaxed">
                  Banco do Brasil | Ag: 1234-5 | CC: 98765-4 <br />
                  Assembleia de Deus Cidade Esperança
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Prayer Request Section */}
      <section id="prayer" className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="w-20 h-20 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-10" aria-hidden="true">
              <Heart className="text-brand-gold w-8 h-8 stroke-[1.5]" />
            </div>
            <h2 className="text-5xl font-serif italic text-[#1A202C] mb-6">Pedidos de <span className="font-normal text-brand-gold not-italic">Intercessão</span></h2>
            <p className="text-gray-600 font-light text-lg italic max-w-xl mx-auto">
              Nossa equipe de oração quer caminhar com você. No silêncio do espírito, levemos seus anseios aos pés do Altíssimo.
            </p>
          </div>
          
          <form className="glass-panel p-12 md:p-16 rounded-[64px] soft-shadow border-white/50 space-y-8" aria-label="Formulário de pedido de oração">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label htmlFor="prayer-name" className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-600 ml-4">Como devemos lhe chamar?</label>
                <input id="prayer-name" type="text" placeholder="Seu Nome" className="w-full bg-white/50 border border-black/5 rounded-3xl p-6 focus:outline-none focus:border-brand-gold transition-all font-light italic" aria-required="true" />
              </div>
              <div className="space-y-4">
                <label htmlFor="prayer-contact" className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-600 ml-4">Onde podemos lhe encontrar?</label>
                <input id="prayer-contact" type="text" placeholder="WhatsApp / E-mail" className="w-full bg-white/50 border border-black/5 rounded-3xl p-6 focus:outline-none focus:border-brand-gold transition-all font-light italic" aria-required="true" />
              </div>
              <div className="space-y-4 md:col-span-2">
                <label htmlFor="prayer-message" className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-600 ml-4">Qual seu clamor ou gratidão?</label>
                <textarea id="prayer-message" placeholder="..." rows={4} className="w-full bg-white/50 border border-black/5 rounded-3xl p-6 focus:outline-none focus:border-brand-gold transition-all font-light italic resize-none" aria-required="true"></textarea>
              </div>
            </div>
            <button 
              className="w-full bg-[#1A202C] text-white font-bold py-6 rounded-[32px] text-xs uppercase tracking-[0.4em] shadow-2xl hover:bg-brand-gold hover:-translate-y-1 transition-all active:translate-y-0"
              aria-label="Enviar meu pedido de oração"
            >
              Enviar Pedido
            </button>
          </form>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-20">
          <div className="lg:col-span-2 space-y-16">
            <div>
              <span className="text-brand-gold uppercase tracking-[0.4em] text-[10px] font-black mb-6 block">Conexão</span>
              <h2 className="text-5xl font-serif font-light text-[#1A202C] leading-tight italic">Nossas portas estão <br /><span className="font-normal text-brand-gold not-italic">Sempre Abertas</span></h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
              <div className="space-y-12">
                <div className="group">
                  <span className="block text-[10px] uppercase font-black text-gray-500 tracking-[0.3em] mb-4">Lugar de Encontro</span>
                  <address className="text-2xl font-serif italic font-light text-gray-800 leading-snug not-italic">Av. Paraíba, 48 — <br />Cidade Esperança, Natal - RN</address>
                </div>
                <div className="group">
                  <span className="block text-[10px] uppercase font-black text-gray-500 tracking-[0.3em] mb-4">Fala conosco</span>
                  <span className="text-2xl font-serif italic font-light text-gray-800 leading-snug">(84) 3205-2445</span>
                </div>
              </div>
              <div className="space-y-12">
                <div className="group">
                  <span className="block text-[10px] uppercase font-black text-gray-500 tracking-[0.3em] mb-4">Cartas Digitais</span>
                  <span className="text-xl font-serif italic text-gray-800">contato@igrejahaesperanca.com.br</span>
                </div>
                <div className="flex gap-6">
                  {[
                    { Icon: Instagram, label: 'Instagram' },
                    { Icon: Facebook, label: 'Facebook' },
                    { Icon: Youtube, label: 'Youtube' }
                  ].map(({ Icon, label }, i) => (
                    <div 
                      key={i} 
                      className="w-14 h-14 glass-panel rounded-full flex items-center justify-center text-gray-600 hover:text-brand-gold hover:border-brand-gold/50 transition-all cursor-pointer soft-shadow"
                      aria-label={`Seguir no ${label}`}
                      role="button"
                    >
                      <Icon size={20} className="stroke-[1.5]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass-panel p-12 rounded-[64px] soft-shadow border-white/50 flex flex-col justify-center items-center text-center group bg-white/40">
            <div className="w-24 h-24 bg-brand-gold/10 rounded-full flex items-center justify-center mb-8 soft-shadow group-hover:scale-110 transition-transform duration-500" aria-hidden="true">
              <Heart className="text-brand-gold w-8 h-8 fill-brand-gold/10" />
            </div>
            <h3 className="text-3xl font-serif italic font-light mb-6 text-[#1A202C]">Generosidade</h3>
            <p className="text-gray-700 font-light leading-relaxed mb-10 italic">
              "Honra ao Senhor com os teus bens..." <br /> Participe de nossa missão.
            </p>
            <button 
              onClick={() => scrollToSection('donations')}
              className="text-brand-gold font-black border-b border-brand-gold/20 pb-1 text-xs uppercase tracking-[0.4em] hover:border-brand-gold transition-all"
              aria-label="Ir para detalhes de dízimos e ofertas"
            >
              Dízimos & Ofertas
            </button>
          </div>

          <div className="lg:col-span-3 h-[600px] mt-12 rounded-[80px] overflow-hidden soft-shadow border-8 border-white">
            <ChurchMap />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-gray-100 bg-white/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 vibrant-gradient rounded-full opacity-10"></div>
              <span className="font-serif italic text-2xl font-light text-[#1A202C] tracking-tight">AD Cidade Esperança</span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.5em] text-[#B89B72] font-bold ml-12">Cidade Natal - RN</span>
          </div>
          
          <div className="flex items-center gap-6">
            {[
              { Icon: Instagram, label: 'Instagram', url: '#' },
              { Icon: Facebook, label: 'Facebook', url: '#' },
              { Icon: Youtube, label: 'Youtube', url: '#' }
            ].map(({ Icon, label, url }, i) => (
              <a 
                key={i} 
                href={url}
                target="_blank"
                rel="no-referrer"
                className="w-10 h-10 glass-panel rounded-full flex items-center justify-center text-gray-500 hover:text-brand-gold hover:border-brand-gold/50 transition-all cursor-pointer soft-shadow"
                aria-label={`Seguir AD Cidade Esperança no ${label}`}
              >
                <Icon size={16} className="stroke-[1.5]" />
              </a>
            ))}
          </div>

          <div className="flex gap-12 text-[10px] uppercase font-black tracking-[0.4em] text-gray-500">
            <button 
              onClick={() => scrollToSection('home')} 
              className="hover:text-brand-gold transition-colors cursor-pointer"
              aria-label="Voltar para o topo"
            >
              Início
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="hover:text-brand-gold transition-colors cursor-pointer"
              aria-label="Ir para seção fé"
            >
              Fé
            </button>
            <span aria-hidden="true">2026</span>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-gray-100 text-center">
          <p className="text-[9px] uppercase tracking-[0.6em] text-gray-600">© Feito com Amor & Revelação em Cidade Esperança</p>
        </div>
      </footer>
    </div>
  );
}
