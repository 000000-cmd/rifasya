import { Component, Input} from '@angular/core';
import { LucideAngularModule, HelpCircle } from 'lucide-angular';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [LucideAngularModule, NgClass],
  template: `
    <div class="relative flex items-center group">
      <lucide-angular [img]="HelpCircle" class="w-4 h-4 text-gray-400 cursor-pointer"></lucide-angular>
      <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs
                  text-sm rounded-lg px-3 py-1.5 border text-left
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
           [ngClass]="{
             'bg-gray-800 text-white border-transparent': variant === 'info',
             'bg-yellow-50 text-yellow-800 border-yellow-200': variant === 'warning',
             'bg-red-50 text-red-800 border-red-200': variant === 'error'
           }">
        <div [innerHTML]="text"></div>
        <div class="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4"
             [ngClass]="{
               'border-t-gray-800': variant === 'info',
               'border-t-yellow-200': variant === 'warning',
               'border-t-red-200': variant === 'error'
             }"></div>
      </div>
    </div>
  `,
})
export class ToolTipComponent {
  @Input() text: string = '';
  @Input() variant: 'info' | 'warning' | 'error' = 'info';
  readonly HelpCircle = HelpCircle;
}
