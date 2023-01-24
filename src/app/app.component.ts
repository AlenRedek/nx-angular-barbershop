import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppointmentComponent } from '@app-features/appointment';
import { SuccessComponent } from '@app-features/success';

@Component({
  selector: 'nx-angular-barbershop-root',
  standalone: true,
  imports: [RouterModule, AppointmentComponent, SuccessComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
