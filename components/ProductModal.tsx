
import React, { useState } from 'react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  
  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    onClose();
    setQuantity(1);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
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

        <div className="w-full md:w-1/2 h-80 md:h-auto bg-gray-50 relative">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover p-2 md:p-4"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent md:hidden" />
          <div className="absolute bottom-6 left-6 md:hidden">
            <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">
              {product.name}
            </h2>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
          <div className="mb-8 hidden md:block">
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-2">
              {product.brand || 'Premium Quality'}
            </span>
            <h2 className="text-3xl font-black text-black italic uppercase tracking-tighter mb-2 leading-none">
              {product.name}
            </h2>
            <div className="flex gap-4 mt-4">
              <div className="h-1 w-10 bg-blue-600 -skew-x-[25deg]" />
              <div className="h-1 w-10 bg-red-600 -skew-x-[25deg]" />
            </div>
          </div>

          <div className="mb-10">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-4">Descrição do Item</span>
            <p className="text-gray-500 leading-relaxed italic text-sm">
              "{product.description}"
            </p>
          </div>

          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Preço Sugerido</span>
              <div className="text-4xl font-black text-black italic tracking-tighter bg-gray-50 px-5 py-2 rounded-2xl">
                <span className="text-sm not-italic mr-1">R$</span>
                {product.price.toFixed(2)}
              </div>
            </div>

            <div className="flex flex-col items-end gap-3">
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Quantidade</span>
              <div className="flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-2">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center font-black hover:bg-gray-100 rounded-xl transition-colors">－</button>
                <span className="font-black text-xl italic min-w-[1.5rem] text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center font-black hover:bg-gray-100 rounded-xl transition-colors">＋</button>
              </div>
            </div>
          </div>

          <button 
            onClick={handleAdd}
            className="w-full bg-black hover:bg-gray-800 text-white font-black py-5 rounded-2xl transition-all uppercase tracking-[0.2em] text-xs shadow-xl"
          >
            Adicionar ao Agendamento
          </button>
        </div>
      </div>
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
};
