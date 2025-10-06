import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Bell, ChartColumn, CircleQuestionMark, DollarSign, LayoutDashboard, LucideIconData, Megaphone, Ticket, TrendingUp, Trophy, User, LucideAngularModule } from 'lucide-angular';

export interface MenuItem {
  id: string;
  label: string;
  icon: LucideIconData;
  badge?: number;
}

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: "./AdminSidebar.html"
})
export class AdminSidebarComponent {
  /** Sección activa del panel */
  @Input() activeSection: string = 'dashboard';

  /** Estado del menú móvil */
  @Input() isMobileMenuOpen: boolean = false;

  /** Emite el id de la sección seleccionada */
  @Output() sectionChange = new EventEmitter<string>();

  /** Emite evento para abrir/cerrar menú móvil */
  @Output() mobileMenuToggle = new EventEmitter<void>();

  /** Lista de elementos del menú */
  menuItems: MenuItem[] = [
    { id: 'dashboard',  label: 'Dashboard', icon: LayoutDashboard },
    { id: 'raffles',    label: 'Rias', icon: Ticket, badge: 5 },
    { id: 'users',      label: 'Usuarios & Terceros', icon: User },
    { id: 'afiliates',  label: 'Afiliados', icon: TrendingUp },
    { id: 'transactions', label: 'Transacciones', icon: DollarSign, badge: 12 },
    { id: 'winners',    label: 'Ganadores', icon:  Trophy },
    { id: 'marketing',  label: 'Marketing', icon: Megaphone },
    { id: 'reports',    label: 'Reporte', icon: ChartColumn },
    { id: 'notify',     label: 'Notificaciones', icon: Bell },
    { id: 'help',       label: 'Ayuda', icon: CircleQuestionMark },
    { id: 'config',     label: 'Configuración', icon: CircleQuestionMark },
  ];

  /** Cambia la sección activa */
  selectSection(section: string): void {
    this.sectionChange.emit(section);
    if (this.isMobileMenuOpen) {
      this.mobileMenuToggle.emit();
    }
  }

  /** Cambia visibilidad del menú móvil */
  toggleMobileMenu(): void {
    this.mobileMenuToggle.emit();
  }


}
