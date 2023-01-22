import { Component, OnInit } from '@angular/core';

import { Barber } from '@app-core/models';
import { BarbersApiService } from '@app-core/services';
import { AppointmentFormComponent } from './components/appointment-form/appointment-form.component';

@Component({
  selector: 'nx-angular-barbershop-appointment',
  standalone: true,
  imports: [AppointmentFormComponent],
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent implements OnInit {
  public barbers: Array<Barber> = [];

  public constructor(private readonly barbersApiService: BarbersApiService) {}

  public async ngOnInit(): Promise<void> {
    this.barbers = await this.barbersApiService.getBarbers();
  }
}
