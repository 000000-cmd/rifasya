import { Injectable } from '@angular/core';
import { GET} from '../api/Api';
import { DataFetch} from '../api/DataFetch';

// Definición del DTO que usa el servicio
export interface LocationSearchDTO {
  id: string;
  code: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class LocationApiService {

  private async fetchData(url: string): Promise<LocationSearchDTO[]> {
    try {
      const response = await GET(new DataFetch(url));
      if (!response.ok) {
        console.error(`Error fetching data from ${url}`, response);
        return [];
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  getCountries = (): Promise<LocationSearchDTO[]> => this.fetchData('locations/countries');
  getDepartmentsByCountry = (id: string): Promise<LocationSearchDTO[]> => this.fetchData(`locations/countries/${id}/departments`);
  getMunicipalitiesByDepartment = (id: string): Promise<LocationSearchDTO[]> => this.fetchData(`locations/departments/${id}/municipalities`);
  getNeighborhoodsByMunicipality = (id: string): Promise<LocationSearchDTO[]> => this.fetchData(`locations/municipalities/${id}/neighborhoods`);
  searchCountries = (name: string): Promise<LocationSearchDTO[]> => this.fetchData(`locations/countries/fa/search?name=${name}`);
}
