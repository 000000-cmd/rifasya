import { Component, Input } from "@angular/core";
import { BaseSelectComponent } from "../../ui/selects/BaseSelectComponent.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormControl } from "@angular/forms";
import { IdCardIcon } from "lucide-angular";
import { ListItem } from "../../../core/models/TypeListItem.model";


@Component({
  selector: 'doc-select',
  standalone: true,
  imports: [BaseSelectComponent, CommonModule, ReactiveFormsModule],
  template: `
    <base-select
      [formControl]="control"
      label="Selecciona un tipo de documento"
      placeholder="Selecciona uno..."
      [icon]="Card">

      @for (opcion of listaOpciones; track opcion.value) {

      }
    </base-select>
  `
})
export  class SelectDocumentTypeComponent {
  @Input({ required: true }) control!: FormControl;

  readonly Card = IdCardIcon;

  list: DocumentType[] = [];

  constructor() {
    this.loadDocuments();
  }

  async loadDocuments() {

     // const documents = await getTypeDocuments();
     // this.list = documents;

  }

  listaOpciones = [
    { value: "cc", label: "Cédula de Ciudadanía" },
    { value: "ti", label: "Tarjeta de Identidad" },
    { value: "ce", label: "Cédula de Extranjería" }
  ];


}

