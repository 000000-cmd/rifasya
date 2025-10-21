import { Injectable, signal } from '@angular/core';
import {ListItem} from '../models/TypeListItem.model';
import {GET} from '../api/Api';
import {DataFetch} from '../api/DataFetch';
import {ListRegistryModel} from '../models/ListRegistry.model';
import {ListConfigModel} from '../models/ListConfig.model';

@Injectable({
  providedIn: 'root',
})
export class ListsItemsService {
  initialListConfig: ListConfigModel = {
    listRegistry: {
      id: "",
      technicalName: "",
      displayName: "",
      apiEndpoint: "",
      description: ""
    },
    listItems: [
    {  id: "",
      code: "",
      name: "",
      order: 0
    }]
  };

  readonly documentTypes = signal<ListItem[]>([]);
  readonly genders = signal<ListItem[]>([]);
  readonly listRegistry = signal<ListRegistryModel[]>([]);
  readonly list = signal<ListConfigModel>(this.initialListConfig);
  readonly isLoading = signal<boolean>(false);

  constructor() {}

  loadDocumentTypes(): Promise<void> {
    if (this.documentTypes().length > 0) return Promise.resolve();
    this.isLoading.set(true);
    return GET(new DataFetch('lists/documenttypes'))
      .then(async (response) => {
        if (response.ok) this.documentTypes.set(await response.json());
        else return Promise.reject(response.statusText);
      })
      .catch(error => {
        console.error('Failed to load document types', error);
        return Promise.reject(error);
      })
      .finally(() => this.isLoading.set(false));
  }

  loadGenders(): Promise<void> {
    if (this.genders().length > 0) return Promise.resolve();
    this.isLoading.set(true);
    return GET(new DataFetch('lists/gendertypes'))
      .then(async (response) => {
        if (response.ok) this.genders.set(await response.json());
        else return Promise.reject(response.statusText);
      })
      .catch(error => {
        console.error('Failed to load genders', error);
        return Promise.reject(error);
      })
      .finally(() => this.isLoading.set(false));
  }

  loadListRegistry(): Promise<void>{
    if (this.listRegistry().length > 0) return Promise.resolve();
    this.isLoading.set(true);
    return GET(new DataFetch('lists/listregistry'))
      .then(async (response) => {
        if (response.ok) this.listRegistry.set(await response.json());
        else return Promise.reject(response.statusText);
      })
      .catch(error => {
        console.error('Failed to load list registry', error);
        return Promise.reject(error);
      })
      .finally(() => this.isLoading.set(false));
  }

  async loadList(id: string): Promise<void> {
    // 1. Evita recargar la misma lista si ya está seleccionada
    if (this.list().listRegistry.id === id) {
      return Promise.resolve();
    }

    this.isLoading.set(true);

    try {
      // --- PRIMERA LLAMADA: Obtener el registro de la lista ---
      const registryResponse = await GET(new DataFetch(`lists/listregistry/${id}`));

      if (!registryResponse.ok) {
        throw new Error(`Failed to fetch list registry: ${registryResponse.statusText}`);
      }

      const registryData: ListRegistryModel = await registryResponse.json();

      // Actualiza la primera parte del signal
      this.list.update(currentConfig => ({
        ...currentConfig,
        listRegistry: registryData
      }));

      // --- SEGUNDA LLAMADA: Obtener los items de la lista ---
      const technicalName = registryData.technicalName.toLowerCase();
      const itemsResponse = await GET(new DataFetch(`lists/${technicalName}`));

      if (!itemsResponse.ok) {
        throw new Error(`Failed to fetch list items: ${itemsResponse.statusText}`);
      }

      const itemsData: ListItem[] = await itemsResponse.json();

      // Actualiza la segunda parte del signal con los items
      this.list.update(currentConfig => ({
        ...currentConfig,
        listItems: itemsData
      }));

    } catch (error) {
      console.error('Failed to load list data', error);
      // Limpia el estado en caso de error para no mostrar datos incorrectos
      this.list.set(this.initialListConfig);
      return Promise.reject(error);
    } finally {
      // Asegúrate de que el loading siempre se desactive
      this.isLoading.set(false);
    }
  }
}


