import { Component } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  template: `
    <div class="space-y-3">
      <div class="h-4 bg-gray-200 rounded-full animate-pulse w-full"></div>
      <div class="h-4 bg-gray-200 rounded-full animate-pulse w-5/6"></div>
    </div>
  `
})
export class SkeletonLoaderComponent {}
