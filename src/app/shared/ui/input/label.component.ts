import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { AbstractControl, FormsModule } from "@angular/forms";
import { BadgeAlert, BadgeCheck, HelpCircle, LucideAngularModule, LucideIconData } from "lucide-angular";
import { ToolTipComponent} from '../ToolTip.component';

@Component({
  selector: 'label-input',
  standalone: true,
  imports: [LucideAngularModule, FormsModule, CommonModule, ToolTipComponent],
  template: `
    <label [for]="id" class="flex items-center gap-2 font-bold text-gray-700">
      @if(icon) {
        <lucide-angular
          [img]="icon"
          class="w-4 h-4 text-purple-600">
        </lucide-angular>
      }

      {{ label }}

      @if (tooltipText) {
        <app-tooltip [text]="tooltipText"></app-tooltip>
      }

      @if (control?.touched || control?.dirty) {
        <lucide-angular
          [img]="hasError ? invalidIcon : validIcon"
          class="w-4 h-4"
          [ngClass]="hasError ? 'text-red-500' : 'text-green-600'">
        </lucide-angular>
      }
    </label>
  `
})
export class BaseInputLabel {
  @Input() id = '';
  @Input() icon?: LucideIconData;
  @Input() label = '';
  @Input() control: AbstractControl | null = null;
  @Input() tooltipText?: string;

  readonly validIcon = BadgeCheck;
  readonly invalidIcon = BadgeAlert;

  get hasError(): boolean {
    return !!this.control?.invalid && (this.control?.touched || this.control?.dirty);
  }
}
