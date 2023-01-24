import { Route } from '@angular/router';

import { AppRoute } from '@app-core/enums';

export const APP_ROUTES: Array<Route> = [
  {
    path: AppRoute.Appointment,
    loadChildren: () =>
      import('@app-features/appointment').then((m) => m.APPOINTMENT_ROUTES),
  },
  {
    path: AppRoute.Success,
    loadChildren: () =>
      import('@app-features/success').then((m) => m.SUCCESS_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'appointment',
  },
];
