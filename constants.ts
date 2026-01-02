
import { Service, Barber, Product } from './types';

export const SERVICES: Service[] = [
  { id: '1', name: "Corte", price: 40.00, time: "35min", category: 'corte' },
  { id: '2', name: "Barba Executiva", price: 40.00, time: "25min", category: 'barba' },
  { id: '3', name: "Barba Expressa", price: 30.00, time: "25min", category: 'barba' },
  { id: '4', name: "Apenas Cavanhaque", price: 18.00, time: "15min", category: 'barba' },
  { id: '5', name: "Apenas Bigode", price: 10.00, time: "5min", category: 'barba' },
  { id: '6', name: "Sobrancelha (Pinça)", price: 20.00, time: "15min", category: 'estetica' },
  { id: '7', name: "Sobrancelha (Navalha)", price: 12.00, time: "10min", category: 'estetica' },
  { id: '8', name: "Pezinho", price: 20.00, time: "20min", category: 'corte' },
  { id: '9', name: "Pigmentação", price: 30.00, time: "20min", category: 'estetica' },
  { id: '10', name: "Limpeza de Pele", price: 30.00, time: "20min", category: 'estetica' },
  { id: '11', name: "Limpeza + Extração", price: 35.00, time: "25min", category: 'estetica' },
  { id: '12', name: "Relaxamento Capilar", price: 35.00, time: "35min", category: 'quimica' },
  { id: '13', name: "Hidratação", price: 18.00, time: "20min", category: 'estetica' },
  { id: '14', name: "Freestyle Simples", price: 12.00, time: "15min", category: 'corte' },
  { id: '15', name: "Freestyle Avançado", price: 18.00, time: "25min", category: 'corte' },
  { id: '16', name: "Matização", price: 10.00, time: "5min", category: 'quimica' },
  { id: '17', name: "Colorido", price: 95.00, time: "160min", category: 'quimica' },
  { id: '18', name: "Luzes (+Corte/Hidra)", price: 115.00, time: "230min", category: 'quimica' },
  { id: '19', name: "Reflexo (+Corte/Hidra)", price: 115.00, time: "230min", category: 'quimica' },
  { id: '20', name: "Platinado (+Corte/Hidra)", price: 140.00, time: "230min", category: 'quimica' }
];

export const TEAM: Barber[] = [
  { id: 'm1', name: "Matheus Antônio", initials: "MA", role: "Master Barber", image: "https://app.xgain.com.br/sistema/painel/img/perfil/id-365-01-11-2025-07-37-07-image.jpg", age: 28, experience: "10 anos", bio: "Especialista em visagismo e cortes clássicos." },
  { id: 'k1', name: "Kellvem Vitor", initials: "KV", role: "Barber", image: "https://lh3.googleusercontent.com/p/AF1QipN2xQDMG4ZZuea-tyCwdi1NIBBoQ8Ypwxzn1loj=s680-w680-h510-rw", age: 24, experience: "6 anos", bio: "Referência em degradês modernos e freestyle." },
  { id: 'b1', name: "Bianca Magalhães", initials: "BM", role: "Stylist", image: "https://app.xgain.com.br/sistema/painel/img/perfil/id-365-03-09-2025-19-44-47-image.jpg", age: 26, experience: "8 anos", bio: "Especialista em química capilar e estética masculina." },
  { id: 'k2', name: "Kaike", initials: "K", role: "Barber", age: 22, experience: "4 anos", bio: "Talento em ascensão, foca no atendimento personalizado." }
];

