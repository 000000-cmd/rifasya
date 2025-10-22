import { Component, inject, OnInit, OnDestroy, signal, WritableSignal, computed, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, moveItemInArray, transferArrayItem, DragDropModule } from '@angular/cdk/drag-drop';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  LucideAngularModule,
  Edit,
  ChevronsUpDown,
  X,
  GripVertical,
  ChevronRight,
  Trash2,
  LoaderCircle
} from 'lucide-angular';
import { ListsItemsService } from '../../../../../../../core/services/listsItems.service';
import { ListItem } from '../../../../../../../core/models/TypeListItem.model';
import { ListRegistryModel } from '../../../../../../../core/models/ListRegistry.model';
import { AlertService } from '../../../../../../../core/services/alert.service';
import { CheckboxComponent } from '../../../../../../../shared/ui/checkbox/CheckBox.component';
import { TableComponent, TableHeader } from '../../../../../../../shared/ui/tables/Table.component';
import { InputComponent } from '../../../../../../../shared/ui/input/Input.component';
import { FakeInputComponent } from '../../../../../../../shared/ui/input/FakeInput.component';
import { ButtonComponent } from '../../../../../../../shared/ui/buttons/button/button.component';
import { BackButtonComponent } from '../../../../../../../shared/ui/buttons/BackButton.component';

function orderRequiredForNewItem(control: AbstractControl): ValidationErrors | null {
  const id = control.get('id')?.value;
  const order = control.get('order')?.value;
  if (id === '--is-new--' && order === 0) {
    return { orderRequired: true };
  }
  return null;
}

@Component({
  selector: 'app-edit-list',
  standalone: true,
  templateUrl: './ListEdit.html',
  styleUrls: ['./ListEdit.scss'],
  imports: [
    CommonModule, DragDropModule, LucideAngularModule, ReactiveFormsModule, CheckboxComponent,
    TableComponent, InputComponent, FakeInputComponent, ButtonComponent, BackButtonComponent
  ],
})
export class ListEditComponent implements OnInit, OnDestroy {
  private listsItemsService = inject(ListsItemsService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private alertService = inject(AlertService);

  private destroy$ = new Subject<void>();

  listRegistry: Signal<ListRegistryModel | null> = computed(() => this.listsItemsService.list().listRegistry);
  isLoading: Signal<boolean> = this.listsItemsService.isLoading;

  listItems: Signal<ListItem[]> = computed(() => {
    const items = this.listsItemsService.list().listItems;
    return [...items].sort((a, b) => a.order - b.order);
  });

  deletingItemId = signal<string | null>(null);
  isDrawerOpen = signal(false);
  isReorderDrawerOpen = signal(false);
  selectedItem: WritableSignal<ListItem | null> = signal(null);
  reorderableList: WritableSignal<ListItem[]> = signal([]);
  newItemPlaceholder: WritableSignal<ListItem[]> = signal([]);
  isSaving = signal(false);
  isEditing = computed(() => !!this.selectedItem()?.id && this.selectedItem()?.id !== '--is-new--');
  editForm: FormGroup;
  tableHeaders: TableHeader[] = [
    {key: 'code', label: 'Código'}, {key: 'name', label: 'Nombre'}, {key: 'order', label: 'Orden'}
  ];
  iconEdit = Edit;
  iconChevrons = ChevronsUpDown;
  iconX = X;
  iconMove = GripVertical;
  iconChevronRight = ChevronRight;
  iconTrash = Trash2;
  iconLoader = LoaderCircle;

  constructor() {
    this.editForm = this.fb.group({
      id: [null],
      code: ['', [Validators.required, Validators.maxLength(8), Validators.pattern(/^[^\s]*$/)]],
      name: ['', Validators.required],
      order: [{value: 0, disabled: true}],
      indicatorEnabled: [true]
    }, {validators: orderRequiredForNewItem});
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const id = params.get('id');
      if (id) this.listsItemsService.loadList(id);
    });

