import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, finalize, map, switchMap, tap } from 'rxjs';

import { SnackbarService } from '../../../../core/services/snackbar.service';
import { SHARED_IMPORTS } from '../../../../shared';
import { BaseForm } from '../../../../shared/abstracts/base-form.abstract';
import { ConfirmDialogComponent } from '../../../../shared/components/dialogs/confirm-dialog/confirm-dialog.component';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { APP_ROUTES } from '../../../../shared/constants/app-routes.const';
import { VehicleModel } from '../../models/vehicle.model';
import { VehiclesService } from '../../services/vehicles.service';

@Component({
  selector: 'app-vehicle-upsert',
  imports: [SHARED_IMPORTS, ReactiveFormsModule, LoadingComponent],
  templateUrl: './vehicle-upsert.component.html',
  styleUrl: './vehicle-upsert.component.css',
})
export class VehicleUpsertComponent
  extends BaseForm<VehicleModel>
  implements OnInit
{
  // -------------- Refs --------------
  private readonly destroyRef = inject(DestroyRef);

  // -------------- Dialog ------------
  private readonly dialog = inject(MatDialog);

  // -------------- Services --------------
  private readonly vehiclesService = inject(VehiclesService);
  private readonly snackbarService = inject(SnackbarService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  // -------------- Component states --------------
  isEdit = false;
  isLoading = false;
  isLoadingModels = false;
  isLoadingBrands = false;
  isSaving = false;
  currentYear = new Date().getFullYear();

  // -------------- Form options --------------
  brands: string[] = [];
  models: string[] = [];

  // -------------- BaseForm implementation --------------
  override defaultFormValue: VehicleModel = {
    id: '',
    placa: '',
    chassi: '',
    renavam: '',
    modelo: '',
    marca: '',
    ano: new Date().getFullYear(),
  };

  override buildForm() {
    const { id, placa, chassi, renavam, modelo, marca, ano } =
      this.defaultFormValue;

    this.form = this.formBuilder.group({
      id: [id],
      placa: [placa, [Validators.required]],
      chassi: [
        chassi,
        [Validators.required, Validators.pattern(/^[A-HJ-NPR-Z0-9]{17}$/)],
      ],
      renavam: [renavam, [Validators.required]],
      modelo: [{ value: modelo, disabled: true }, [Validators.required]],
      marca: [marca, [Validators.required]],
      ano: [ano, [Validators.required]],
    });

    this.getControl('marca')
      .valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((newBrand) => {
        this.loadModelsByBrand(newBrand);
      });
  }

  // -------------- Component lifecycle --------------

  ngOnInit() {
    this.loadMetadata();
    this.buildForm();
    this.loadVehicleDetails();
  }

  // -------------- Component methods --------------
  loadMetadata() {
    this.loadBrands();
  }

  loadBrands() {
    this.isLoadingBrands = true;
    this.vehiclesService
      .getBrands()
      .pipe(
        finalize(() => {
          this.isLoadingBrands = false;
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (brands) => {
          this.brands = brands;

          if (!brands.length) {
            this.disableControl('marca');
            return;
          }

          this.enableControl('marca');
        },
        error: () => {
          this.snackbarService.showErrorMessage(
            'Falha ao carregar as marcas do veículo. Tente novamente mais tarde.',
          );

          this.brands = [];
          this.disableControl('marca');
        },
      });
  }

  loadModelsByBrand(brand: string) {
    if (!brand) {
      this.models = [];
      this.setControlValue('modelo', '');
      this.disableControl('modelo');
      return;
    }

    this.isLoadingModels = true;
    this.vehiclesService
      .getModelsByBrand(brand)
      .pipe(
        finalize(() => {
          this.isLoadingModels = false;
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (models) => {
          const currentModel = this.getControlValue('modelo') as string;

          if (!models.includes(currentModel)) {
            this.setControlValue('modelo', '');
          }

          this.models = models;

          if (!models.length) {
            this.disableControl('modelo');
            return;
          }

          this.enableControl('modelo');
        },
        error: () => {
          this.snackbarService.showErrorMessage(
            'Falha ao carregar os modelos do veículo. Tente novamente mais tarde.',
          );

          this.models = [];
          this.setControlValue('modelo', '');
          this.disableControl('modelo');
        },
      });
  }

  loadVehicleDetails() {
    this.isLoading = true;
    this.activatedRoute.paramMap
      .pipe(
        map((params) => params.get('id')),
        tap((id) => {
          if (!id) {
            this.isLoading = false;
            this.isEdit = false;
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
          this.isEdit = true;
          this.patchFormValue(vehicle);
        },
        error: () => {
          this.snackbarService.showErrorMessage(
            'Falha ao carregar os detalhes do veículo. Tente novamente mais tarde.',
          );
          this.handleGoBack();
        },
      });
  }

  handleSubmit() {
    if (this.isFormInvalid()) {
      return;
    }

    if (this.isEdit) {
      this.handleUpdateVehicle();
      return;
    }

    this.handleCreateVehicle();
  }

  handleCreateVehicle() {
    this.isSaving = true;

    this.vehiclesService
      .createVehicle(this.getFormValue())
      .pipe(
        finalize(() => {
          this.isSaving = false;
        }),
      )
      .subscribe({
        next: () => {
          this.snackbarService.showSuccessMessage(
            'Veículo criado com sucesso.',
          );
          this.handleGoBack();
        },
        error: () => {
          this.snackbarService.showErrorMessage(
            'Falha ao criar o veículo. Tente novamente mais tarde.',
          );
        },
      });
  }

  handleUpdateVehicle() {
    this.isSaving = true;

    const vehicleId = this.getControlValue('id') as string;
    this.vehiclesService
      .updateVehicle(vehicleId, this.getFormValue())
      .pipe(
        finalize(() => {
          this.isSaving = false;
        }),
      )
      .subscribe({
        next: () => {
          this.snackbarService.showSuccessMessage(
            'Veículo atualizado com sucesso.',
          );
          this.handleGoBack();
        },
        error: () => {
          this.snackbarService.showErrorMessage(
            'Falha ao atualizar o veículo. Tente novamente mais tarde.',
          );
        },
      });
  }

  handleCancel() {
    if (!this.form.dirty) {
      this.handleGoBack();
      return;
    }

    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'Cancelar Operação?',
          message: 'Deseja cancelar a operação? Nenhuma alteração será salva.',
          confirmText: 'Sim',
          cancelText: 'Não',
        },
      })
      .afterClosed()
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.handleGoBack();
        }
      });
  }

  handleGoBack() {
    this.router.navigate([APP_ROUTES.VEHICLES.BASE]);
  }
}
