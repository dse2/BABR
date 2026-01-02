
import React from 'react';
import { Barber } from '../types';

interface ProfessionalModalProps {
  professional: Barber | null;
  onClose: () => void;
  onBook: () => void;
}

export const ProfessionalModal: React.FC<ProfessionalModalProps> = ({ professional, onClose, onBook }) => {
  if (!professional) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div 
        className="bg-white w-full max-w-4xl rounded-[3rem] overflow-hidden shadow-[0_32px_128px_-12px_rgba(0,0,0,0.5)] flex flex-col md:flex-row relative animate-in zoom-in-95 duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-20 w-12 h-12 bg-black/10 hover:bg-black text-black hover:text-white rounded-full flex items-center justify-center transition-all text-2xl font-light"
        >
          &times;
        </button>

        {/* Lado A: Foto */}
        <div className="w-full md:w-1/2 h-80 md:h-auto bg-gray-100 relative">
          {professional.image ? (
            <img 
              src={professional.image} 
              alt={professional.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-black text-white text-6xl font-black italic">
              {professional.initials}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden" />
          <div className="absolute bottom-6 left-6 md:hidden">
            <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-2">
              {professional.name}
            </h2>
            <div className="flex gap-4">
              <div className="h-1 w-12 bg-blue-600 -skew-x-[25deg]" />
              <div className="h-1 w-12 bg-red-600 -skew-x-[25deg]" />
            </div>
          </div>
        </div>

        {/* Lado B: Informações */}
        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
          <div className="mb-8 hidden md:block">
            <h2 className="text-4xl font-black text-black italic uppercase tracking-tighter mb-2">
              {professional.name}
            </h2>
            <div className="flex gap-4">
              <div className="h-1 w-12 bg-blue-600 -skew-x-[25deg]" />
              <div className="h-1 w-12 bg-red-600 -skew-x-[25deg]" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-10">
            <div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Idade</span>
              <span className="text-xl font-black text-black">{professional.age || '--'} anos</span>
            </div>
            <div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Experiência</span>
              <span className="text-xl font-black text-black">{professional.experience || '--'}</span>
            </div>
          </div>

          <div className="mb-12">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-4">Sobre o Profissional</span>
            <p className="text-gray-500 leading-relaxed italic">
              "{professional.bio || 'Profissional dedicado à excelência e ao estilo impecável de cada cliente.'}"
            </p>
          </div>

          <button 
            onClick={() => {
              onBook();
              onClose();
            }}
            className="w-full bg-black hover:bg-gray-800 text-white font-black py-5 rounded-2xl transition-all uppercase tracking-[0.2em] text-xs shadow-xl"
          >
            Agendar com {professional.name.split(' ')[0]}
          </button>
        </div>
      </div>
      
      {/* Clique fora para fechar */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
};
