import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Pencil, Trash2, PlusCircle } from 'lucide-angular';
import {ButtonComponent} from '../../../../../../shared/ui/buttons/button/button.component';
import {TableComponent, TableHeader} from '../../../../../../shared/ui/tables/Table.component';
import {ConstantsResponseDTO, ConstantsService} from '../../../../../../core/services/constants.service';
import {AlertService} from '../../../../../../core/services/alert.service';
import {DrawerComponent} from '../../../../../../shared/ui/drawer/Drawer.component';
import {ConstantFormComponent} from './ConstantForm.component';

@Component({
  selector: 'app-constants-list',
  standalone: true,
  imports: [CommonModule, TableComponent, ButtonComponent, LucideAngularModule, DrawerComponent, ConstantFormComponent],
  template: `
    <div class="m-10">
      <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 class="text-3xl mb-2 text-primary border-b-4 border-primary inline-block">
            Gestión de Constantes
          </h1>
          <p class="text-gray-500">Crea, edita y elimina las constantes del sistema.</p>
        </div>
        <app-button variant="fancy" class="flex w-full md:w-auto" (click)="openDrawer()">
          <lucide-angular [img]="PlusCircle" class="w-5 h-5 mr-2 self-center"></lucide-angular>
          Crear Constante
        </app-button>
      </div>

      <div class="mt-8 bg-white rounded-lg shadow overflow-hidden">
        @if (isLoading()) {
          <div class="p-4 space-y-4">
            @for (i of [1, 2, 3, 4, 5]; track i) { <div class="h-8 bg-gray-200 rounded-md animate-pulse"></div> }
          </div>
        } @else {
          <app-custom-table [headers]="tableHeaders" [data]="constants()">
            <ng-template #actions let-item>
              <div class="flex gap-1 justify-center">
                <app-button variant="fancy" size="sm" (click)="openDrawer(item.id)" title="Editar">
                  <lucide-angular [img]="Pencil" class="w-4 h-4"></lucide-angular>
                </app-button>
                <app-button variant="neutral" size="sm" (click)="deleteConstant(item.id, item.code)" title="Eliminar">
                  <lucide-angular [img]="Trash2" class="w-4 h-4 text-red-500"></lucide-angular>
                </app-button>
              </div>
            </ng-template>
          </app-custom-table>
        }
      </div>
    </div>

    <app-drawer [isOpen]="isDrawerOpen()" [title]="drawerTitle()" (close)="closeDrawer()">
      @if (isDrawerOpen()) {
        <app-constant-form
          [constantId]="selectedConstantId()"
          (saved)="handleSave()"
          (close)="closeDrawer()">
        </app-constant-form>
      }
    </app-drawer>
  `
})
export class ConstantsListComponent implements OnInit {
  private constantsService = inject(ConstantsService);
  private alertService = inject(AlertService);

  readonly Pencil = Pencil;
  readonly Trash2 = Trash2;
  readonly PlusCircle = PlusCircle;

  isLoading = signal(true);
  constants = signal<ConstantsResponseDTO[]>([]);
  tableHeaders: TableHeader[] = [
    { key: 'code', label: 'Código' },
    { key: 'value', label: 'Valor' },
    { key: 'description', label: 'Descripción' }
  ];

  isDrawerOpen = signal(false);
  drawerTitle = signal('Crear Constante');
  selectedConstantId = signal<string | null>(null);

  ngOnInit(): void {
    this.loadConstants();
  }

  loadConstants(): void {
    this.isLoading.set(true);
    this.constantsService.getAllConstants()
      .then(data => this.constants.set(data))
      .catch(err => this.alertService.error('Error', 'No se pudieron cargar las constantes.'))
      .finally(() => this.isLoading.set(false));
  }

  openDrawer(id: string | null = null): void {
    this.selectedConstantId.set(id);
    this.drawerTitle.set(id ? 'Editar Constante' : 'Crear Constante');
    this.isDrawerOpen.set(true);
  }

  closeDrawer(): void {
    this.isDrawerOpen.set(false);
  }

  handleSave(): void {
    this.closeDrawer();
    this.loadConstants();
  }

  async deleteConstant(id: string, code: string): Promise<void> {
    const confirmed = await this.alertService.confirm('¿Estás seguro?', `Se eliminará la constante "${code}".`);
    if (confirmed) {
      try {
        await this.constantsService.deleteConstant(id);
        this.alertService.toastSuccess('Constante eliminada');
        this.loadConstants();
      } catch (error: any) {
        this.alertService.error('Error al eliminar', error.message);
      }
    }
  }
}


