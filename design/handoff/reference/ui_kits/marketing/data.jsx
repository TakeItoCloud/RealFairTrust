// Shared mock data for the RealFairTrust marketing kit. Lisbon + Porto launch.
const AGENTS = [
  { rank: 1, name: "Sofia Marques", photo: "https://randomuser.me/api/portraits/women/44.jpg", city: "Lisboa · Príncipe Real", score: "94", badge: "top", specialities: ["Apartamentos", "Compra"],
    stats: [{ value: "68%", label: "Taxa de fecho" }, { value: "1.2h", label: "Resposta" }, { value: "4.9", label: "Satisfação" }] },
  { rank: 2, name: "Miguel Costa", photo: "https://randomuser.me/api/portraits/men/32.jpg", city: "Porto · Foz do Douro", score: "91", specialities: ["Moradias", "Venda"],
    stats: [{ value: "64%", label: "Taxa de fecho" }, { value: "1.6h", label: "Resposta" }, { value: "4.8", label: "Satisfação" }] },
  { rank: 3, name: "Inês Carvalho", photo: "https://randomuser.me/api/portraits/women/68.jpg", city: "Lisboa · Chiado", score: "89", specialities: ["Apartamentos", "Arrendamento"],
    stats: [{ value: "61%", label: "Taxa de fecho" }, { value: "2.0h", label: "Resposta" }, { value: "4.8", label: "Satisfação" }] },
  { rank: 4, name: "João Pinto", photo: "https://randomuser.me/api/portraits/men/52.jpg", city: "Porto · Cedofeita", score: "86", specialities: ["Investimento"],
    stats: [{ value: "59%", label: "Taxa de fecho" }, { value: "1.9h", label: "Resposta" }, { value: "4.7", label: "Satisfação" }] },
  { rank: 5, name: "Beatriz Lopes", photo: "https://randomuser.me/api/portraits/women/26.jpg", city: "Lisboa · Alvalade", score: "83", specialities: ["Famílias", "Compra"],
    stats: [{ value: "57%", label: "Taxa de fecho" }, { value: "2.3h", label: "Resposta" }, { value: "4.6", label: "Satisfação" }] },
  { rank: 6, name: "André Silva", photo: "https://randomuser.me/api/portraits/men/76.jpg", city: "Porto · Boavista", score: "81", specialities: ["Apartamentos"],
    stats: [{ value: "55%", label: "Taxa de fecho" }, { value: "2.1h", label: "Resposta" }, { value: "4.6", label: "Satisfação" }] },
];

const RISING = [
  { name: "Carlota Nunes", photo: "https://randomuser.me/api/portraits/women/12.jpg", city: "Lisboa · Arroios", score: "88", badge: "rising", specialities: ["Apartamentos"],
    stats: [{ value: "63%", label: "Taxa de fecho" }, { value: "1.4h", label: "Resposta" }] },
  { name: "Tomás Ferreira", photo: "https://randomuser.me/api/portraits/men/15.jpg", city: "Porto · Bonfim", score: "85", badge: "rising", specialities: ["Moradias"],
    stats: [{ value: "60%", label: "Taxa de fecho" }, { value: "1.7h", label: "Resposta" }] },
];

const PROPERTIES = [
  { image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=720&q=80", price: "€ 720 000", title: "Apartamento T3 renovado", location: "Lisboa · Estrela", deal: "sale", beds: 3, baths: 2, area: 128, energy: "A+", agentName: "Sofia Marques", agentPhoto: "https://randomuser.me/api/portraits/women/44.jpg" },
  { image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=720&q=80", price: "€ 1 250 000", title: "Moradia V4 com jardim", location: "Porto · Foz do Douro", deal: "sale", beds: 4, baths: 3, area: 240, energy: "A", agentName: "Miguel Costa", agentPhoto: "https://randomuser.me/api/portraits/men/32.jpg" },
  { image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=720&q=80", price: "€ 2 400", priceSuffix: "/mês", title: "T2 luminoso no centro", location: "Lisboa · Chiado", deal: "rent", beds: 2, baths: 1, area: 86, energy: "B", agentName: "Inês Carvalho", agentPhoto: "https://randomuser.me/api/portraits/women/68.jpg" },
  { image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=720&q=80", price: "€ 395 000", title: "Loft industrial", location: "Porto · Cedofeita", deal: "sale", beds: 1, baths: 1, area: 72, energy: "C", agentName: "João Pinto", agentPhoto: "https://randomuser.me/api/portraits/men/52.jpg" },
  { image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=720&q=80", price: "€ 890 000", title: "T4 familiar com terraço", location: "Lisboa · Alvalade", deal: "sale", beds: 4, baths: 2, area: 165, energy: "A", agentName: "Beatriz Lopes", agentPhoto: "https://randomuser.me/api/portraits/women/26.jpg" },
  { image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=720&q=80", price: "€ 3 100", priceSuffix: "/mês", title: "Apartamento com vista rio", location: "Porto · Ribeira", deal: "rent", beds: 2, baths: 2, area: 95, energy: "B", agentName: "André Silva", agentPhoto: "https://randomuser.me/api/portraits/men/76.jpg" },
];

Object.assign(window, { AGENTS, RISING, PROPERTIES });
