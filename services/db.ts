import { Appointment, Barber } from '../types';

// Chave para salvar no navegador
const STORAGE_KEY = 'mans_space_bookings';

export interface SavedAppointment {
  id: string;
  clientName: string;
  clientEmail: string;
  barberId: string;
  barberName: string;
  serviceNames: string[];
  productNames: string[];
  date: string; // DD/MM/YYYY
  time: string; // HH:MM
  totalPrice: number;
  createdAt: string;
  status: 'confirmed' | 'completed' | 'cancelled';
}

export const db = {
  // Salvar novo agendamento
  createAppointment: async (data: Omit<SavedAppointment, 'id' | 'createdAt' | 'status'>) => {
    const appointments = await db.getAppointments();
    
    // VERIFICAÇÃO DE CONFLITO (A Lógica Inteligente)
    const conflict = appointments.find(a => 
      a.barberId === data.barberId && 
      a.date === data.date && 
      a.time === data.time &&
      a.status !== 'cancelled'
    );

    if (conflict) {
      throw new Error(`O barbeiro ${data.barberName} já está ocupado em ${data.date} às ${data.time}.`);
    }

    const newAppointment: SavedAppointment = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };

    appointments.push(newAppointment);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
    return newAppointment;
  },

  // Pegar todos os agendamentos (Para o Painel do Dono)
  getAppointments: async (): Promise<SavedAppointment[]> => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  // Pegar horários ocupados de um barbeiro específico
  getBusyTimes: async (barberId: string, date: string): Promise<string[]> => {
    const appointments = await db.getAppointments();
    return appointments
      .filter(a => a.barberId === barberId && a.date === date && a.status !== 'cancelled')
      .map(a => a.time);
  },

  // Dashboard: Calcular métricas
  getMetrics: async () => {
    const appts = await db.getAppointments();
    const activeAppts = appts.filter(a => a.status !== 'cancelled');
    
    const totalRevenue = activeAppts.reduce((acc, curr) => acc + curr.totalPrice, 0);
    const totalCuts = activeAppts.length;
    
    // Barbeiro mais popular
    const barberCounts: Record<string, number> = {};
    activeAppts.forEach(a => {
      barberCounts[a.barberName] = (barberCounts[a.barberName] || 0) + 1;
    });
    
    const topBarber = Object.entries(barberCounts).sort((a, b) => b[1] - a[1])[0];

    return {
      revenue: totalRevenue,
      count: totalCuts,
      topBarber: topBarber ? topBarber[0] : 'Nenhum'
    };
  },

  // Função para limpar tudo (Resetar sistema)
  resetSystem: () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  }
};