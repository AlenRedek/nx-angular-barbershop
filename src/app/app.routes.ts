import { Route } from '@angular/router';

export const APP_ROUTES: Array<Route> = [
  {
    path: 'appointment',
    loadChildren: () =>
      import('@app-features/appointment').then((m) => m.APPOINTMENT_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'appointment',
  },
];
