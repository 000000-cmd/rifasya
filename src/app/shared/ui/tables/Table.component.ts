// custom-table.component.ts

import { Component, Input, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Define la estructura de cada encabezado de la tabla.
 * - key: La propiedad del objeto de datos a mostrar (ej: 'nombreTecnico').
 * - label: El texto que se mostrará en el encabezado (ej: 'Nombre Técnico').
 */
export interface TableHeader {
  key: string;
  label: string;
}

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <table class="w-full table-auto border-collapse">
      <thead>
        <tr class="bg-gray-100 text-left text-lg font-bold text-gray-600">
          @for (header of headers; track header.key) {
            <th class="p-3">{{ header.label }}</th>
          }
          @if (actionsTemplate) {
            <th class="p-3 text-center">Acciones</th>
          }
        </tr>
      </thead>
      <tbody>
        @for (item of data; track item.id) {
          <tr class="border-b border-gray-200 hover:bg-purple-200">
            @for (header of headers; track header.key) {
              <td class="p-3 text-gray-800">
                {{ item[header.key] }}
              </td>
            }
            @if (actionsTemplate) {
              <td class="p-3 text-center">
                <ng-container
                  [ngTemplateOutlet]="actionsTemplate"
                  [ngTemplateOutletContext]="{ $implicit: item }">
                </ng-container>
              </td>
            }
          </tr>
        } @empty {
          <tr>
            <td [attr.colspan]="headers.length + (actionsTemplate ? 1 : 0)" class="p-4 text-center text-gray-500">
              No hay datos para mostrar.
            </td>
          </tr>
        }
      </tbody>
    </table>
  `
})
export class TableComponent {

  @Input() headers: TableHeader[] = [];
  @Input() data: any[] = [];
  @ContentChild('actions') actionsTemplate?: TemplateRef<any>;
}
