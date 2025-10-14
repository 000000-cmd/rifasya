import {Component, OnInit, Output, EventEmitter, Input, HostListener, ViewChild, ElementRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LocationApiService, LocationSearchDTO} from '../../core/services/location.service';
import { SearchableSelectComponent} from './selects/SearchableSelect.component';
import { ListItem} from '../../core/models/TypeListItem.model';
import {StructuredAddressComponent} from './StructureAddress.component';

@Component({
  selector: 'app-location-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SearchableSelectComponent, StructuredAddressComponent],
  template: `
    <div class="fixed inset-0 bg-gray-900/30 backdrop-blur-sm z-50 flex justify-center items-center p-4
                transition-opacity duration-300 ease-out"
         [ngClass]="ready && !closing ? 'opacity-100' : 'opacity-0'">
      <div #modalContent class="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg space-y-4
                  transition-all duration-300 ease-out"
           [ngClass]="ready && !closing ? 'opacity-100 scale-100' : 'opacity-0 scale-95'">
        <h2 class="text-2xl font-bold">Seleccionar Ubicación</h2>
        <form [formGroup]="locationForm" class="space-y-4">
          <app-searchable-select
            label="País" [options]="countries" [selectedId]="locationForm.get('countryId')?.value"
            (selectionChange)="onCountrySelect($event)"></app-searchable-select>
          <app-searchable-select
            label="Departamento" [options]="departments" [selectedId]="locationForm.get('departmentId')?.value"
            [disabled]="locationForm.get('departmentId')!.disabled"
            (selectionChange)="onDepartmentSelect($event)"></app-searchable-select>
          <app-searchable-select
            label="Municipio" [options]="municipalities" [selectedId]="locationForm.get('municipalityId')?.value"
            [disabled]="locationForm.get('municipalityId')!.disabled"
            (selectionChange)="onMunicipalitySelect($event)"></app-searchable-select>
          <app-searchable-select
            label="Barrio / Vereda" [options]="neighborhoods" [selectedId]="locationForm.get('neighborhoodId')?.value"
            [disabled]="locationForm.get('neighborhoodId')!.disabled"
            (selectionChange)="onNeighborhoodSelect($event)"></app-searchable-select>
          <app-structured-address formControlName="address"></app-structured-address>
        </form>
        <div class="flex justify-end space-x-3 pt-4">
          <button (click)="closeModal()" type="button" class="px-4 py-2 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300 transition-colors">Cancelar</button>
          <button (click)="onSave()" type="button" class="px-4 py-2 bg-purple-600 text-white rounded-md cursor-pointer hover:bg-purple-700 transition-colors">Guardar</button>
        </div>
      </div>
    </div>
  `
})
export class LocationModalComponent implements OnInit {
  @Input() initialValue: any;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  @ViewChild('modalContent') modalContentRef!: ElementRef;

  locationForm: FormGroup;
  countries: ListItem[] = [];
  departments: ListItem[] = [];
  municipalities: ListItem[] = [];
  neighborhoods: ListItem[] = [];
  ready = false;
  closing = false;

  constructor(private fb: FormBuilder, private locationApi: LocationApiService) {
    this.locationForm = this.fb.group({
      countryId: [null], countryName: [null],
      departmentId: [{ value: null, disabled: true }], departmentName: [null],
      municipalityId: [{ value: null, disabled: true }], municipalityName: [null],
      neighborhoodId: [{ value: null, disabled: true }], neighborhoodName: [null],
      address: [null]
    });
  }

  @HostListener('document:mousedown', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.ready && !this.closing && !this.modalContentRef.nativeElement.contains(event.target)) {
      this.onSave();
    }
  }

  private mapToListItem = (dtos: LocationSearchDTO[]): ListItem[] => dtos?.map((dto, i) => ({ code: dto.id, name: dto.name, order: i + 1 })) || [];

  async ngOnInit() {
    this.countries = this.mapToListItem(await this.locationApi.getCountries());
    if (this.initialValue) {
      this.locationForm.patchValue(this.initialValue);
      await this.loadInitialData();
    }
    setTimeout(() => this.ready = true, 0);
  }

  private async loadInitialData() {
    const value = this.initialValue;
    if (!value) return;
    if (value.countryId) {
      this.locationForm.get('departmentId')?.enable();
      this.departments = this.mapToListItem(await this.locationApi.getDepartmentsByCountry(value.countryId));
    }
    if (value.departmentId) {
      this.locationForm.get('municipalityId')?.enable();
      this.municipalities = this.mapToListItem(await this.locationApi.getMunicipalitiesByDepartment(value.departmentId));
    }
    if (value.municipalityId) {
      this.locationForm.get('neighborhoodId')?.enable();
      this.neighborhoods = this.mapToListItem(await this.locationApi.getNeighborhoodsByMunicipality(value.municipalityId));
    }
  }

  async onCountrySelect(country: ListItem) {
    this.locationForm.patchValue({ countryId: country.code, countryName: country.name });
    this.locationForm.get('departmentId')?.reset();
    this.locationForm.get('municipalityId')?.reset();
    this.locationForm.get('municipalityId')?.disable();
    this.locationForm.get('neighborhoodId')?.reset();
    this.locationForm.get('neighborhoodId')?.disable();
    this.municipalities = [];
    this.neighborhoods = [];
    this.locationForm.get('departmentId')?.enable();
    this.departments = this.mapToListItem(await this.locationApi.getDepartmentsByCountry(country.code));
  }

  async onDepartmentSelect(department: ListItem) {
    this.locationForm.patchValue({ departmentId: department.code, departmentName: department.name });
    this.locationForm.get('municipalityId')?.reset();
    this.locationForm.get('neighborhoodId')?.reset();
    this.locationForm.get('neighborhoodId')?.disable();
    this.neighborhoods = [];
    this.locationForm.get('municipalityId')?.enable();
    this.municipalities = this.mapToListItem(await this.locationApi.getMunicipalitiesByDepartment(department.code));
  }

  async onMunicipalitySelect(municipality: ListItem) {
    this.locationForm.patchValue({ municipalityId: municipality.code, municipalityName: municipality.name });
    this.locationForm.get('neighborhoodId')?.reset();
    this.locationForm.get('neighborhoodId')?.enable();
    this.neighborhoods = this.mapToListItem(await this.locationApi.getNeighborhoodsByMunicipality(municipality.code));
  }

  onNeighborhoodSelect(neighborhood: ListItem) {
    this.locationForm.patchValue({ neighborhoodId: neighborhood.code, neighborhoodName: neighborhood.name });
  }

  closeModal(): void {
    this.closing = true;
    setTimeout(() => this.close.emit(), 300);
  }

  onSave(): void {
    this.closing = true;
    setTimeout(() => this.save.emit(this.locationForm.getRawValue()), 300);
  }
}
