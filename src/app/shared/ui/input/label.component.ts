import { CommonModule } from "@angular/common";
import { Component, Input, Optional, Self } from "@angular/core";
import { AbstractControl, FormsModule } from "@angular/forms";
import { BadgeAlert, BadgeCheck, LucideAngularModule, LucideIconData, User } from "lucide-angular";
import { NgxMaskDirective } from "ngx-mask";


@Component({
  selector: 'label-input',
  standalone: true,
  imports: [LucideAngularModule, FormsModule, CommonModule],
  template: `
    <label [for]="id" class="flex items-center gap-2 font-bold text-gray-700">
      <lucide-angular
        [img]="icon"
        class="w-4 h-4 mr-2 text-purple-600">
      </lucide-angular>

      {{ label }}

      @if (control?.touched || control?.dirty) {
        <lucide-angular
          [img]="hasError ? invalidIcon : validIcon"
          class="w-4 h-4 mr-2"
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

  readonly validIcon = BadgeCheck;
  readonly invalidIcon = BadgeAlert;

  get hasError(): boolean {
    return !!this.control?.invalid && (this.control?.touched || this.control?.dirty);
  }
}
