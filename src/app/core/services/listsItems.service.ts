import { Injectable, signal } from '@angular/core';
import {ListItem} from '../models/TypeListItem.model';
import {DELETE_REQ, GET, PATCH, POST, PUT} from '../api/Api';
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

  async loadList(id: string, forceRefresh: boolean = false): Promise<void> {
    if (this.list().listRegistry.id === id && !forceRefresh) {
      return;
    }

    this.isLoading.set(true);
    try {
      const registryResponse = await GET(new DataFetch(`lists/listregistry/${id}`));
      if (!registryResponse.ok) throw new Error(`Failed to fetch list registry`);
      const registryData: ListRegistryModel = await registryResponse.json();

      const itemsResponse = await GET(new DataFetch(`lists/${registryData.technicalName.toLowerCase()}`));
      if (!itemsResponse.ok) throw new Error(`Failed to fetch list items`);
      const itemsData: ListItem[] = await itemsResponse.json();

      this.list.set({ listRegistry: registryData, listItems: itemsData });
    } catch (error) {
      console.error('Failed to load list data', error);
      this.list.set(this.initialListConfig);
      throw error;
    } finally {
      this.isLoading.set(false);
    }
  }

  async saveListItem(listTechnicalName: string, item: Partial<ListItem>): Promise<ListItem> {
    const isNew = !item.id || item.id === '--is-new--';
    const endpoint = isNew
      ? `lists/${listTechnicalName.toLowerCase()}`
      : `lists/${listTechnicalName.toLowerCase()}/${item.id}`;
    const apiCall = isNew ? POST : PUT;

    if (isNew) delete item.id;

    const response = await apiCall(new DataFetch(endpoint, item));
    if (!response.ok) {
      throw new Error(`Failed to save item: ${response.statusText}`);
    }
    return await response.json();
  }

  async updateOrder(listTechnicalName: string, orderedIds: string[]): Promise<void> {
    // Evita enviar una petición si no hay IDs que ordenar
    if (!orderedIds || orderedIds.length === 0) {
      return Promise.resolve();
    }
    const endpoint = `lists/${listTechnicalName.toLowerCase()}/reorder`;
    const response = await PATCH(new DataFetch(endpoint, orderedIds));
    if (!response.ok) {
      throw new Error(`Failed to reorder items: ${response.statusText}`);
    }
  }

  async deleteListItem(listTechnicalName: string, itemId: string): Promise<void> {
    const endpoint = `lists/${listTechnicalName.toLowerCase()}/${itemId}`;
    const response = await DELETE_REQ(new DataFetch(endpoint));
    if (!response.ok) {
      throw new Error(`Failed to delete item: ${response.statusText}`);
    }
  }
}


