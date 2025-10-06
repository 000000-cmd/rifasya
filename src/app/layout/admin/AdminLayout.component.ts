import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSidebarComponent } from './components/AdminSidebar.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, AdminSidebarComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div class="flex">
        <!-- Sidebar -->
        <app-admin-sidebar
          [activeSection]="activeSection"
          (sectionChange)="setActiveSection($event)"
          [isMobileMenuOpen]="isMobileMenuOpen"
          (mobileMenuToggle)="toggleMobileMenu()"
        ></app-admin-sidebar>

        <!-- Main content -->
        <main class="flex-1 lg:ml-0">
          <div class="lg:hidden h-16"></div>

          <div class="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            <!-- Nueva sintaxis @switch -->
            @switch (activeSection) {
              @case ('dashboard') {
                <p>Dashboard Section</p>
              }
              @case ('raffles') {
                <p>Raffles Management</p>
              }
              @case ('users') {
                <p>User Management</p>
              }
              @case ('transactions') {
                <p>Transaction History</p>
              }
              @case ('reports') {
                <p>Reports</p>
              }
              @default {
                <p>Default Section</p>
              }
            }
          </div>
        </main>
      </div>
    </div>
  `
})
export class AdminLayoutComponent {
  activeSection: string = 'dashboard';
  isMobileMenuOpen: boolean = false;

  setActiveSection(section: string): void {
    this.activeSection = section;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
