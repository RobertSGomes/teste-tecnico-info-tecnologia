import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';

import { IPaginatedResponse } from '../../../shared/interfaces/paginated-response.interface';
import brandsMock from '../mocks/brands.json';
import modelsByBrandMock from '../mocks/models-by-brand.json';
import vehiclesMock from '../mocks/vehicles.json';
import { VehicleModel } from '../models/vehicle.model';

@Injectable()
export class VehiclesMockService {
  private readonly vehicles: VehicleModel[] = vehiclesMock;

  getVehicles(
    pageIndex: number,
    pageSize: number,
  ): Observable<IPaginatedResponse<VehicleModel>> {
    const start = pageIndex * pageSize;
    const end = start + pageSize;

    const paginatedContent = this.vehicles.slice(start, end);
    const totalElements = this.vehicles.length;
    const totalPages = Math.ceil(totalElements / pageSize);

    return of({
      content: paginatedContent,
      totalElements,
      totalPages,
      size: pageSize,
      number: pageIndex,
    }).pipe(delay(1000));
  }

  getVehicleById(id: string) {
    const foundVehicle = this.vehicles.find((vehicle) => vehicle.id === id);

    if (!foundVehicle) {
      return throwError(() => new Error('Vehicle not found.')).pipe(delay(500));
    }

    return of(foundVehicle).pipe(delay(500));
  }

  createVehicle(vehicle: VehicleModel) {
    vehicle.id = crypto.randomUUID();
    this.vehicles.push(vehicle);
    return of(vehicle).pipe(delay(500));
  }

  updateVehicle(id: string, updatedVehicle: VehicleModel) {
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

  deleteVehicle(id: string) {
    const vehicleIndex = this.vehicles.findIndex(
      (vehicle) => vehicle.id === id,
    );

    if (vehicleIndex === -1) {
      return throwError(() => new Error('Vehicle not found.')).pipe(delay(500));
    }

    this.vehicles.splice(vehicleIndex, 1);

    return of(this.vehicles).pipe(delay(500));
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
