import {Component, inject, OnInit, signal, WritableSignal, computed, Signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';

// Importaciones de tus componentes y servicios
import {LucideAngularModule, ArrowUp, ArrowDown, Edit, ArrowRightLeft, ChevronsUpDown, X} from 'lucide-angular';
import {ListsItemsService} from '../../../../../../../core/services/listsItems.service';
import {ListItem} from '../../../../../../../core/models/TypeListItem.model';
import {ListRegistryModel} from '../../../../../../../core/models/ListRegistry.model';
import {CheckboxComponent} from '../../../../../../../shared/ui/checkbox/CheckBox.component';
import {TableComponent, TableHeader} from '../../../../../../../shared/ui/tables/Table.component';
import {InputComponent} from '../../../../../../../shared/ui/input/Input.component';
import {FakeInputComponent} from '../../../../../../../shared/ui/input/FakeInput.component';
import {ButtonComponent} from '../../../../../../../shared/ui/buttons/button/button.component';
import {BackButtonComponent} from '../../../../../../../shared/ui/buttons/BackButton.component';

// Modelo para los datos de los inputs no editables
interface ComponentDataModel {
  label: string;
  value: string;
}

@Component({
  selector: 'app-edit-list',
  standalone: true,
  templateUrl: 'ListEdit.html',
  imports: [
    CommonModule, DragDropModule, LucideAngularModule, ReactiveFormsModule,
    CheckboxComponent, TableComponent, InputComponent, FakeInputComponent, ButtonComponent, BackButtonComponent
  ],
  styleUrls: ['ListEdit.scss']
})
export class ListEditComponent implements OnInit {
  // --- Toda la lógica de la clase permanece igual ---
  private listsItemsService = inject(ListsItemsService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  listRegistry: Signal<ListRegistryModel | null> = computed(() => this.listsItemsService.list().listRegistry);
  listItems: Signal<ListItem[]> = computed(() => this.listsItemsService.list().listItems);
  isLoading: Signal<boolean> = this.listsItemsService.isLoading;

  isDrawerOpen = signal(false);
  selectedItem: WritableSignal<ListItem | null> = signal(null);
  editForm: FormGroup;

  isReorderDrawerOpen = signal(false);
  reorderableList: WritableSignal<ListItem[]> = signal([]);

  tableHeaders: TableHeader[] = [
    { key: 'code', label: 'Código' },
    { key: 'name', label: 'Nombre' },
    { key: 'order', label: 'Orden' }
  ];

  iconArrowUp = ArrowUp; iconArrowDown = ArrowDown; iconEdit = Edit;
  iconMove = ArrowRightLeft; iconChevrons = ChevronsUpDown; iconX = X;

  constructor() {
    this.editForm = this.fb.group({
      id: [''], code: ['', Validators.required], name: ['', Validators.required],
      order: [0, Validators.required], indicatorEnabled: [false]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) { this.listsItemsService.loadList(id); }
    });
  }

  openEditDrawer(item: ListItem): void {
    this.selectedItem.set(item);
    this.editForm.patchValue(item);
    this.isDrawerOpen.set(true);
    this.reorderableList.set(JSON.parse(JSON.stringify(this.listItems())));
  }

  closeDrawer(): void {
    this.isDrawerOpen.set(false);
    this.isReorderDrawerOpen.set(false);
    this.selectedItem.set(null);
    this.editForm.reset();
  }

  saveChanges(): void {
    if (this.editForm.valid) {
      console.log('Guardando cambios:', this.editForm.value);
      this.closeDrawer();
    }
  }

  drop(event: CdkDragDrop<ListItem[]>): void {
    const newList = [...this.reorderableList()];
    moveItemInArray(newList, event.previousIndex, event.currentIndex);
    this.reorderableList.set(newList);
    this.updateOrderInForm();
  }

  moveSelectedItem(direction: 'up' | 'down'): void {
    const currentList = this.reorderableList();
    const selected = this.selectedItem();
    if (!selected) return;
    const fromIndex = currentList.findIndex(i => i.id === selected.id);
    const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;
    if (toIndex < 0 || toIndex >= currentList.length) return;
    const newList = [...currentList];
    moveItemInArray(newList, fromIndex, toIndex);
    this.reorderableList.set(newList);
    this.updateOrderInForm();
  }

  private updateOrderInForm(): void {
    const selected = this.selectedItem();
    if (!selected) return;
    const newIndex = this.reorderableList().findIndex(i => i.id === selected.id);
    this.editForm.controls['order'].setValue(newIndex + 1);
  }

  isMoveUpDisabled = computed(() => {
    const idx = this.reorderableList().findIndex(i => i.id === this.selectedItem()?.id);
    return idx === 0;
  });

  isMoveDownDisabled = computed(() => {
    const list = this.reorderableList();
    const idx = list.findIndex(i => i.id === this.selectedItem()?.id);
    return idx === list.length - 1;
  });

  get componentData(): ComponentDataModel[] {
    const registry = this.listRegistry();
    if (!registry) return [];
    return [
      { label: 'Nombre', value: registry.displayName },
      { label: 'Nombre Técnico', value: registry.technicalName },
      { label: 'Descripción', value: registry.description },
      { label: 'Api Endpoint', value: registry.apiEndpoint }
    ];
  }
}
