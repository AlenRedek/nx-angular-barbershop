import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppointmentComponent } from './appointment/appointment.component';

@Component({
  selector: 'nx-angular-barbershop-root',
  standalone: true,
  imports: [RouterModule, AppointmentComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'nx-angular-barbershop';
}
