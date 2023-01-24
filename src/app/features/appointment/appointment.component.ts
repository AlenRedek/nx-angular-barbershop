import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as dayjs from 'dayjs';

import { Appointment, Barber, Service } from '@app-core/models';
import { BarbersApiService } from '@app-core/services';

import { AppointmentFormComponent } from './components';
import { AppointmentData } from './models';

@Component({
  selector: 'nx-angular-barbershop-appointment',
  standalone: true,
  imports: [AppointmentFormComponent],
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent implements OnInit {
  public appointments: Array<Appointment> = [];
  public barbers: Array<Barber> = [];
  public services: Array<Service> = [];

  public constructor(
    private readonly barbersApiService: BarbersApiService,
    private readonly router: Router,
  ) {}

  public async ngOnInit(): Promise<void> {
    try {
      const [appointments, barbers, services] = await Promise.all([
        await this.barbersApiService.getAppointments(),
        await this.barbersApiService.getBarbers(),
        await this.barbersApiService.getServices(),
      ]);

      this.appointments = appointments;
      this.barbers = barbers;
      this.services = services;
    } catch {
      console.error('Error loading data');
    }
  }

  public async onFormSubmit(formData: AppointmentData): Promise<void> {
    try {
      const params: Appointment = {
        barberId: formData.barber.id,
        serviceId: formData.service.id,
        startDate: dayjs(formData.date).unix(),
      };

      await this.barbersApiService.createAppointment(params);

      this.router.navigate(['/success']);
    } catch {
      console.error('Error while creating new appointment');
    }
  }
}