    this.editForm.get('code')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      if (value) {
        const transformedValue = value.replace(/\s/g, '').toUpperCase();
        if (transformedValue !== value) {
          this.editForm.get('code')?.patchValue(transformedValue, {emitEvent: false});
        }
      }
    });

    this.editForm.get('name')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(newName => {
      if (!this.isEditing() && this.newItemPlaceholder().length > 0) {
        this.newItemPlaceholder.update(placeholder => {
          placeholder[0].name = newName;
          return [...placeholder];
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openNewDrawer(): void {
    const newItem: ListItem = {id: '--is-new--', code: '', name: '', order: 0, indicatorEnabled: true};
    this.selectedItem.set(newItem);
    this.editForm.reset(newItem);
    this.editForm.updateValueAndValidity();
    this.newItemPlaceholder.set([newItem]);
    this.reorderableList.set([...this.listItems()]);
    this.isDrawerOpen.set(true);
  }

  openEditDrawer(item: ListItem): void {
    this.selectedItem.set(item);
    this.editForm.patchValue(item);
    this.editForm.updateValueAndValidity();
    this.newItemPlaceholder.set([]);
    this.reorderableList.set([...this.listItems()]);
    this.isDrawerOpen.set(true);
  }

  openReorderDrawer(): void {
    this.isReorderDrawerOpen.set(true);
  }

  closeDrawer(): void {
    this.isDrawerOpen.set(false);
    this.isReorderDrawerOpen.set(false);
    this.selectedItem.set(null);
    this.editForm.reset();
  }

  drop(event: CdkDragDrop<ListItem[]>): void {
    if (event.previousContainer === event.container) {
      const list = [...this.reorderableList()];
      moveItemInArray(list, event.previousIndex, event.currentIndex);
      this.reorderableList.set(list);
    } else {
      const placeholderList = [...this.newItemPlaceholder()];
      const mainList = [...this.reorderableList()];
      transferArrayItem(placeholderList, mainList, event.previousIndex, event.currentIndex);
      this.newItemPlaceholder.set(placeholderList);
      this.reorderableList.set(mainList);
    }
    this.updateOrderInForm();
  }

  private updateOrderInForm(): void {
    const selected = this.selectedItem();
    if (!selected) return;
    const newIndex = this.reorderableList().findIndex(i => i.id === selected.id);
    this.editForm.controls['order'].setValue(newIndex !== -1 ? newIndex + 1 : 0);
    this.editForm.updateValueAndValidity();
  }

  async saveChanges(): Promise<void> {
    if (this.editForm.invalid) {
      this.alertService.toastError('Formulario inválido. Por favor, revisa los campos.');
      this.editForm.markAllAsTouched();
      return;
    }

    this.isSaving.set(true);
    const listRegistry = this.listRegistry();
    if (!listRegistry) {
      this.isSaving.set(false);
      return;
    }

    const itemFromForm = this.editForm.getRawValue();

    try {
      const savedItem = await this.listsItemsService.saveListItem(listRegistry.technicalName, itemFromForm);
      this.alertService.toastSuccess(this.isEditing() ? 'Ítem actualizado' : 'Ítem creado');

      let finalList = [...this.reorderableList()];
      const isNew = !this.isEditing();

      if (isNew) {
        const tempItemIndex = finalList.findIndex(item => item.id === '--is-new--');
        if (tempItemIndex > -1) {
          finalList[tempItemIndex] = savedItem;
        } else {
          finalList.push(savedItem);
        }
      }
      await this.listsItemsService.updateOrder(listRegistry.technicalName, finalList.map(item => item.id));

      await this.listsItemsService.loadList(listRegistry.id, true);
      this.closeDrawer();

    } catch (error: any) {
      this.alertService.error('Error al guardar', error.message);
    } finally {
      this.isSaving.set(false);
    }
  }

  async deleteItem(item: ListItem): Promise<void> {
    const listRegistry = this.listRegistry();
    if (!listRegistry) return;

    // 1. Preguntar al usuario. El modal se abrirá y cerrará por sí solo.
    const confirmed = await this.alertService.confirm(
      '¿Estás seguro?',
      `Se eliminará el ítem "${item.name}" de forma permanente.`
    );

    // 2. Si el usuario no confirma, no hacer nada.
    if (!confirmed) {
      return;
    }

    // 3. Si confirma, AHORA el componente gestiona el estado de carga.
    this.deletingItemId.set(item.id);
    try {
      // 4. Ejecutar las operaciones
      await this.listsItemsService.deleteListItem(listRegistry.technicalName, item.id);

      const updatedList = this.listItems().filter(i => i.id !== item.id);
      const orderedIds = updatedList.map(i => i.id);
      await this.listsItemsService.updateOrder(listRegistry.technicalName, orderedIds);

      // 5. Notificar y refrescar
      this.alertService.toastSuccess('Ítem eliminado y lista reordenada');
      await this.listsItemsService.loadList(listRegistry.id, true);

    } catch (error: any) {
      this.alertService.error('Error al eliminar', error.message);
    } finally {
      // 6. Limpiar el estado de carga
      this.deletingItemId.set(null);
    }
  }
}
