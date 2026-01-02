
export interface User {
  name: string;
  email: string;
  picture: string;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  time: string;
  category: 'corte' | 'barba' | 'estetica' | 'quimica';
}

export interface Barber {
  id: string;
  name: string;
  initials: string;
  role: string;
  image?: string;
  age?: number;
  experience?: string;
  bio?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  brand?: string;
  category: 'shampoo' | 'condicionador' | 'pomada' | 'leave-in' | 'utensilios' | 'perfume' | 'barba' | 'crescimento';
}

export interface SelectedProduct extends Product {
  quantity: number;
}

export interface Appointment {
  serviceId: string;
  barberId: string;
  date: string;
  time: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
