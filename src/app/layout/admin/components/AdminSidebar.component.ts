import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Bell, ChartColumn, CircleQuestionMark, DollarSign, LayoutDashboard, LucideIconData, Megaphone, Ticket, TrendingUp, Trophy, User, LucideAngularModule } from 'lucide-angular';

export interface MenuItem {
  id: string;
  label: string;
  icon: any;
  link: string; // La ruta a la que navegará
  badge?: number;
}

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterLink, RouterLinkActive],
  templateUrl: "./AdminSidebar.html"
})
export class AdminSidebarComponent {
  // Recibe el estado del menú móvil desde el layout padre
  @Input() isMobileMenuOpen: boolean = false;
  // Emite un evento para notificar al layout padre que debe cambiar el estado
  @Output() mobileMenuToggle = new EventEmitter<void>();

  public menuItems: MenuItem[] = [
    { id: 'dashboard',    label: 'Dashboard',         icon: LayoutDashboard,    link: '/dashboard/admin' },
    { id: 'raffles',      label: 'Rifas',             icon: Ticket,             link: '/dashboard/admin/raffles', badge: 5 },
    { id: 'users',        label: 'Usuarios',          icon: User,               link: '/dashboard/admin/users' },
    { id: 'afiliates',    label: 'Afiliados',         icon: TrendingUp,         link: '/dashboard/admin/afiliates' },
    { id: 'transactions', label: 'Transacciones',     icon: DollarSign,         link: '/dashboard/admin/transactions', badge: 12 },
    { id: 'winners',      label: 'Ganadores',         icon: Trophy,             link: '/dashboard/admin/winners' },
    { id: 'marketing',    label: 'Marketing',         icon: Megaphone,          link: '/dashboard/admin/marketing' },
    { id: 'reports',      label: 'Reportes',          icon: ChartColumn,        link: '/dashboard/admin/reports' },
    { id: 'notify',       label: 'Notificaciones',    icon: Bell,               link: '/dashboard/admin/notify' },
    { id: 'help',         label: 'Ayuda',             icon: CircleQuestionMark, link: '/dashboard/admin/help' },
  ];

  // Este método se llama desde el HTML para emitir el evento
  toggleMobileMenu(): void {
    this.mobileMenuToggle.emit();
  }

  // Cierra el menú móvil si está abierto al hacer clic en un enlace
  handleLinkClick(): void {
    if (this.isMobileMenuOpen) {
      this.toggleMobileMenu();
    }
  }
}
