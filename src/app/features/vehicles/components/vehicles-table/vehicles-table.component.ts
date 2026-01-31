import { Component, inject, input, output } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { SHARED_IMPORTS } from '../../../../shared';
import {
  ITableAction,
  ITableColumn,
} from '../../../../shared/components/table/table.interface';
import { MaskHelper } from '../../../../shared/helpers/mask.helper';
import { VehicleModel } from '../../models/vehicle.model';

@Component({
  selector: 'app-vehicles-table',
  imports: [SHARED_IMPORTS],
  templateUrl: './vehicles-table.component.html',
  styleUrl: './vehicles-table.component.css',
})
export class VehiclesTableComponent {
  records = input.required<VehicleModel[]>();
  recordsLength = input.required<number>();
  isLoading = input.required<boolean>();

  handlePaginatorChange = output<MatPaginator>();
  handleViewVehicleDetails = output<VehicleModel>();
  handleEditVehicle = output<VehicleModel>();
  handleDeleteVehicle = output<VehicleModel>();

  private readonly maskHelper = inject(MaskHelper);

  columns: ITableColumn<VehicleModel>[] = [
    { id: 'id', headerLabel: 'ID', rowLabel: (row) => row.id, minWidth: 350 },
    {
      id: 'marca',
      headerLabel: 'Marca',
      rowLabel: (row) => row.marca,
      minWidth: 150,
    },
    {
      id: 'modelo',
      headerLabel: 'Modelo',
      rowLabel: (row) => row.modelo,
      minWidth: 150,
    },
    {
      id: 'renavam',
      headerLabel: 'Renavam',
      rowLabel: (row) => this.maskHelper.format(row.renavam, 'RENAVAM'),
      minWidth: 150,
    },
    {
      id: 'ano',
      headerLabel: 'Ano',
      rowLabel: (row) => row.ano,
      minWidth: 100,
    },
  ];

  actions: ITableAction<VehicleModel>[] = [
    {
      id: 'view',
      label: 'Detalhes',
      icon: 'visibility',
      handleClick: (vehicle) => this.handleViewVehicleDetails.emit(vehicle),
    },
    {
      id: 'edit',
      label: 'Editar',
      icon: 'edit',
      handleClick: (vehicle) => this.handleEditVehicle.emit(vehicle),
    },
    {
      id: 'delete',
      label: 'Excluir',
      icon: 'delete',
      handleClick: (vehicle) => this.handleDeleteVehicle.emit(vehicle),
    },
  ];
}
