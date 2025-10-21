import { Injectable } from '@angular/core';
import {DataFetch} from '../api/DataFetch';
import {DELETE_REQ, GET, POST, PUT} from '../api/Api';

export interface ConstantsResponseDTO {
  id: string;
  code: string;
  description: string;
  value: string;
  indicatorEnabled: boolean;
  userAuditUsername: string;
  auditDate: string;
}

export interface ConstantsRequestDTO {
  code: string;
  description: string;
  value: string;
  indicatorEnabled: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  private async handleResponse(promise: Promise<Response>): Promise<any> {
    const response = await promise;
    if (!response.ok) {
      const errorText = await response.text();
      try {
        const errorJson = JSON.parse(errorText);
        throw new Error(errorJson.message || `Error ${response.status}`);
      } catch (e) {
        throw new Error(errorText || `Error ${response.status}`);
      }
    }
    // DELETE no devuelve contenido (status 204)
    return response.status !== 204 ? await response.json() : null;
  }

  getAllConstants(): Promise<ConstantsResponseDTO[]> {
    return this.handleResponse(GET(new DataFetch('constants')));
  }

  getConstantById(id: string): Promise<ConstantsResponseDTO> {
    return this.handleResponse(GET(new DataFetch(`constants/${id}`)));
  }

  createConstant(data: ConstantsRequestDTO): Promise<ConstantsResponseDTO> {
    return this.handleResponse(POST(new DataFetch('constants', data)));
  }

  updateConstant(id: string, data: ConstantsRequestDTO): Promise<ConstantsResponseDTO> {
    return this.handleResponse(PUT(new DataFetch(`constants/${id}`, data)));
  }

  deleteConstant(id: string): Promise<void> {
    return this.handleResponse(DELETE_REQ(new DataFetch(`constants/${id}`)));
  }
}
