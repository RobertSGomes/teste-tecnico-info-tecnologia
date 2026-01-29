import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { SnackbarService } from '../../../../core/services/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { APP_ROUTES } from '../../../../shared/constants/app-routes.const';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { VehicleModel } from '../../models/vehicle.model';
import { SHARED_IMPORTS } from '../../../../shared';
import { filter, map, switchMap } from 'rxjs';
import { VehiclesService } from '../../services/vehicles.service';
import { MASKS } from '../../../../shared/constants/masks.const';

@Component({
  selector: 'app-vehicle-details',
  imports: [SHARED_IMPORTS],
  templateUrl: './vehicle-details.component.html',
  styleUrl: './vehicle-details.component.css',
})
export class VehicleDetailsComponent implements OnInit {
  // -------------- Refs --------------
  private readonly destroyRef = inject(DestroyRef);

  // -------------- Constants --------------
  readonly MASKS = MASKS;

  // -------------- Services --------------
  private readonly vehiclesService = inject(VehiclesService);
  private readonly snackbarService = inject(SnackbarService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  // -------------- Component states --------------
  vehicle: VehicleModel | null = null;

  // -------------- Component lifecycle --------------
  ngOnInit() {
    this.loadVehicleDetails();
  }

  // -------------- Component methods --------------
  loadVehicleDetails() {
    this.activatedRoute.paramMap
      .pipe(
        map((params) => params.get('id')),
        filter((id): id is string => !!id),
        switchMap((id) => this.vehiclesService.getVehicleById(id)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (vehicle) => {
          this.vehicle = vehicle;
        },
        error: () => {
          this.snackbarService.showMessage(
            'Failed to load vehicle details. Please try again later.',
          );
          this.handleGoBack();
        },
      });
  }

  handleGoBack() {
    this.router.navigate([APP_ROUTES.VEHICLES], { replaceUrl: true });
  }
}
