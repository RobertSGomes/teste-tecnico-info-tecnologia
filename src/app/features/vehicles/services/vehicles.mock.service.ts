import { Injectable } from '@angular/core';
import { VehicleModel } from '../models/vehicle.model';
import { delay, Observable, of, startWith, throwError } from 'rxjs';
import { IPaginatedResponse } from '../../../shared/interfaces/paginated-response.interface';

import brandsMock from '../mocks/brands.json';
import modelsByBrandMock from '../mocks/models-by-brand.json';
import vehiclesMock from '../mocks/vehicles.json';

@Injectable()
export class VehiclesMockService {
  private readonly vehicles: VehicleModel[] = vehiclesMock;

  getVehicles(): Observable<IPaginatedResponse<VehicleModel>> {
    return of({
      content: this.vehicles,
      totalElements: this.vehicles.length,
      totalPages: 1,
      size: this.vehicles.length,
      number: 0,
    }).pipe(
      delay(1000),
      startWith({
        content: [],
        totalElements: 0,
        totalPages: 0,
        size: 0,
        number: 0,
      }),
    );
  }

  getVehicleById(id: string) {
    const foundVehicle = this.vehicles.find((vehicle) => vehicle.id === id);

    if (!foundVehicle) {
      return throwError(() => new Error('Vehicle not found.')).pipe(delay(500));
    }

    return of(foundVehicle).pipe(delay(500));
  }

  createVehicle(vehicle: any) {
    this.vehicles.push(vehicle);
    return of(vehicle).pipe(delay(500));
  }

  updateVehicle(id: string, updatedVehicle: any) {
    const vehicleIndex = this.vehicles.findIndex(
      (vehicle) => vehicle.id === id,
    );

    if (vehicleIndex === -1) {
      return throwError(() => new Error('Vehicle not found.')).pipe(delay(500));
    }

    this.vehicles[vehicleIndex] = {
      ...this.vehicles[vehicleIndex],
      ...updatedVehicle,
    };

    return of(this.vehicles[vehicleIndex]).pipe(delay(500));
  }

  getBrands(): Observable<string[]> {
    return of(brandsMock).pipe(delay(300));
  }

  getModelsByBrand(brand: string): Observable<string[]> {
    return of(
      modelsByBrandMock[brand as keyof typeof modelsByBrandMock] ?? [],
    ).pipe(delay(300));
  }
}
