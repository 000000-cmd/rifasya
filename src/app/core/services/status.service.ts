import { Injectable } from '@angular/core';
import { GET } from '../api/Api';
import { DataFetch } from '../api/DataFetch';

export interface ApiStatus {
  status: 'UP' | 'DOWN';
  version?: string;
  error?: string;
}

@Injectable({ providedIn: 'root' })
export class StatusService {

  constructor() { }

  async checkApiStatus(): Promise<ApiStatus> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 segundos de timeout

    try {
      const response = await GET(new DataFetch('auth/apiV'))
      clearTimeout(timeoutId);

      if (!response.ok) {
        return { status: 'DOWN', error: `La API devolvió un estado de error: ${response.status}` };
      }

      const data = await response.json();
      return { status: 'UP', version: data.version };

    } catch (error: any) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        return { status: 'DOWN', error: 'La API no respondió a tiempo (Timeout).' };
      }
      return { status: 'DOWN', error: 'No se pudo establecer conexión con la API.' };
    }
  }
}
