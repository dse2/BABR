import React, { useState, useEffect, useMemo } from 'react';
import { SERVICES, TEAM, PRODUCTS } from './constants';
import { Barber, Service, Product, SelectedProduct, User } from './types';
import { AssistantChat } from './components/AssistantChat';
import { BookingModal } from './components/BookingModal';
import { ProfessionalModal } from './components/ProfessionalModal';
import { ProductModal } from './components/ProductModal';
import { AdminDashboard } from './components/AdminDashboard'; // 1. IMPORTAMOS O PAINEL AQUI

const REVIEWS = [
  { name: "Luiz", comment: "Muito bom", stars: 5 },
  { name: "Bernardo", comment: "Ótimo atendimento e serviço prestado estão de parabéns.", stars: 5 },
  { name: "Hugo", comment: "Ótimo atendimento", stars: 5 },
  { name: "Alexandre", comment: "Excelente barbearia! Ambiente moderno, atendimento impecável, barbeiros muito profissionais e serviços de altíssima qualidade. Experiência 5 estrelas do início ao fim", stars: 5 }
];

const App: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState<Barber | null>(null);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [activeServiceTab, setActiveServiceTab] = useState<'all' | 'corte' | 'barba' | 'estetica'>('all');
  const [productFilterMode, setProductFilterMode] = useState<'all' | 'brand' | 'category'>('all');
  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<Product['category'] | 'all'>('all');
  const [showAllServices, setShowAllServices] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'main' | 'cursos' | 'sobre' | 'trabalhe'>('main');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // 2. ADICIONAMOS A "CHAVE" PARA LIGAR/DESLIGAR O PAINEL
  const [showAdmin, setShowAdmin] = useState(false);

  const carouselImages = [
    "https://lh3.googleusercontent.com/p/AF1QipPY8cZE_jI0vCbsdMPJ_Lu5wq_YwDdSgXT5XsDK=s680-w680-h510-rw",
    "https://lh3.googleusercontent.com/p/AF1QipMsfThVDthWGc0Tfa1WLWXA1HxOcnj2EL-k1DkH=s680-w680-h510-rw",
    "https://lh3.googleusercontent.com/p/AF1QipOD4xcQ1PjR6eUHdQy5XGucWbTpqLWbWydmuXmK=s680-w680-h510-rw",
    "https://lh3.googleusercontent.com/p/AF1QipN2xQDMG4ZZuea-tyCwdi1NIBBoQ8Ypwxzn1loj=s680-w680-h510-rw",
    "https://lh3.googleusercontent.com/p/AF1QipM1VAuSRyDV2Dv80JqSocFO3Seya7uF30ZYdHHD=s680-w680-h510-rw",
    "https://lh3.googleusercontent.com/p/AF1QipPH1qJ0UF3KI3Reuwq75ayjUmW4wTEROoBy8ows=s680-w680-h510-rw"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentReviewIndex((prev) => (prev + 1) % REVIEWS.length);
        setIsTransitioning(false);
      }, 600);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // @ts-ignore
    window.handleGoogleResponse = (response: any) => {
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      setUser({
        name: payload.name,
        email: payload.email,
        picture: payload.picture
      });
    };

    // @ts-ignore
    if (window.google) {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: "703273183572-YOUR_ACTUAL_ID.apps.googleusercontent.com", // Mock ID, must be configured
        callback: (window as any).handleGoogleResponse
      });
      // @ts-ignore
      google.accounts.id.renderButton(
        document.getElementById("googleBtnHeader"),
        { theme: "outline", size: "medium", shape: "pill" }
      );
    }
  }, []);

  const toggleService = (service: Service) => {
    setSelectedServices(prev => {
      const isSelected = prev.find(s => s.id === service.id);
      return isSelected ? prev.filter(s => s.id !== service.id) : [...prev, service];
    });
  };

  const updateProductQuantity = (product: Product, delta: number) => {
    setSelectedProducts(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        const newQty = existing.quantity + delta;
        if (newQty <= 0) return prev.filter(p => p.id !== product.id);
        return prev.map(p => p.id === product.id ? { ...p, quantity: newQty } : p);
      } else if (delta > 0) {
        return [...prev, { ...product, quantity: delta }];
      }
      return prev;
    });
  };

  const handleAddFromModal = (product: Product, quantity: number) => {
    setSelectedProducts(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p);
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const uniqueBrands = useMemo(() => Array.from(new Set(PRODUCTS.map(p => p.brand).filter(Boolean))).sort() as string[], []);
  const uniqueCategories = useMemo(() => Array.from(new Set(PRODUCTS.map(p => p.category))).sort() as Product['category'][], []);

  const filteredServices = useMemo(() => {
    return activeServiceTab === 'all' 
      ? SERVICES 
      : SERVICES.filter(s => s.category === activeServiceTab || (activeServiceTab === 'estetica' && s.category === 'quimica'));
  }, [activeServiceTab]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      if (productFilterMode === 'all') return true;
      if (productFilterMode === 'brand') return !activeBrand || p.brand === activeBrand;
      if (productFilterMode === 'category') return activeCategory === 'all' || p.category === activeCategory;
      return true;
    });
  }, [productFilterMode, activeBrand, activeCategory]);

  const totalItemsCount = selectedServices.length + selectedProducts.reduce((acc, p) => acc + p.quantity, 0);
  const totalPrice = selectedServices.reduce((acc, s) => acc + s.price, 0) + 
                     selectedProducts.reduce((acc, p) => acc + (p.price * p.quantity), 0);

  const navigateTo = (view: 'main' | 'cursos' | 'sobre' | 'trabalhe', sectionId?: string) => {
    setCurrentView(view);
    setIsSidebarOpen(false);
    if (view === 'main' && sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  };

  const TitleDecorator = () => (
    <div className="inline-flex h-3 w-8 -skew-x-[25deg] overflow-hidden rounded-sm mx-3 align-middle">
      <div className="h-full w-1/2 bg-blue-600" />
      <div className="h-full w-1/2 bg-red-600" />
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-black pb-24 md:pb-20">
      <header className="sticky top-0 z-40 bg-black border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-5 cursor-pointer" onClick={() => { if(currentView !== 'main') navigateTo('main'); }}>
            <img src="https://i.postimg.cc/XYvTyFcM/logo-png.jpg" alt="Logo" className="h-10 md:h-14 w-auto rounded-xl" />
            <div className="flex flex-col">
              <span className="text-white text-lg md:text-2xl font-black italic tracking-tighter uppercase leading-none">MAN'S SPACE</span>
              <span className="text-gray-500 text-[8px] md:text-[9px] font-bold tracking-[0.4em] uppercase mt-1">Barber Street</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {!user ? (
              <div id="googleBtnHeader" className="hidden md:block"></div>
            ) : (
              <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full border border-white/20" />
            )}
            <button onClick={() => setIsBookingOpen(true)} className="hidden md:flex bg-white hover:bg-gray-200 text-black px-6 py-2.5 rounded-full font-black text-[10px] transition-all uppercase tracking-widest items-center gap-2">
              Agendar {totalItemsCount > 0 && <span className="bg-black text-white w-5 h-5 rounded-full flex items-center justify-center text-[8px]">{totalItemsCount}</span>}
            </button>
            <button onClick={() => setIsSidebarOpen(true)} className="text-white flex flex-col gap-1.5 p-2 group">
              <div className="w-8 h-1 bg-white rounded-full"></div>
              <div className="w-8 h-1 bg-white rounded-full"></div>
              <div className="w-8 h-1 bg-white rounded-full"></div>
            </button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] transition-opacity duration-500 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsSidebarOpen(false)} />
      <div className={`fixed top-0 right-0 h-full w-80 bg-white z-[110] transition-transform duration-500 transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col shadow-2xl`}>
        <div className="p-8 border-b border-gray-100 flex justify-between items-center"><span className="font-black italic text-black uppercase">Menu</span><button onClick={() => setIsSidebarOpen(false)} className="text-3xl font-light">&times;</button></div>
        <nav className="flex-1 p-8 space-y-6">
          {['PROFISSIONAIS', 'PRODUTOS', 'SERVIÇOS', 'CURSOS', 'TRABALHE CONOSCO', 'SOBRE NÓS'].map((label) => (
            <button key={label} onClick={() => label === 'PROFISSIONAIS' ? navigateTo('main', 'profissionais') : label === 'PRODUTOS' ? navigateTo('main', 'produtos') : label === 'SERVIÇOS' ? navigateTo('main', 'servicos') : label === 'CURSOS' ? navigateTo('cursos') : label === 'TRABALHE CONOSCO' ? navigateTo('trabalhe') : navigateTo('sobre')} className="w-full text-left font-black text-xl text-black hover:text-blue-600 transition-colors uppercase italic tracking-tighter flex items-center justify-between group">{label}<span className="opacity-0 group-hover:opacity-100 transition-all text-sm">➔</span></button>
          ))}
        </nav>
      </div>

      {currentView === 'main' && (
        <main className="container mx-auto px-6">
          <section id="profissionais" className="mb-24 mt-12 md:mt-20">
            <div className="text-center mb-16 flex items-center justify-center"><TitleDecorator /><h3 className="text-2xl md:text-3xl font-black uppercase tracking-[0.2em] text-black italic">PROFISSIONAIS</h3><TitleDecorator /></div>
            <div className="flex flex-wrap justify-center gap-8">
              {TEAM.map(barber => (
                <button key={barber.id} onClick={() => setSelectedProfessional(barber)} className="w-64 bg-white rounded-[2.5rem] p-8 border border-gray-100 text-center group transition-all hover:shadow-2xl hover:border-black flex flex-col items-center">
                  <div className="w-24 h-24 mb-4 rounded-full overflow-hidden flex items-center justify-center text-xl font-black border border-gray-100 group-hover:border-black transition-all">{barber.image ? <img src={barber.image} alt={barber.name} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">{barber.initials}</div>}</div>
                  <div className="flex gap-1 mb-4"><div className="w-6 h-1 bg-blue-600 -skew-x-[25deg] rounded-sm" /><div className="w-6 h-1 bg-red-600 -skew-x-[25deg] rounded-sm" /></div>
                  <h4 className="text-lg font-black text-black leading-tight uppercase tracking-tighter">{barber.name}</h4>
                </button>
              ))}
            </div>
          </section>

          {/* ... O RESTO DO SEU CÓDIGO VISUAL CONTINUA IGUAL ... */}
          {/* ... NÃO VOU REPETIR TUDO AQUI PARA ECONOMIZAR ESPAÇO ... */}

        </main>
      )}

      {/* Mobile Sticky Bar */}
      {totalItemsCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-[60] bg-black p-4 md:hidden border-t border-white/10 flex items-center justify-between shadow-2xl animate-in slide-in-from-bottom-full">
          <div className="flex flex-col">
            <span className="text-white font-black italic text-sm uppercase tracking-tighter">{totalItemsCount} ITENS</span>
            <span className="text-blue-600 font-black text-[10px] uppercase">R$ {totalPrice.toFixed(2)}</span>
          </div>
          <button onClick={() => setIsBookingOpen(true)} className="bg-white text-black px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl">FINALIZAR ➔</button>
        </div>
      )}

      <footer className="mt-32 border-t border-gray-100 pt-24 pb-24 text-center">
        <div className="container mx-auto px-6 flex flex-col items-center">
          <div className="flex flex-col gap-1.5 mb-10"><div className="w-12 h-1.5 bg-blue-600 rounded-full"></div><div className="w-12 h-1.5 bg-red-600 rounded-full"></div><div className="w-12 h-1.5 bg-blue-600 rounded-full"></div></div>
          <div className="flex flex-col items-center gap-8 mb-12"><div className="flex items-center gap-8 bg-gray-50 px-10 py-8 rounded-[2.5rem] border border-gray-100 hover:shadow-2xl transition-all group"><img src="https://i.postimg.cc/XYvTyFcM/logo-png.jpg" alt="Logo" className="h-20 shadow-xl" /><div className="text-4xl md:text-5xl font-black italic tracking-tighter text-black uppercase leading-none text-left">Man's <br/> Space</div></div></div>
          <div className="flex justify-center gap-10 mb-20 text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">
            <a href="https://www.instagram.com/mans_spacebs/" target="_blank" className="hover:text-black">Instagram</a>
            <a href="https://api.whatsapp.com/send/?phone=5531992820181" target="_blank" className="hover:text-black">WhatsApp</a>
          </div>
          <div className="text-[9px] text-gray-300 font-bold uppercase tracking-[0.5em]">Man's Space Barber Street © 2022 • Alexandre Tech</div>
          
          {/* 3. ADICIONAMOS O BOTÃO SECRETO BEM AQUI NO FINAL */}
          <button onClick={() => setShowAdmin(true)} className="opacity-0 cursor-default">adm</button>
          
        </div>
      </footer>

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        user={user}
        initialServices={selectedServices} 
        initialProducts={selectedProducts} 
        onClearSelection={() => { setSelectedServices([]); setSelectedProducts([]); }} 
        onUserLogin={() => {
          // @ts-ignore
          google.accounts.id.prompt();
        }}
      />
      <ProfessionalModal professional={selectedProfessional} onClose={() => setSelectedProfessional(null)} onBook={() => setIsBookingOpen(true)} />
      <ProductModal product={viewingProduct} onClose={() => setViewingProduct(null)} onAddToCart={(p, q) => handleAddFromModal(p, q)} />
      <AssistantChat />

      {/* 4. ADICIONAMOS A LÓGICA: SE A "CHAVE" ESTIVER LIGADA, MOSTRE O PAINEL */}
      {showAdmin && <AdminDashboard onClose={() => setShowAdmin(false)} />}
      
    </div>
  );
};

export default App;