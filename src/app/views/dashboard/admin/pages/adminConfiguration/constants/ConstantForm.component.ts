import {Component, OnInit, inject, Input, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {ButtonComponent} from '../../../../../../shared/ui/buttons/button/button.component';
import {ConstantsRequestDTO, ConstantsService} from '../../../../../../core/services/constants.service';
import {AlertService} from '../../../../../../core/services/alert.service';
import {CheckboxComponent} from '../../../../../../shared/ui/checkbox/CheckBox.component';
import {InputComponent} from '../../../../../../shared/ui/input/Input.component';


@Component({
  selector: 'app-constant-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, CheckboxComponent, InputComponent, InputComponent],
  template: `
    <form [formGroup]="constantForm" (ngSubmit)="saveConstant()" id="constantForm" class="flex flex-col h-full">
      <main class="flex-grow space-y-6">
        <base-input label="Código" formControlName="code"></base-input>
        <base-input label="Valor" formControlName="value"></base-input>

        <div>
          <label for="description" class="block text-sm font-bold text-gray-700 mb-2">Descripción</label>
          <textarea id="description" formControlName="description" rows="4"
                    class="border-2 rounded-md p-2.5 w-full bg-white/50 backdrop-blur-sm transition-all duration-300 hover:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-300 focus:outline-none"></textarea>
        </div>

        <app-custom-checkbox formControlName="indicatorEnabled">
          Habilitado
        </app-custom-checkbox>
      </main>

      <footer class="pt-6 flex justify-end gap-3 shrink-0">
        <app-button variant="neutral" type="button" (click)="close.emit()">Cancelar</app-button>
        <app-button variant="fancy" type="submit" [disabled]="constantForm.invalid || isSaving">
          {{ isSaving ? 'Guardando...' : (isEditMode ? 'Guardar Cambios' : 'Crear Constante') }}
        </app-button>
      </footer>
    </form>
  `
})
export class ConstantFormComponent implements OnInit {
  @Input() constantId: string | null = null;
  @Output() saved = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private constantsService = inject(ConstantsService);
  private alertService = inject(AlertService);

  constantForm: FormGroup;
  isEditMode = false;
  isSaving = false;

  constructor() {
    this.constantForm = this.fb.group({
      code: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', Validators.maxLength(255)],
      value: ['', Validators.required],
      indicatorEnabled: [true]
    });
  }

  ngOnInit(): void {
    if (this.constantId) {
      this.isEditMode = true;
      this.constantsService.getConstantById(this.constantId).then(constant => {
        if (constant) { this.constantForm.patchValue(constant); }
      });
    }
  }

  async saveConstant(): Promise<void> {
    if (this.constantForm.invalid) {
      this.alertService.toastError('Formulario inválido.');
      return;
    }
    this.isSaving = true;
    const formData = this.constantForm.value as ConstantsRequestDTO;

    try {
      if (this.isEditMode && this.constantId) {
        await this.constantsService.updateConstant(this.constantId, formData);
        this.alertService.toastSuccess('Constante actualizada');
      } else {
        await this.constantsService.createConstant(formData);
        this.alertService.toastSuccess('Constante creada');
      }
      this.saved.emit();
    } catch (error: any) {
      this.alertService.error('Error al guardar', error.message);
    } finally {
      this.isSaving = false;
    }
  }
}
