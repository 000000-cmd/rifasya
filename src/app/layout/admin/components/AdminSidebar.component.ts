import { Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, ChevronRight } from 'lucide-angular';
import packageInfo from '../../../../../package.json';
import { sideItems, subSectionsItems } from '../../../shared/utils/adminMenuItemsReferences';
import { UiStateService} from '../../../core/services/uiState.service';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterLink, RouterLinkActive],
  templateUrl: "./AdminSidebar.html"
})
export class AdminSidebarComponent {
  public uiState = inject(UiStateService);
  public appVersion: string = `v${packageInfo.version}`;
  readonly Chevron = ChevronRight;

  @ViewChild('sidebarWrapper') sidebarWrapperRef!: ElementRef;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.uiState.isSubMenuOpen() && this.sidebarWrapperRef?.nativeElement && !this.sidebarWrapperRef.nativeElement.contains(event.target)) {
      this.uiState.closeSubMenu();
    }
  }

  toggleMobileMenu(): void {
    this.uiState.toggleMobileMenu();
  }

  handleLinkClick(item: any): void {
    if (!item.subSections) {
      this.uiState.closeMobileMenu();
      this.uiState.closeSubMenu();
    }
  }

  handleSubMenuLinkClick(): void {
    this.uiState.closeSubMenu();
    this.uiState.closeMobileMenu();
  }

  onMouseEnter(item: any): void {
    if (item.subSections) {
      this.uiState.openSubMenu();
    }
  }

  protected readonly sideItems = sideItems;
  protected readonly subSectionsItems = subSectionsItems;
  protected hasAnyNotification: boolean = true;
}
