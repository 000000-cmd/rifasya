import { Component, Input } from '@angular/core';
import { LucideAngularModule, HelpCircle } from 'lucide-angular';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <div class="relative flex items-center group">
      <lucide-angular [img]="HelpCircle" class="w-4 h-4 text-gray-400 cursor-pointer"></lucide-angular>
      <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs
                  bg-gray-800 text-white text-sm rounded-lg px-3 py-1.5
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
        {{ text }}
        <div class="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-800"></div>
      </div>
    </div>
  `,
})
export class ToolTipComponent {
  @Input() text: string = '';
  readonly HelpCircle = HelpCircle;
}
