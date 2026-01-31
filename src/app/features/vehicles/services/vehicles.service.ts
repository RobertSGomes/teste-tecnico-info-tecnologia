import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IPaginatedResponse } from '../../../shared/interfaces/paginated-response.interface';
import { VehicleModel } from '../models/vehicle.model';

@Injectable()
export class VehiclesService {
  private readonly baseUrl = '/api/vehicles';

  private readonly http = inject(HttpClient);

  getVehicles(
    pageIndex: number,
    pageSize: number,
  ): Observable<IPaginatedResponse<VehicleModel>> {
    return this.http.get<IPaginatedResponse<VehicleModel>>(
      `${this.baseUrl}?page=${pageIndex}&size=${pageSize}`,
    );
  }

  getVehicleById(id: string): Observable<VehicleModel> {
    return this.http.get<VehicleModel>(`${this.baseUrl}/${id}`);
  }

  createVehicle(vehicle: VehicleModel): Observable<VehicleModel> {
    return this.http.post<VehicleModel>(this.baseUrl, vehicle);
  }

  updateVehicle(
    id: string,
    updatedVehicle: Partial<VehicleModel>,
  ): Observable<VehicleModel> {
    return this.http.put<VehicleModel>(`${this.baseUrl}/${id}`, updatedVehicle);
  }

  deleteVehicle(id: string): Observable<VehicleModel> {
    return this.http.delete<VehicleModel>(`${this.baseUrl}/${id}`);
  }

  getBrands(): Observable<string[]> {
    return this.http.get<string[]>('/api/vehicles/brands');
  }

  getModelsByBrand(brand: string): Observable<string[]> {
    return this.http.get<string[]>(`/api/vehicles/models`, {
      params: { brand },
    });
  }
}
