import { Component } from '@angular/core';

import { AppointmentFormComponent } from './components/appointment-form/appointment-form.component';

@Component({
  selector: 'nx-angular-barbershop-appointment',
  standalone: true,
  imports: [AppointmentFormComponent],
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent {}
