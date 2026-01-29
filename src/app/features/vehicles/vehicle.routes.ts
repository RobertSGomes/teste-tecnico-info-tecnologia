import { Routes } from '@angular/router';
import { VehicleListComponent } from './pages/vehicle-list/vehicle-list.component';
import { VehicleDetailsComponent } from './pages/vehicle-details/vehicle-details.component';
import { VehicleUpsertComponent } from './pages/vehicle-upsert/vehicle-upsert.component';
import { VehiclesService } from './services/vehicles.service';
import { VehiclesMockService } from './services/vehicles.mock.service';

const vehicleRoutes: Routes = [
  {
    path: 'vehicles',
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
