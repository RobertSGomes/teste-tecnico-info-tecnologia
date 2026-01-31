import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, finalize, map, switchMap, tap } from 'rxjs';

import { SnackbarService } from '../../../../core/services/snackbar.service';
import { SHARED_IMPORTS } from '../../../../shared';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { APP_ROUTES } from '../../../../shared/constants/app-routes.const';
import { VehicleModel } from '../../models/vehicle.model';
import { VehiclesService } from '../../services/vehicles.service';

@Component({
  selector: 'app-vehicle-details',
  imports: [SHARED_IMPORTS, LoadingComponent],
  templateUrl: './vehicle-details.component.html',
  styleUrl: './vehicle-details.component.css',
})
export class VehicleDetailsComponent implements OnInit {
  // -------------- Refs --------------
  private readonly destroyRef = inject(DestroyRef);

  // -------------- Services --------------
  private readonly vehiclesService = inject(VehiclesService);
  private readonly snackbarService = inject(SnackbarService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  // -------------- Component states --------------
  isLoading = false;
  vehicle: VehicleModel | null = null;

  // -------------- Component lifecycle --------------
  ngOnInit() {
    this.loadVehicleDetails();
  }

  // -------------- Component methods --------------
  loadVehicleDetails() {
    this.isLoading = true;
    this.activatedRoute.paramMap
      .pipe(
        map((params) => params.get('id')),
        tap((id) => {
          if (!id) {
            this.isLoading = false;
          }
        }),
        filter((id): id is string => !!id),
        switchMap((id) =>
          this.vehiclesService.getVehicleById(id).pipe(
            finalize(() => {
              this.isLoading = false;
            }),
          ),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (vehicle) => {
          this.vehicle = vehicle;
        },
        error: () => {
          this.snackbarService.showErrorMessage(
            'Falha ao carregar os detalhes do veículo. Tente novamente mais tarde.',
          );
          this.handleGoBack();
        },
      });
  }

  handleGoBack() {
    this.router.navigate([APP_ROUTES.VEHICLES.BASE]);
  }
}
