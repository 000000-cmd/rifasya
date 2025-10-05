import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { PrimaryButton, SecondaryButton } from "../../shared/ui/buttons/buttons.component";  

interface Raffle {
  id: number;
  title: string;
  subtitle: string;
  value: string;
  image: string;
  ticketsSold: number;
  totalTickets: number;
  ticketPrice: number;
  timeLeft: string;
  category: string;
}

interface Feature {
  title: string;
  description: string;
  color: string;
  bgColor: string;
  iconPath: string;
}

@Component({
  selector: 'app-home',                // nombre de la etiqueta
  standalone: true,                    // ← standalone obligatorio
  imports: [RouterOutlet, CommonModule, PrimaryButton],             // Componentes importados que usaras en la vista
  templateUrl: './home.html', // HTML de esta vista      // estilos locales
})

export class Home{
    carImageUrl = 'https://images.unsplash.com/photo-1581966451257-a5c7c5afa833?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjBwcml6ZSUyMHJhZmZsZXxlbnwxfHx8fDE3NTgzOTAyNjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

  raffles: Raffle[] = [
    {
      id: 1,
      title: "BMW Serie 3 2024",
      subtitle: "Auto de lujo último modelo",
      value: "$850,000",
      image: "https://images.unsplash.com/photo-1581966451257-a5c7c5afa833?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjBwcml6ZSUyMHJhZmZsZXxlbnwxfHx8fDE3NTgzOTAyNjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      ticketsSold: 750,
      totalTickets: 1000,
      ticketPrice: 150,
      timeLeft: "3 días",
      category: "Autos"
    },
    {
      id: 2,
      title: "$500,000 MXN",
      subtitle: "Dinero en efectivo",
      value: "$500,000",
      image: "https://images.unsplash.com/photo-1744131897960-2744987b3ab9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXNoJTIwbW9uZXklMjBwcml6ZXxlbnwxfHx8fDE3NTgyNzk1MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      ticketsSold: 1200,
      totalTickets: 1500,
      ticketPrice: 100,
      timeLeft: "1 semana",
      category: "Efectivo"
    },
    {
      id: 3,
      title: "iPhone 15 Pro Max",
      subtitle: "Última tecnología Apple",
      value: "$35,000",
      image: "https://images.unsplash.com/photo-1584658645175-90788b3347b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwdGVjaG5vbG9neSUyMHByaXplfGVufDF8fHx8MTc1ODM5MDI3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      ticketsSold: 456,
      totalTickets: 800,
      ticketPrice: 50,
      timeLeft: "5 días",
      category: "Tecnología"
    },
    {
      id: 4,
      title: "Viaje a Europa",
      subtitle: "Para 2 personas todo incluido",
      value: "$120,000",
      image: "https://images.unsplash.com/photo-1650884228637-b31442bf126d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YWNhdGlvbiUyMHRyYXZlbCUyMHByaXplfGVufDF8fHx8MTc1ODM5MDI3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      ticketsSold: 234,
      totalTickets: 600,
      ticketPrice: 75,
      timeLeft: "2 semanas",
      category: "Viajes"
    }
  ];

   features: Feature[] = [
    {
      title: "100% Seguro",
      description: "Transacciones protegidas y sorteos verificados por autoridades competentes.",
      color: "text-green-600",
      bgColor: "bg-green-50",
      iconPath: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    },
    {
      title: "Resultados Instantáneos",
      description: "Conoce los resultados al momento y recibe tu premio inmediatamente.",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      iconPath: "M13 10V3L4 14h7v7l9-11h-7z"
    },
    {
      title: "Premios Increíbles",
      description: "Autos, dinero, viajes, tecnología y mucho más. ¡Siempre hay algo para ti!",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      iconPath: "M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
    },
    {
      title: "Comunidad Activa",
      description: "Únete a miles de usuarios que ya han ganado premios fantásticos.",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      iconPath: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
    },
    {
      title: "Pagos Fáciles",
      description: "Acepta todas las formas de pago: tarjetas, transferencias y más.",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      iconPath: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
    },
    {
      title: "Ganadores Reales",
      description: "Más de 10,000 ganadores felices pueden confirmar nuestra confiabilidad.",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      iconPath: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
    }
  ];

  getProgress(raffle: Raffle): number {
    return (raffle.ticketsSold / raffle.totalTickets) * 100;
  }

  getCategoryClass(category: string): string {
    const categoryColors: { [key: string]: string } = {
      "Autos": "bg-blue-100 text-blue-700",
      "Efectivo": "bg-green-100 text-green-700",
      "Tecnología": "bg-purple-100 text-purple-700",
      "Viajes": "bg-orange-100 text-orange-700"
    };
    return categoryColors[category] || "bg-gray-100 text-gray-700";
  }

}
