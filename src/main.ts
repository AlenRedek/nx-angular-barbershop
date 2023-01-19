import { importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom([
      BrowserModule,
      BrowserAnimationsModule,
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
    ]),
  ],
}).catch((err) => console.error(err));
