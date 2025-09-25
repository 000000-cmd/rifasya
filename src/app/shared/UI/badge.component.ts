import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      class="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 
             [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none 
             focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] 
             aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 
             aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden"
      [ngClass]="badgeClass"
    >
      <ng-content></ng-content>
    </span>
  `
})
export class BadgeComponent {
  @Input() variant: 'default' | 'secondary' | 'destructive' | 'outline' = 'default';
  @Input() className: string = '';

  get badgeClass(): string {
    const baseVariants: Record<string, string> = {
      default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/90',
      destructive:
        'border-transparent bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
      outline: 'text-foreground hover:bg-accent hover:text-accent-foreground',
    };

    return `${baseVariants[this.variant]} ${this.className}`;
  }
}
