import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TableComponent, TableHeader} from '../../../../../../shared/ui/tables/Table.component';
import { ButtonComponent} from '../../../../../../shared/ui/buttons/button/button.component';
import { LucideAngularModule, Pencil } from 'lucide-angular';
import {ListsItemsService} from '../../../../../../core/services/listsItems.service';
import {SkeletonLoaderComponent} from '../../../../../../shared/ui/skeletons/SkeletonLoader.component';

@Component({
  selector: "app-list-configuration",
  standalone: true,
  imports: [CommonModule, TableComponent, RouterLink, ButtonComponent, LucideAngularModule, SkeletonLoaderComponent],
  template: `
    <div class="m-10">
      <div>
        <h1 class="text-3xl mb-2 text-primary border-b-4 border-primary inline-block">
          Configuración de Listas
        </h1>
        <h2 class="text-2xl mb-2 text-gray-500">
          Configura todas las listas del sistema
        </h2>
      </div>

      <div class="mt-8 overflow-x-auto bg-white rounded-lg shadow">
        @if (isLoading()) {
          <div class="p-4 space-y-4">
            @for (i of [1, 2, 3, 4, 5]; track i) {
              <app-skeleton-loader></app-skeleton-loader>
            }
          </div>
        } @else {
          <app-custom-table [headers]="tableHeaders" [data]="listRegistryItems()">
            <ng-template #actions let-item>
              <a [routerLink]="[item.id]" title="Editar">
                <app-button variant="fancy" size="icon">
                  <lucide-angular [img]="Pencil" class="w-4 h-4"></lucide-angular>
                </app-button>
              </a>
            </ng-template>
          </app-custom-table>
        }
      </div>
    </div>
  `
})
export class ListConfigurationComponent implements OnInit {
  tableHeaders: TableHeader[] = [
    { key: 'displayName',   label: 'Nombre' },
    { key: 'technicalName', label: 'Nombre Técnico' },
    { key: 'description',   label: 'Descripción' },
    { key: 'apiEndpoint',   label: 'Api Endpoint' }
  ];

  private listsItemsService = inject(ListsItemsService);
  readonly listRegistryItems = this.listsItemsService.listRegistry;
  readonly isLoading = this.listsItemsService.isLoading; // Expone el signal de carga

  ngOnInit() {
    this.listsItemsService.loadListRegistry();
  }

  protected readonly Pencil = Pencil;
}
