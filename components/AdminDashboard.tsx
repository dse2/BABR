import React, { useEffect, useState } from 'react';
import { db, SavedAppointment } from '../services/db';

export const AdminDashboard: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [appointments, setAppointments] = useState<SavedAppointment[]>([]);
  const [metrics, setMetrics] = useState({ revenue: 0, count: 0, topBarber: '' });
  const [activeTab, setActiveTab] = useState<'overview' | 'list'>('overview');

  useEffect(() => {
    const loadData = async () => {
      const data = await db.getAppointments();
      const mets = await db.getMetrics();
      setAppointments(data.reverse()); // Mais recentes primeiro
      setMetrics(mets);
    };
    loadData();
  }, []);

  return (
    <div className="fixed inset-0 z-[200] bg-gray-100 overflow-y-auto">
      <div className="bg-black text-white p-6 sticky top-0 z-10 flex justify-between items-center shadow-xl">
        <div>
          <h2 className="text-xl font-black italic uppercase tracking-tighter">Man's Space</h2>
          <span className="text-[10px] text-gray-400 uppercase tracking-[0.3em] font-bold">Painel Administrativo</span>
        </div>
        <button onClick={onClose} className="bg-white/10 px-4 py-2 rounded-lg text-xs font-bold uppercase hover:bg-white/20">Sair do Painel</button>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        
        {/* CARDS DE MÉTRICA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
            <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Faturamento Total</span>
            <div className="text-4xl font-black text-green-600 mt-2 tracking-tight">R$ {metrics.revenue.toFixed(2)}</div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
            <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Cortes Realizados</span>
            <div className="text-4xl font-black text-black mt-2 tracking-tight">{metrics.count}</div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
            <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Top Barbeiro</span>
            <div className="text-2xl font-black text-blue-600 mt-2 tracking-tight uppercase">{metrics.topBarber || '-'}</div>
          </div>
        </div>

        {/* LISTAGEM */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-black text-lg uppercase italic">Histórico de Agendamentos</h3>
            <button onClick={() => { if(confirm('Zerar tudo?')) db.resetSystem() }} className="text-red-500 text-[10px] font-bold uppercase hover:underline">Resetar Sistema</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-[9px] uppercase text-gray-400 font-black tracking-widest">
                <tr>
                  <th className="p-4">Data/Hora</th>
                  <th className="p-4">Cliente</th>
                  <th className="p-4">Barbeiro</th>
                  <th className="p-4">Serviços</th>
                  <th className="p-4">Valor</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium text-gray-700">
                {appointments.map(app => (
                  <tr key={app.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-bold">{app.date} <br/> <span className="text-gray-400 text-xs">{app.time}</span></td>
                    <td className="p-4">{app.clientName}</td>
                    <td className="p-4 uppercase text-xs font-bold">{app.barberName}</td>
                    <td className="p-4 text-xs text-gray-500 max-w-xs truncate">{app.serviceNames.join(', ')}</td>
                    <td className="p-4 font-bold text-black">R$ {app.totalPrice.toFixed(2)}</td>
                    <td className="p-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-[10px] font-black uppercase">Confirmado</span></td>
                  </tr>
                ))}
                {appointments.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-400 text-sm italic">Nenhum agendamento registrado ainda.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};