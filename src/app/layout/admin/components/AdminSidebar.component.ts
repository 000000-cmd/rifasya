import {Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild, viewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  CircleQuestionMark,
  LucideAngularModule,
  ChevronRight
} from 'lucide-angular';
import packageInfo from '../../../../../package.json';
import {sideItems, subSectionsItems} from '../../../shared/utils/adminMenuItemsReferences';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterLink, RouterLinkActive],
  templateUrl: "./AdminSidebar.html"
})
export class AdminSidebarComponent {
  public appVersion: string = `v${packageInfo.version}`;
  readonly Chevron = ChevronRight;

  @Input() isMobileMenuOpen: boolean = false;
  @Input() isSubMenuOpen: boolean = false;
  @Output() mobileMenuToggle = new EventEmitter<void>();

  @ViewChild('#subMenu') subMenuRef!: ElementRef;
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if(this.isSubMenuOpen && !this.subMenuRef.nativeElement.contains(event.target)){
      this.isSubMenuOpen = false;
    }
  }





  toggleMobileMenu(): void {
    this.mobileMenuToggle.emit();
  }

  handleLinkClick(): void {
    if (this.isMobileMenuOpen) {
      this.toggleMobileMenu();
    }
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }

  onMouseEnter(){
    this.isSubMenuOpen = true
  }

  onMouseLeave(){
    this.isSubMenuOpen = false
  }

  protected readonly sideItems = sideItems;
  protected readonly subSectionsItems = subSectionsItems;
}
