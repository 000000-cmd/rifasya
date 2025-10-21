import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  template: `
    <button [attr.type]="type" [ngClass]="buttonClasses">
      <ng-content></ng-content>
    </button>
  `,
})
export class ButtonComponent {
  /** Variante visual del botón */
  @Input() variant:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'fancy'
    | 'heroPrimary'
    | 'heroSecondary'
    | 'heroPrimaryInverted'
    | 'heroSecondaryInverted'
    | 'neutral'
    | 'soft' = 'default';

  /** Tamaño del botón */
  @Input() size: 'default' | 'sm' | 'lg' | 'auto' | 'full' | 'icon' = 'default';

  /** Clases personalizadas adicionales */
  @Input() class: string = '';

  /** Tipo de botón */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  @Input() textSize: 'sm' | 'base' | 'lg' | 'xl' = 'base';
  @Input() textWeight: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' = 'normal';

  @Input() disabled: boolean = false;



  /** Genera las clases Tailwind según la variante */
  get buttonClasses(): string {
    const base =
      'h-full';

    const variants: Record<string, string> = {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      destructive: 'bg-red-600 text-white hover:bg-red-700',
      outline: 'border border-gray-300 hover:bg-gray-100',
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
      ghost: 'hover:bg-gray-100 text-gray-700',
      link: 'text-primary underline hover:underline-offset-4',

      /** 🟣 Nuevo estilo tipo PrimaryButton */
      fancy:
        'bg-[#D946EF] hover:bg-[#C93DE0] text-white text-lg font-semibold px-8 py-3 rounded-lg transition-colors cursor-pointer',

      /** 💜 Nuevo estilo tipo SecondaryButton */
      soft:
        'border-2 border-purple-200 text-purple-600 hover:bg-purple-50 text-lg font-semibold px-8 py-3 rounded-lg transition-colors cursor-pointer',

      /** ✨ Hero principal */
      heroPrimary:
        'bg-primary hover:bg-[var(--primary-hover)] text-white text-base px-8 py-3 rounded-lg font-semibold transition-colors cursor-pointer',

      heroPrimaryInverted:
        'bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors cursor-pointer',

      /** 💠 Hero secundario */
      heroSecondary:
        'border-2 border-purple-200 text-purple-600 hover:bg-purple-50 text-lg font-semibold px-8 py-3 rounded-lg  transition-all cursor-pointer',

      heroSecondaryInverted:
        'border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-colors cursor-pointer',


      /** ⚪ Variante neutra tipo "Ver Todas las Rifas" */
      neutral:
      'border-2 border-gray-300 text-gray-700 hover:bg-gray-50  font-semibold px-8 py-3 rounded-lg transition-colors cursor-pointer',
    };

    const sizes: Record<string, string> = {
      default: 'h-9 px-4 py-2',
      sm: 'h-8 px-3 text-xs',
      lg: 'h-10 px-6 text-base ',
      icon: 'p-2',
      auto: 'h-auto',
      full: 'w-full'
    };
    const textSizes = {
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl'
    };

    const textWeights = {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold'
    };

    return `${base} ${variants[this.variant]} ${sizes[this.size]} ${textSizes[this.textSize]} ${textWeights[this.textWeight]} ${this.class}`;
  }
}
