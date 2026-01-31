import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import { SnackbarService } from '../../../../core/services/snackbar.service';
import { SHARED_IMPORTS } from '../../../../shared';
import { ConfirmDialogComponent } from '../../../../shared/components/dialogs/confirm-dialog/confirm-dialog.component';
import { APP_ROUTES } from '../../../../shared/constants/app-routes.const';
import { VehiclesTableComponent } from '../../components/vehicles-table/vehicles-table.component';
import { VehicleModel } from '../../models/vehicle.model';
import { VehiclesService } from '../../services/vehicles.service';

@Component({
  selector: 'app-vehicle-list',
  imports: [SHARED_IMPORTS, VehiclesTableComponent],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.css',
})
export class VehicleListComponent implements OnInit {
  // -------------- Refs --------------
  private readonly destroyRef = inject(DestroyRef);

  // -------------- Dialog ------------
  private readonly dialog = inject(MatDialog);

  // -------------- Services --------------
  private readonly vehiclesService = inject(VehiclesService);
  private readonly snackbarService = inject(SnackbarService);
  private readonly router = inject(Router);

  // -------------- Component states --------------
  isLoading = false;
  vehicles: VehicleModel[] = [];
  vehiclesLength = 0;

  paginator?: MatPaginator;

  // -------------- Component lifecycle --------------
  ngOnInit() {
    this.loadVehicles();
  }

  // -------------- Component methods --------------
  handlePaginatorChange(paginator: MatPaginator) {
    this.paginator = paginator;
    this.loadVehicles();
  }

  loadVehicles() {
    const pageIndex = this.paginator?.pageIndex ?? 0;
    const pageSize = this.paginator?.pageSize ?? 10;

    this.isLoading = true;
    this.vehiclesService
      .getVehicles(pageIndex, pageSize)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (response) => {
          const { content, totalElements } = response;

          this.vehicles = content;
          this.vehiclesLength = totalElements;
        },
        error: () => {
          this.snackbarService.showErrorMessage(
            'Falha ao carregar veículos. Tente novamente mais tarde.',
          );

          this.vehicles = [];
          this.vehiclesLength = 0;
        },
      });
  }

  handleCreateVehicle() {
    this.router.navigate([APP_ROUTES.VEHICLES.CREATE]);
  }

  handleViewVehicleDetails(vehicle: VehicleModel) {
    this.router.navigate([APP_ROUTES.VEHICLES.DETAILS(vehicle.id)]);
  }

  handleEditVehicle(vehicle: VehicleModel) {
    this.router.navigate([APP_ROUTES.VEHICLES.EDIT(vehicle.id)]);
  }

  handleDeleteVehicle(vehicle: VehicleModel) {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'Excluir Veículo?',
          message: `Deseja realmente excluir o veículo <b>${vehicle.marca}</b> <b>${vehicle.modelo} ${vehicle.ano}</b>? Essa ação é irreversível.`,
          confirmText: 'Confirmar',
          cancelText: 'Cancelar',
        },
      })
      .afterClosed()
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.vehiclesService.deleteVehicle(vehicle.id).subscribe({
            next: () => {
              this.snackbarService.showSuccessMessage(
                'Veículo excluído com sucesso.',
              );

              this.paginator?.firstPage();

              this.loadVehicles();
            },
            error: () => {
              this.snackbarService.showErrorMessage(
                'Falha ao excluir veículo. Tente novamente mais tarde.',
              );
            },
          });
        }
      });
  }
}
