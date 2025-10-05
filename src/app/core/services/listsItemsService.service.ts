import { Injectable, signal } from '@angular/core';
import {ListItem} from '../models/TypeListItem.model';
import {GET} from '../api/Api';
import {DataFetch} from '../api/DataFetch';

@Injectable({
  providedIn: 'root',
})
export class ListsItemsService {
  readonly documentTypes = signal<ListItem[]>([]);
  readonly genders = signal<ListItem[]>([]);
  readonly isLoading = signal<boolean>(false);

  constructor() {}

  loadDocumentTypes(): Promise<void> {
    if (this.documentTypes().length > 0) return Promise.resolve();
    this.isLoading.set(true);
    return GET(new DataFetch('api/lists/documenttypes'))
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
    return GET(new DataFetch('api/lists/gendertypes'))
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
}


