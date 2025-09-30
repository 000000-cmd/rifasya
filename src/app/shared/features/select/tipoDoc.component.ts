import { Component, Input } from "@angular/core";
import { BaseSelectComponent } from "../../UI/selects/base-select.component";
import { BaseSelectItemComponent } from "../../UI/selects/base-select-item.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormControl } from "@angular/forms";

@Component({
  selector: 'doc-select',
  standalone: true,
  imports: [BaseSelectComponent, BaseSelectItemComponent, CommonModule, ReactiveFormsModule],
  template: `
    <base-select 
      [formControl]="control"
      label="Selecciona un doc"
      placeholder="Elige un valor">

      @for (opcion of listaOpciones; track opcion.value) {
        <base-select-item [value]="opcion.value">
          {{ opcion.label }}
        </base-select-item>
      }
    </base-select>
  `
})
export class SelectDocumentTypeComponent {
  @Input({ required: true }) control!: FormControl;

  listaOpciones = [
    { value: "cc", label: "Cédula de Ciudadanía" },
    { value: "ti", label: "Tarjeta de Identidad" },
    { value: "ce", label: "Cédula de Extranjería" }
  ];
}

