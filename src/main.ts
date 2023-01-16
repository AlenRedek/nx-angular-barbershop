import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot([
        {
          path: 'appointment',
          loadChildren: () =>
            import('src/app/appointment/appointment.routes').then(
              (m) => m.APPOINTMENT_ROUTES,
            ),
        },
        {
          path: '',
          pathMatch: 'full',
          redirectTo: 'appointment',
        },
      ]),
    ),
  ],
}).catch((err) => console.error(err));
