export const APP_ROUTES = {
  VEHICLES: 'vehicles',
  VEHICLE_CREATE: 'vehicles/create',
  VEHICLE_DETAILS: (id: string) => `vehicles/${id}`,
  VEHICLE_EDIT: (id: string) => `vehicles/${id}/edit`,
};
