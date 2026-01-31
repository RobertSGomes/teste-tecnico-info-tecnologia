import { Routes } from '@angular/router';

import { MainLayoutComponent } from '../../layouts/main/main-layout.component';
import { VehicleDetailsComponent } from './pages/vehicle-details/vehicle-details.component';
import { VehicleListComponent } from './pages/vehicle-list/vehicle-list.component';
import { VehicleUpsertComponent } from './pages/vehicle-upsert/vehicle-upsert.component';
import { VehiclesMockService } from './services/vehicles.mock.service';
import { VehiclesService } from './services/vehicles.service';

const vehicleRoutes: Routes = [
  {
    path: 'vehicles',
    component: MainLayoutComponent,
    providers: [{ provide: VehiclesService, useClass: VehiclesMockService }],
    children: [
      {
        path: '',
        component: VehicleListComponent,
      },
      {
        path: 'create',
        component: VehicleUpsertComponent,
      },
      {
        path: ':id',
        component: VehicleDetailsComponent,
      },
      {
        path: ':id/edit',
        component: VehicleUpsertComponent,
      },
    ],
  },
];

export { vehicleRoutes };
