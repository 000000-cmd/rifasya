import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiStateService {
  readonly isMobileMenuOpen = signal<boolean>(false);
  readonly isSubMenuOpen = signal<boolean>(false);

  toggleMobileMenu(): void { this.isMobileMenuOpen.update(value => !value); }
  closeMobileMenu(): void { this.isMobileMenuOpen.set(false); }
  openSubMenu(): void { this.isSubMenuOpen.set(true); }
  closeSubMenu(): void { this.isSubMenuOpen.set(false); }
}
