import { Routes } from '@angular/router';

import { vehicleRoutes } from './features/vehicles/vehicle.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/vehicles',
    pathMatch: 'full',
  },
  ...vehicleRoutes,
  {
    path: '**',
    redirectTo: '/vehicles',
  },
];
