import { Route } from '@angular/router';

export const APP_ROUTES: Array<Route> = [
  {
    path: 'appointment',
    loadChildren: () =>
      import('src/app/features/appointment/appointment.routes').then(
        (m) => m.APPOINTMENT_ROUTES,
      ),
  },
  {
    path: '**',
    redirectTo: 'appointment',
  },
];
