import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppointmentComponent } from '@app-features/appointment';

@Component({
  selector: 'nx-angular-barbershop-root',
  standalone: true,
  imports: [RouterModule, AppointmentComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
