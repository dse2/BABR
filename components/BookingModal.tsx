import React, { useState, useEffect } from 'react';
import { SERVICES, TEAM } from '../constants';
import { Service, Barber, SelectedProduct, User } from '../types';
import { db } from '../services/db'; // Importando nosso banco de dados

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  initialServices?: Service[];
  initialProducts?: SelectedProduct[];
  onClearSelection?: () => void;
  onUserLogin?: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ 
  isOpen, 
  onClose, 
  user,
  initialServices = [], 
  initialProducts = [],
  onClearSelection,
  onUserLogin
}) => {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<Service[]>(initialServices);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(initialProducts);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  
  // Estados de Agendamento
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [busyTimes, setBusyTimes] = useState<string[]>([]); // Horários ocupados
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [activeStepTab, setActiveStepTab] = useState<'servicos' | 'produtos'>('servicos');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());

  // Sincronizar props com estado interno
  useEffect(() => {
    if (isOpen) {
      setSelectedServices(initialServices);
      setSelectedProducts(initialProducts);
      setIsConfirmed(false);
      setError(null);
      if (initialServices.length > 0 || initialProducts.length > 0) {
        setStep(1);
      }
    }
  }, [isOpen, initialServices, initialProducts]);

  // Quando data ou barbeiro mudam, verificar disponibilidade
  useEffect(() => {
    const checkAvailability = async () => {
      if (selectedBarber && date) {
        setLoading(true);
        const busy = await db.getBusyTimes(selectedBarber.id, date);
        setBusyTimes(busy);
        setLoading(false);
      }
    };
    checkAvailability();
  }, [selectedBarber, date]);

  if (!isOpen) return null;

  const totalPrice = selectedServices.reduce((acc, s) => acc + s.price, 0) + 
                     selectedProducts.reduce((acc, p) => acc + (p.price * p.quantity), 0);

  const handleComplete = async () => {
    if (!user) {
      if (onUserLogin) onUserLogin();
      return;
    }

    if (!selectedBarber || !date || !time) return;

    setLoading(true);
    setError(null);

    try {
      // Tentar salvar no Banco de Dados
      await db.createAppointment({
        clientName: user.name,
        clientEmail: user.email,
        barberId: selectedBarber.id,
        barberName: selectedBarber.name,
        serviceNames: selectedServices.map(s => s.name),
        productNames: selectedProducts.map(p => `${p.quantity}x ${p.name}`),
        date: date,
        time: time,
        totalPrice: totalPrice
      });

      setIsConfirmed(true);
    } catch (err: any) {
      setError(err.message || 'Erro ao agendar. Tente outro horário.');
    } finally {
      setLoading(false);
    }
  };

  const finalize = () => {
    onClose();
    if (onClearSelection) onClearSelection();
    setStep(1);
    setSelectedBarber(null);
    setSelectedServices([]);
    setSelectedProducts([]);
    setDate('');
    setTime('');
    setIsConfirmed(false);
  };

  // Funções auxiliares (manter as mesmas de antes)
  const updateProductQty = (id: string, delta: number) => {
    setSelectedProducts(prev => prev.map(p => p.id === id ? { ...p, quantity: Math.max(0, p.quantity + delta) } : p).filter(p => p.quantity > 0));
  };

  const toggleService = (service: Service) => {
    setSelectedServices(prev => {
      const isSelected = prev.find(s => s.id === service.id);
      return isSelected ? prev.filter(s => s.id !== service.id) : [...prev, service];
    });
  };

  const renderCalendar = () => {
    // (Mesma lógica de calendário visual do seu código anterior)
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    const today = new Date();
    today.setHours(0,0,0,0);
    const totalDays = new Date(year, month + 1, 0).getDate();
    const startDay = new Date(year, month, 1).getDay();
    const monthName = currentCalendarDate.toLocaleString('pt-br', { month: 'long' });

    const days = [];
    for (let i = 0; i < startDay; i++) days.push(<div key={`empty-${i}`} className="h-8" />);
    for (let d = 1; d <= totalDays; d++) {
      const currentDayDate = new Date(year, month, d);
      const isPast = currentDayDate < today;
      const isSunday = currentDayDate.getDay() === 0;
      const isDisabled = isPast || isSunday;
      const dateString = `${String(d).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/${year}`;
      const isSelected = date === dateString;

      days.push(
        <button key={d} disabled={isDisabled} onClick={() => { setDate(dateString); setTime(''); }} className={`h-8 w-8 rounded-lg flex items-center justify-center text-[10px] font-black transition-all ${isDisabled ? 'text-gray-200 cursor-not-allowed' : isSelected ? 'bg-black text-white scale-110 shadow-lg' : 'hover:bg-gray-100 text-black'}`}>
          {d}
        </button>
      );
    }

    return (
      <div className="bg-white rounded-2xl p-3 border border-gray-100">
        <div className="flex justify-between items-center mb-2">
          <button onClick={() => setCurrentCalendarDate(new Date(year, month - 1, 1))} className="p-1 font-black">←</button>
          <h4 className="text-[9px] font-black uppercase text-black italic">{monthName} {year}</h4>
          <button onClick={() => setCurrentCalendarDate(new Date(year, month + 1, 1))} className="p-1 font-black">→</button>
        </div>
        <div className="grid grid-cols-7 text-center mb-1 text-[7px] font-black text-gray-300">
          {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map(day => <div key={day}>{day}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">{days}</div>
      </div>
    );
  };

  const availableHours = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

  // --- RENDERIZAÇÃO DO VOUCHER (SUCESSO) ---
  if (isConfirmed && user) {
    return (
      <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 overflow-y-auto">
        <div className="bg-white w-full max-w-sm rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500 my-auto">
          <div className="bg-black p-8 text-center relative">
             <div className="flex justify-center gap-1 mb-4"><div className="w-10 h-1 bg-blue-600"></div><div className="w-10 h-1 bg-red-600"></div></div>
             <h3 className="text-white font-black italic text-2xl uppercase tracking-tighter leading-none">AGENDADO!</h3>
             <p className="text-gray-400 text-[8px] uppercase tracking-[0.3em] mt-3">Sua cadeira está reservada.</p>
          </div>
          <div className="p-6 md:p-8 space-y-5">
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-xl">
                   <span className="text-[7px] font-black text-gray-400 uppercase tracking-widest block mb-1">Profissional</span>
                   <span className="text-[10px] font-black text-black uppercase italic">{selectedBarber?.name}</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl text-right">
                   <span className="text-[7px] font-black text-gray-400 uppercase tracking-widest block mb-1">Data</span>
                   <span className="text-[10px] font-black text-black uppercase italic">{date} às {time}</span>
                </div>
             </div>
             
             <div className="flex flex-col items-center gap-4 py-2">
                <div className="w-32 h-32 border-4 border-black p-2 rounded-xl flex items-center justify-center bg-white shadow-lg">
                   <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=MANS_SPACE_${date}_${time}_${totalPrice}`} alt="QR Code" className="w-full h-full" />
                </div>
                <span className="text-[8px] text-center text-gray-400 px-4">Tire um print desta tela e apresente na recepção.</span>
             </div>
             <button onClick={finalize} className="w-full bg-black text-white font-black py-4 rounded-2xl text-[10px] uppercase tracking-[0.2em] shadow-xl">FECHAR</button>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDERIZAÇÃO DO MODAL DE SELEÇÃO ---
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className={`bg-white w-full max-w-sm rounded-[3rem] border border-gray-100 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 relative flex flex-col max-h-[90vh]`}>
        <div className="p-6 md:p-8 flex flex-col h-full">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-black text-black tracking-tight uppercase italic leading-none">Agendamento</h2>
            <button onClick={onClose} className="text-gray-300 hover:text-black text-3xl font-light">&times;</button>
          </div>

          {/* Steps Indicator */}
          <div className="flex justify-between mb-6 gap-2">
            {[1, 2, 3].map(s => <div key={s} className={`h-1 flex-1 rounded-full ${step >= s ? 'bg-black' : 'bg-gray-100'}`} />)}
          </div>

          <div className="flex-1 overflow-y-auto pr-1 no-scrollbar">
            
            {/* ETAPA 1: SERVIÇOS E PRODUTOS (IGUAL AO SEU) */}
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                 {!user && (
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-2xl flex flex-col items-center gap-2 mb-4">
                    <span className="text-[8px] font-black text-blue-800 uppercase text-center">Faça Login Google para agendar</span>
                    <div id="googleBtnModal"></div>
                  </div>
                )}
                <div className="flex justify-center bg-gray-50 p-1 rounded-full border border-gray-100 mb-4">
                  <button onClick={() => setActiveStepTab('servicos')} className={`flex-1 px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-widest transition-all ${activeStepTab === 'servicos' ? 'bg-black text-white' : 'text-gray-400'}`}>Serviços</button>
                  <button onClick={() => setActiveStepTab('produtos')} className={`flex-1 px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-widest transition-all ${activeStepTab === 'produtos' ? 'bg-black text-white' : 'text-gray-400'}`}>Produtos</button>
                </div>
                {/* Lista de Serviços e Produtos (Mesma lógica) */}
                <div className="space-y-2">
                  {activeStepTab === 'servicos' ? SERVICES.map(s => {
                    const isSelected = selectedServices.some(item => item.id === s.id);
                    return (
                      <button key={s.id} onClick={() => toggleService(s)} className={`w-full text-left p-3 rounded-xl border-2 transition-all ${isSelected ? 'border-black bg-gray-50' : 'border-gray-50 bg-white'}`}>
                        <div className="flex justify-between font-black uppercase text-[10px]"><span>{s.name}</span><span className="text-blue-600">R$ {s.price.toFixed(0)}</span></div>
                      </button>
                    );
                  }) : selectedProducts.length > 0 ? selectedProducts.map(p => (
                    <div key={p.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <span className="text-[9px] font-black uppercase text-black max-w-[60%] truncate">{p.name}</span>
                      <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-gray-100">
                         {/* Botões de quantidade */}
                        <button onClick={() => updateProductQty(p.id, -1)} className="w-6 h-6 flex items-center justify-center font-black text-xs hover:bg-gray-100 rounded">－</button>
                        <span className="font-black text-xs min-w-[15px] text-center">{p.quantity}</span>
                        <button onClick={() => updateProductQty(p.id, 1)} className="w-6 h-6 flex items-center justify-center font-black text-xs hover:bg-gray-100 rounded">＋</button>
                      </div>
                    </div>
                  )) : <div className="text-center py-6 text-[8px] font-black text-gray-300 uppercase tracking-widest italic">Nenhum produto selecionado</div>}
                </div>
              </div>
            )}

            {/* ETAPA 2: BARBEIRO (IGUAL) */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <h3 className="text-[9px] font-black text-gray-400 uppercase tracking-widest text-center">Selecione o Barbeiro</h3>
                <div className="grid grid-cols-2 gap-3">
                  {TEAM.map(b => (
                    <button key={b.id} onClick={() => { setSelectedBarber(b); setStep(3); }} className={`p-4 rounded-2xl border-2 flex flex-col items-center transition-all ${selectedBarber?.id === b.id ? 'border-black bg-gray-50 scale-105' : 'border-gray-50 bg-white hover:border-gray-200'}`}>
                      <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center text-lg font-black mb-2 border border-gray-100">{b.image ? <img src={b.image} alt={b.name} className="w-full h-full object-cover" /> : b.initials}</div>
                      <div className="text-[9px] font-black text-center text-black uppercase leading-none">{b.name.split(' ')[0]}</div>
                    </button>
                  ))}
                </div>
                <button onClick={() => setStep(1)} className="text-gray-400 text-[8px] font-black uppercase w-full text-center hover:text-black">← VOLTAR</button>
              </div>
            )}

            {/* ETAPA 3: DATA E HORA (COM INTELIGÊNCIA) */}
            {step === 3 && (
              <div className="space-y-5 animate-in fade-in slide-in-from-right-4 pb-4">
                <div className="space-y-3">
                  <label className="block text-[8px] font-black text-gray-400 uppercase tracking-widest text-center">AGENDA DE {selectedBarber?.name.split(' ')[0]}</label>
                  {renderCalendar()}
                  
                  {/* Grid de Horários com Bloqueio */}
                  <div className="grid grid-cols-3 gap-2 py-1">
                     {availableHours.map(t => {
                       const isBusy = busyTimes.includes(t);
                       return (
                         <button 
                           key={t} 
                           disabled={isBusy}
                           onClick={() => setTime(t)} 
                           className={`py-2 rounded-lg text-[9px] font-black border transition-all 
                             ${isBusy ? 'bg-red-50 text-red-300 border-transparent cursor-not-allowed line-through' : 
                               time === t ? 'bg-black text-white border-black shadow-md' : 
                               'bg-gray-50 text-gray-400 border-transparent hover:border-gray-200'}`
                           }
                         >
                           {t}
                         </button>
                       );
                     })}
                  </div>
                  {busyTimes.length > 0 && <p className="text-[8px] text-center text-red-400 font-bold">Alguns horários estão ocupados.</p>}
                </div>

                {error && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-xl text-[9px] font-black uppercase text-center border border-red-100">
                    {error}
                  </div>
                )}

                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <div className="flex justify-between font-black text-black text-xs italic uppercase tracking-tighter"><span>Total</span><span className="text-blue-600">R$ {totalPrice.toFixed(2)}</span></div>
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-gray-100 mt-auto bg-white">
            {step === 1 && (selectedServices.length > 0 || selectedProducts.length > 0) && (
              <button onClick={() => setStep(2)} className="w-full bg-black text-white font-black py-4 rounded-2xl text-[10px] uppercase tracking-[0.2em] shadow-lg">CONTINUAR ➔</button>
            )}
            {step === 3 && (
              <>
                <button 
                  disabled={!date || !time || (!user) || loading} 
                  onClick={handleComplete} 
                  className="w-full bg-black text-white font-black py-4 rounded-2xl text-[10px] uppercase tracking-[0.2em] shadow-xl disabled:opacity-50 transition-all active:scale-95"
                >
                  {loading ? 'PROCESSANDO...' : user ? 'CONFIRMAR AGENDAMENTO' : 'FAÇA LOGIN PARA FINALIZAR'}
                </button>
                <button onClick={() => setStep(2)} className="text-gray-400 text-[8px] font-black uppercase w-full text-center mt-3 hover:text-black">← TROCAR BARBEIRO</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};