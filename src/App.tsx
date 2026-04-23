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
  Quote
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
    { name: 'Contato', id: 'contact' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#1F2937] font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => scrollToSection('home')}
            id="nav-logo"
          >
            <div className="w-10 h-10 vibrant-gradient rounded-xl flex items-center justify-center shadow-lg">
              <Church className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-800">Igreja Esperança</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 font-medium text-gray-500">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm hover:text-blue-500 transition-colors uppercase tracking-tight"
                id={`nav-link-${link.id}`}
              >
                {link.name}
              </button>
            ))}
            <button 
              className="bg-[#4D96FF] text-white px-6 py-2 rounded-full text-sm font-bold shadow-md hover:bg-blue-600 transition-all"
              onClick={() => scrollToSection('prayer')}
              id="nav-cta"
            >
              Pedir Oração
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-gray-600" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            id="mobile-menu-toggle"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-gray-100 overflow-hidden shadow-xl"
              id="mobile-menu"
            >
              <div className="px-4 py-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="text-left text-lg py-2 border-b border-gray-50 text-gray-600 font-medium"
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
      <section id="home" className="pt-32 pb-20 px-4 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-bold tracking-wide uppercase mb-6">
              Seja Bem-vindo
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight text-gray-900">
              Um lugar para <span className="text-[#4D96FF]">pertencer</span> e crescer.
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed">
              Nossa missão é amar a Deus, servir ao próximo e compartilhar a esperança que transforma vidas todos os dias.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <button 
                className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:bg-black transition-all w-full sm:w-auto"
                onClick={() => scrollToSection('schedule')}
              >
                Ver Programação
              </button>
              <button 
                className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all w-full sm:w-auto"
                onClick={() => scrollToSection('prayer')}
              >
                Pedir Oração
              </button>
            </div>
          </motion.div>
        </div>
        <div className="flex-1 w-full max-w-lg relative py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full h-full vibrant-gradient rounded-[48px] shadow-2xl relative overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&q=80&w=800" 
              alt="Igreja" 
              className="w-full h-full object-cover mix-blend-overlay opacity-60"
            />
            <div className="absolute inset-0 flex items-center justify-center p-10 text-white text-center">
              <div className="glass-card p-8 rounded-3xl space-y-4">
                <div className="w-16 h-16 bg-white/20 rounded-full mx-auto flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white fill-current" />
                </div>
                <h2 className="text-2xl font-bold">Culto da Família</h2>
                <p className="text-sm opacity-90">Domingo às 18:30h</p>
                <div className="pt-4">
                  <div className="bg-white/20 py-2 px-4 rounded-full text-xs font-mono font-bold tracking-widest">
                    VEM PRA CÁ
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-400 rounded-3xl -z-10 opacity-20"></div>
          <div className="absolute -top-4 -right-4 w-48 h-48 bg-yellow-400 rounded-full -z-10 opacity-20"></div>
        </div>
      </section>

      {/* Verse of the Day */}
      <section className="py-20 bg-white border-y border-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl vibrant-gradient shadow-lg mb-8">
            <Quote className="text-white w-7 h-7" />
          </div>
          <h2 className="text-xs uppercase tracking-[0.4em] font-extrabold text-blue-500 mb-8">Palavra de Hoje</h2>
          {loadingVerse ? (
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-100 rounded-xl w-3/4 mx-auto"></div>
              <div className="h-4 bg-gray-100 rounded-full w-1/4 mx-auto"></div>
            </div>
          ) : verseData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <p className="text-3xl md:text-5xl leading-tight font-extrabold text-gray-900 tracking-tight">
                "{verseData.verse}"
              </p>
              <p className="text-lg font-bold text-gray-400 uppercase tracking-widest">
                — {verseData.reference}
              </p>
              <div className="pt-10 max-w-lg mx-auto">
                <p className="text-gray-500 text-lg leading-relaxed font-medium">
                  {verseData.reflection}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1">
            <span className="text-blue-500 uppercase tracking-widest text-sm font-black mb-4 block">Sobre Nós</span>
            <h2 className="text-5xl font-extrabold mb-8 text-gray-900 leading-tight">Nossa <span className="text-[#FF6B6B]">Essência</span> & Caminho</h2>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed font-medium">
              Acreditamos que a igreja é mais que um prédio; é um corpo vivo pronto para servir. Nossa história é escrita por vidas transformadas.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
              <div className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-all">
                <Heart className="text-red-400 mb-4" />
                <h3 className="font-bold text-xl mb-2">Comixão</h3>
                <p className="text-sm text-gray-500 font-medium">O amor ao próximo é o que nos move e define nossas ações.</p>
              </div>
              <div className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-all">
                <Quote className="text-yellow-500 mb-4" />
                <h3 className="font-bold text-xl mb-2">Fundamento</h3>
                <p className="text-sm text-gray-500 font-medium">Vivemos e ensinamos a Palavra de forma prática e real.</p>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="relative">
              <div className="aspect-square bg-yellow-100 rounded-[64px] absolute inset-0 -rotate-6"></div>
              <div className="aspect-square rounded-[64px] overflow-hidden shadow-2xl relative z-10">
                <img src="https://images.unsplash.com/photo-1544427928-c49bcdee84ba?auto=format&fit=crop&q=80&w=800" alt="Comunidade" className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-1/2 -right-10 w-24 h-24 vibrant-gradient rounded-3xl opacity-20 -z-10 animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-32 px-4 bg-gray-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 vibrant-gradient rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-blue-400 bg-blue-400/10 px-4 py-1 rounded-full uppercase tracking-widest text-xs font-black inline-block mb-4">Programação</span>
            <h2 className="text-5xl font-extrabold tracking-tight">Vem celebrar <span className="text-yellow-400 underline decoration-blue-500 underline-offset-8">conosco</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { day: 'Domingo', time: '09h00', title: 'Escola Bíblica' },
              { day: 'Domingo', time: '18h30', title: 'Culto de Celebração', primary: true },
              { day: 'Quarta-feira', time: '19h30', title: 'Noite de Poder' },
              { day: 'Sábado', time: '19h00', title: 'Jovens (Link)' },
              { day: 'Sexta-feira', time: '06h00', title: 'Alvorada de Oração' },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.02 }}
                className={`p-8 rounded-[40px] flex flex-col justify-between h-[300px] transition-all ${item.primary ? 'vibrant-gradient text-white' : 'bg-white/5 border border-white/10'}`}
              >
                <div>
                  <div className={`text-xs uppercase font-black tracking-widest mb-6 ${item.primary ? 'text-white/80' : 'text-blue-400'}`}>
                    {item.day}
                  </div>
                  <h3 className="text-3xl font-extrabold mb-2 leading-tight">{item.title}</h3>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-2xl ${item.primary ? 'bg-white/20' : 'bg-white/10'}`}>
                    <Clock size={20} />
                  </div>
                  <span className="text-2xl font-bold">{item.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section id="events" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-red-500 uppercase tracking-widest text-sm font-black mb-4 block">Agenda Ativa</span>
              <h2 className="text-5xl font-extrabold tracking-tight text-gray-900">Eventos <span className="text-blue-500">Prata</span> e Ouro</h2>
            </div>
            <button className="bg-yellow-100 text-yellow-700 px-6 py-3 rounded-2xl font-bold hover:bg-yellow-200 transition-all">
              Calendário Completo
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              { 
                date: '15 MAI', 
                title: 'Conferência de Família', 
                desc: 'Um final de semana de aprendizado e fortalecimento para o lar.',
                img: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800'
              },
              { 
                date: '02 JUN', 
                title: 'Impacto Regional', 
                desc: 'Ação social e evangelismo em diversos bairros da nossa cidade.',
                img: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=800'
              },
            ].map((event, idx) => (
              <div key={idx} className="group flex bg-white rounded-[40px] shadow-2xl shadow-gray-200/50 overflow-hidden border border-gray-50 flex-col sm:flex-row h-full">
                <div className="sm:w-1/2 aspect-square relative overflow-hidden">
                  <img src={event.img} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-2xl font-black text-xs shadow-lg">
                    {event.date}
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-center">
                  <h3 className="text-2xl font-extrabold mb-4 text-gray-900 leading-tight">{event.title}</h3>
                  <p className="text-gray-500 font-medium leading-relaxed mb-6">{event.desc}</p>
                  <button className="text-blue-500 font-black text-sm uppercase tracking-widest hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                    Saiba mais →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prayer Request Section */}
      <section id="prayer" className="py-24 px-4 bg-[#FDFCF8]">
        <div className="max-w-5xl mx-auto vibrant-gradient p-12 md:p-20 rounded-[60px] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="grid grid-cols-10 h-full">
              {Array.from({ length: 100 }).map((_, i) => (
                <div key={i} className="border-r border-b border-white"></div>
              ))}
            </div>
          </div>
          
          <div className="relative z-10 text-center text-white">
            <h2 className="text-5xl md:text-6xl font-black mb-8 tracking-tight">Conte com <span className="underline decoration-white/30">Nossas</span> Orações</h2>
            <p className="text-xl opacity-90 mb-12 font-medium max-w-2xl mx-auto">
              Nossa equipe de intercessão está pronta para orar por você. Compartilhe seu desafio ou gratidão.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Seu Nome" className="bg-white p-5 rounded-2xl text-gray-900 focus:outline-none shadow-lg font-bold" />
              <input type="email" placeholder="WhatsApp / E-mail" className="bg-white p-5 rounded-2xl text-gray-900 focus:outline-none shadow-lg font-bold" />
              <textarea placeholder="Como podemos orar por você?" rows={3} className="md:col-span-2 bg-white p-5 rounded-2xl text-gray-900 focus:outline-none shadow-lg font-bold"></textarea>
              <button className="md:col-span-2 bg-gray-900 text-white font-black py-5 rounded-2xl text-xl shadow-2xl hover:scale-[1.02] transition-transform active:scale-95">
                Enviar para Intercessão
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <span className="text-blue-500 uppercase tracking-widest text-xs font-black mb-4 block">Fale Conosco</span>
            <h2 className="text-5xl font-extrabold text-gray-900 mb-12 leading-tight">Portas sempre <span className="text-red-400">abertas</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="block text-xs uppercase font-black text-gray-400 tracking-[0.2em]">Endereço</span>
                  <span className="text-lg font-bold text-gray-700">Rua das Oliveiras, 450 — São Paulo, SP</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-xs uppercase font-black text-gray-400 tracking-[0.2em]">Telefone</span>
                  <span className="text-lg font-bold text-gray-700">(11) 98765-4321</span>
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="block text-xs uppercase font-black text-gray-400 tracking-[0.2em]">E-mail</span>
                  <span className="text-lg font-bold text-gray-700">contato@igrejahaesperanca.com.br</span>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 border-2 border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-100 transition-all cursor-pointer">
                    <Instagram size={20} />
                  </div>
                  <div className="w-12 h-12 border-2 border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-100 transition-all cursor-pointer">
                    <Facebook size={20} />
                  </div>
                  <div className="w-12 h-12 border-2 border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-100 transition-all cursor-pointer">
                    <Youtube size={20} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-10 rounded-[48px] shadow-2xl border border-gray-50 flex flex-col justify-center items-center text-center">
            <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-6">
              <div className="w-10 h-10 vibrant-gradient rounded-xl"></div>
            </div>
            <h3 className="text-2xl font-black mb-4">Contribua</h3>
            <p className="text-gray-500 font-medium mb-8 leading-relaxed">Sua oferta ajuda a manter nossos ministérios e ações sociais ativos.</p>
            <button className="text-blue-500 font-black underline underline-offset-8 text-lg">Dízimos & Ofertas (PIX)</button>
          </div>

          <div className="lg:col-span-3 h-[500px] mt-8">
            <ChurchMap />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="h-24 w-full px-12 border-t border-gray-100 flex items-center justify-between bg-white">
        <div className="flex gap-2 items-center">
          <div className="w-8 h-8 vibrant-gradient rounded-lg"></div>
          <span className="font-black text-gray-900 tracking-tight">Igreja Esperança</span>
        </div>
        <div className="hidden md:flex gap-8 text-xs font-black uppercase tracking-[0.2em] text-gray-400">
          <span>© 2026</span>
          <span className="text-blue-500">Cidade Viva</span>
          <span>A Paz seja convosco</span>
        </div>
      </footer>
    </div>
  );
}
