import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, ChevronRight, Home } from 'lucide-angular';
import { BreadcrumbService} from '../../core/services/breadcrumb.service';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  template: `
    <nav class="flex mb-4" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li class="inline-flex items-center">
          <a routerLink="/" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
            <lucide-angular [img]="Home" class="w-4 h-4 me-2.5"></lucide-angular>
            Inicio
          </a>
        </li>
        @for (link of breadcrumbs(); track link; let last = $last) {
          <li>
            <div class="flex items-center">
              <lucide-angular [img]="ChevronRight" class="w-3 h-3 text-gray-400 mx-1"></lucide-angular>
              @if (last) {
                <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2">{{ link.label }}</span>
              } @else {
                <a [routerLink]="link.url" class="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2">{{ link.label }}</a>
              }
            </div>
          </li>
        }
      </ol>
    </nav>
  `
})
export class BreadcrumbsComponent {
  private breadcrumbService = inject(BreadcrumbService);
  breadcrumbs = this.breadcrumbService.breadcrumbs;
  readonly ChevronRight = ChevronRight;
  readonly Home = Home;
}
