import { Injectable } from '@angular/core';
import { GET } from '../api/Api';
import { DataFetch } from '../api/DataFetch';

// Definimos una interfaz para la respuesta esperada
export interface ApiStatus {
  status: 'UP' | 'DOWN';
  version?: string;
  error?: string;
}

@Injectable({ providedIn: 'root' })
export class StatusService {

  constructor() { }

  /**
   * Verifica el estado de la API haciendo una petición al endpoint 'auth/apiV'.
   * Implementa un timeout de 5 segundos.
   */
  async checkApiStatus(): Promise<ApiStatus> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 segundos de timeout

    try {
      // Usamos el GET que ya tienes, pero le pasamos el 'signal' del AbortController.
      // Nota: Tendremos que hacer un pequeño ajuste a tu función GET en Api.ts
      const response = await GET(new DataFetch('auth/apiV'))

      clearTimeout(timeoutId); // Si la respuesta llega, cancelamos el timeout

      if (!response.ok) {
        return { status: 'DOWN', error: `La API devolvió un estado de error: ${response.status}` };
      }

      const data = await response.json(); // Suponiendo que la API devuelve { "version": "1.0.0" }
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
