export const APP_ROUTES = {
  VEHICLES: {
    BASE: 'vehicles',
    CREATE: 'vehicles/create',
    EDIT: (id: string) => `vehicles/${id}/edit`,
    DETAILS: (id: string) => `vehicles/${id}`,
  },
};
