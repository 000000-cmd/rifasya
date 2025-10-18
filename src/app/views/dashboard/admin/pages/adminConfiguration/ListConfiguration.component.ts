import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TableComponent, TableHeader} from '../../../../../shared/ui/tables/Table.component';
import { ButtonComponent} from '../../../../../shared/ui/buttons/button/button.component';
import { LucideAngularModule, Pencil } from 'lucide-angular';

interface tableItems {
  id: string;
  nombre: string;
  nombreTecnico: string;
  descripcion: string;
  apiEdnpoint: string;
}

@Component({
  selector: "app-list-configuration",
  standalone: true,
  imports: [CommonModule, TableComponent, RouterLink, ButtonComponent, LucideAngularModule],
  templateUrl: 'ListConfiguration.html',
  styleUrls: ['ListConfiguration.scss']
})
export class ListConfigurationComponent {
  tableHeaders: TableHeader[] = [
    { key: 'nombre',        label: 'Nombre' },
    { key: 'nombreTecnico', label: 'Nombre Técnico' },
    { key: 'descripcion',   label: 'Descripción' },
    { key: 'apiEdnpoint',   label: 'Api Endpoint' }
  ];

  tableItems: tableItems[] = [
    {id: '1', nombre: 'lista1', nombreTecnico: 'ListaUno', apiEdnpoint: 'api/lista1', descripcion: 'aja'},
    {id: '2', nombre: 'lista2', nombreTecnico: 'ListaDos', apiEdnpoint: 'api/lista2', descripcion: 'eje'}
  ];
  protected readonly Pencil = Pencil;
}