export const PRODUCTS: Product[] = [
  { id: 'p1', name: "BALM PARA BARBA - 100g", brand: "FORCEMAN", price: 40.00, image: "https://app.xgain.com.br/sistema/painel/img/produtos/id-365-21-02-2025-16-01-54-image.jpg", description: "Cuidado diário para alinhar e hidratar os fios da barba.", category: 'barba' },
  { id: 'p2', name: "BALM PARA BARBA - 140ml", brand: "JABOQUE", price: 45.00, image: "https://app.xgain.com.br/sistema/painel/img/produtos/id-365-21-02-2025-16-01-34-image.jpg", description: "Fórmula premium para uma barba macia e extremamente perfumada.", category: 'barba' },
  { id: 'p3', name: "ESPONJA NUDREAD", brand: "ENCOMENDA", price: 40.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYGJVSZpME4dPi_EuU2x2RSN5fi7UXDQEXFw&s", description: "SOMENTE POR ENCOMENDA! Ideal para definir cachos e nudreads.", category: 'utensilios' },
  { id: 'p4', name: "Gel Boy - 250g", brand: "Force Men", price: 30.00, image: "https://app.xgain.com.br/sistema/painel/img/produtos/id-365-21-02-2025-15-58-55-image.jpg", description: "Melhor gel fixador do mercado, na melhor barbearia do barreiro!", category: 'pomada' },
  { id: 'p5', name: "Grooming - 300ml", brand: "Barba Macho", price: 39.90, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdBWflPd0ct2JOZ2bsx2NfZAYA-sz7xQSPMg&s", description: "Finalize seu cabelo com mais facilidade e brilho!", category: 'pomada' },
  { id: 'p6', name: "Leave-in Finalizador - 240ml", brand: "Jaboque", price: 77.00, image: "https://app.xgain.com.br/sistema/painel/img/produtos/id-365-22-02-2025-21-11-56-image.jpg", description: "Elimine o frizz e mantenha seu cabelo hidratado o dia todo.", category: 'leave-in' },
  { id: 'p7', name: "Tônico Oxidil - 30ml", brand: "Force Men", price: 77.00, image: "https://app.xgain.com.br/sistema/painel/img/produtos/id-365-21-02-2025-15-54-32-image.jpg", description: "Acelere o crescimento da barba e cabelo com o poder do Minoxidil.", category: 'crescimento' },
  { id: 'p8', name: "Óleo para Barba - 30ml", brand: "Force Men", price: 40.00, image: "https://app.xgain.com.br/sistema/painel/img/produtos/id-365-21-02-2025-15-54-13-image.jpg", description: "Hidratação profunda e brilho imediato para barbas ressecadas.", category: 'barba' },
  { id: 'p9', name: "Pente Garfo", brand: "ENCOMENDA", price: 40.00, image: "https://app.xgain.com.br/sistema/painel/img/produtos/id-365-22-09-2025-13-01-07-image.jpg", description: "Pente ideal para cuidar do seu afro e cachos. Encomende já!", category: 'utensilios' },
  { id: 'p10', name: "Parfum Roll-on - 10ml", brand: "Force Men", price: 49.90, image: "https://app.xgain.com.br/sistema/painel/img/produtos/id-365-22-09-2025-12-58-42-image.jpg", description: "Fragrância masculina inspirada no famoso Creed Aventus.", category: 'perfume' },
  { id: 'p11', name: "POMADA CARAMELO - 120g", brand: "Force Men", price: 35.00, image: "https://app.xgain.com.br/sistema/painel/img/produtos/id-365-03-03-2025-20-16-58-image.jpg", description: "Fixação forte com fragrância exclusiva e efeito brilho moderado.", category: 'pomada' },
  { id: 'p12', name: "Pomada Matte - 80g", brand: "Jaboque", price: 40.00, image: "https://app.xgain.com.br/sistema/painel/img/produtos/id-365-22-02-2025-21-07-10-image.jpg", description: "Efeito seco total para penteados que exigem alta estrutura.", category: 'pomada' },
  { id: 'p13', name: "Pomada Teia - 70g", brand: "Barba Macho", price: 25.00, image: "https://app.xgain.com.br/sistema/painel/img/produtos/id-365-03-03-2025-20-09-49-image.jpg", description: "Efeito teia que proporciona volume e fixação flexível.", category: 'pomada' },
  { id: 'p14', name: "Pomada Incolor - 70g", brand: "Barba Macho", price: 25.00, image: "https://app.xgain.com.br/sistema/painel/img/produtos/id-365-03-03-2025-20-08-03-image.jpg", description: "Perfeita para o dia a dia, mantendo o penteado no lugar sem pesar.", category: 'pomada' },
  { id: 'p15', name: "Pomada Nuvem - 80g", brand: "Jaboque", price: 40.00, image: "https://app.xgain.com.br/sistema/painel/img/produtos/id-365-03-03-2025-20-07-37-image.jpg", description: "Efeito seco e fixação média! Textura leve como uma nuvem.", category: 'pomada' },
  { id: 'p16', name: "Pomada Ultra Black - 150g", brand: "Jaboque", price: 35.00, image: "https://app.xgain.com.br/sistema/painel/img/produtos/id-365-03-03-2025-20-07-52-image.jpg", description: "Ideal para cabelos grisalhos, disfarçando fios brancos com fixação.", category: 'pomada' },
  { id: 'p17', name: "Pomada Ultra White - 150g", brand: "Jaboque", price: 35.00, image: "https://app.xgain.com.br/sistema/painel/img/produtos/id-365-22-02-2025-21-10-35-image.jpg", description: "Pomada modeladora efeito molhado (transparente) de longa duração.", category: 'pomada' },
  { id: 'p18', name: "Loção Pós Barba - 100ml", brand: "Force Men", price: 60.00, image: "https://app.xgain.com.br/sistema/painel/img/produtos/id-365-22-09-2025-12-55-25-image.jpg", description: "Refresca, limpa e auxilia na cicatrização após o barbear.", category: 'barba' },
  { id: 'p19', name: "Shampoo 2 EM 1 - 220ml", brand: "Jaboque", price: 44.00, image: "https://app.xgain.com.br/sistema/painel/img/produtos/id-365-22-02-2025-21-13-02-image.jpg", description: "Limpeza e fortalecimento para Barba, Cabelo e Bigode.", category: 'shampoo' },
  { id: 'p20', name: "Shampoo e Condicionador C12 - 500ml", brand: "C12 Care", price: 70.00, image: "https://app.xgain.com.br/sistema/painel/img/produtos/id-365-21-02-2025-15-46-15-image.jpg", description: "Kit para quem sofre com queda capilar e deseja acelerar o crescimento.", category: 'shampoo' },
  { id: 'p21', name: "Shampoo p/ Barba 200ml", brand: "Barba Macho", price: 33.00, image: "https://app.xgain.com.br/sistema/painel/img/produtos/id-365-22-02-2025-21-13-39-image.jpg", description: "3 em 1: Cresce, Fortalece e Hidrata sua Barba profundamente.", category: 'shampoo' },
  { id: 'p22', name: "GEL BOY KIDS - 250g", brand: "Force Men", price: 25.00, image: "https://app.xgain.com.br/sistema/painel/img/produtos/id-365-27-02-2025-14-51-27-image.jpg", description: "O melhor gel fixador agora disponível na versão para crianças.", category: 'pomada' },
  { id: 'p23', name: "Shampoo e Sabonete Kids - 250ml", brand: "Force Men", price: 42.00, image: "https://app.xgain.com.br/sistema/painel/img/produtos/id-365-10-05-2025-17-27-16-image.jpg", description: "Cuidado suave para a pele e couro cabeludo sensível dos pequenos.", category: 'shampoo' },
  { id: 'p24', name: "Pomada Matte Kids - 70g", brand: "Force Men", price: 32.00, image: "https://app.xgain.com.br/sistema/painel/img/produtos/id-365-22-09-2025-12-53-16-image.jpg", description: "Desenvolvida para hidratar e modelar o penteado do seu filho.", category: 'pomada' },
  { id: 'p25', name: "Leave-in Revitalizante 300ml", brand: "Black White", price: 55.00, image: "https://app.xgain.com.br/sistema/painel/img/produtos/id-365-22-09-2025-12-51-07-image.jpg", description: "Mantenha o cabelo sempre hidratado, brilhante e sem frizz.", category: 'leave-in' },
  { id: 'p26', name: "Loção Pós Barba 120ml", brand: "Men Style", price: 49.90, image: "https://app.xgain.com.br/sistema/painel/img/produtos/id-365-22-09-2025-12-49-34-image.jpg", description: "Pele irresistivelmente suave com um toque intenso de frescor.", category: 'barba' },
  { id: 'p27', name: "Balm Tonificante 120ml", brand: "Black White", price: 49.90, image: "https://app.xgain.com.br/sistema/painel/img/produtos/id-365-22-09-2025-12-47-23-image.jpg", description: "Barba mais forte e bem cuidada, elevando seu estilo ao máximo.", category: 'barba' },
  { id: 'p28', name: "Shampoo Tonificante 500ml", brand: "Black White", price: 52.90, image: "https://app.xgain.com.br/sistema/painel/img/produtos/id-365-22-09-2025-12-42-50-image.jpg", description: "Cabelos e barba mais saudáveis com ação tonificante profunda.", category: 'shampoo' },
  { id: 'p29', name: "Shampoo Anticaspa 500ml", brand: "Black White", price: 69.90, image: "https://app.xgain.com.br/sistema/painel/img/produtos/id-365-22-09-2025-12-39-08-image.jpg", description: "Diga adeus às caspas com uma fórmula refrescante e eficaz.", category: 'shampoo' },
  { id: 'p30', name: "Óleo Hidratante 30ml", brand: "Intense", price: 49.90, image: "https://app.xgain.com.br/sistema/painel/img/produtos/id-365-22-09-2025-13-19-51-image.jpg", description: "Barba macia e cheia de vida com poucas gotas diárias.", category: 'barba' },
  { id: 'p31', name: "Pasta Matte Dry 150g", brand: "Black White", price: 43.90, image: "https://app.xgain.com.br/sistema/painel/img/produtos/id-365-22-09-2025-12-37-04-image.jpg", description: "Fixação equilibrada para um look seco e natural.", category: 'pomada' },
  { id: 'p32', name: "Ultra Glow Paste 70g", brand: "Black White", price: 32.90, image: "https://app.xgain.com.br/sistema/painel/img/produtos/id-365-22-09-2025-12-27-54-image.jpg", description: "O equilíbrio perfeito entre fixação, brilho e aroma marcante.", category: 'pomada' },
  { id: 'p33', name: "White Deluxe Paste 70g", brand: "Black White", price: 26.90, image: "https://app.xgain.com.br/sistema/painel/img/produtos/id-365-22-09-2025-12-32-27-image.jpg", description: "Aliado ideal para criar um look único e cheio de personalidade.", category: 'pomada' },
  { id: 'p34', name: "Pomada Teia 70g", brand: "Black White", price: 26.90, image: "https://app.xgain.com.br/sistema/painel/img/produtos/id-365-22-09-2025-12-34-37-image.jpg", description: "Fixação média para penteados flexíveis que duram o dia todo.", category: 'pomada' },
  { id: 'p35', name: "Ultra Glow Paste 150g", brand: "Black White", price: 44.90, image: "https://app.xgain.com.br/sistema/painel/img/produtos/id-365-22-09-2025-12-27-54-image.jpg", description: "Versão econômica da Ultra Glow para brilho e fixação extrema.", category: 'pomada' },
  { id: 'p36', name: "White Deluxe 150g", brand: "Black White", price: 34.90, image: "https://app.xgain.com.br/sistema/painel/img/produtos/id-365-22-09-2025-12-31-20-image.jpg", description: "Pomada de alta performance para modelagem precisa de fios grossos.", category: 'pomada' },
  { id: 'p37', name: "Pomada Teia 150g", brand: "Black White", price: 34.90, image: "https://app.xgain.com.br/sistema/painel/img/produtos/id-365-22-09-2025-12-00-26-image.jpg", description: "Solução perfeita para penteados com brilho incrível e fixação média.", category: 'pomada' },
  { id: 'p38', name: "Matte Cream 150g", brand: "Black White", price: 34.90, image: "https://app.xgain.com.br/sistema/painel/img/produtos/id-365-22-09-2025-11-59-15-image.jpg", description: "Opção perfeita para conquistar o penteado dos seus sonhos com efeito seco.", category: 'pomada' },
  { id: 'p39', name: "Ultra Heavy Hold 90g", brand: "Premium Line", price: 67.90, image: "https://app.xgain.com.br/sistema/painel/img/produtos/id-365-22-09-2025-12-20-01-image.jpg", description: "Cabelo alinhado e definido com aspecto natural e fixação bruta.", category: 'pomada' },
  { id: 'p40', name: "Matte Clay Series 90g", brand: "Premium Line", price: 67.90, image: "https://app.xgain.com.br/sistema/painel/img/produtos/id-365-22-09-2025-12-17-17-image.jpg", description: "Argila modeladora de alta qualidade para styling profissional.", category: 'pomada' },
  { id: 'p41', name: "Shampoo Condicionante 3x1 - 500ml", brand: "Black White", price: 59.90, image: "https://app.xgain.com.br/sistema/painel/img/produtos/id-365-22-09-2025-12-12-26-image.jpg", description: "Praticidade e cuidado completo no dia a dia com barba e cabelo.", category: 'shampoo' },
  { id: 'p42', name: "Minoxidil 120ml", brand: "Black White", price: 109.90, image: "https://app.xgain.com.br/sistema/painel/img/produtos/id-365-22-09-2025-12-07-56-image.jpg", description: "Preencha falhas e tenha fios mais volumosos e fortes.", category: 'crescimento' },
  { id: 'p43', name: "Matte Dry 70g", brand: "Black White", price: 32.90, image: "https://app.xgain.com.br/sistema/painel/img/produtos/id-365-22-09-2025-11-48-21-image.jpg", description: "Fixação leve e efeito opaco para um visual despojado.", category: 'pomada' },
  { id: 'p44', name: "Pomada Black - 70g", brand: "Barba Macho", price: 35.00, image: "https://app.xgain.com.br/sistema/painel/img/produtos/id-365-22-09-2025-11-30-49-image.jpg", description: "Pigmentação leve para disfarçar falhas com fixação forte.", category: 'pomada' },
  { id: 'p45', name: "Balm para barba - 120ml", brand: "Barba Macho", price: 48.00, image: "https://app.xgain.com.br/sistema/painel/img/produtos/id-365-01-10-2025-10-30-28-image.jpg", description: "Alinhamento e hidratação superior para barbas de respeito.", category: 'barba' }
];

export const COLORS = {
  blue: '#FFFFFF',
  red: '#A1A1A1',
  gold: '#D4AF37',
  dark: '#0a0a0a',
  card: '#141414'
};
