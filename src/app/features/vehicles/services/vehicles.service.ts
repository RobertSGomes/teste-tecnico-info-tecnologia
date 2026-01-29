import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPaginatedResponse } from '../../../shared/interfaces/paginated-response.interface';
import { VehicleModel } from '../models/vehicle.model';

@Injectable()
export class VehiclesService {
  private readonly baseUrl = '/api/vehicles';

  constructor(private readonly http: HttpClient) {}

  getVehicles(): Observable<IPaginatedResponse<VehicleModel>> {
    return this.http.get<IPaginatedResponse<VehicleModel>>(this.baseUrl);
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

  getBrands(): Observable<string[]> {
    return this.http.get<string[]>('/api/vehicles/brands');
  }

  getModelsByBrand(brand: string): Observable<string[]> {
    return this.http.get<string[]>(`/api/vehicles/models`, {
      params: { brand },
    });
  }
}
